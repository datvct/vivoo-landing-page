"use client";
/* eslint-disable @next/next/no-img-element */

import React, { useState } from "react";
import { Button, Card, Form, Input, Image } from "antd";
import { Image as ImageIcon, UploadCloud, Video, X } from "lucide-react";
import AdminFormSelect from "../../common/AdminFormSelect";
import MediaPickerModal from "@/components/admin/media/MediaPickerModal";
import type { Media } from "@/types/types";

type MediaPickerTarget = "thumbnail" | "video" | "gallery";

type ExistingGalleryItem = {
  mediaId: string;
  url: string;
};

type SidebarControlsProps = {
  form: {
    setFieldsValue: (values: { sortOrder?: number }) => void;
  };
  thumbnailPreview: string | null;
  setThumbnailFile: (file: File | null) => void;
  setThumbnailPreview: (url: string | null) => void;
  setThumbnailMediaUrl: (url: string | null) => void;
  videoPreview: string | null;
  setVideoFile: (file: File | null) => void;
  setVideoPreview: (url: string | null) => void;
  setVideoMediaUrl: (url: string | null) => void;
  existingGallery: ExistingGalleryItem[];
  setExistingGallery: React.Dispatch<React.SetStateAction<ExistingGalleryItem[] | undefined>>;
  galleryImageMediaItems: ExistingGalleryItem[];
  setGalleryImageMediaItems: React.Dispatch<React.SetStateAction<ExistingGalleryItem[]>>;
  galleryPreviews: { file: File; url: string }[];
  setGalleryFiles: React.Dispatch<React.SetStateAction<File[]>>;
  setGalleryPreviews: React.Dispatch<React.SetStateAction<{ file: File; url: string }[]>>;
};

