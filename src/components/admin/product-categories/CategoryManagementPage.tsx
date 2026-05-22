"use client";

import { useEffect, useState } from "react";
import type { ColumnsType } from "antd/es/table";
import type { TableProps } from "antd";
import { Button, Modal, Select, Image } from "antd";
import { useRouter } from "next/navigation";
import CustomTable from "../common/CustomTable";
import AdminSearchBar from "../common/AdminSearchBar";
import AdminStatusTag from "../common/AdminStatusTag";
import AdminActionMenu from "../common/AdminActionMenu";
import { Plus, RotateCcw } from "lucide-react";
import { ProductCategory, ProductCategoryStatus } from "@/types/types";
import { formatDateTime } from "@/utils/utils";
import { useProductCategoriesQuery } from "@/services/product-categories/queries";
import { useDeleteCategoryMutation } from "@/services/product-categories/mutations";
import { APP_LOCALES } from "@/types/types";

export default function CategoryManagementPage() {
  const router = useRouter();
  // Search & Pagination & Filter & Sort States
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<ProductCategoryStatus | undefined>(undefined);
  const [localeFilter, setLocaleFilter] = useState<string>("");
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

  const { data, isLoading } = useProductCategoriesQuery({
    page,
    limit,
    search: debouncedSearch.trim() || undefined,
    locale: localeFilter || undefined,
    status: statusFilter,
    sortBy,
    sortOrder,
  });

  const categories = data?.data?.items || [];
  const totalItems = data?.data?.meta?.totalItems || 0;

  const deleteMutation = useDeleteCategoryMutation();

  function handleDelete(id: string) {
    Modal.confirm({
      title: "Confirm Delete",
      content: "Are you sure you want to delete this category? This action cannot be undone.",
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: () => {
        deleteMutation.mutate(id);
      },
    });
  }

  const handleTableChange: TableProps<ProductCategory>["onChange"] = (pagination, _filters, sorter) => {
    if (pagination) {
      setPage(pagination.current ?? 1);
      setLimit(pagination.pageSize ?? 12);
    }
    const sort = Array.isArray(sorter) ? sorter[0] : sorter;
    if (sort?.field != null && sort.order != null) {
      setSortBy(sort.field as string);
      setSortOrder(sort.order === "descend" ? "DESC" : "ASC");
    } else {
      setSortBy("sortOrder");
      setSortOrder("ASC");
    }
  };

  const columns: ColumnsType<ProductCategory> = [
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
      render: (title: string, record: ProductCategory) => (
        <div>
          <span className="font-semibold text-slate-800">{title}</span>
          {record.subtitle && (
            <div className="text-[12px] text-slate-400 font-medium">{record.subtitle}</div>
          )}
        </div>
      ),
    },
    {
      title: "Language",
      dataIndex: "locale",
      key: "locale",
      width: 100,
      render: (locale: string) => {
        const isEn = locale === "en";
        return (
          <div className="flex items-center gap-1.5 font-medium text-slate-600">
            <span className="text-lg leading-none">{isEn ? "🇺🇸" : "🇻🇳"}</span>
            <span className="text-xs uppercase">{isEn ? "EN" : "VI"}</span>
          </div>
        );
      },
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
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 120,
      render: (status: string) => {
        const toneMap: Record<string, "success" | "warning" | "default" | "processing"> = {
          published: "success",
          draft: "default",
          scheduled: "processing",
          archived: "warning",
        };
        const labelMap: Record<string, string> = {
          published: "Published",
          draft: "Draft",
          scheduled: "Scheduled",
          archived: "Archived",
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
      render: (_, record: ProductCategory) => (
        <AdminActionMenu
          onEdit={() => router.push(`/admin/product-categories/${record.id}/edit`)}
          onDelete={() => handleDelete(record.id)}
          onTranslate={() => router.push(`/admin/product-categories/create?translateFromId=${record.id}`)}
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
              Product Categories
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Manage your digital product categories, status, slugs and thumbnails.
            </p>
          </div>
          <Button
            type="primary"
            icon={<Plus className="w-4 h-4 mr-1 inline-block" />}
            onClick={() => router.push("/admin/product-categories/create")}
            size="large"
            className="shadow-sm font-semibold h-8 px-6 rounded-lg bg-blue-600 hover:bg-blue-700 border-none flex items-center"
          >
            Create Category
          </Button>
        </div>

        {/* Filter Section */}
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/30 flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
          <div className="flex gap-3 items-center ">
            <Select
              placeholder="Language"
              value={localeFilter}
              className="w-40 h-8 [&_.ant-select-selector]:rounded-lg!"
              onChange={(val) => {
                setLocaleFilter(val);
                setPage(1);
              }}
              options={[{ label: "All languages", value: "" }, ...APP_LOCALES]}
            />
            <AdminSearchBar
              placeholder="Search categories..."
              value={search}
              onChange={setSearch}
            />
            <Select
              placeholder="Filter by Status"
              allowClear
              value={statusFilter}
              className="w-44 h-8 [&_.ant-select-selector]:rounded-lg!"
              onChange={(val) => {
                setStatusFilter(val);
                setPage(1);
              }}
              options={[
                { label: "Published", value: "published" },
                { label: "Draft", value: "draft" },
                { label: "Scheduled", value: "scheduled" },
                { label: "Archived", value: "archived" },
              ]}
            />
            {(search || statusFilter || localeFilter) && (
              <Button
                type="text"
                onClick={() => {
                  setSearch("");
                  setStatusFilter(undefined);
                  setLocaleFilter("");
                  setPage(1);
                }}
                icon={<RotateCcw className="w-4 h-4" />}
                className="flex items-center text-slate-500 hover:text-slate-700 h-8 hover:bg-slate-100 rounded-lg px-3 font-medium transition"
              >
                Clear Filters
              </Button>
            )}
          </div>
          <div className="text-slate-400 text-sm font-medium">
            Total {totalItems} categories
          </div>
        </div>

        {/* Categories Table */}
        <CustomTable
          loading={isLoading}
          columns={columns}
          dataSource={categories}
          pagination={{
            current: page,
            pageSize: limit,
            total: totalItems,
            showSizeChanger: true,
            pageSizeOptions: ["12", "24", "48", "100"],
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} items`,
          }}
          onChange={handleTableChange}
          scroll={{ x: 1100 }}
          className="[&_.ant-table-thead>tr>th]:bg-slate-50 [&_.ant-table-thead>tr>th]:font-semibold [&_.ant-pagination]:px-4!"
        />
      </div>
    </div>
  );
}
