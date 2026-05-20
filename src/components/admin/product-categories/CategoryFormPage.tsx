"use client";

import React, { useEffect, useState } from "react";
import { Button, Card, Form, Input, Spin, Image, Upload } from "antd";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Image as ImageIcon, Upload as UploadIcon, X } from "lucide-react";
import AdminFormInput from "../common/AdminFormInput";
import AdminFormSelect from "../common/AdminFormSelect";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from "@/services/product-categories/mutations";
import { useProductCategoryQuery } from "@/services/product-categories/queries";
import { ProductCategory, ProductCategoryFormValues } from "@/types/types";
import { generateSlug } from "@/utils/slug";
import MediaPickerModal from "@/components/admin/media/MediaPickerModal";

function categoryToFormFields(c: ProductCategory): Partial<ProductCategoryFormValues> {
  return {
    slug: c.slug,
    title: c.title,
    subtitle: c.subtitle || "",
    description: c.description || "",
    sortOrder: c.sortOrder,
    status: c.status,
    seoTitle: c.seoTitle || "",
    seoDescription: c.seoDescription || "",
    seoKeywords: c.seoKeywords || "",
    seoRobots: c.seoRobots || "",
    thumbnailUrl: c.thumbnailUrl || undefined,
    heroTitle: c.heroTitle || "",
    heroDescription: c.heroDescription || "",
    heroCtaLabel: c.heroCtaLabel || "",
    heroCtaHref: c.heroCtaHref || "",
    benefitsTitle: c.benefitsTitle || "",
    benefitsDescription: c.benefitsDescription || "",
    featureTitle: c.featureTitle || "",
    featureBody: c.featureBody || "",
    featureImageUrl: c.featureImageUrl || undefined,
    featureLinkLabel: c.featureLinkLabel || "",
    featureLinkHref: c.featureLinkHref || "",
  };
}

const emptyDefaults: Partial<ProductCategoryFormValues> = {
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
  thumbnailUrl: undefined,
  heroTitle: "",
  heroDescription: "",
  heroCtaLabel: "",
  heroCtaHref: "",
  benefitsTitle: "",
  benefitsDescription: "",
  featureTitle: "",
  featureBody: "",
  featureImageUrl: undefined,
  featureLinkLabel: "",
  featureLinkHref: "",
};

