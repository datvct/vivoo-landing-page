"use client";
/* eslint-disable @next/next/no-img-element */

import React, { useMemo, useState } from "react";
import { Button, Input, Modal, Pagination, Spin, message } from "antd";
import { Image as ImageIcon, Search } from "lucide-react";
import { useMediaListQuery } from "@/services/media/queries";
import type { Media } from "@/types/types";

type MediaPickerType = "all" | "image" | "video" | "other";
type MediaSelectionMode = "single" | "multiple";

type MediaPickerModalProps = {
    open: boolean;
    onCancel: () => void;
    onSelect: (media: Media) => void;
    onConfirmSelection?: (media: Media[]) => void;
    title?: string;
    selectableTypes?: MediaPickerType[];
    selectionMode?: MediaSelectionMode;
    defaultTab?: MediaPickerType;
    pageSize?: number;
};

const MEDIA_TABS: Array<[MediaPickerType, string]> = [
    ["all", "All"],
    ["image", "Images"],
    ["video", "Videos"],
    ["other", "Other"],
];

const getMediaType = (media: Media): Exclude<MediaPickerType, "all"> => {
    const resourceType = (media.resourceType || "").toLowerCase();

    if (resourceType.includes("image")) return "image";
    if (resourceType.includes("video")) return "video";
    return "other";
};

