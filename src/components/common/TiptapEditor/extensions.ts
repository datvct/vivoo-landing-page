import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Youtube from "@tiptap/extension-youtube";
import Highlight from "@tiptap/extension-highlight";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Placeholder from "@tiptap/extension-placeholder";

export const getTiptapExtensions = (placeholderText: string) => {
  return [
    StarterKit.configure({
      heading: {
        levels: [1, 2, 3, 4, 5, 6],
      },
      codeBlock: {
        HTMLAttributes: {
          class: "tiptap-code-block",
        },
      },
    }),
    Underline,
    TextAlign.configure({
      types: ["heading", "paragraph"],
    }),
    Link.configure({
      openOnClick: false,
      HTMLAttributes: {
        class: "tiptap-link",
        rel: "noopener noreferrer",
        target: "_blank",
      },
    }),
    Image.configure({
      HTMLAttributes: {
        class: "tiptap-image",
      },
    }),
    Youtube.configure({
      width: 640,
      height: 480,
      HTMLAttributes: {
        class: "tiptap-youtube",
      },
    }),
    Highlight.configure({
      multicolor: true,
    }),
    TextStyle,
    Color,
    TaskList.configure({
      HTMLAttributes: {
        class: "tiptap-task-list",
      },
    }),
    TaskItem.configure({
      nested: true,
      HTMLAttributes: {
        class: "tiptap-task-item",
      },
    }),
    Placeholder.configure({
      placeholder: placeholderText,
    }),
  ];
};
