import React from "react";
import { Form, Switch } from "antd";
import type { FormItemProps, SwitchProps } from "antd";

type AdminFormSwitchProps = FormItemProps & {
  switchProps?: SwitchProps;
};

export default function AdminFormSwitch({
  name,
  label,
  switchProps,
  ...props
}: AdminFormSwitchProps) {
  return (
    <Form.Item name={name} label={label} valuePropName="checked" {...props}>
      <Switch className="mt-1" {...switchProps} />
    </Form.Item>
  );
}