export default function CategoryFormPage() {
  const router = useRouter();
  const params = useParams();
  const categoryId = typeof params?.id === "string" ? params.id : "";
  const isEditMode = Boolean(categoryId);

  const [form] = Form.useForm<ProductCategoryFormValues>();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewSource, setPreviewSource] = useState<"server" | "local" | "empty">("empty");
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false);
  const [thumbnailFileUrl, setThumbnailFileUrl] = useState<string | null>(null);

  const [featurePreviewUrl, setFeaturePreviewUrl] = useState<string | null>(null);
  const [featurePreviewSource, setFeaturePreviewSource] = useState<"server" | "local" | "empty">("empty");
  const [featureMediaPickerOpen, setFeatureMediaPickerOpen] = useState(false);
  const [featureBlobUrl, setFeatureBlobUrl] = useState<string | null>(null);

  const { data: categoryData, isLoading: isFetching } = useProductCategoryQuery(categoryId, isEditMode);

  const createMutation = useCreateCategoryMutation(() => {
    router.push("/admin/product-categories");
  });

  const updateMutation = useUpdateCategoryMutation(() => {
    router.push("/admin/product-categories");
  });

  useEffect(() => {
    return () => {
      if (thumbnailFileUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(thumbnailFileUrl);
      }
      if (featureBlobUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(featureBlobUrl);
      }
    };
  }, [thumbnailFileUrl, featureBlobUrl]);

  /* eslint-disable react-hooks/set-state-in-effect -- reset local image preview when query data or mode changes */
  useEffect(() => {
    if (isEditMode && categoryData?.data) {
      form.setFieldsValue(categoryToFormFields(categoryData.data));
      setPreviewSource("server");
      setPreviewUrl(null);
      setThumbnailFileUrl(null);
      setFeaturePreviewSource("server");
      setFeaturePreviewUrl(null);
      setFeatureBlobUrl(null);
    } else if (!isEditMode) {
      form.setFieldsValue(emptyDefaults);
      setPreviewSource("empty");
      setPreviewUrl(null);
      setThumbnailFileUrl(null);
      setFeaturePreviewSource("empty");
      setFeaturePreviewUrl(null);
      setFeatureBlobUrl(null);
    }
  }, [isEditMode, categoryData, form]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const resolvedPreviewUrl =
    previewSource === "server" ? categoryData?.data?.thumbnailUrl || null : previewUrl;

  const resolvedFeatureImageUrl =
    featurePreviewSource === "server"
      ? categoryData?.data?.featureImageUrl || null
      : featurePreviewUrl;

  const handleSelectMedia = (media: { secureUrl: string }) => {
    if (thumbnailFileUrl?.startsWith("blob:")) {
      URL.revokeObjectURL(thumbnailFileUrl);
    }
    setThumbnailFileUrl(null);
    setPreviewSource("local");
    setPreviewUrl(media.secureUrl);
    form.setFieldsValue({ thumbnail: undefined, thumbnailUrl: media.secureUrl });
    setMediaPickerOpen(false);
  };

  const handleFeatureSelectMedia = (media: { secureUrl: string }) => {
    if (featureBlobUrl?.startsWith("blob:")) {
      URL.revokeObjectURL(featureBlobUrl);
    }
    setFeatureBlobUrl(null);
    setFeaturePreviewSource("local");
    setFeaturePreviewUrl(media.secureUrl);
    form.setFieldsValue({ featureImage: undefined, featureImageUrl: media.secureUrl });
    setFeatureMediaPickerOpen(false);
  };

  const handleUploadChange = (info: { fileList: Array<{ originFileObj?: File }> }) => {
    if (info.fileList.length > 0) {
      const file = info.fileList[0].originFileObj;
      if (!file) return;

      if (thumbnailFileUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(thumbnailFileUrl);
      }

      const url = URL.createObjectURL(file);
      setThumbnailFileUrl(url);
      setPreviewSource("local");
      setPreviewUrl(url);
      form.setFieldsValue({ thumbnailUrl: undefined });
      return;
    }

    if (thumbnailFileUrl?.startsWith("blob:")) {
      URL.revokeObjectURL(thumbnailFileUrl);
    }
    setThumbnailFileUrl(null);
    setPreviewSource("empty");
    setPreviewUrl(null);
    form.setFieldsValue({ thumbnailUrl: undefined });
  };

  const handleFeatureUploadChange = (info: { fileList: Array<{ originFileObj?: File }> }) => {
    if (info.fileList.length > 0) {
      const file = info.fileList[0].originFileObj;
      if (!file) return;

      if (featureBlobUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(featureBlobUrl);
      }

      const url = URL.createObjectURL(file);
      setFeatureBlobUrl(url);
      setFeaturePreviewSource("local");
      setFeaturePreviewUrl(url);
      form.setFieldsValue({ featureImageUrl: undefined });
      return;
    }

    if (featureBlobUrl?.startsWith("blob:")) {
      URL.revokeObjectURL(featureBlobUrl);
    }
    setFeatureBlobUrl(null);
    setFeaturePreviewSource("empty");
    setFeaturePreviewUrl(null);
    form.setFieldsValue({ featureImageUrl: undefined });
  };

  const handleClearThumbnail = () => {
    if (thumbnailFileUrl?.startsWith("blob:")) {
      URL.revokeObjectURL(thumbnailFileUrl);
    }
    setThumbnailFileUrl(null);
    setPreviewSource("empty");
    setPreviewUrl(null);
    form.setFieldsValue({ thumbnail: undefined, thumbnailUrl: undefined });
  };

  const handleClearFeatureImage = () => {
    if (featureBlobUrl?.startsWith("blob:")) {
      URL.revokeObjectURL(featureBlobUrl);
    }
    setFeatureBlobUrl(null);
    setFeaturePreviewSource("empty");
    setFeaturePreviewUrl(null);
    form.setFieldsValue({ featureImage: undefined, featureImageUrl: undefined });
  };

  const onFinish = (values: ProductCategoryFormValues) => {
    const payload: Record<string, unknown> = { ...values };

    if (values.thumbnail instanceof File) {
      payload.thumbnail = values.thumbnail;
    } else {
      delete payload.thumbnail;
    }

    if (values.featureImage instanceof File) {
      payload.featureImage = values.featureImage;
    } else {
      delete payload.featureImage;
    }

    if (isEditMode) {
      updateMutation.mutate({
        id: categoryId,
        payload,
      });
    } else {
      createMutation.mutate(payload);
    }
  };

  const isSaving = createMutation.isPending || updateMutation.isPending;
  const showSpinner = isEditMode && isFetching;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-3">
          <Button
            type="text"
            icon={<ArrowLeft className="w-4 h-4" />}
            onClick={() => router.push("/admin/product-categories")}
            className="hover:bg-slate-100 rounded-lg flex items-center justify-center p-2"
          />
          <div>
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">
              {isEditMode ? "Edit Category" : "Create Category"}
            </h1>
            <p className="text-slate-400 text-xs mt-0.5">
              {isEditMode
                ? "Update category details, storefront hero, benefits, feature block, SEO and images."
                : "Add a new product category for the storefront."}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={() => router.push("/admin/product-categories")}
            className="rounded-lg h-9 border-slate-200 text-slate-600 hover:text-slate-800 font-medium"
          >
            Cancel
          </Button>
          <Button
            type="primary"
            loading={isSaving}
            onClick={() => form.submit()}
            className="bg-blue-600 hover:bg-blue-700 border-none h-9 rounded-lg px-6 font-semibold"
          >
            {isEditMode ? "Save Changes" : "Create Category"}
          </Button>
        </div>
      </div>

      {showSpinner ? (
        <div className="flex items-center justify-center py-24">
          <Spin size="large" />
        </div>
      ) : (
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          requiredMark={false}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          <div className="lg:col-span-2 space-y-6 flex flex-col gap-4">
            <Card
              title={<span className="font-semibold text-slate-700">General Information</span>}
              className="shadow-sm border-slate-100 rounded-2xl"
            >
              <div className="grid grid-cols-2 gap-4">
                <AdminFormInput
                  name="title"
                  label="Title"
                  required
                  rules={[{ max: 255 }]}
                  inputProps={{
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                      if (!isEditMode) {
                        form.setFieldsValue({ slug: generateSlug(e.target.value) });
                      }
                    },
                  }}
                />

                <AdminFormInput name="slug" label="Slug" required rules={[{ max: 255 }]} />
              </div>

              <AdminFormInput name="subtitle" label="Subtitle" rules={[{ max: 255 }]} className="mt-2" />

              <Form.Item name="description" label="Description" className="mt-2 mb-0">
                <Input.TextArea placeholder="Enter category description..." rows={3} className="rounded-lg" />
              </Form.Item>
            </Card>

            <Card
              title={<span className="font-semibold text-slate-700">Hero (category storefront page)</span>}
              className="shadow-sm border-slate-100 rounded-2xl"
            >
              <p className="text-xs text-slate-400 -mt-2 mb-4">
                Shown at the top of the public category page. If hero title is empty, the category title is used.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AdminFormInput
                  name="heroTitle"
                  label="Hero title"
                  rules={[{ max: 255 }]}
                  placeholder="Optional — defaults to category title"
                />
                <AdminFormInput
                  name="heroCtaLabel"
                  label="Primary button label"
                  rules={[{ max: 255 }]}
                  placeholder="e.g. COMPARE PRODUCTS"
                />
              </div>
              <Form.Item name="heroDescription" label="Hero description" className="mt-2 mb-0">
                <Input.TextArea
                  placeholder="Short paragraph under the hero title..."
                  rows={3}
                  className="rounded-lg"
                />
              </Form.Item>
              <AdminFormInput
                name="heroCtaHref"
                label="Primary button link"
                rules={[{ max: 512 }]}
                placeholder="e.g. /product or https://..."
                className="mt-2"
              />
            </Card>

            <Card
              title={<span className="font-semibold text-slate-700">Benefits intro</span>}
              className="shadow-sm border-slate-100 rounded-2xl"
            >
              <p className="text-xs text-slate-400 -mt-2 mb-4">
                Intro text above the benefits / feature section on the category page.
              </p>
              <AdminFormInput
                name="benefitsTitle"
                label="Section title"
                rules={[{ max: 255 }]}
                placeholder="e.g. Key benefits of…"
              />
              <Form.Item name="benefitsDescription" label="Section description" className="mt-2 mb-0">
                <Input.TextArea
                  placeholder="Paragraph below the section title..."
                  rows={3}
                  className="rounded-lg"
                />
              </Form.Item>
            </Card>

            <Card
              title={<span className="font-semibold text-slate-700">Feature block</span>}
              className="shadow-sm border-slate-100 rounded-2xl"
            >
              <p className="text-xs text-slate-400 -mt-2 mb-4">
                Right column content: heading, body (separate paragraphs with a blank line), image, and link.
              </p>
              <AdminFormInput
                name="featureTitle"
                label="Feature column title"
                rules={[{ max: 255 }]}
                placeholder="e.g. Compact, yet powerful"
              />
              <Form.Item name="featureBody" label="Feature body" className="mt-2">
                <Input.TextArea
                  placeholder="Multiple paragraphs: separate with a blank line."
                  rows={6}
                  className="rounded-lg font-mono text-sm"
                />
              </Form.Item>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AdminFormInput
                  name="featureLinkLabel"
                  label="Link text"
                  rules={[{ max: 255 }]}
                  placeholder="e.g. Get a demo"
                />
                <AdminFormInput
                  name="featureLinkHref"
                  label="Link URL"
                  rules={[{ max: 512 }]}
                  placeholder="e.g. /contact or https://..."
                />
              </div>

              <Form.Item name="featureImageUrl" hidden>
                <Input type="hidden" />
              </Form.Item>

              <div className="mt-4 border-t border-slate-100 pt-4">
                <span className="text-sm font-semibold text-slate-700">Feature image</span>
                {resolvedFeatureImageUrl ? (
                  <div className="relative mt-2 border border-slate-200 rounded-xl p-1 bg-slate-50 flex items-center justify-center aspect-video overflow-hidden max-h-52">
                    <Image
                      src={resolvedFeatureImageUrl}
                      alt="Feature"
                      className="max-h-40 max-w-full object-contain"
                      preview={false}
                    />
                    <button
                      type="button"
                      onClick={handleClearFeatureImage}
                      className="absolute top-2 right-2 bg-slate-800/80 hover:bg-slate-900 text-white rounded-full p-1 shadow-sm flex items-center justify-center z-10"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="mt-2 border-2 border-dashed border-slate-200 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 bg-slate-50/50">
                    <div className="flex flex-wrap justify-center gap-2">
                      <Form.Item
                        name="featureImage"
                        valuePropName="file"
                        getValueFromEvent={(e) => {
                          if (Array.isArray(e)) return e;
                          return e?.fileList?.[0]?.originFileObj;
                        }}
                        noStyle
                      >
                        <Upload
                          beforeUpload={() => false}
                          maxCount={1}
                          listType="picture"
                          accept="image/*"
                          onChange={handleFeatureUploadChange}
                        >
                          <Button icon={<UploadIcon className="w-4 h-4 mr-1 inline-block" />}>Upload</Button>
                        </Upload>
                      </Form.Item>
                      <Button icon={<ImageIcon className="w-4 h-4" />} onClick={() => setFeatureMediaPickerOpen(true)}>
                        Media
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            <Card
              title={<span className="font-semibold text-slate-700">SEO Metadata</span>}
              className="shadow-sm border-slate-100 rounded-2xl"
            >
              <div className="grid grid-cols-2 gap-4">
                <AdminFormInput name="seoTitle" label="SEO Title" rules={[{ max: 255 }]} />

                <Form.Item name="seoDescription" label="SEO Description">
                  <Input.TextArea placeholder="Enter SEO description..." rows={2} className="rounded-lg" />
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
            </Card>
          </div>

          <div className="space-y-6 flex flex-col gap-4">
            <Card
              title={<span className="font-semibold text-slate-700">Visibility & ordering</span>}
              className="shadow-sm border-slate-100 rounded-2xl"
            >
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
                    placeholder="e.g. 0"
                    className="rounded-lg"
                    onChange={(e) => {
                      form.setFieldsValue({ sortOrder: parseInt(e.target.value, 10) || 0 });
                    }}
                  />
                </Form.Item>
              </div>
            </Card>
            <Card
              title={<span className="font-semibold text-slate-700">Thumbnail Image</span>}
              className="shadow-sm border-slate-100 rounded-2xl"
            >
              <p className="text-xs text-slate-400 -mt-2 mb-3">Used for listings and hero image on the category page.</p>
              <Form.Item name="thumbnailUrl" hidden>
                <Input type="hidden" />
              </Form.Item>

              {resolvedPreviewUrl ? (
                <div className="relative border border-slate-200 rounded-xl p-1 bg-slate-50 flex items-center justify-center aspect-video overflow-hidden max-h-52">
                  <Image
                    src={resolvedPreviewUrl}
                    alt="Category thumbnail"
                    className="max-h-40 max-w-full object-contain"
                    preview={false}
                  />
                  <button
                    type="button"
                    onClick={handleClearThumbnail}
                    className="absolute top-2 right-2 bg-slate-800/80 hover:bg-slate-900 text-white rounded-full p-1 shadow-sm flex items-center justify-center z-10"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center gap-2 bg-slate-50/50">
                  <span className="font-medium text-slate-700 text-sm">Category thumbnail</span>
                  <span className="text-[11px] text-slate-400">PNG, JPG, JPEG — or pick from Media</span>
                  <div className="flex flex-wrap justify-center gap-2">
                    <Form.Item
                      name="thumbnail"
                      valuePropName="file"
                      getValueFromEvent={(e) => {
                        if (Array.isArray(e)) return e;
                        return e?.fileList?.[0]?.originFileObj;
                      }}
                      noStyle
                    >
                      <Upload
                        beforeUpload={() => false}
                        maxCount={1}
                        listType="picture"
                        accept="image/*"
                        onChange={handleUploadChange}
                      >
                        <Button icon={<UploadIcon className="w-4 h-4 mr-1 inline-block" />}>Upload File</Button>
                      </Upload>
                    </Form.Item>

                    <Button icon={<ImageIcon className="w-4 h-4" />} onClick={() => setMediaPickerOpen(true)}>
                      Choose from Media
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </Form>
      )}

      <MediaPickerModal
        open={mediaPickerOpen}
        onCancel={() => setMediaPickerOpen(false)}
        onSelect={handleSelectMedia}
        selectionMode="single"
        defaultTab="image"
        selectableTypes={["image"]}
        title="Choose Category Thumbnail from Media"
      />

      <MediaPickerModal
        open={featureMediaPickerOpen}
        onCancel={() => setFeatureMediaPickerOpen(false)}
        onSelect={handleFeatureSelectMedia}
        selectionMode="single"
        defaultTab="image"
        selectableTypes={["image"]}
        title="Choose Feature Image from Media"
      />
    </div>
  );
}
