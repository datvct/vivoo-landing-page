"use client";

import React, { useEffect, useState } from "react";
import { Button, Card, Form, Input, Spin, Image, Tooltip } from "antd";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { ArrowLeft, Image as ImageIcon, UploadCloud, X } from "lucide-react";
import TiptapEditor from "@/components/common/TiptapEditor";
import AdminFormInput from "../common/AdminFormInput";
import AdminFormSelect from "../common/AdminFormSelect";
import {
  useCreateServiceMutation,
  useUpdateServiceMutation,
} from "@/services/services/mutations";
import { useServiceQuery } from "@/services/services/queries";
import { ServiceFormValues, APP_LOCALES } from "@/types/types";
import MediaPickerModal from "@/components/admin/media/MediaPickerModal";

import { generateSlug } from "@/utils/slug";
import { InfoCircleOutlined } from "@ant-design/icons";

export default function ServiceFormPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const serviceId = params.id as string;
  const translateFromId = searchParams.get("translateFromId");
  const isEditMode = Boolean(serviceId);
  const fetchId = isEditMode ? serviceId : (translateFromId || "");
  const shouldFetch = isEditMode || Boolean(translateFromId);

  const [form] = Form.useForm();

  // State for Thumbnail Image
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null | undefined>(undefined);
  const [thumbnailMediaUrl, setThumbnailMediaUrl] = useState<string | null>(null);
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false);

  // Fetch service details in Edit Mode or Translate Mode
  const { data: serviceData, isLoading: isServiceLoading } = useServiceQuery(
    fetchId,
    shouldFetch
  );

  // Create Mutation Hook
  const createMutation = useCreateServiceMutation(() => {
    router.push("/admin/services");
  });

  // Update Mutation Hook
  const updateMutation = useUpdateServiceMutation(() => {
    router.push("/admin/services");
  });

  // Populate form with service data
  useEffect(() => {
    if (shouldFetch && serviceData?.data) {
      const srv = serviceData.data;
      form.setFieldsValue({
        locale: isEditMode ? (srv.locale || "vi") : "en",
        translationGroup: srv.translationGroup,
        slug: isEditMode ? srv.slug : `${srv.slug}-en`,
        title: srv.title,
        primaryActionHref: srv.primaryActionHref || "",
        secondaryActionHref: srv.secondaryActionHref || "",
        description: srv.description || "",
        content: srv.content || "",
        status: srv.status,
        seoTitle: srv.seoTitle || "",
        seoDescription: srv.seoDescription || "",
        seoKeywords: srv.seoKeywords || "",
        seoRobots: srv.seoRobots || "",
        thumbnailUrl: srv.thumbnailUrl || undefined,
      });
    } else if (!shouldFetch) {
      form.setFieldsValue({
        locale: "vi",
        status: "draft",
        content: "",
        seoTitle: "",
        seoDescription: "",
        seoKeywords: "",
        seoRobots: "",
        thumbnailUrl: undefined,
      });
    }
  }, [isEditMode, shouldFetch, serviceData, form]);

  const resolvedThumbnailPreview =
    thumbnailPreview === undefined ? serviceData?.data?.thumbnailUrl || null : thumbnailPreview;

  // Clean up object URLs on unmount
  useEffect(() => {
    return () => {
      if (thumbnailPreview && !thumbnailPreview.startsWith("http")) {
        URL.revokeObjectURL(thumbnailPreview);
      }
    };
  }, [thumbnailPreview]);

  // Handle Slug generation on title change
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isEditMode) {
      const title = e.target.value;
      const slugVal = generateSlug(title);
      form.setFieldsValue({ slug: slugVal });
    }
  };

  // Thumbnail change handler
  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnailFile(file);
      setThumbnailPreview(URL.createObjectURL(file));
      setThumbnailMediaUrl(null);
      form.setFieldsValue({ thumbnailUrl: undefined });
    }
  };

  const handleSelectMedia = (media: { secureUrl: string }) => {
    if (thumbnailPreview?.startsWith("blob:")) {
      URL.revokeObjectURL(thumbnailPreview);
    }
    setThumbnailFile(null);
    setThumbnailMediaUrl(media.secureUrl);
    setThumbnailPreview(media.secureUrl);
    form.setFieldsValue({ thumbnail: undefined, thumbnailUrl: media.secureUrl });
    setMediaPickerOpen(false);
  };

  const handleClearThumbnail = () => {
    if (thumbnailPreview?.startsWith("blob:")) {
      URL.revokeObjectURL(thumbnailPreview);
    }
    setThumbnailFile(null);
    setThumbnailMediaUrl(null);
    setThumbnailPreview(null);
    form.setFieldsValue({ thumbnail: undefined, thumbnailUrl: undefined });
  };

  // Main Form Submit Handler
  const onFinish = (values: ServiceFormValues) => {
    const payload: Record<string, unknown> = {
      ...values,
    };

    if (thumbnailFile) {
      payload.thumbnail = thumbnailFile;
    } else if (thumbnailMediaUrl) {
      payload.thumbnailUrl = thumbnailMediaUrl;
    }

    if (isEditMode) {
      updateMutation.mutate({
        id: serviceId,
        payload,
      });
    } else {
      createMutation.mutate(payload);
    }
  };

  const isSaving = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="space-y-4">
      {/* Top action header */}
      <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-3">
          <Button
            type="text"
            icon={<ArrowLeft className="w-4 h-4" />}
            onClick={() => router.push("/admin/services")}
            className="hover:bg-slate-100 rounded-lg flex items-center justify-center p-2"
          />
          <div>
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">
              {isEditMode ? "Edit Service" : (translateFromId ? "Translate Service" : "Create Service")}
            </h1>
            <p className="text-slate-400 text-xs mt-0.5">
              {isEditMode ? "Modify details of this service" : (translateFromId ? "Translate the service into a new language" : "Publish a new service to your public site")}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={() => router.push("/admin/services")}
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
            {isEditMode ? "Save Changes" : "Publish Service"}
          </Button>
        </div>
      </div>

      {isServiceLoading ? (
        <div className="h-100 flex items-center justify-center">
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
          {/* Main Content Column (Left) */}
          <div className="lg:col-span-2 space-y-6 flex flex-col gap-4">
            {/* General Info Card */}
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
                      <Tooltip title="Select the language for this service">
                        <InfoCircleOutlined className="text-slate-400 w-3.5 h-3.5" />
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
                  label="Service Title"
                  required
                  placeholder="e.g. Professional Cloud Setup"
                  inputProps={{ onChange: handleTitleChange }}
                />

                <AdminFormInput
                  name="slug"
                  label="URL Slug"
                  required
                  placeholder="e.g. professional-cloud-setup"
                />
              </div>

              <Form.Item name="description" label="Short Description" className="mt-2">
                <Input.TextArea placeholder="Enter short, engaging overview..." rows={3} className="rounded-lg" />
              </Form.Item>
            </Card>

            {/* CTAs Card */}
            <Card
              title={<span className="font-semibold text-slate-700">Action Links</span>}
              className="shadow-sm border-slate-100 rounded-2xl"
            >
              <div className="grid grid-cols-2 gap-4">
                <AdminFormInput
                  name="primaryActionHref"
                  label="Primary CTA Href"
                  placeholder="e.g. https://vivoo.vn/get-price"
                />

                <AdminFormInput
                  name="secondaryActionHref"
                  label="Secondary CTA Href"
                  placeholder="e.g. https://docs.vivoo.vn/guide"
                />
              </div>
            </Card>

            {/* Rich Content Editor */}
            <Card
              title={<span className="font-semibold text-slate-700">Detailed HTML Content</span>}
              className="shadow-sm border-slate-100 rounded-2xl"
            >
              <Form.Item name="content" className="mb-0">
                <TiptapEditor />
              </Form.Item>
            </Card>

            {/* SEO Metadata */}
            <Card
              title={<span className="font-semibold text-slate-700">Search Engine Optimization (SEO)</span>}
              className="shadow-sm border-slate-100 rounded-2xl"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AdminFormInput
                  name="seoTitle"
                  label="SEO Title"
                  placeholder="e.g. Premium IT Services | VIVOO"
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
                  placeholder="e.g. services, IT, cloud, support, vivoo"
                  className="md:col-span-2 mb-0"
                />
              </div>
            </Card>
          </div>

          {/* Sidebar Column (Right) */}
          <div className="space-y-6 flex flex-col gap-4">
            {/* Status Card */}
            <Card
              title={<span className="font-semibold text-slate-700">Visibility & Status</span>}
              className="shadow-sm border-slate-100 rounded-2xl"
            >
              <AdminFormSelect
                name="status"
                label="Service Status"
                required
                options={[
                  { label: "Draft (Hidden)", value: "draft" },
                  { label: "Scheduled", value: "scheduled" },
                  { label: "Published (Visible)", value: "published" },
                  { label: "Archived", value: "archived" },
                ]}
              />
            </Card>

            {/* Thumbnail Card */}
            <Card
              title={<span className="font-semibold text-slate-700">Thumbnail Image</span>}
              className="shadow-sm border-slate-100 rounded-2xl"
            >
              <div className="space-y-4">
                <Form.Item name="thumbnailUrl" hidden>
                  <Input type="hidden" />
                </Form.Item>

                {resolvedThumbnailPreview ? (
                  <div className="relative border border-slate-200 rounded-xl p-1 bg-slate-50 flex items-center justify-center aspect-video overflow-hidden">
                    <Image
                      src={resolvedThumbnailPreview}
                      alt="thumbnail"
                      className="max-h-40 max-w-full object-contain"
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
                  <div className="border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-2xl p-6 flex flex-col items-center justify-center gap-2 transition bg-slate-50/50 hover:bg-slate-50">
                    <UploadCloud className="w-8 h-8 text-slate-400" />
                    <span className="font-medium text-slate-700 text-sm">Upload Thumbnail</span>
                    <span className="text-[11px] text-slate-400">PNG, JPG, JPEG up to 5MB</span>
                    <div className="flex flex-wrap justify-center gap-2">
                      <label className="inline-flex items-center justify-center px-3 py-2 rounded-lg bg-white border border-slate-200 hover:border-slate-300 text-sm font-medium text-slate-700 transition cursor-pointer">
                        Upload File
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleThumbnailChange}
                          className="hidden"
                        />
                      </label>

                      <Button icon={<ImageIcon className="w-4 h-4" />} onClick={() => setMediaPickerOpen(true)}>
                        Choose from Media
                      </Button>
                    </div>
                  </div>
                )}
              </div>
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
        title="Choose Service Thumbnail from Media"
      />
    </div>
  );
}
