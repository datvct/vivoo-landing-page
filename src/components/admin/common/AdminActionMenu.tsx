"use client";

import {
  Dropdown,
  Modal,
  type MenuProps,
} from "antd";
import {
  MoreVertical,
  PencilLine,
  Trash2,
} from "lucide-react";

type AdminActionMenuProps = {
  onEdit: () => void;
  onDelete: () => void;
  deleteTitle?: string;
  deleteDescription?: string;
};

export default function AdminActionMenu({
  onEdit,
  onDelete,
  deleteTitle = "Delete item?",
  deleteDescription = "This action cannot be undone.",
}: AdminActionMenuProps) {
  const items: MenuProps["items"] = [
    {
      key: "edit",
      icon: <PencilLine size={16} />,
      label: "Edit",
      onClick: onEdit,
    },
    {
      key: "delete",
      icon: (
        <Trash2
          size={16}
          className="text-red-500"
        />
      ),
      label: (
        <span className="text-red-500">
          Delete
        </span>
      ),
      onClick: () => {
        Modal.confirm({
          title: deleteTitle,
          content: deleteDescription,
          okText: "Delete",
          okButtonProps: {
            danger: true,
          },
          cancelText: "Cancel",
          centered: true,
          onOk: onDelete,
        });
      },
    },
  ];

  return (
    <Dropdown
      menu={{ items }}
      placement="bottomRight"
      trigger={["click"]}
      arrow
    >
      <button
        type="button"
        className="inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
        aria-label="Open actions"
      >
        <MoreVertical className="h-4 w-4" />
      </button>
    </Dropdown>
  );
}