export default function MediaPickerModal({
    open,
    onCancel,
    onSelect,
    onConfirmSelection,
    title = "Choose from Media",
    selectableTypes = ["image"],
    selectionMode = "single",
    defaultTab = "image",
    pageSize = 18,
}: MediaPickerModalProps) {
    const [mediaPage, setMediaPage] = useState(1);
    const [mediaSearch, setMediaSearch] = useState("");
    const [mediaTab, setMediaTab] = useState<MediaPickerType>(defaultTab);
    const [selectedMedia, setSelectedMedia] = useState<Media[]>([]);

    const { data: mediaResponse, isLoading } = useMediaListQuery({
        page: mediaPage,
        limit: pageSize,
    });

    const mediaItems = useMemo(() => mediaResponse?.data?.items || [], [mediaResponse?.data?.items]);
    const mediaTotal = mediaResponse?.data?.meta?.totalItems || 0;

    const filteredMedia = useMemo(() => {
        const searchTerm = mediaSearch.toLowerCase();

        return mediaItems.filter((item) => {
            const fileName = (item.originalFilename || "").toLowerCase();
            const mimeType = (item.mimeType || "").toLowerCase();
            const matchesSearch =
                !searchTerm ||
                fileName.includes(searchTerm) ||
                mimeType.includes(searchTerm);

            const itemType = getMediaType(item);
            const matchesTab = mediaTab === "all" ? true : itemType === mediaTab;

            return matchesSearch && matchesTab;
        });
    }, [mediaItems, mediaSearch, mediaTab]);

    const resetAndCancel = () => {
        setMediaPage(1);
        setMediaSearch("");
        setMediaTab(defaultTab);
        setSelectedMedia([]);
        onCancel();
    };

    const handlePick = (media: Media) => {
        if (selectionMode === "multiple") {
            setSelectedMedia((prev) => {
                const exists = prev.some((item) => item.id === media.id);
                if (exists) {
                    return prev.filter((item) => item.id !== media.id);
                }

                if (!selectableTypes.includes(getMediaType(media))) {
                    message.warning("This media type is not selectable.");
                    return prev;
                }

                return [...prev, media];
            });
            return;
        }

        onSelect(media);
        setMediaPage(1);
    };

    const handleConfirmSelection = () => {
        if (selectionMode !== "multiple") return;
        if (!onConfirmSelection) return;

        onConfirmSelection(selectedMedia);
        setSelectedMedia([]);
        resetAndCancel();
    };

    const modalFooter =
        selectionMode === "multiple"
            ? [
                <Button key="cancel" onClick={resetAndCancel}>
                    Cancel
                </Button>,
                <Button
                    key="confirm"
                    type="primary"
                    onClick={handleConfirmSelection}
                    disabled={selectedMedia.length === 0}
                >
                    Add selected ({selectedMedia.length})
                </Button>,
            ]
            : null;

    return (
        <Modal
            open={open}
            onCancel={resetAndCancel}
            width={1280}
            centered
            destroyOnHidden
            title={title}
            footer={modalFooter}
        >
            <div className="space-y-4">
                <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-3">
                    <div className="flex flex-wrap gap-2">
                        {MEDIA_TABS.map(([key, label]) => (
                            <button
                                key={key}
                                type="button"
                                onClick={() => {
                                    setMediaTab(key);
                                    setMediaPage(1);
                                }}
                                className={`px-3 py-1.5 text-sm font-semibold rounded-lg border transition ${mediaTab === key
                                    ? "bg-slate-900 text-white border-slate-900"
                                    : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                                    }`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>

                    <div className="relative w-full xl:w-85">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <Input
                            allowClear
                            value={mediaSearch}
                            onChange={(e) => {
                                setMediaSearch(e.target.value);
                                setMediaPage(1);
                            }}
                            placeholder="Search filename or type..."
                            className="pl-9 rounded-lg"
                        />
                    </div>
                </div>

                <div className="max-h-[68vh] overflow-y-auto pr-1">
                    {isLoading ? (
                        <div className="py-20 flex items-center justify-center">
                            <Spin size="large" />
                        </div>
                    ) : filteredMedia.length === 0 ? (
                        <div className="py-20 border border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-center bg-slate-50/40">
                            <ImageIcon className="w-12 h-12 text-slate-300" />
                            <p className="mt-3 text-slate-700 font-semibold">No media found</p>
                            <p className="text-sm text-slate-400 max-w-md mt-1">
                                Try another search term or switch to a different media tab.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                            {filteredMedia.map((item) => {
                                const itemType = getMediaType(item);
                                const isSelectable = selectableTypes.includes(itemType);
                                const isSelected = selectedMedia.some((selected) => selected.id === item.id);

                                return (
                                    <button
                                        key={item.id}
                                        type="button"
                                        onClick={() => isSelectable && handlePick(item)}
                                        disabled={!isSelectable}
                                        className={`text-left border rounded-2xl overflow-hidden bg-white shadow-sm transition ${isSelectable
                                            ? isSelected
                                                ? "border-blue-500 ring-2 ring-blue-100 shadow-md cursor-pointer"
                                                : "border-slate-200 hover:border-blue-400 hover:shadow-md cursor-pointer"
                                            : "border-slate-100 opacity-70 cursor-not-allowed"
                                            }`}
                                    >
                                        <div className="aspect-square bg-slate-50 relative flex items-center justify-center overflow-hidden">
                                            {itemType === "image" ? (
                                                <img
                                                    src={item.secureUrl}
                                                    alt={item.originalFilename || "media"}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : itemType === "video" ? (
                                                <video
                                                    src={item.secureUrl}
                                                    className="w-full h-full object-cover"
                                                    muted
                                                    playsInline
                                                />
                                            ) : (
                                                <div className="flex flex-col items-center gap-2 text-slate-400">
                                                    <ImageIcon className="w-10 h-10" />
                                                    <span className="text-[11px] font-medium">{item.mimeType || "Other"}</span>
                                                </div>
                                            )}

                                            <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 to-transparent p-2">
                                                <p className="text-white text-[11px] font-semibold truncate">
                                                    {item.originalFilename || "Untitled file"}
                                                </p>
                                                {!isSelectable && (
                                                    <p className="text-white/70 text-[10px] mt-0.5">Preview only</p>
                                                )}
                                            </div>

                                            {isSelectable && (
                                                <div className="absolute top-2 right-2 rounded-full bg-blue-600 text-white text-[10px] font-semibold px-2 py-1 shadow">
                                                    {selectionMode === "multiple" ? (isSelected ? "Selected" : "Add") : "Select"}
                                                </div>
                                            )}
                                        </div>

                                        <div className="p-3 space-y-2">
                                            <div className="flex items-center justify-between gap-2 text-[11px] text-slate-500">
                                                <span className="truncate">{item.mimeType || item.resourceType || "unknown"}</span>
                                                <span>{item.width && item.height ? `${item.width}×${item.height}` : "-"}</span>
                                            </div>
                                            <p className="text-[10px] text-slate-400">
                                                {item.originalFilename || "No filename"}
                                            </p>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>

                {mediaTotal > pageSize && (
                    <div className="flex justify-center pt-2 border-t border-slate-100">
                        <Pagination
                            current={mediaPage}
                            pageSize={pageSize}
                            total={mediaTotal}
                            onChange={(page) => setMediaPage(page)}
                            showSizeChanger={false}
                        />
                    </div>
                )}
            </div>
        </Modal>
    );
}