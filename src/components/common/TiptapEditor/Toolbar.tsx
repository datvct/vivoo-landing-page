import React, { useState, useCallback, useRef, useEffect } from "react";
import type { Editor } from "@tiptap/core";
import { Dropdown, Tooltip, Popover, Input, message } from "antd";
import type { InputRef, MenuProps } from "antd";
import api from "@/lib/axios";
import {
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  StrikethroughOutlined,
  LinkOutlined,
  PictureOutlined,
  UnorderedListOutlined,
  OrderedListOutlined,
  BlockOutlined,
  CodeOutlined,
  UndoOutlined,
  RedoOutlined,
  BorderHorizontalOutlined,
  EnterOutlined,
  DownOutlined,
  FontSizeOutlined,
  NumberOutlined,
  LineHeightOutlined,
  VideoCameraOutlined,
  YoutubeOutlined,
  PlaySquareOutlined,
  ClearOutlined,
  RollbackOutlined,
  CheckSquareOutlined,
  BgColorsOutlined,
  FormatPainterOutlined,
  CloseOutlined,
  ExportOutlined,
} from "@ant-design/icons";
import {
  MdOutlineFormatAlignCenter,
  MdOutlineFormatAlignJustify,
  MdOutlineFormatAlignLeft,
  MdOutlineFormatAlignRight,
} from "react-icons/md";

const getShortcutLabel = (pattern: string): string => {
  if (typeof navigator === "undefined") return pattern.replace(/Mod\+?/gi, "Ctrl+");
  const isMac = /Mac|iPad|iPhone|iPod/.test(navigator.userAgent);
  if (isMac) {
    return pattern
      .replace(/Mod\+Shift\+/gi, "⌘⇧")
      .replace(/Mod\+Alt\+/gi, "⌘⌥")
      .replace(/Mod\+/gi, "⌘");
  }
  return pattern.replace(/Mod\+?/gi, "Ctrl+");
};

const AlignCenterIcon = () => <MdOutlineFormatAlignCenter />;
const AlignJustifyIcon = () => <MdOutlineFormatAlignJustify />;
const AlignLeftIcon = () => <MdOutlineFormatAlignLeft />;
const AlignRightIcon = () => <MdOutlineFormatAlignRight />;

const TEXT_COLOR_PALETTE = [
  "#000000",
  "#262626",
  "#595959",
  "#8c8c8c",
  "#ffffff",
  "#1890ff",
  "#52c41a",
  "#faad14",
  "#f5222d",
  "#eb2f96",
  "#722ed1",
  "#13c2c2",
];

const HIGHLIGHT_COLOR_PALETTE_LIGHT = [
  "#fef9c3",
  "#d9f99d",
  "#bfdbfe",
  "#fbcfe8",
  "#e9d5ff",
  "#a7f3d0",
  "#fed7aa",
  "#e5e7eb",
  "#fef3c7",
  "#cffafe",
  "#fce7f3",
  "#ddd6fe",
];

const HIGHLIGHT_COLOR_PALETTE_BOLD = [
  "#fde047",
  "#84cc16",
  "#60a5fa",
  "#f472b6",
  "#a78bfa",
  "#34d399",
  "#fb923c",
  "#94a3b8",
  "#fbbf24",
  "#22d3ee",
  "#f9a8d4",
  "#818cf8",
];

const HIGHLIGHT_COLOR_PALETTE_EXTRA = [
  "#fef08a",
  "#eab308",
  "#fecaca",
  "#ef4444",
  "#bbf7d0",
  "#22c55e",
  "#93c5fd",
  "#3b82f6",
  "#c4b5fd",
  "#7c3aed",
  "#ffedd5",
  "#f97316",
];

