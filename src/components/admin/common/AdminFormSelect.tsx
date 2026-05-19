import React from "react";
import { Form, Select } from "antd";
import type { FormItemProps, SelectProps } from "antd";

type AdminFormSelectProps = FormItemProps & {
  options: { label: string; value: any }[];
  selectProps?: SelectProps;
  placeholder?: string;
  required?: boolean;
};

export default function AdminFormSelect({
  name,
  label,
  rules,
  required,
  options,
  placeholder,
  selectProps,
  ...props
}: AdminFormSelectProps) {
  const mergedRules = [
    ...(required ? [{ required: true, message: `Please select ${label?.toString().toLowerCase() || "an option"}!` }] : []),
    ...(rules || []),
  ];

  return (
    <Form.Item name={name} label={label} rules={mergedRules} {...props}>
      <Select
        options={options}
        placeholder={placeholder || `Select ${label?.toString().toLowerCase() || ""}`}
        className="w-full text-[14px]"
        {...selectProps}
      />
    </Form.Item>
  );
}
