"use client";

import React, { useEffect, useState } from "react";
import { Form, Input, Select, Button, Upload } from "antd";
import { X, UploadCloud, Shield, Mic, Camera, Sun, Bell, Video } from "lucide-react";

export const BenefitItemWithPreview = ({ name, restField, remove }: any) => {
  const benefitValues = Form.useWatch(['benefits', name]);
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    if (benefitValues?.imageFile?.[0]) {
      const fileObj = benefitValues.imageFile[0].originFileObj || benefitValues.imageFile[0];
      if (fileObj instanceof File) {
        const url = URL.createObjectURL(fileObj);
        setPreviewUrl(url);
        return () => URL.revokeObjectURL(url);
      }
    } else {
      setPreviewUrl("");
    }
  }, [benefitValues?.imageFile]);

  const renderIcon = (key: string) => {
    switch (key) {
      case "shield": return <Shield className="w-6 h-6 text-blue-500" />;
      case "mic": return <Mic className="w-6 h-6 text-blue-500" />;
      case "camera": return <Camera className="w-6 h-6 text-blue-500" />;
      case "sun": return <Sun className="w-6 h-6 text-blue-500" />;
      case "bell": return <Bell className="w-6 h-6 text-blue-500" />;
      case "video": return <Video className="w-6 h-6 text-blue-500" />;
      default: return null;
    }
  };

  const imgPreviewSrc = previewUrl || benefitValues?.image || "";

  return (
    <div className="p-5 border border-slate-200 rounded-xl bg-slate-50 relative group">
      <button
        type="button"
        onClick={() => remove(name)}
        className="absolute top-4 right-4 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity z-10"
      >
        <X className="w-5 h-5" />
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Fields */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item
            {...restField}
            name={[name, 'title']}
            label="Title"
            rules={[{ required: true, message: 'Missing title' }]}
            className="mb-0"
          >
            <Input placeholder="e.g. Capture the perfect shot" className="rounded-lg" />
          </Form.Item>

          <Form.Item
            {...restField}
            name={[name, 'iconKey']}
            label="Icon"
            rules={[{ required: true, message: 'Missing icon' }]}
            className="mb-0"
          >
            <Select placeholder="Select an icon" className="[&_.ant-select-selector]:!rounded-lg">
              <Select.Option value="shield">Shield</Select.Option>
              <Select.Option value="mic">Mic</Select.Option>
              <Select.Option value="camera">Camera</Select.Option>
              <Select.Option value="sun">Sun</Select.Option>
              <Select.Option value="bell">Bell</Select.Option>
              <Select.Option value="video">Video</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            {...restField}
            name={[name, 'description']}
            label="Description"
            rules={[{ required: true, message: 'Missing description' }]}
            className="mb-0 md:col-span-2"
          >
            <Input.TextArea rows={2} placeholder="Description..." className="rounded-lg" />
          </Form.Item>

          <Form.Item
            {...restField}
            name={[name, 'image']}
            label="Image URL (optional if uploading)"
            className="mb-0"
          >
            <Input placeholder="e.g. /images/product.avif" className="rounded-lg" />
          </Form.Item>

          <Form.Item
            {...restField}
            name={[name, 'imageFile']}
            label="Or Upload New Image"
            valuePropName="fileList"
            getValueFromEvent={(e) => Array.isArray(e) ? e : e?.fileList}
            className="mb-0"
          >
            <Upload beforeUpload={() => false} maxCount={1} accept="image/*">
              <Button icon={<UploadCloud className="w-4 h-4" />}>Select Image</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            {...restField}
            name={[name, 'imageAlt']}
            label="Image Alt Text"
            className="mb-0 md:col-span-2"
          >
            <Input placeholder="e.g. AI-powered camera" className="rounded-lg" />
          </Form.Item>
        </div>

        {/* Live Preview Card */}
        <div className="border border-slate-200 rounded-xl p-4 bg-white flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Live Preview</span>
              {benefitValues?.iconKey && renderIcon(benefitValues.iconKey)}
            </div>

            <h4 className="font-bold text-slate-800 text-base mb-1">
              {benefitValues?.title || "Benefit Title"}
            </h4>
            <p className="text-slate-500 text-sm mb-4">
              {benefitValues?.description || "Description preview goes here..."}
            </p>
          </div>

          {imgPreviewSrc && (
            <div className="mt-auto border border-slate-100 rounded-lg overflow-hidden bg-slate-50 relative aspect-video flex items-center justify-center">
              <img
                src={imgPreviewSrc}
                alt={benefitValues?.imageAlt || "Preview image"}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