const renderHighlightColorRow = (editor: Editor, hexList: string[]) => (
  <div key={hexList[0]} style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 6 }}>
    {hexList.map((hex) => (
      <button
        key={hex}
        type="button"
        aria-label={`Highlight ${hex}`}
        style={{
          width: 24,
          height: 24,
          borderRadius: 4,
          border: "1px solid #d9d9d9",
          backgroundColor: hex,
          cursor: "pointer",
        }}
        onClick={() => editor.chain().focus().toggleHighlight({ color: hex }).run()}
      />
    ))}
  </div>
);

const HighlightColorDropdown: React.FC<{ editor: Editor | null }> = ({ editor }) => {
  if (!editor) return null;
  const content = (
    <div className="tiptap-highlight-dropdown" style={{ padding: 8, minWidth: 200 }}>
      {renderHighlightColorRow(editor, HIGHLIGHT_COLOR_PALETTE_LIGHT)}
      {renderHighlightColorRow(editor, HIGHLIGHT_COLOR_PALETTE_BOLD)}
      {renderHighlightColorRow(editor, HIGHLIGHT_COLOR_PALETTE_EXTRA)}
      <button
        type="button"
        style={{
          width: "100%",
          padding: "4px 8px",
          fontSize: 12,
          border: "1px solid #d9d9d9",
          borderRadius: 4,
          background: "#fff",
          cursor: "pointer",
        }}
        onClick={() => editor.chain().focus().unsetHighlight().run()}
      >
        Clear highlight
      </button>
    </div>
  );
  return (
    <Popover content={content} trigger="click" placement="bottomLeft">
      <Tooltip title={`Highlight (${getShortcutLabel("Mod+Shift+H")})`} placement="bottom">
        <button
          type="button"
          className={editor.isActive("highlight") ? "active" : ""}
          aria-label="Highlight"
        >
          <FormatPainterOutlined />
        </button>
      </Tooltip>
    </Popover>
  );
};

const TextColorDropdown: React.FC<{ editor: Editor | null }> = ({ editor }) => {
  if (!editor) return null;
  const content = (
    <div className="tiptap-text-color-dropdown" style={{ padding: 8, minWidth: 200 }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 8 }}>
        {TEXT_COLOR_PALETTE.map((hex) => (
          <button
            key={hex}
            type="button"
            aria-label={`Color ${hex}`}
            style={{
              width: 24,
              height: 24,
              borderRadius: 4,
              border: "1px solid #d9d9d9",
              backgroundColor: hex,
              cursor: "pointer",
            }}
            onClick={() => {
              editor.chain().focus().setColor(hex).run();
            }}
          />
        ))}
      </div>
      <button
        type="button"
        style={{
          width: "100%",
          padding: "4px 8px",
          fontSize: 12,
          border: "1px solid #d9d9d9",
          borderRadius: 4,
          background: "#fff",
          cursor: "pointer",
        }}
        onClick={() => editor.chain().focus().unsetColor().run()}
      >
        Clear color
      </button>
    </div>
  );
  return (
    <Popover content={content} trigger="click" placement="bottomLeft">
      <Tooltip title="Text color" placement="bottom">
        <button type="button" aria-label="Text color">
          <BgColorsOutlined style={{ color: editor.getAttributes("textStyle").color || "currentColor" }} />
        </button>
      </Tooltip>
    </Popover>
  );
};

const applyLink = (editor: Editor, url: string) => {
  const u = url.trim();
  if (!u) return;
  if (editor.state.selection.empty) {
    const safeHref = u.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
    const safeText = u.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    editor.chain().focus().insertContent(`<a href="${safeHref}" target="_blank" rel="noopener noreferrer">${safeText}</a>`).run();
  } else {
    editor.chain().focus().setLink({ href: u }).run();
  }
};

