"use client";

import React from "react";
import { Card, Form, Input } from "antd";
import AdminFormInput from "../../common/AdminFormInput";

export const SeoMetadataCard = () => {
  return (
    <Card
      title={<span className="font-semibold text-slate-700">Search Engine Optimization (SEO)</span>}
      className="shadow-sm border-slate-100 rounded-2xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AdminFormInput
          name="seoTitle"
          label="SEO Title"
          placeholder="e.g. Premium Health Serum | VIVOO"
        />

        <AdminFormInput
          name="seoRobots"
          label="SEO Robots"
          placeholder="e.g. index, follow"
        />

        <Form.Item name="seoDescription" label="SEO Description" className="md:col-span-2 mb-0">
          <Input.TextArea
            rows={3}
            placeholder="Enter meta description for search engines..."
            className="rounded-lg"
          />
        </Form.Item>

        <AdminFormInput
          name="seoKeywords"
          label="SEO Keywords"
          placeholder="e.g. skin, health, serum, organic"
          className="md:col-span-2 mb-0"
        />
      </div>
    </Card>
  );
};
