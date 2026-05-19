"use client";

import { Input } from "antd";
import { Search } from "lucide-react";

type AdminSearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export default function AdminSearchBar({
  value,
  onChange,
  placeholder = "Search",
}: AdminSearchBarProps) {
  return (
    <Input
      allowClear
      value={value}
      onChange={(event) =>
        onChange(event.target.value)
      }
      prefix={
        <Search className="h-4 w-4 text-slate-400" />
      }
      placeholder={placeholder}
      className="w-full max-w-70 rounded-full"
    />
  );
}
