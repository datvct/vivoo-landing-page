"use client";

import { useState, useMemo } from "react";
import { Button, Modal, Image, Spin, Tooltip, message, Upload, Pagination } from "antd";
import {
  UploadCloud,
  Trash2,
  Copy,
  Check,
  Search,
  RotateCcw,
  Video,
  FileImage,
  FileCode,
  File as FileIcon,
} from "lucide-react";
import { formatDateTime } from "@/utils/utils";
import { useMediaListQuery } from "@/services/media/queries";
import {
  useUploadMediaMutation,
  useDeleteMediaMutation,
} from "@/services/media/mutations";
import { Media } from "@/types/types";

export default function MediaManagementPage() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "image" | "video" | "other">("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [previewVideo, setPreviewVideo] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const limit = 18;

  // Queries & Mutations
  const { data: mediaResponse, isLoading } = useMediaListQuery({
    page,
    limit,
  });
  const uploadMutation = useUploadMediaMutation();
  const deleteMutation = useDeleteMediaMutation();

  const allMedia = mediaResponse?.data?.items || [];
  const totalItems = mediaResponse?.data?.meta?.totalItems || 0;

  // Handle Copy URL
  const handleCopyLink = async (record: Media) => {
    try {
      await navigator.clipboard.writeText(record.secureUrl);
      setCopiedId(record.id);
      message.success("URL copied to clipboard!");
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      message.error("Failed to copy URL");
    }
  };

  // Handle Delete
  const handleDelete = (id: string) => {
    Modal.confirm({
      title: "Confirm Delete",
      content: "Are you sure you want to delete this media? This will permanently remove the file from storage and cannot be undone.",
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: () => {
        deleteMutation.mutate(id);
      },
    });
  };

  // Handle file upload
  const handleCustomUpload = async (options: any) => {
    const { file, onSuccess, onError } = options;
    try {
      await uploadMutation.mutateAsync(file);
      onSuccess?.("ok");
    } catch (err) {
      onError?.(err);
    }
  };

  // Filters & Search logic
  const filteredMedia = useMemo(() => {
    return allMedia.filter((item) => {
      // Search match
      const name = item.originalFilename || "";
      const matchesSearch = name.toLowerCase().includes(search.toLowerCase());

      // Tab filter
      const type = item.resourceType || "";
      let matchesTab = true;
      if (activeTab === "image") {
        matchesTab = type.includes("image");
      } else if (activeTab === "video") {
        matchesTab = type.includes("video");
      } else if (activeTab === "other") {
        matchesTab = !type.includes("image") && !type.includes("video");
      }

      return matchesSearch && matchesTab;
    });
  }, [allMedia, search, activeTab]);

  // Helper to format file size
  const formatFileSize = (bytesStr: string | null | undefined) => {
    if (!bytesStr) return "N/A";
    const bytes = parseInt(bytesStr, 10);
    if (isNaN(bytes)) return "N/A";
    if (bytes < 1024) return `${bytes} B`;
    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(1)} KB`;
    const mb = kb / 1024;
    return `${mb.toFixed(1)} MB`;
  };

  const isUploading = uploadMutation.isPending;

  return (
    <div className="space-y-4">
      {/* Header and drag-and-drop area */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        {/* Header Section */}
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
              Media Management
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Upload, view, retrieve link URLs, and manage your images and video files.
            </p>
          </div>
        </div>

        {/* Upload Zone */}
        <div className="p-6 border-b border-slate-100 bg-slate-50/20">
          <Upload.Dragger
            customRequest={handleCustomUpload}
            showUploadList={false}
            disabled={isUploading}
            accept="image/*,video/*"
            className="!bg-white hover:!border-blue-500 !border-slate-200 !border-2 !border-dashed !rounded-2xl transition duration-200"
          >
            <div className="flex flex-col items-center justify-center p-4 gap-3">
              {isUploading ? (
                <div className="flex flex-col items-center gap-2">
                  <Spin size="large" />
                  <span className="font-semibold text-blue-600 text-sm mt-1">Uploading file, please wait...</span>
                </div>
              ) : (
                <>
                  <div className="bg-blue-50 p-4 rounded-full text-blue-500">
                    <UploadCloud className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-700 text-base">Drag & Drop file here, or click to browse</p>
                    <p className="text-slate-400 text-xs mt-1">Supports PNG, JPG, JPEG, WEBP, and MP4 up to 50MB</p>
                  </div>
                </>
              )}
            </div>
          </Upload.Dragger>
        </div>

        {/* Control toolbar */}
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/30 flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
          {/* Tabs and search */}
          <div className="flex flex-wrap gap-3 items-center">
            {/* Category tabs */}
            <div className="flex items-center gap-1 bg-slate-200/60 p-0.5 rounded-lg">
              {(["all", "image", "video", "other"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`text-xs px-3 py-1.5 rounded-md font-semibold transition capitalize ${activeTab === tab
                    ? "bg-white text-slate-800 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Search Bar */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search file name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-4 py-1.5 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-400 text-sm w-56 h-[32px] transition placeholder-slate-400 bg-white"
              />
            </div>

            {/* Clear filters */}
            {(search || activeTab !== "all") && (
              <Button
                type="text"
                onClick={() => {
                  setSearch("");
                  setActiveTab("all");
                }}
                icon={<RotateCcw className="w-4 h-4" />}
                className="flex items-center text-slate-500 hover:text-slate-700 h-[32px] hover:bg-slate-100 rounded-lg px-3 font-medium transition"
              >
                Clear Filters
              </Button>
            )}
          </div>

          <div className="text-slate-400 text-sm font-medium whitespace-nowrap">
            Showing {filteredMedia.length} of {totalItems} files
          </div>
        </div>

        {/* Media Grid */}
        <div className="p-6">
          {isLoading ? (
            <div className="py-24 flex flex-col items-center justify-center gap-2">
              <Spin size="large" />
              <span className="text-slate-400 text-sm font-medium">Loading your media vault...</span>
            </div>
          ) : filteredMedia.length === 0 ? (
            <div className="py-24 border border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-center p-6 bg-slate-50/20">
              <FileIcon className="w-12 h-12 text-slate-300" />
              <p className="font-semibold text-slate-700 text-base mt-3">No media files found</p>
              <p className="text-slate-400 text-sm mt-1 max-w-sm">
                Try changing your search keywords or upload a new file above to get started.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:grid-cols-6 gap-6">
                {filteredMedia.map((item) => {
                  const isImage = item.resourceType === "image";
                  const isVideo = item.resourceType === "video";

                  return (
                    <div
                      key={item.id}
                      className="group relative bg-white border border-slate-150 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition duration-200 flex flex-col"
                    >
                      {/* Media Preview Container */}
                      <div className="relative aspect-square bg-slate-50 flex items-center justify-center border-b border-slate-100 overflow-hidden select-none">
                        {isImage ? (
                          <div className="w-full h-full">
                            <Image
                              src={item.secureUrl}
                              alt={item.originalFilename || "media"}
                              className="w-full h-full object-cover group-hover:scale-105 transition duration-300 aspect-1/1"
                              preview={{
                                cover: (
                                  <div className="text-xs font-semibold text-white bg-black/40 w-full h-full flex items-center justify-center">
                                    Preview
                                  </div>
                                ),
                              }}
                            />
                          </div>
                        ) : isVideo ? (
                          <div
                            className="relative w-full h-full flex items-center justify-center bg-slate-900 cursor-pointer group/video"
                            onClick={() => setPreviewVideo(item.secureUrl)}
                          >
                            <video
                              src={item.secureUrl}
                              className="w-full h-full object-cover"
                              controls={false}
                            />
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover/video:bg-black/50 transition">
                              <Video className="w-8 h-8 text-white drop-shadow-md group-hover/video:scale-110 transition" />
                              <div className="absolute bottom-2 text-[10px] font-semibold text-white bg-black/40 px-2 py-0.5 rounded opacity-0 group-hover/video:opacity-100 transition">
                                Preview
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center gap-2">
                            <FileCode className="w-10 h-10 text-slate-400" />
                            <span className="text-[10px] text-slate-400 font-mono capitalize">
                              {item.mimeType || "Other"}
                            </span>
                          </div>
                        )}

                        {/* Top Action Buttons (Copy / Delete) */}
                        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition duration-200 z-10">
                          <Tooltip title="Copy secure URL">
                            <button
                              type="button"
                              onClick={() => handleCopyLink(item)}
                              className="bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-800 rounded-lg p-1.5 shadow-md flex items-center justify-center transition border border-slate-100"
                            >
                              {copiedId === item.id ? (
                                <Check className="w-3.5 h-3.5 text-green-500" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </Tooltip>

                          <Tooltip title="Delete file">
                            <button
                              type="button"
                              onClick={() => handleDelete(item.id)}
                              className="bg-white hover:bg-red-50 text-slate-600 hover:text-red-500 rounded-lg p-1.5 shadow-md flex items-center justify-center transition border border-slate-100"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </Tooltip>
                        </div>
                      </div>

                      {/* Media Metadata Info */}
                      <div className="p-3 flex-1 flex flex-col justify-between">
                        <div className="space-y-0.5 min-w-0">
                          <Tooltip title={item.originalFilename}>
                            <p className="text-[12px] font-semibold text-slate-800 truncate leading-snug">
                              {item.originalFilename || "Untitled file"}
                            </p>
                          </Tooltip>
                          <p className="text-[10px] text-slate-400 font-medium leading-none">
                            {formatFileSize(item.fileSize)}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-slate-50 mt-2 flex justify-between items-center text-[10px] text-slate-400 font-medium">
                          <span>{formatDateTime(item.createdAt).split(" ")[0]}</span>
                          {item.width && item.height && (
                            <span className="font-mono text-[9px] bg-slate-50 px-1 py-0.5 rounded border border-slate-100">
                              {item.width}×{item.height}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Antd Pagination */}
              {totalItems > limit && (
                <div className="flex justify-center pt-6 border-t border-slate-100">
                  <Pagination
                    current={page}
                    pageSize={limit}
                    total={totalItems}
                    onChange={(p) => {
                      setPage(p);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    showSizeChanger={false}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Video Preview Modal */}
      <Modal
        open={!!previewVideo}
        footer={null}
        onCancel={() => setPreviewVideo(null)}
        width={800}
        centered
        title="Preview Video"
      >
        {previewVideo && (
          <div className="mt-4 bg-black rounded-lg overflow-hidden flex items-center justify-center">
            <video
              src={previewVideo}
              controls
              autoPlay
              className="w-full max-h-[70vh] object-contain"
            />
          </div>
        )}
      </Modal>
    </div>
  );
}
