"use client";

import { Card, Form, Input } from "antd";
import AdminFormInput from "../../common/AdminFormInput";

export const DescriptionActionsCard = () => {
  return (
    <Card
      title={<span className="font-semibold text-slate-700">Description & Checkout Actions</span>}
      className="shadow-sm border-slate-100 rounded-2xl"
    >
      <Form.Item name="description" label="Detailed Description">
        <Input.TextArea placeholder="Enter rich description of the product..." rows={5} />
      </Form.Item>

      <div className="grid grid-cols-2 gap-4">
        <AdminFormInput
          name="primaryActionLabel"
          label="Action Button Label"
          placeholder="e.g. Buy Now, Get Started"
        />

        <AdminFormInput
          name="primaryActionHref"
          label="Action Button Href (Link)"
          placeholder="e.g. https://checkout.vivoo.vn/?id=01"
        />
      </div>
    </Card>
  );
};