type LinkPopoverButtonProps = {
  editor: Editor;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

const LinkPopoverButton: React.FC<LinkPopoverButtonProps> = ({
  editor,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const linkInputRef = useRef<InputRef>(null);

  const isControlled = controlledOnOpenChange != null;
  const open = isControlled ? (controlledOpen ?? false) : internalOpen;
  const setOpen = isControlled ? (controlledOnOpenChange ?? (() => { })) : setInternalOpen;

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => linkInputRef.current?.input?.focus(), 80);
      return () => clearTimeout(t);
    }
  }, [open]);

  const handleOpenChange = useCallback(
    (next: boolean) => {
      setOpen(next);
      if (next) setInputValue(editor.getAttributes("link").href || "");
    },
    [editor, setOpen]
  );

  const handleApply = useCallback(() => {
    applyLink(editor, inputValue);
    setOpen(false);
    setInputValue("");
  }, [editor, inputValue]);

  const handleRemoveLink = useCallback(() => {
    editor.chain().focus().unsetLink().run();
    setOpen(false);
  }, [editor]);

  const currentHref = editor.getAttributes("link").href;
  const linkContent = (
    <div className="tiptap-link-popover" style={{ width: 280, padding: 8 }}>
      <Input
        ref={linkInputRef}
        placeholder="Paste link..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onPressEnter={handleApply}
        allowClear
        style={{ marginBottom: 8 }}
      />
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
        <button
          type="button"
          onClick={() => setOpen(false)}
          style={{ padding: "4px 8px", fontSize: 12, border: "1px solid #d9d9d9", borderRadius: 4, background: "#fff", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 4 }}
        >
          <CloseOutlined /> Cancel
        </button>
        {currentHref && (
          <button
            type="button"
            onClick={() => {
              try {
                window.open(currentHref, "_blank", "noopener,noreferrer");
              } catch {
                // ignore
              }
            }}
            style={{ padding: "4px 8px", fontSize: 12, border: "1px solid #d9d9d9", borderRadius: 4, background: "#fff", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 4 }}
          >
            <ExportOutlined /> Open in new tab
          </button>
        )}
        {editor.isActive("link") && (
          <button
            type="button"
            onClick={handleRemoveLink}
            style={{ padding: "4px 8px", fontSize: 12, border: "1px solid #ff4d4f", borderRadius: 4, background: "#fff", color: "#ff4d4f", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 4 }}
          >
            <ClearOutlined /> Remove link
          </button>
        )}
        <button
          type="button"
          onClick={handleApply}
          style={{ padding: "4px 8px", fontSize: 12, border: "1px solid #1890ff", background: "#1890ff", color: "#fff", borderRadius: 4, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 4, marginLeft: "auto" }}
        >
          Apply
        </button>
      </div>
    </div>
  );

  return (
    <Popover
      open={open}
      onOpenChange={handleOpenChange}
      content={linkContent}
      trigger="click"
      placement="bottomLeft"
    >
      <Tooltip title={`Insert link (${getShortcutLabel("Mod+K")})`} placement="bottom">
        <button
          type="button"
          className={editor.isActive("link") ? "active" : ""}
          aria-label="Insert link"
        >
          <LinkOutlined />
        </button>
      </Tooltip>
    </Popover>
  );
};

