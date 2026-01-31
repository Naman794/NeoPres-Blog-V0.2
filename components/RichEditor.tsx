"use client";

import { useEffect, useRef, useState } from "react";

interface RichEditorBlock {
  type: "paragraph" | "heading" | "list";
  text?: string;
  level?: 1 | 2 | 3 | 4;
  items?: string[];
}

interface RichEditorProps {
  value: RichEditorBlock[];
  onChange: (value: RichEditorBlock[]) => void;
}

const blocksToHtml = (blocks: RichEditorBlock[]) => {
  return blocks
    .map((block) => {
      if (block.type === "heading") {
        const tag =
          block.level === 4
            ? "h4"
            : block.level === 3
              ? "h3"
              : block.level === 2
                ? "h2"
                : "h1";
        return `<${tag}>${block.text ?? ""}</${tag}>`;
      }
      if (block.type === "list" && block.items) {
        const items = block.items.map((item) => `<li>${item}</li>`).join("");
        return `<ul>${items}</ul>`;
      }
      return `<p>${block.text ?? ""}</p>`;
    })
    .join("");
};

const htmlToBlocks = (html: string): RichEditorBlock[] => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const blocks: RichEditorBlock[] = [];

  doc.body.childNodes.forEach((node) => {
    if (node.nodeType !== Node.ELEMENT_NODE) {
      return;
    }
    const element = node as HTMLElement;
    if (
      element.tagName === "H1" ||
      element.tagName === "H2" ||
      element.tagName === "H3" ||
      element.tagName === "H4"
    ) {
      blocks.push({
        type: "heading",
        level:
          element.tagName === "H4"
            ? 4
            : element.tagName === "H3"
              ? 3
              : element.tagName === "H2"
                ? 2
                : 1,
        text: element.textContent ?? "",
      });
      return;
    }
    if (element.tagName === "UL") {
      const items = Array.from(element.querySelectorAll("li")).map(
        (item) => item.textContent ?? "",
      );
      blocks.push({ type: "list", items });
      return;
    }
    blocks.push({ type: "paragraph", text: element.textContent ?? "" });
  });

  return blocks;
};

const RichEditor = ({ value, onChange }: RichEditorProps) => {
  const [html, setHtml] = useState(() => blocksToHtml(value));
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHtml(blocksToHtml(value));
  }, [value]);

  const updateContent = (nextHtml: string) => {
    setHtml(nextHtml);
    onChange(htmlToBlocks(nextHtml));
  };

  const applyCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      updateContent(editorRef.current.innerHTML);
    }
  };

  const handleCreateLink = () => {
    const url = window.prompt("Link URL");
    if (!url) {
      return;
    }
    if (url.trim().toLowerCase().startsWith("javascript:")) {
      window.alert("Invalid link.");
      return;
    }
    applyCommand("createLink", url);
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <button
          className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium"
          type="button"
          onClick={() => applyCommand("bold")}
        >
          Bold
        </button>
        <button
          className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium"
          type="button"
          onClick={() => applyCommand("italic")}
        >
          Italic
        </button>
        <button
          className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium"
          type="button"
          onClick={() => applyCommand("formatBlock", "<h1>")}
        >
          H1
        </button>
        <button
          className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium"
          type="button"
          onClick={() => applyCommand("formatBlock", "<h2>")}
        >
          H2
        </button>
        <button
          className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium"
          type="button"
          onClick={() => applyCommand("insertUnorderedList")}
        >
          List
        </button>
        <button
          className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium"
          type="button"
          onClick={handleCreateLink}
        >
          Link
        </button>
      </div>
      <div
        ref={editorRef}
        className="min-h-[220px] rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-700"
        contentEditable
        suppressContentEditableWarning
        onInput={(event) => updateContent(event.currentTarget.innerHTML)}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
};

export default RichEditor;
