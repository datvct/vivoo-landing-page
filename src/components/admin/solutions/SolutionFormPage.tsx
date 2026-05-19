"use client";

import React, { useEffect, useState } from "react";
import { Button, Card, Form, Input, Select, Image, Spin } from "antd";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, UploadCloud, X } from "lucide-react";
import TiptapEditor from "@/components/common/TiptapEditor";
import AdminFormInput from "../common/AdminFormInput";
import AdminFormSelect from "../common/AdminFormSelect";
import {
  useCreateSolutionMutation,
  useUpdateSolutionMutation,
} from "@/services/solutions/mutations";
import { useSolutionQuery } from "@/services/solutions/queries";
import { SolutionStatus } from "@/types/types";

export default function SolutionFormPage() {
  const router = useRouter();
  const params = useParams();
  const solutionId = params.id as string;
  const isEditMode = Boolean(solutionId);

  const [form] = Form.useForm();

  // State for Thumbnail Image
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);

  // Fetch solution details in Edit Mode
  const { data: solutionData, isLoading: isSolutionLoading } = useSolutionQuery(
    solutionId,
    isEditMode
  );

  // Create Mutation Hook
  const createMutation = useCreateSolutionMutation(() => {
    router.push("/admin/solutions");
  });

  // Update Mutation Hook
  const updateMutation = useUpdateSolutionMutation(() => {
    router.push("/admin/solutions");
  });

  // Populate form with solution data in Edit Mode
  useEffect(() => {
    if (isEditMode && solutionData?.data) {
      const sol = solutionData.data;
      form.setFieldsValue({
        slug: sol.slug,
        title: sol.title,
        primaryActionHref: sol.primaryActionHref || "",
        secondaryActionHref: sol.secondaryActionHref || "",
        description: sol.description || "",
        content: sol.content || "",
        status: sol.status,
        seoTitle: sol.seoTitle || "",
        seoDescription: sol.seoDescription || "",
        seoKeywords: sol.seoKeywords || "",
        seoRobots: sol.seoRobots || "",
      });

      if (sol.thumbnailUrl) {
        setThumbnailPreview(sol.thumbnailUrl);
      }
    } else if (!isEditMode) {
      form.setFieldsValue({
        status: "draft",
        content: "",
        seoTitle: "",
        seoDescription: "",
        seoKeywords: "",
        seoRobots: "",
      });
    }
  }, [isEditMode, solutionData, form]);

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
      const slugVal = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
        .replace(/\s+/g, "-") // Replace spaces with dashes
        .replace(/-+/g, "-") // Collapse consecutive dashes
        .replace(/^-+|-+$/g, ""); // Trim leading/trailing dashes
      form.setFieldsValue({ slug: slugVal });
    }
  };

  // Thumbnail change handler
  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnailFile(file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  // Main Form Submit Handler
  const onFinish = (values: any) => {
    const payload: any = {
      ...values,
      thumbnail: thumbnailFile,
    };

    if (isEditMode) {
      updateMutation.mutate({
        id: solutionId,
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
            onClick={() => router.push("/admin/solutions")}
            className="hover:bg-slate-100 rounded-lg flex items-center justify-center p-2"
          />
          <div>
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">
              {isEditMode ? "Edit Solution" : "Create Solution"}
            </h1>
            <p className="text-slate-400 text-xs mt-0.5">
              {isEditMode ? "Modify details of this solution" : "Publish a new solution to your public site"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={() => router.push("/admin/solutions")}
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
            {isEditMode ? "Save Changes" : "Publish Solution"}
          </Button>
        </div>
      </div>

      {isSolutionLoading ? (
        <div className="h-[400px] flex items-center justify-center">
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
                <AdminFormInput
                  name="title"
                  label="Solution Title"
                  required
                  placeholder="e.g. Smart Office Integration"
                  inputProps={{ onChange: handleTitleChange }}
                />

                <AdminFormInput
                  name="slug"
                  label="URL Slug"
                  required
                  placeholder="e.g. smart-office-integration"
                />
              </div>

              <Form.Item name="description" label="Short Description" className="mt-2">
                <Input.TextArea placeholder="Enter short, engaging overview..." rows={3} className="rounded-lg" />
              </Form.Item>
            </Card>

            {/* Guides & Links Card */}
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
                  placeholder="e.g. https://docs.vivoo.vn/guide-office"
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
                  placeholder="e.g. Smart Office Solutions | VIVOO"
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
                  placeholder="e.g. office, automation, smart, vivoo"
                  className="md:col-span-2 mb-0"
                />
              </div>
            </Card>
          </div>

          <div className="space-y-6 flex flex-col gap-4">
            <Card
              title={<span className="font-semibold text-slate-700">Visibility & Status</span>}
              className="shadow-sm border-slate-100 rounded-2xl"
            >
              <AdminFormSelect
                name="status"
                label="Solution Status"
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
                {thumbnailPreview ? (
                  <div className="relative border border-slate-200 rounded-xl p-1 bg-slate-50 flex items-center justify-center aspect-video overflow-hidden">
                    <Image
                      src={thumbnailPreview}
                      alt="thumbnail"
                      className="max-h-[160px] max-w-full object-contain"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setThumbnailFile(null);
                        setThumbnailPreview(null);
                      }}
                      className="absolute top-2 right-2 bg-slate-800/80 hover:bg-slate-900 text-white rounded-full p-1 shadow-sm flex items-center justify-center z-10"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label className="border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-2xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition bg-slate-50/50 hover:bg-slate-50">
                    <UploadCloud className="w-8 h-8 text-slate-400" />
                    <span className="font-medium text-slate-700 text-sm">Upload Thumbnail</span>
                    <span className="text-[11px] text-slate-400">PNG, JPG, JPEG up to 5MB</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleThumbnailChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </Card>
          </div>
        </Form>
      )}
    </div>
  );
}