const ImagePopoverButton: React.FC<{ editor: Editor }> = ({ editor }) => {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");

  const handleApplyUrl = () => {
    if (url.trim()) {
      editor.chain().focus().setImage({ src: url.trim() }).run();
      setUrl("");
      setOpen(false);
    }
  };

  const handleLocalUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const hide = message.loading("Uploading image...", 0);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await api.post("/media/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const mediaData = response.data?.data || response.data;
      const imageUrl = mediaData?.secureUrl || mediaData?.url;

      if (imageUrl) {
        editor.chain().focus().setImage({ src: imageUrl }).run();
        message.success("Upload image successfully!");
      } else {
        throw new Error("Failed to get image URL.");
      }
    } catch (err: any) {
      console.error(err);
      message.error(err?.response?.message || "Upload image failed! Please try again.");
    } finally {
      hide();
      setOpen(false);
    }
  };

  const content = (
    <div className="tiptap-image-popover" style={{ width: 280, padding: 8 }}>
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 12, fontWeight: 500, marginBottom: 4, color: "#475569" }}>Upload Image</div>
        <input
          type="file"
          accept="image/*"
          onChange={handleLocalUpload}
          className="border border-slate-300 rounded-md px-2 py-1 text-sm w-full cursor-pointer hover:border-blue-400 transition"
        />
      </div>
      <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: 8 }}>
        <div style={{ fontSize: 12, fontWeight: 500, marginBottom: 4, color: "#475569" }}>Or enter image URL:</div>
        <Input
          size="small"
          placeholder="https://example.com/image.png"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onPressEnter={handleApplyUrl}
          style={{ marginBottom: 8 }}
        />
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
          <button
            type="button"
            onClick={() => setOpen(false)}
            style={{ padding: "4px 8px", fontSize: 12, border: "1px solid #d9d9d9", borderRadius: 4, background: "#fff", cursor: "pointer" }}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleApplyUrl}
            style={{ padding: "4px 8px", fontSize: 12, border: "1px solid #1890ff", color: "#fff", background: "#1890ff", borderRadius: 4, cursor: "pointer" }}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <Popover open={open} onOpenChange={setOpen} content={content} trigger="click" placement="bottomLeft">
      <Tooltip title="Insert Image" placement="bottom">
        <button type="button" aria-label="Insert Image">
          <PictureOutlined />
        </button>
      </Tooltip>
    </Popover>
  );
};

const VideoPopoverButton: React.FC<{ editor: Editor }> = ({ editor }) => {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");

  const handleApplyUrl = () => {
    if (url.trim()) {
      editor.chain().focus().insertContent(
        `<video src="${url.trim()}" controls style="max-width:100%; height:auto; display:block; margin: 1rem auto; border-radius: 8px;"></video>`
      ).run();
      setUrl("");
      setOpen(false);
    }
  };

  const handleLocalUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const hide = message.loading("Đang tải video lên máy chủ...", 0);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await api.post("/media/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const mediaData = response.data?.data || response.data;
      const videoUrl = mediaData?.secureUrl || mediaData?.url;

      if (videoUrl) {
        editor.chain().focus().insertContent(
          `<video src="${videoUrl}" controls style="max-width:100%; height:auto; display:block; margin: 1rem auto; border-radius: 8px;"></video>`
        ).run();
        message.success("Tải video lên thành công!");
      } else {
        throw new Error("Không lấy được URL của video.");
      }
    } catch (err: any) {
      console.error(err);
      message.error(err?.response?.message || "Tải video thất bại! Hãy thử lại.");
    } finally {
      hide();
      setOpen(false);
    }
  };

  const content = (
    <div className="tiptap-video-popover" style={{ width: 280, padding: 8 }}>
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 12, fontWeight: 500, marginBottom: 4, color: "#475569" }}>Upload video from computer:</div>
        <input
          type="file"
          accept="video/*"
          onChange={handleLocalUpload}
          className="border border-slate-300 rounded-md px-2 py-1 text-sm w-full cursor-pointer hover:border-blue-400 transition"
        />
      </div>
      <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: 8 }}>
        <div style={{ fontSize: 12, fontWeight: 500, marginBottom: 4, color: "#475569" }}>Or enter video URL:</div>
        <Input
          size="small"
          placeholder="https://example.com/video.mp4"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onPressEnter={handleApplyUrl}
          style={{ marginBottom: 8 }}
        />
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
          <button
            type="button"
            onClick={() => setOpen(false)}
            style={{ padding: "4px 8px", fontSize: 12, border: "1px solid #d9d9d9", borderRadius: 4, background: "#fff", cursor: "pointer" }}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleApplyUrl}
            style={{ padding: "4px 8px", fontSize: 12, border: "1px solid #1890ff", color: "#fff", background: "#1890ff", borderRadius: 4, cursor: "pointer" }}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <Popover open={open} onOpenChange={setOpen} content={content} trigger="click" placement="bottomLeft">
      <Tooltip title="Nhúng video MP4/WebM" placement="bottom">
        <button type="button" aria-label="Nhúng video MP4/WebM">
          <PlaySquareOutlined />
        </button>
      </Tooltip>
    </Popover>
  );
};

