"use client";

import { useEffect, useState } from "react";
import type { ColumnsType } from "antd/es/table";
import { Button, Modal, Select, Image, Tag } from "antd";
import { useRouter } from "next/navigation";
import CustomTable from "../common/CustomTable";
import AdminSearchBar from "../common/AdminSearchBar";
import AdminStatusTag from "../common/AdminStatusTag";
import AdminActionMenu from "../common/AdminActionMenu";
import { Plus, RotateCcw } from "lucide-react";
import { Product, ProductStatus } from "@/types/types";
import { formatDateTime } from "@/utils/utils";
import { useAdminProductsQuery } from "@/services/products/queries";
import { useDeleteProductMutation } from "@/services/products/mutations";
import { useProductCategoriesQuery } from "@/services/product-categories/queries";

export default function ProductManagementPage() {
  const router = useRouter();

  // Search & Pagination & Filter & Sort States
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<ProductStatus | undefined>(undefined);
  const [categoryFilter, setCategoryFilter] = useState<string | undefined>(undefined);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [sortBy, setSortBy] = useState<string>("sortOrder");
  const [sortOrder, setSortOrder] = useState<"ASC" | "DESC">("ASC");

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1); // Reset page to 1 when search query changes
    }, 500);
    return () => clearTimeout(handler);
  }, [search]);

  // Fetch Categories for Filter Dropdown
  const { data: categoriesData } = useProductCategoriesQuery({
    limit: 100,
    status: "published",
  });
  const categoriesList = categoriesData?.data?.items || [];

  // Fetch Products Query Hook
  const { data, isLoading } = useAdminProductsQuery({
    page,
    limit,
    search: debouncedSearch.trim() || undefined,
    status: statusFilter,
    categoryId: categoryFilter,
    sortBy,
    sortOrder,
  });

  const products = data?.data?.items || [];
  const totalItems = data?.data?.total || 0;

  // Delete Mutation Hook
  const deleteMutation = useDeleteProductMutation();

  function openCreate() {
    router.push("/admin/product/create");
  }

  function openEdit(record: Product) {
    router.push(`/admin/product/${record.id}/edit`);
  }

  function handleDelete(id: string) {
    Modal.confirm({
      title: "Confirm Delete",
      content: "Are you sure you want to delete this product? This action cannot be undone.",
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: () => {
        deleteMutation.mutate(id);
      },
    });
  }

  const columns: ColumnsType<Product> = [
    {
      title: "Thumbnail",
      dataIndex: "thumbnailUrl",
      key: "thumbnailUrl",
      width: 110,
      render: (url: string) => (
        <div className="w-12 h-12 rounded border border-slate-200 bg-slate-50 flex items-center justify-center overflow-hidden cursor-pointer">
          {url ? (
            <Image
              src={url}
              alt="thumbnail"
              className="w-full h-full object-cover"
              preview={{
                cover: <div className="text-[10px] font-semibold text-white bg-black/40 w-full h-full flex items-center justify-center">View</div>,
              }}
            />
          ) : (
            <span className="text-slate-300 text-[10px]">No image</span>
          )}
        </div>
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      sorter: true,
      sortOrder: sortBy === "title" ? (sortOrder === "ASC" ? "ascend" : "descend") : undefined,
      render: (title: string, record: Product) => (
        <div>
          <span className="font-semibold text-slate-800">{title}</span>
          {record.categoryLabel && (
            <div className="text-[12px] text-slate-400 font-medium">{record.categoryLabel}</div>
          )}
        </div>
      ),
    },
    {
      title: "Slug",
      dataIndex: "slug",
      key: "slug",
      sorter: true,
      sortOrder: sortBy === "slug" ? (sortOrder === "ASC" ? "ascend" : "descend") : undefined,
      render: (slug: string) => (
        <span className="text-slate-500 font-mono text-[13px] bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100">
          {slug}
        </span>
      ),
    },
    {
      title: "Badges",
      dataIndex: "badges",
      key: "badges",
      render: (badges: string[] | undefined) => {
        if (!badges || badges.length === 0) return <span className="text-slate-400 text-xs">-</span>;
        return (
          <div className="flex flex-wrap gap-1">
            {badges.map((badge, idx) => (
              <Tag key={idx} color="blue" className="!mr-0 rounded-full font-medium text-[11px]">
                {badge}
              </Tag>
            ))}
          </div>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 120,
      render: (status: string) => {
        const toneMap: Record<string, "success" | "warning" | "default" | "processing"> = {
          published: "success",
          draft: "default",
        };
        const labelMap: Record<string, string> = {
          published: "Published",
          draft: "Draft",
        };
        return <AdminStatusTag label={labelMap[status] || status} tone={toneMap[status] || "default"} />;
      },
    },
    {
      title: "Sort Order",
      dataIndex: "sortOrder",
      key: "sortOrder",
      width: 120,
      align: "center",
      sorter: true,
      sortOrder: sortBy === "sortOrder" ? (sortOrder === "ASC" ? "ascend" : "descend") : undefined,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 180,
      sorter: true,
      sortOrder: sortBy === "createdAt" ? (sortOrder === "ASC" ? "ascend" : "descend") : undefined,
      render: (date: string) => formatDateTime(date),
    },
    {
      title: "Actions",
      key: "actions",
      width: 80,
      align: "center",
      render: (_, record: Product) => (
        <AdminActionMenu
          onEdit={() => openEdit(record)}
          onDelete={() => handleDelete(record.id)}
        />
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        {/* Header Section */}
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
              Products
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Manage your digital products, categories, features, image galleries and pricing links.
            </p>
          </div>
          <Button
            type="primary"
            icon={<Plus className="w-4 h-4 mr-1 inline-block" />}
            onClick={openCreate}
            size="large"
            className="shadow-sm font-semibold h-[32px] px-6 rounded-lg bg-blue-600 hover:bg-blue-700 border-none flex items-center"
          >
            Create Product
          </Button>
        </div>

        {/* Filter Section */}
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/30 flex flex-col lg:flex-row gap-4 justify-between items-stretch lg:items-center">
          <div className="flex flex-nowrap gap-3 items-center">
            <AdminSearchBar
              placeholder="Search products..."
              value={search}
              onChange={setSearch}
            />

            <Select
              placeholder="Filter by Category"
              allowClear
              value={categoryFilter}
              className="w-56 h-[32px] [&_.ant-select-selector]:!rounded-lg"
              onChange={(val) => {
                setCategoryFilter(val);
                setPage(1);
              }}
              options={categoriesList.map((cat) => ({
                label: cat.title,
                value: cat.id,
              }))}
            />

            <Select
              placeholder="Filter by Status"
              allowClear
              value={statusFilter}
              className="w-44 h-[32px] [&_.ant-select-selector]:!rounded-lg"
              onChange={(val) => {
                setStatusFilter(val);
                setPage(1);
              }}
              options={[
                { label: "Published", value: "published" },
                { label: "Draft", value: "draft" },
              ]}
            />

            {(search || categoryFilter || statusFilter) && (
              <Button
                type="text"
                onClick={() => {
                  setSearch("");
                  setCategoryFilter(undefined);
                  setStatusFilter(undefined);
                  setPage(1);
                }}
                icon={<RotateCcw className="w-4 h-4" />}
                className="flex items-center text-slate-500 hover:text-slate-700 h-[32px] hover:bg-slate-100 rounded-lg px-3 font-medium transition"
              >
                Clear Filters
              </Button>
            )}
          </div>
          <div className="text-slate-400 text-sm font-medium whitespace-nowrap">
            Total {totalItems} products
          </div>
        </div>

        {/* Products Table */}
        <CustomTable
          loading={isLoading}
          columns={columns}
          dataSource={products}
          pagination={{
            current: page,
            pageSize: limit,
            total: totalItems,
            showSizeChanger: true,
            pageSizeOptions: ["12", "24", "48", "100"],
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} items`,
          }}
          onChange={(pagination: any, filters: any, sorter: any) => {
            if (pagination) {
              setPage(pagination.current || 1);
              setLimit(pagination.pageSize || 12);
            }
            if (sorter && sorter.field) {
              setSortBy(sorter.field);
              setSortOrder(sorter.order === "descend" ? "DESC" : "ASC");
            } else {
              setSortBy("sortOrder");
              setSortOrder("ASC");
            }
          }}
          scroll={{ x: 1200 }}
          className="[&_.ant-table-thead>tr>th]:bg-slate-50 [&_.ant-table-thead>tr>th]:font-semibold [&_.ant-pagination]:!px-4"
        />
      </div>
    </div>
  );
}
