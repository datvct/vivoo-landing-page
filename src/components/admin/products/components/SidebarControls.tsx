"use client";

import React from "react";
import { Card, Form, Input, Image } from "antd";
import { UploadCloud, X } from "lucide-react";
import AdminFormSelect from "../../common/AdminFormSelect";

type SidebarControlsProps = {
  form: any;
  thumbnailPreview: string | null;
  setThumbnailFile: (file: File | null) => void;
  setThumbnailPreview: (url: string | null) => void;
  videoPreview: string | null;
  setVideoFile: (file: File | null) => void;
  setVideoPreview: (url: string | null) => void;
  existingGallery: any[];
  setExistingGallery: React.Dispatch<React.SetStateAction<any[]>>;
  galleryPreviews: { file: File; url: string }[];
  setGalleryFiles: React.Dispatch<React.SetStateAction<File[]>>;
  setGalleryPreviews: React.Dispatch<React.SetStateAction<{ file: File; url: string }[]>>;
};

export const SidebarControls = ({
  form,
  thumbnailPreview,
  setThumbnailFile,
  setThumbnailPreview,
  videoPreview,
  setVideoFile,
  setVideoPreview,
  existingGallery,
  setExistingGallery,
  galleryPreviews,
  setGalleryFiles,
  setGalleryPreviews,
}: SidebarControlsProps) => {
  // Thumbnail change handler
  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnailFile(file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  // Video change handler
  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  // Gallery change handler
  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newPreviews = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setGalleryFiles((prev) => [...prev, ...files]);
    setGalleryPreviews((prev) => [...prev, ...newPreviews]);
  };

  // Remove local gallery file preview
  const removeLocalGalleryFile = (index: number) => {
    URL.revokeObjectURL(galleryPreviews[index].url);
    setGalleryFiles((prev) => prev.filter((_, idx) => idx !== index));
    setGalleryPreviews((prev) => prev.filter((_, idx) => idx !== index));
  };

  // Remove existing gallery file (in edit mode)
  const removeExistingGalleryItem = (mediaId: string) => {
    setExistingGallery((prev) => prev.filter((item) => item.mediaId !== mediaId));
  };

  return (
    <div className="space-y-6 flex flex-col gap-4">
      <Card
        title={<span className="font-semibold text-slate-700">Visibility & Status</span>}
        className="shadow-sm border-slate-100 rounded-2xl"
      >
        <AdminFormSelect
          name="status"
          label="Product Status"
          required
          options={[
            { label: "Published (Visible)", value: "published" },
            { label: "Draft (Hidden)", value: "draft" },
          ]}
        />

        <Form.Item name="sortOrder" label="Sort Order" className="mt-2">
          <Input
            type="number"
            placeholder="e.g. 0"
            onChange={(e) => {
              form.setFieldsValue({ sortOrder: parseInt(e.target.value) || 0 });
            }}
          />
        </Form.Item>
      </Card>

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
                className="absolute top-2 right-2 bg-slate-800/80 hover:bg-slate-900 text-white rounded-full p-1 shadow-sm flex items-center justify-center"
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

      <Card
        title={<span className="font-semibold text-slate-700">Video</span>}
        className="shadow-sm border-slate-100 rounded-2xl"
      >
        <div className="space-y-4">
          {videoPreview ? (
            <div className="relative border border-slate-200 rounded-xl p-1 bg-slate-50 flex items-center justify-center overflow-hidden">
              <video
                src={videoPreview}
                controls
                className="w-full rounded-lg"
              />
              <button
                type="button"
                onClick={() => {
                  setVideoFile(null);
                  setVideoPreview(null);
                }}
                className="absolute top-2 right-2 bg-slate-800/80 hover:bg-slate-900 text-white rounded-full p-1 shadow-sm flex items-center justify-center z-10"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <label className="border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-2xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition bg-slate-50/50 hover:bg-slate-50">
              <UploadCloud className="w-8 h-8 text-slate-400" />
              <span className="font-medium text-slate-700 text-sm">Upload Video</span>
              <span className="text-[11px] text-slate-400">MP4, WebM up to 50MB</span>
              <input
                type="file"
                accept="video/*"
                onChange={handleVideoChange}
                className="hidden"
              />
            </label>
          )}
        </div>
      </Card>

      <Card
        title={<span className="font-semibold text-slate-700">Image Gallery</span>}
        className="shadow-sm border-slate-100 rounded-2xl"
      >
        <div className="space-y-4">
          <label className="border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-2xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition bg-slate-50/50 hover:bg-slate-50">
            <UploadCloud className="w-8 h-8 text-slate-400" />
            <span className="font-medium text-slate-700 text-sm">Upload Gallery Images</span>
            <span className="text-[11px] text-slate-400">Select one or more images</span>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleGalleryChange}
              className="hidden"
            />
          </label>

          {(existingGallery.length > 0 || galleryPreviews.length > 0) && (
            <div className="grid grid-cols-3 gap-2 pt-2">
              {existingGallery.map((item, index) => (
                <div
                  key={index}
                  className="relative border border-slate-200 rounded-lg p-0.5 bg-slate-50 flex items-center justify-center aspect-square overflow-hidden"
                >
                  <img src={item.url} className="w-full h-full object-cover rounded" />
                  <button
                    type="button"
                    onClick={() => removeExistingGalleryItem(item.mediaId)}
                    className="absolute top-1 right-1 bg-black/60 hover:bg-black/80 text-white rounded-full p-0.5 shadow flex items-center justify-center"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}

              {galleryPreviews.map((item, index) => (
                <div
                  key={index}
                  className="relative border border-slate-200 rounded-lg p-0.5 bg-slate-50 flex items-center justify-center aspect-square overflow-hidden"
                >
                  <img src={item.url} className="w-full h-full object-cover rounded" />
                  <button
                    type="button"
                    onClick={() => removeLocalGalleryFile(index)}
                    className="absolute top-1 right-1 bg-black/60 hover:bg-black/80 text-white rounded-full p-0.5 shadow flex items-center justify-center"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
