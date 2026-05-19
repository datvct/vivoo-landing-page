"use client";

import { useEffect, useState } from "react";
import type { ColumnsType } from "antd/es/table";
import { Button, Modal, Drawer, Tooltip, message, Select } from "antd";
import { Trash2, Eye, Mail, Phone, Building2, MapPin, Calendar, User, Copy, Check, RotateCcw, ShieldCheck } from "lucide-react";
import CustomTable from "../common/CustomTable";
import AdminSearchBar from "../common/AdminSearchBar";
import AdminStatusTag from "../common/AdminStatusTag";
import { Contact, ContactStatus } from "@/types/types";
import { formatDateTime } from "@/utils/utils";
import { useAdminContactsQuery } from "@/services/contacts/queries";
import { useDeleteContactMutation, useUpdateContactStatusMutation } from "@/services/contacts/mutations";

export default function ContactManagementPage() {
  // Search & Pagination States
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);

  const [statusFilter, setStatusFilter] = useState<ContactStatus | undefined>(undefined);

  // Selected contact for Drawer Detail View
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);
    return () => clearTimeout(handler);
  }, [search]);

  // Query contacts list
  const { data, isLoading } = useAdminContactsQuery({
    page,
    limit,
    search: debouncedSearch.trim() || undefined,
    status: statusFilter,
  });

  const contacts = data?.data?.items || [];
  const totalItems = data?.data?.meta?.totalItems || 0;

  // Delete Mutation Hook
  const deleteMutation = useDeleteContactMutation();
  const updateStatusMutation = useUpdateContactStatusMutation();

  const handleStatusChange = (id: string, newStatus: ContactStatus) => {
    updateStatusMutation.mutate({ id, status: newStatus });
  };

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: "Confirm Delete",
      content: "Are you sure you want to delete this contact inquiry? This action cannot be undone.",
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: () => {
        deleteMutation.mutate(id);
      },
    });
  };

  const handleCopy = async (text: string, fieldName: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(fieldName);
      message.success(`Copied ${fieldName} to clipboard!`);
      setTimeout(() => setCopiedField(null), 1500);
    } catch {
      message.error("Failed to copy text.");
    }
  };

  const columns: ColumnsType<Contact> = [
    {
      title: "Sender Name",
      key: "fullName",
      width: 200,
      render: (_, record: Contact) => (
        <div className="flex flex-col">
          <span className="font-semibold text-slate-800">
            {record.firstName} {record.lastName}
          </span>
          {record.company && (
            <span className="text-[11px] text-slate-400 font-medium">
              {record.company}
            </span>
          )}
        </div>
      ),
    },
    {
      title: "Work Email",
      dataIndex: "email",
      key: "email",
      width: 220,
      render: (email: string) => (
        <span className="text-slate-600 font-medium select-all hover:text-blue-500 transition duration-150">
          {email}
        </span>
      ),
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
      width: 150,
      render: (phone: string) => (
        <span className="text-slate-500 font-mono text-[13px]">{phone || "-"}</span>
      ),
    },
    {
      title: "Postal Code",
      dataIndex: "postal",
      key: "postal",
      width: 120,
      render: (postal: string) => (
        <span className="text-slate-500 font-mono text-[13px]">{postal || "-"}</span>
      ),
    },
    {
      title: "Inquiry Message",
      dataIndex: "message",
      key: "message",
      render: (text: string) => (
        <p className="text-slate-500 text-[13px] line-clamp-2 leading-relaxed max-w-md">
          {text}
        </p>
      ),
    },
    {
      title: "Received Date",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 180,
      render: (date: string) => formatDateTime(date),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 120,
      render: (status: ContactStatus) => {
        const toneMap: Record<ContactStatus, "processing" | "warning" | "success"> = {
          new: "processing",
          received: "warning",
          processed: "success",
        };
        const labelMap: Record<ContactStatus, string> = {
          new: "New",
          received: "Received",
          processed: "Processed",
        };
        return <AdminStatusTag label={labelMap[status] || status} tone={toneMap[status]} />;
      },
    },
    {
      title: "Actions",
      key: "actions",
      width: 100,
      align: "center",
      fixed: "right",
      render: (_, record: Contact) => (
        <div className="flex items-center justify-center gap-1">
          <Tooltip title="View Details">
            <Button
              type="text"
              shape="circle"
              icon={<Eye className="w-4 h-4 text-blue-500" />}
              onClick={() => setSelectedContact(record)}
              className="hover:bg-blue-50 flex items-center justify-center"
            />
          </Tooltip>
          <Tooltip title="Delete Inquiry">
            <Button
              type="text"
              shape="circle"
              icon={<Trash2 className="w-4 h-4 text-red-500" />}
              onClick={() => handleDelete(record.id)}
              className="hover:bg-red-50 flex items-center justify-center"
            />
          </Tooltip>
        </div>
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
              Contact Inquiries
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Read customer inquiry messages, company names, contact numbers, and follow up requests.
            </p>
          </div>
        </div>

        {/* Filter Section */}
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/30 flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
          <div className="flex flex-nowrap gap-3 items-center">
            <AdminSearchBar
              placeholder="Search contacts..."
              value={search}
              onChange={setSearch}
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
                { label: "New", value: "new" },
                { label: "Received", value: "received" },
                { label: "Processed", value: "processed" },
              ]}
            />

            {(search || statusFilter) && (
              <Button
                type="text"
                onClick={() => {
                  setSearch("");
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
            Total {totalItems} entries
          </div>
        </div>

        {/* Contacts Table */}
        <CustomTable
          loading={isLoading}
          columns={columns}
          dataSource={contacts}
          pagination={{
            current: page,
            pageSize: limit,
            total: totalItems,
            showSizeChanger: true,
            pageSizeOptions: ["12", "24", "48", "100"],
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} entries`,
          }}
          onChange={(pagination: any) => {
            if (pagination) {
              setPage(pagination.current || 1);
              setLimit(pagination.pageSize || 12);
            }
          }}
          scroll={{ x: 1200 }}
          className="[&_.ant-table-thead>tr>th]:bg-slate-50 [&_.ant-table-thead>tr>th]:font-semibold [&_.ant-pagination]:!px-4"
        />
      </div>

      {/* Contact Details Drawer */}
      <Drawer
        title="Contact Inquiry Details"
        placement="right"
        onClose={() => setSelectedContact(null)}
        open={!!selectedContact}
      >
        {selectedContact && (() => {
          const currentContact = contacts.find((c) => c.id === selectedContact.id) || selectedContact;
          return (
            <div className="space-y-6">
              {/* Header Info */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-start gap-4">
                <div className="bg-blue-500 text-white rounded-full p-2">
                  <User className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-slate-800 leading-none">
                    {currentContact.firstName} {currentContact.lastName}
                  </h3>
                  <p className="text-sm text-slate-500 font-medium">
                    ID: <span className="font-mono text-xs select-all">{currentContact.id}</span>
                  </p>
                </div>
              </div>

              {/* Status Update Control */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex justify-between items-center">
                <div className="flex items-center gap-2 text-slate-600 font-semibold text-sm">
                  <ShieldCheck className="w-4 h-4 text-blue-500" />
                  <span>Update Inquiry Status</span>
                </div>
                <Select
                  value={currentContact.status}
                  onChange={(val) => handleStatusChange(currentContact.id, val)}
                  loading={updateStatusMutation.isPending}
                  className="w-36 h-[32px] [&_.ant-select-selector]:!rounded-lg"
                  options={[
                    { label: "New", value: "new" },
                    { label: "Received", value: "received" },
                    { label: "Processed", value: "processed" },
                  ]}
                />
              </div>

              {/* Fields List */}
              <div className="space-y-4">
                {/* Email */}
                <div className="flex justify-between items-start border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2.5 text-slate-500 font-medium text-sm">
                    <Mail className="w-4 h-4 text-slate-400" />
                    <span>Email</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-right">
                    <span className="font-semibold text-slate-800 text-sm select-all">{currentContact.email}</span>
                    <button
                      onClick={() => handleCopy(currentContact.email, "email")}
                      className="text-slate-400 hover:text-slate-600 transition"
                    >
                      {copiedField === "email" ? (
                        <Check className="w-3.5 h-3.5 text-green-500" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex justify-between items-start border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2.5 text-slate-500 font-medium text-sm">
                    <Phone className="w-4 h-4 text-slate-400" />
                    <span>Phone Number</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-right">
                    <span className="font-semibold text-slate-800 text-sm">
                      {currentContact.phone || "N/A"}
                    </span>
                    {currentContact.phone && (
                      <button
                        onClick={() => handleCopy(currentContact.phone!, "phone")}
                        className="text-slate-400 hover:text-slate-600 transition"
                      >
                        {copiedField === "phone" ? (
                          <Check className="w-3.5 h-3.5 text-green-500" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    )}
                  </div>
                </div>

                {/* Company */}
                <div className="flex justify-between items-start border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2.5 text-slate-500 font-medium text-sm">
                    <Building2 className="w-4 h-4 text-slate-400" />
                    <span>Company</span>
                  </div>
                  <span className="font-semibold text-slate-800 text-sm">
                    {currentContact.company || "N/A"}
                  </span>
                </div>

                {/* Postal Code */}
                <div className="flex justify-between items-start border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2.5 text-slate-500 font-medium text-sm">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <span>Postal Code</span>
                  </div>
                  <span className="font-semibold text-slate-800 text-sm">
                    {currentContact.postal || "N/A"}
                  </span>
                </div>

                {/* Date */}
                <div className="flex justify-between items-start border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2.5 text-slate-500 font-medium text-sm">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span>Received Date</span>
                  </div>
                  <span className="font-semibold text-slate-800 text-sm">
                    {formatDateTime(currentContact.createdAt)}
                  </span>
                </div>
              </div>

              {/* Message Area */}
              <div className="space-y-2">
                <h4 className="text-sm font-bold text-slate-700">Message Content</h4>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-150 text-slate-600 text-[14px] leading-relaxed whitespace-pre-wrap select-all">
                  {currentContact.message}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 flex justify-end gap-3">
                <Button onClick={() => setSelectedContact(null)}>Close</Button>
                <Button
                  danger
                  type="primary"
                  icon={<Trash2 className="w-4 h-4 inline-block mr-1" />}
                  onClick={() => {
                    handleDelete(currentContact.id);
                    setSelectedContact(null);
                  }}
                  className="flex items-center"
                >
                  Delete Inquiry
                </Button>
              </div>
            </div>
          );
        })()}
      </Drawer>
    </div>
  );
}
