import React from "react";
import { Form, Input } from "antd";
import type { FormItemProps, InputProps } from "antd";

type AdminFormInputProps = FormItemProps & {
  inputProps?: InputProps;
  placeholder?: string;
  required?: boolean;
};

export default function AdminFormInput({
  name,
  label,
  rules,
  required,
  placeholder,
  inputProps,
  ...props
}: AdminFormInputProps) {
  const mergedRules = [
    ...(required ? [{ required: true, message: `Please input your ${label?.toString().toLowerCase() || "value"}!` }] : []),
    ...(rules || []),
  ];

  return (
    <Form.Item name={name} label={label} rules={mergedRules} {...props}>
      <Input
        placeholder={placeholder || `Enter ${label?.toString().toLowerCase() || ""}`}
        className="text-[14px]"
        {...inputProps}
      />
    </Form.Item>
  );
}
