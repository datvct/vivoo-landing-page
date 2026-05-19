"use client";

import { useEffect, useState } from "react";
import type { ColumnsType } from "antd/es/table";
import { Button, Modal } from "antd";
import CustomTable from "../common/CustomTable";
import AdminSearchBar from "../common/AdminSearchBar";
import AdminStatusTag from "../common/AdminStatusTag";
import AdminActionMenu from "../common/AdminActionMenu";
import UserModal from "./UserModal";
import { Plus } from "lucide-react";
import { User, UserFormValues } from "@/types/types";
import { formatDateTime } from "@/utils/utils";
import { useUsersQuery } from "@/services/users/queries";
import {
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from "@/services/users/mutations";

export default function UserManagementPage() {
  // Search & Pagination States
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);

  // Modal States
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<User | null>(null);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1); // Reset page to 1 when search query changes
    }, 500);
    return () => clearTimeout(handler);
  }, [search]);

  // Fetch Users Query Hook
  const { data, isLoading } = useUsersQuery({
    page,
    limit,
    email: debouncedSearch.trim() || undefined,
  });

  const users = data?.data?.items || [];
  const totalItems = data?.data?.meta?.totalItems || 0;

  // CRUD Mutation Hooks
  const createMutation = useCreateUserMutation(() => setModalOpen(false));
  const updateMutation = useUpdateUserMutation(() => setModalOpen(false));
  const deleteMutation = useDeleteUserMutation();

  function openCreate() {
    setEditing(null);
    setModalOpen(true);
  }

  function openEdit(record: User) {
    setEditing(record);
    setModalOpen(true);
  }

  function handleDelete(id: string) {
    Modal.confirm({
      title: "Xác nhận xóa",
      content: "Bạn có chắc chắn muốn xóa người dùng này? Thao tác này không thể hoàn tác.",
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk: () => {
        deleteMutation.mutate(id);
      },
    });
  }

  async function handleSave(values: UserFormValues) {
    if (editing) {
      updateMutation.mutate({
        id: editing.id,
        payload: {
          email: values.email,
          displayName: values.displayName,
          role: values.role,
          isActive: values.isActive,
          // Nếu có đổi mật khẩu thì gửi, không thì thôi
          ...(values.password ? { password: values.password } : {}),
        },
      });
    } else {
      createMutation.mutate(values);
    }
  }

  const columns: ColumnsType<User> = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (value, record) => (
        <div>
          <div className="text-sm font-medium text-slate-900">
            {record.displayName ?? value}
          </div>
          <div className="text-xs text-slate-500">{value}</div>
        </div>
      ),
      width: 300,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      width: 140,
      render: (value: string) => <span className="capitalize">{value.toLowerCase()}</span>,
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      width: 120,
      render: (value: boolean) => (
        <AdminStatusTag
          label={value ? "Active" : "Inactive"}
          tone={value ? "success" : "default"}
        />
      ),
    },
    {
      title: "Last Login",
      dataIndex: "lastLoginAt",
      key: "lastLoginAt",
      width: 200,
      render: (value?: string) => formatDateTime(value),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 180,
      render: (value: string) => formatDateTime(value),
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      key: "updatedAt",
      width: 180,
      render: (value?: string) => formatDateTime(value),
    },
    {
      title: "Actions",
      key: "actions",
      width: 100,
      render: (_value: unknown, record: User) => (
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
              User Management
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Manage your users, thumbnails, guides, pricing links, SEO metadata, and rich HTML contents.
            </p>
          </div>
          <Button
            type="primary"
            icon={<Plus className="h-4 w-4" />}
            className="bg-slate-900"
            onClick={openCreate}
          >
            Add User
          </Button>
        </div>

        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
          <div className="border-b border-slate-200 px-4 py-3">
            <AdminSearchBar
              value={search}
              onChange={setSearch}
              placeholder="Search by email or name"
            />
          </div>
          <CustomTable
            rowKey="id"
            loading={isLoading}
            columns={columns}
            dataSource={users}
            pagination={{
              current: page,
              pageSize: limit,
              total: totalItems,
              showSizeChanger: true,
              pageSizeOptions: ["12", "24", "48", "100"],
              onChange: (p, size) => {
                setPage(p);
                setLimit(size);
              },
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} items`,
            }}
            scroll={{ x: 1100 }}
            className="[&_.ant-table-thead>tr>th]:bg-slate-50 [&_.ant-table-thead>tr>th]:font-semibold [&_.ant-pagination]:!px-4"
          />
          <UserModal
            open={modalOpen}
            userId={editing?.id}
            confirmLoading={createMutation.isPending || updateMutation.isPending}
            onCancel={() => setModalOpen(false)}
            onSave={handleSave}
          />
        </div>
      </div>
    </div>
  );
}