export const SidebarControls = ({
  form,
  thumbnailPreview,
  setThumbnailFile,
  setThumbnailPreview,
  setThumbnailMediaUrl,
  videoPreview,
  setVideoFile,
  setVideoPreview,
  setVideoMediaUrl,
  existingGallery,
  setExistingGallery,
  galleryImageMediaItems,
  setGalleryImageMediaItems,
  galleryPreviews,
  setGalleryFiles,
  setGalleryPreviews,
}: SidebarControlsProps) => {
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false);
  const [mediaPickerTarget, setMediaPickerTarget] = useState<MediaPickerTarget>("thumbnail");

  // Thumbnail change handler
  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnailFile(file);
      setThumbnailPreview(URL.createObjectURL(file));
      setThumbnailMediaUrl(null);
    }
  };

  // Video change handler
  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
      setVideoMediaUrl(null);
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
    setExistingGallery((prev) => {
      const currentItems = prev ?? existingGallery;
      return currentItems.filter((item) => item.mediaId !== mediaId);
    });
  };

  const openMediaPicker = (target: MediaPickerTarget) => {
    setMediaPickerTarget(target);
    setMediaPickerOpen(true);
  };

  const handleSelectSingleMedia = (media: Media) => {
    if (mediaPickerTarget === "thumbnail") {
      setThumbnailFile(null);
      setThumbnailPreview(media.secureUrl);
      setThumbnailMediaUrl(media.secureUrl);
      setMediaPickerOpen(false);
      return;
    }

    if (mediaPickerTarget === "video") {
      setVideoFile(null);
      setVideoPreview(media.secureUrl);
      setVideoMediaUrl(media.secureUrl);
      setMediaPickerOpen(false);
    }
  };

  const handleSelectGalleryMedia = (items: Media[]) => {
    const existingIds = new Set([
      ...existingGallery.map((item) => item.mediaId),
      ...galleryImageMediaItems.map((item) => item.mediaId),
    ]);
    const nextItems = items
      .filter((item) => !existingIds.has(item.id))
      .map((item) => ({
        mediaId: item.id,
        url: item.secureUrl,
      }));

    setGalleryImageMediaItems((prev) => [...prev, ...nextItems]);
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
                className="max-h-40 max-w-full object-contain"
              />
              <button
                type="button"
                onClick={() => {
                  setThumbnailFile(null);
                  setThumbnailPreview(null);
                  setThumbnailMediaUrl(null);
                }}
                className="absolute top-2 right-2 bg-slate-800/80 hover:bg-slate-900 text-white rounded-full p-1 shadow-sm flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 transition bg-slate-50/50 hover:bg-slate-50">
              <UploadCloud className="w-8 h-8 text-slate-400" />
              <span className="font-medium text-slate-700 text-sm">Upload Thumbnail</span>
              <span className="text-[11px] text-slate-400">PNG, JPG, JPEG up to 5MB</span>
              <div className="flex flex-wrap justify-center gap-2">
                <label className="cursor-pointer inline-flex items-center justify-center px-3 py-2 rounded-lg bg-white border border-slate-200 hover:border-slate-300 text-sm font-medium text-slate-700 transition">
                  Upload File
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailChange}
                    className="hidden"
                  />
                </label>
                <Button icon={<ImageIcon className="w-4 h-4" />} onClick={() => openMediaPicker("thumbnail")}>
                  Choose from Media
                </Button>
              </div>
            </div>
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
                  setVideoMediaUrl(null);
                }}
                className="absolute top-2 right-2 bg-slate-800/80 hover:bg-slate-900 text-white rounded-full p-1 shadow-sm flex items-center justify-center z-10"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 transition bg-slate-50/50 hover:bg-slate-50">
              <UploadCloud className="w-8 h-8 text-slate-400" />
              <span className="font-medium text-slate-700 text-sm">Upload Video</span>
              <span className="text-[11px] text-slate-400">MP4, WebM up to 50MB</span>
              <div className="flex flex-wrap justify-center gap-2">
                <label className="cursor-pointer inline-flex items-center justify-center px-3 py-2 rounded-lg bg-white border border-slate-200 hover:border-slate-300 text-sm font-medium text-slate-700 transition">
                  Upload File
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleVideoChange}
                    className="hidden"
                  />
                </label>
                <Button icon={<Video className="w-4 h-4" />} onClick={() => openMediaPicker("video")}>
                  Choose from Media
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>

      <Card
        title={<span className="font-semibold text-slate-700">Image Gallery</span>}
        className="shadow-sm border-slate-100 rounded-2xl"
      >
        <div className="space-y-4">
          <div className="border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 transition bg-slate-50/50 hover:bg-slate-50">
            <UploadCloud className="w-8 h-8 text-slate-400" />
            <span className="font-medium text-slate-700 text-sm">Upload Gallery Images</span>
            <span className="text-[11px] text-slate-400">Select one or more images</span>
            <div className="flex flex-wrap justify-center gap-2">
              <label className="cursor-pointer inline-flex items-center justify-center px-3 py-2 rounded-lg bg-white border border-slate-200 hover:border-slate-300 text-sm font-medium text-slate-700 transition">
                Upload Files
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleGalleryChange}
                  className="hidden"
                />
              </label>
              <Button icon={<ImageIcon className="w-4 h-4" />} onClick={() => openMediaPicker("gallery")}>
                Choose from Media
              </Button>
            </div>
          </div>

          {(existingGallery.length > 0 || galleryImageMediaItems.length > 0 || galleryPreviews.length > 0) && (
            <div className="grid grid-cols-3 gap-2 pt-2">
              {existingGallery.map((item, index) => (
                <div
                  key={index}
                  className="relative border border-slate-200 rounded-lg p-0.5 bg-slate-50 flex items-center justify-center aspect-square overflow-hidden"
                >
                  <img src={item.url} alt="Existing gallery image" className="w-full h-full object-cover rounded" />
                  <button
                    type="button"
                    onClick={() => removeExistingGalleryItem(item.mediaId)}
                    className="absolute top-1 right-1 bg-black/60 hover:bg-black/80 text-white rounded-full p-0.5 shadow flex items-center justify-center"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}

              {galleryImageMediaItems.map((item, index) => (
                <div
                  key={`${item.mediaId}-${index}`}
                  className="relative border border-slate-200 rounded-lg p-0.5 bg-slate-50 flex items-center justify-center aspect-square overflow-hidden"
                >
                  <img src={item.url} alt="Selected gallery media" className="w-full h-full object-cover rounded" />
                  <button
                    type="button"
                    onClick={() => {
                      setGalleryImageMediaItems((prev) => prev.filter((media) => media.mediaId !== item.mediaId));
                    }}
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
                  <img src={item.url} alt="Selected gallery image" className="w-full h-full object-cover rounded" />
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

      <MediaPickerModal
        open={mediaPickerOpen}
        onCancel={() => setMediaPickerOpen(false)}
        onSelect={handleSelectSingleMedia}
        onConfirmSelection={handleSelectGalleryMedia}
        selectionMode={mediaPickerTarget === "gallery" ? "multiple" : "single"}
        defaultTab={mediaPickerTarget === "video" ? "video" : "image"}
        selectableTypes={mediaPickerTarget === "video" ? ["video"] : ["image"]}
        title={
          mediaPickerTarget === "thumbnail"
            ? "Choose Thumbnail from Media"
            : mediaPickerTarget === "video"
              ? "Choose Video from Media"
              : "Choose Gallery Images from Media"
        }
      />
    </div>
  );
};