const YoutubePopoverButton: React.FC<{ editor: Editor }> = ({ editor }) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<InputRef>(null);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.input?.focus(), 80);
      return () => clearTimeout(t);
    }
  }, [open]);

  const handleOpenChange = useCallback((next: boolean) => {
    setOpen(next);
    if (!next) setInputValue("");
  }, []);

  const handleApply = useCallback(() => {
    const url = inputValue?.trim();
    if (!url) return;
    editor.chain().focus().setYoutubeVideo({ src: url }).run();
    setOpen(false);
    setInputValue("");
    message.success("Đã chèn video YouTube");
  }, [editor, inputValue]);

  const content = (
    <div className="tiptap-youtube-popover" style={{ width: 320, padding: 8 }}>
      <Input
        ref={inputRef}
        placeholder="Dán link YouTube (vd: https://www.youtube.com/watch?v=...)"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onPressEnter={handleApply}
        allowClear
        style={{ marginBottom: 8 }}
      />
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
        <button
          type="button"
          onClick={() => setOpen(false)}
          style={{ padding: "4px 8px", fontSize: 12, border: "1px solid #d9d9d9", borderRadius: 4, background: "#fff", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 4 }}
        >
          <CloseOutlined /> Hủy
        </button>
        <button
          type="button"
          onClick={handleApply}
          style={{ padding: "4px 8px", fontSize: 12, border: "1px solid #1890ff", background: "#1890ff", color: "#fff", borderRadius: 4, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 4, marginLeft: "auto" }}
        >
          Apply
        </button>
      </div>
    </div>
  );

  return (
    <Popover open={open} onOpenChange={handleOpenChange} content={content} trigger="click" placement="bottomLeft">
      <Tooltip title="Youtube Video" placement="bottom">
        <button type="button" aria-label="Youtube Video">
          <YoutubeOutlined />
        </button>
      </Tooltip>
    </Popover>
  );
};

type ToolbarProps = {
  editor: Editor | null;
  disabled?: boolean;
};

