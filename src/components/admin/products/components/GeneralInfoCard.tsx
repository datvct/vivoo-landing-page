"use client";

import React from "react";
import { Card, Form, Input, Select, Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import AdminFormInput from "../../common/AdminFormInput";
import AdminFormSelect from "../../common/AdminFormSelect";
import { APP_LOCALES } from "@/types/types";

type GeneralInfoCardProps = {
  categoriesList: any[];
  handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  form: any;
};

export const GeneralInfoCard = ({ categoriesList, handleTitleChange, form }: GeneralInfoCardProps) => {
  return (
    <Card
      title={<span className="font-semibold text-slate-700">General Information</span>}
      className="shadow-sm border-slate-100 rounded-2xl"
    >
      <div className="grid grid-cols-2 gap-4">
        <Form.Item name="translationGroup" hidden>
          <Input />
        </Form.Item>
        <AdminFormSelect
          name="locale"
          label={
            <div className="flex items-center gap-1">
              Language
              <Tooltip title="Select the language for this product content">
                <InfoCircleOutlined className="text-slate-400 text-xs" />
              </Tooltip>
            </div>
          }
          required
          options={APP_LOCALES}
          placeholder="Select Language"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mt-2">
        <AdminFormInput
          name="title"
          label="Product Name"
          required
          placeholder="e.g. Premium Health Serum"
          inputProps={{ onChange: handleTitleChange }}
        />

        <AdminFormInput
          name="slug"
          label="URL Slug"
          required
          placeholder="e.g. premium-health-serum"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mt-2">
        <AdminFormSelect
          name="categoryId"
          label="Category"
          placeholder="Select a category"
          options={categoriesList.map((cat) => ({
            label: cat.title,
            value: cat.id,
          }))}
          selectProps={{
            onChange: (val: string) => {
              const selected = categoriesList.find((c) => c.id === val);
              if (selected) {
                form.setFieldsValue({ categoryLabel: selected.title });
              }
            },
          }}
        />

        {/* Hidden input to store category label */}
        <Form.Item name="categoryLabel" hidden>
          <Input />
        </Form.Item>

        <Form.Item
          name="badges"
          label="Badges (Tags)"
          help="Type a badge name and press Enter"
        >
          <Select
            mode="tags"
            placeholder="e.g. Best Seller, New, Hot"
            style={{ width: "100%" }}
            className="[&_.ant-select-selector]:!rounded-lg"
          />
        </Form.Item>
      </div>

      <Form.Item
        name="features"
        label="Product Features (Key highlights)"
        help="Add features (e.g. 100% Organic, Imported) and press Enter"
        className="mt-2"
      >
        <Select
          mode="tags"
          placeholder="e.g. 100% Organic, Fast absorption"
          style={{ width: "100%" }}
          className="[&_.ant-select-selector]:!rounded-lg"
        />
      </Form.Item>
    </Card>
  );
};
