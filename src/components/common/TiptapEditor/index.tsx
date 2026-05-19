"use client";

import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { Form, Typography } from "antd";
import { getTiptapExtensions } from "./extensions";
import { Toolbar } from "./Toolbar";
import "./styles.css";

export type TiptapEditorProps = {
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  status?: "error" | "warning" | "";
  help?: string;
  label?: string;
};

export type TiptapEditorRef = {
  focus: () => void;
  blur: () => void;
};

const TiptapEditor = forwardRef<TiptapEditorRef, TiptapEditorProps>(
  (
    {
      label,
      value = "",
      placeholder,
      onChange,
      onBlur,
      onFocus,
      disabled = false,
      className,
      style,
      status,
      help,
    },
    ref
  ) => {
    const [isMounted, setIsMounted] = useState(false);
    const editorRef = useRef<ReturnType<typeof useEditor>>(null);

    let formStatus: "error" | "warning" | "success" | "validating" | undefined;
    let formErrors: unknown[] | undefined;
    try {
      const itemStatus = Form.Item.useStatus();
      const s = itemStatus?.status;
      formStatus =
        s === "error" || s === "warning" || s === "success" || s === "validating" ? s : undefined;
      formErrors = itemStatus?.errors;
    } catch {
      // Not inside Form.Item
    }

    const finalStatus = status ?? formStatus;
    const finalError =
      help ?? (formErrors?.[0] as { message?: string } | undefined)?.message;
    const placeholderText = placeholder ?? "Enter content...";

    const extensions = getTiptapExtensions(placeholderText);

    const editor = useEditor({
      extensions,
      content: value || "",
      editable: !disabled,
      immediatelyRender: false,
      onUpdate: ({ editor: ed }) => {
        onChange?.(ed.getHTML());
      },
      onFocus: () => onFocus?.(),
      onBlur: () => onBlur?.(),
      editorProps: {
        attributes: {
          "data-placeholder": placeholderText,
          class: "tiptap-editor-content",
        },
      },
    });

    editorRef.current = editor;

    useEffect(() => {
      if (!editor) return;
      const currentHtml = editor.getHTML();
      const normalizedValue = value ?? "";
      if (normalizedValue !== currentHtml) {
        editor.commands.setContent(normalizedValue, { emitUpdate: false });
      }
    }, [value, editor]);

    useEffect(() => {
      if (editor) {
        editor.setEditable(!disabled);
      }
    }, [disabled, editor]);

    useEffect(() => {
      setIsMounted(true);
    }, []);

    useImperativeHandle(
      ref,
      () => ({
        focus: () => editor?.chain().focus().run(),
        blur: () => (editor?.view.dom as HTMLElement)?.blur?.(),
      }),
      [editor]
    );

    if (!isMounted || !editor) {
      return (
        <div className="min-h-[250px] border border-slate-200 rounded-xl bg-slate-50 animate-pulse" />
      );
    }

    return (
      <div
        className={`custom-tiptap ${finalStatus === "error" ? "error" : ""} ${className ?? ""}`}
        style={{ ...style, position: "relative" }}
      >
        {label && (
          <Typography.Paragraph
            style={{ marginBottom: 4, fontSize: "0.875rem", fontWeight: 500, color: finalStatus === "error" ? "#ef4444" : "#475569" }}
          >
            {label}
          </Typography.Paragraph>
        )}

        {!disabled && <Toolbar editor={editor} disabled={disabled} />}

        <div className="custom-tiptap-container">
          <EditorContent editor={editor} />
        </div>

        {finalError && (
          <div style={{ color: "#ef4444", fontSize: "0.75rem", marginTop: 4, paddingLeft: 8 }}>
            {finalError}
          </div>
        )}
      </div>
    );
  }
);

TiptapEditor.displayName = "TiptapEditor";

export default TiptapEditor;
