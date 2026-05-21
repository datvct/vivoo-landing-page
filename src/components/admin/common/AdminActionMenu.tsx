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
  onTranslate?: () => void;
  deleteTitle?: string;
  deleteDescription?: string;
};

export default function AdminActionMenu({
  onEdit,
  onDelete,
  onTranslate,
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
    ...(onTranslate
      ? [
          {
            key: "translate",
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/></svg>,
            label: "Translate",
            onClick: onTranslate,
          },
        ]
      : []),
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
