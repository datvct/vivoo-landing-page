"use client";

import React, { useState } from "react";
import { Modal, Form, Spin, Upload, Button, Input } from "antd";
import { Upload as UploadIcon } from "lucide-react";
import { useProductCategoryQuery } from "@/services/product-categories/queries";
import AdminFormInput from "../common/AdminFormInput";
import AdminFormSelect from "../common/AdminFormSelect";
import { ProductCategoryFormValues } from "@/types/types";

type CategoryModalProps = {
  open: boolean;
  categoryId?: string;
  confirmLoading?: boolean;
  onCancel: () => void;
  onSave: (values: ProductCategoryFormValues) => void;
};

export default function CategoryModal({
  open,
  categoryId,
  confirmLoading = false,
  onCancel,
  onSave,
}: CategoryModalProps) {
  const [form] = Form.useForm<ProductCategoryFormValues>();
  const isEditMode = Boolean(categoryId);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const { data: categoryData, isLoading: isFetching } = useProductCategoryQuery(
    categoryId || "",
    open && isEditMode
  );

  React.useEffect(() => {
    if (open) {
      if (isEditMode) {
        if (categoryData?.data) {
          form.setFieldsValue({
            slug: categoryData.data.slug,
            title: categoryData.data.title,
            subtitle: categoryData.data.subtitle || "",
            description: categoryData.data.description || "",
            sortOrder: categoryData.data.sortOrder,
            status: categoryData.data.status,
            seoTitle: categoryData.data.seoTitle || "",
            seoDescription: categoryData.data.seoDescription || "",
            seoKeywords: categoryData.data.seoKeywords || "",
            seoRobots: categoryData.data.seoRobots || "",
          });
          setPreviewUrl(categoryData.data.thumbnailUrl || null);
        }
      } else {
        form.setFieldsValue({
          slug: "",
          title: "",
          subtitle: "",
          description: "",
          sortOrder: 0,
          status: "published",
          seoTitle: "",
          seoDescription: "",
          seoKeywords: "",
          seoRobots: "",
        });
        setPreviewUrl(null);
      }
    }
  }, [open, isEditMode, categoryData, form]);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        onSave(values);
      })
      .catch(() => undefined);
  };

  return (
    <Modal
      title={isEditMode ? "Edit Category" : "Create Category"}
      open={open}
      onCancel={onCancel}
      onOk={handleOk}
      confirmLoading={confirmLoading || isFetching}
      width={650}
      centered
    >
      <Spin spinning={isFetching}>
        <Form form={form} layout="vertical" preserve={false}>
          <div className="grid grid-cols-2 gap-4">
            <AdminFormInput
              name="title"
              label="Title"
              required
              rules={[{ max: 255 }]}
              inputProps={{
                onChange: (e) => {
                  // Auto-generate slug from title in create mode
                  if (!isEditMode) {
                    const slugVal = e.target.value
                      .toLowerCase()
                      .replace(/[^a-z0-9]+/g, "-")
                      .replace(/(^-|-$)+/g, "");
                    form.setFieldsValue({ slug: slugVal });
                  }
                },
              }}
            />

            <AdminFormInput
              name="slug"
              label="Slug"
              required
              rules={[{ max: 255 }]}
            />
          </div>

          <AdminFormInput
            name="subtitle"
            label="Subtitle"
            rules={[{ max: 255 }]}
          />

          <Form.Item name="description" label="Description">
            <Input.TextArea placeholder="Enter category description..." rows={3} />
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
            <AdminFormSelect
              name="status"
              label="Status"
              required
              options={[
                { label: "Published", value: "published" },
                { label: "Draft", value: "draft" },
                { label: "Scheduled", value: "scheduled" },
                { label: "Archived", value: "archived" },
              ]}
            />

            <Form.Item name="sortOrder" label="Sort Order">
              <Input
                type="number"
                placeholder="Enter sort order (e.g. 0)"
                onChange={(e) => {
                  form.setFieldsValue({ sortOrder: parseInt(e.target.value) || 0 });
                }}
              />
            </Form.Item>
          </div>

          <div className="border-t border-slate-100 my-4 pt-4">
            <h4 className="text-sm font-semibold mb-3 text-slate-700">SEO Metadata</h4>
            <div className="grid grid-cols-2 gap-4">
              <AdminFormInput
                name="seoTitle"
                label="SEO Title"
                rules={[{ max: 255 }]}
              />

              <Form.Item name="seoDescription" label="SEO Description">
                <Input.TextArea placeholder="Enter SEO description..." rows={2} />
              </Form.Item>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <AdminFormInput
                name="seoKeywords"
                label="SEO Keywords"
                rules={[{ max: 255 }]}
                placeholder="e.g. software, office, productivity"
              />

              <AdminFormInput
                name="seoRobots"
                label="SEO Robots"
                rules={[{ max: 255 }]}
                placeholder="e.g. index, follow"
              />
            </div>
          </div>

          <div className="border-t border-slate-100 my-4 pt-4">
            <h4 className="text-sm font-semibold mb-3 text-slate-700">Thumbnail Image</h4>
            <div className="flex gap-6 items-start">
              <Form.Item
                name="thumbnail"
                valuePropName="file"
                getValueFromEvent={(e) => {
                  if (Array.isArray(e)) return e;
                  return e && e.fileList[0]?.originFileObj;
                }}
                noStyle
              >
                <Upload
                  beforeUpload={() => false}
                  maxCount={1}
                  listType="picture"
                  accept="image/*"
                  onChange={(info) => {
                    if (info.fileList.length > 0) {
                      const file = info.fileList[0].originFileObj;
                      if (file) {
                        const url = URL.createObjectURL(file);
                        setPreviewUrl(url);
                      }
                    } else {
                      setPreviewUrl(null);
                    }
                  }}
                >
                  <Button icon={<UploadIcon className="w-4 h-4 mr-1 inline-block" />}>
                    Choose File
                  </Button>
                </Upload>
              </Form.Item>

              {previewUrl && (
                <div className="border border-slate-200 rounded-md p-1 bg-slate-50 flex items-center justify-center w-24 h-24 overflow-hidden relative">
                  <img
                    src={previewUrl}
                    alt="Category Thumbnail Preview"
                    className="max-w-full max-h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        </Form>
      </Spin>
    </Modal>
  );
}
