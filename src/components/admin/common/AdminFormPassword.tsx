import React from "react";
import { Form, Input } from "antd";
import type { FormItemProps, InputProps } from "antd";

type AdminFormPasswordProps = FormItemProps & {
  inputProps?: InputProps;
  placeholder?: string;
  required?: boolean;
};

export default function AdminFormPassword({
  name = "password",
  label = "Password",
  rules,
  required,
  placeholder,
  inputProps,
  ...props
}: AdminFormPasswordProps) {
  const mergedRules = [
    ...(required ? [{ required: true, message: "Please input your password!" }] : []),
    ...(rules || []),
  ];

  return (
    <Form.Item name={name} label={label} rules={mergedRules} {...props}>
      <Input.Password
        autoComplete="new-password"
        placeholder={placeholder || "Enter your password"}
        className="text-[14px]"
        {...inputProps}
      />
    </Form.Item>
  );
}