export const Toolbar: React.FC<ToolbarProps> = ({ editor, disabled }) => {
  const [linkPopoverOpen, setLinkPopoverOpen] = useState(false);
  const [, setTick] = useState(0);

  useEffect(() => {
    if (!editor) return;

    const forceUpdate = () => setTick((tick) => tick + 1);

    editor.on("selectionUpdate", forceUpdate);
    editor.on("transaction", forceUpdate);

    return () => {
      editor.off("selectionUpdate", forceUpdate);
      editor.off("transaction", forceUpdate);
    };
  }, [editor]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        if (editor && editor.isFocused) {
          e.preventDefault();
          e.stopPropagation();
          setLinkPopoverOpen(true);
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown, true);
    return () => document.removeEventListener("keydown", handleKeyDown, true);
  }, [editor]);

  if (!editor || disabled) return null;

  const headingLevel = [1, 2, 3, 4, 5, 6].find((l) => editor.isActive("heading", { level: l }));
  const blockType = headingLevel ? String(headingLevel) : "0";

  return (
    <div className="custom-tiptap-toolbar">
      <Tooltip title={`Undo (${getShortcutLabel("Mod+Z")})`} placement="bottom">
        <span className="toolbar-tooltip-wrap">
          <button
            type="button"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            aria-label="Undo"
          >
            <UndoOutlined />
          </button>
        </span>
      </Tooltip>
      <Tooltip title={`Redo (${getShortcutLabel("Mod+Shift+Z")})`} placement="bottom">
        <span className="toolbar-tooltip-wrap">
          <button
            type="button"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            aria-label="Redo"
          >
            <RedoOutlined />
          </button>
        </span>
      </Tooltip>
      <span className="toolbar-sep" />
      <Tooltip title={`Bold (${getShortcutLabel("Mod+B")})`} placement="bottom">
        <button
          type="button"
          className={editor.isActive("bold") ? "active" : ""}
          onClick={() => editor.chain().focus().toggleBold().run()}
          aria-label="Bold"
        >
          <BoldOutlined />
        </button>
      </Tooltip>
      <Tooltip title={`Italic (${getShortcutLabel("Mod+I")})`} placement="bottom">
        <button
          type="button"
          className={editor.isActive("italic") ? "active" : ""}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          aria-label="Italic"
        >
          <ItalicOutlined />
        </button>
      </Tooltip>
      <Tooltip title={`Underline (${getShortcutLabel("Mod+U")})`} placement="bottom">
        <button
          type="button"
          className={editor.isActive("underline") ? "active" : ""}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          aria-label="Underline"
        >
          <UnderlineOutlined />
        </button>
      </Tooltip>
      <Tooltip title={`Strikethrough (${getShortcutLabel("Mod+Shift+S")})`} placement="bottom">
        <button
          type="button"
          className={editor.isActive("strike") ? "active" : ""}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          aria-label="Strikethrough"
        >
          <StrikethroughOutlined />
        </button>
      </Tooltip>
      <Tooltip title={`Inline code (${getShortcutLabel("Mod+E")})`} placement="bottom">
        <button
          type="button"
          className={editor.isActive("code") ? "active" : ""}
          onClick={() => editor.chain().focus().toggleCode().run()}
          aria-label="Inline code"
        >
          <CodeOutlined />
        </button>
      </Tooltip>
      <HighlightColorDropdown editor={editor} />
      <TextColorDropdown editor={editor} />
      <span className="toolbar-sep" />
      <Tooltip title="Clear format" placement="bottom">
        <button
          type="button"
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
          aria-label="Clear format"
        >
          <ClearOutlined />
        </button>
      </Tooltip>
      <Tooltip title="Clear nodes" placement="bottom">
        <button
          type="button"
          onClick={() => editor.chain().focus().clearNodes().run()}
          aria-label="Clear nodes"
        >
          <RollbackOutlined />
        </button>
      </Tooltip>
      <span className="toolbar-sep" />
      <Dropdown
        menu={{
          selectedKeys: [blockType],
          items: [
            { key: "0", label: "Paragraph", icon: <span className="tiptap-block-icon-p">P</span> },
            { key: "1", label: "H1 - Heading 1", icon: <FontSizeOutlined /> },
            { key: "2", label: "H2 - Heading 2", icon: <NumberOutlined /> },
            { key: "3", label: "H3 - Heading 3", icon: <LineHeightOutlined /> },
            { key: "4", label: "H4 - Heading 4", icon: <LineHeightOutlined /> },
            { key: "5", label: "H5 - Heading 5", icon: <LineHeightOutlined /> },
            { key: "6", label: "H6 - Heading 6", icon: <LineHeightOutlined /> },
          ] as MenuProps["items"],
          onClick: ({ key }) => {
            if (key === "0") {
              editor.chain().focus().setParagraph().run();
            } else {
              editor.chain().focus().toggleHeading({ level: Number(key) as 1 | 2 | 3 | 4 | 5 | 6 }).run();
            }
          },
        }}
        trigger={["click"]}
      >
        <Tooltip title={`Paragraph / Heading (${getShortcutLabel("Mod+Alt+1–6")})`} placement="bottom">
          <button
            type="button"
            className={blockType === "0" ? "" : "active"}
            aria-label="Paragraph / Heading"
          >
            <span className="tiptap-heading-trigger" style={{ display: "flex", alignItems: "center", gap: 4 }}>
              {blockType === "0" ? <span className="tiptap-block-icon-p">P</span> : `H${blockType}`}
              <DownOutlined style={{ fontSize: 10 }} />
            </span>
          </button>
        </Tooltip>
      </Dropdown>
      <span className="toolbar-sep" />
      <Tooltip title={`Bullet list (${getShortcutLabel("Mod+Shift+8")})`} placement="bottom">
        <button
          type="button"
          className={editor.isActive("bulletList") ? "active" : ""}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          aria-label="Bullet list"
        >
          <UnorderedListOutlined />
        </button>
      </Tooltip>
      <Tooltip title={`Ordered list (${getShortcutLabel("Mod+Shift+7")})`} placement="bottom">
        <button
          type="button"
          className={editor.isActive("orderedList") ? "active" : ""}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          aria-label="Ordered list"
        >
          <OrderedListOutlined />
        </button>
      </Tooltip>
      <Tooltip title={`Task list (${getShortcutLabel("Mod+Shift+9")})`} placement="bottom">
        <button
          type="button"
          className={editor.isActive("taskList") ? "active" : ""}
          onClick={() => editor.chain().focus().toggleTaskList().run()}
          aria-label="Task list"
        >
          <CheckSquareOutlined />
        </button>
      </Tooltip>
      <span className="toolbar-sep" />
      <Tooltip title={`Blockquote (${getShortcutLabel("Mod+Shift+B")})`} placement="bottom">
        <button
          type="button"
          className={editor.isActive("blockquote") ? "active" : ""}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          aria-label="Blockquote"
        >
          <BlockOutlined />
        </button>
      </Tooltip>
      <Tooltip title={`Code block (${getShortcutLabel("Mod+Alt+C")})`} placement="bottom">
        <button
          type="button"
          className={editor.isActive("codeBlock") ? "active" : ""}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          aria-label="Code block"
        >
          <CodeOutlined />
        </button>
      </Tooltip>
      <Tooltip title={`Horizontal rule (${getShortcutLabel("Mod+Shift+-")})`} placement="bottom">
        <button
          type="button"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          aria-label="Horizontal rule"
        >
          <BorderHorizontalOutlined />
        </button>
      </Tooltip>
      <Tooltip title="Hard break (Shift+Enter)" placement="bottom">
        <button
          type="button"
          onClick={() => editor.chain().focus().setHardBreak().run()}
          aria-label="Hard break"
        >
          <EnterOutlined />
        </button>
      </Tooltip>
      <span className="toolbar-sep" />
      <LinkPopoverButton
        editor={editor}
        open={linkPopoverOpen}
        onOpenChange={setLinkPopoverOpen}
      />
      <ImagePopoverButton editor={editor} />
      <VideoPopoverButton editor={editor} />
      <YoutubePopoverButton editor={editor} />
      <span className="toolbar-sep" />
      <Tooltip title={`Align left (${getShortcutLabel("Mod+Shift+L")})`} placement="bottom">
        <button
          type="button"
          className={editor.isActive({ textAlign: "left" }) ? "active" : ""}
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          aria-label="Align left"
        >
          <AlignLeftIcon />
        </button>
      </Tooltip>
      <Tooltip title={`Center (${getShortcutLabel("Mod+Shift+E")})`} placement="bottom">
        <button
          type="button"
          className={editor.isActive({ textAlign: "center" }) ? "active" : ""}
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          aria-label="Center"
        >
          <AlignCenterIcon />
        </button>
      </Tooltip>
      <Tooltip title={`Align right (${getShortcutLabel("Mod+Shift+R")})`} placement="bottom">
        <button
          type="button"
          className={editor.isActive({ textAlign: "right" }) ? "active" : ""}
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          aria-label="Align right"
        >
          <AlignRightIcon />
        </button>
      </Tooltip>
      <Tooltip title={`Justify (${getShortcutLabel("Mod+Shift+J")})`} placement="bottom">
        <button
          type="button"
          className={editor.isActive({ textAlign: "justify" }) ? "active" : ""}
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          aria-label="Justify"
        >
          <AlignJustifyIcon />
        </button>
      </Tooltip>
    </div>
  );
};
