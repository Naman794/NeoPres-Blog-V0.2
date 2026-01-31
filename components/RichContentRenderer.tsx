interface RichContentBlock {
  type: "paragraph" | "heading" | "list";
  text?: string;
  level?: 2 | 3 | 4;
  items?: string[];
}

interface RichContentRendererProps {
  content: RichContentBlock[] | { blocks?: RichContentBlock[] } | null;
}

const RichContentRenderer = ({ content }: RichContentRendererProps) => {
  const blocks = Array.isArray(content)
    ? content
    : content?.blocks && Array.isArray(content.blocks)
      ? content.blocks
      : [];

  return (
    <div className="space-y-4">
      {blocks.map((block, index) => {
        if (block.type === "heading") {
          const HeadingTag = block.level === 4 ? "h4" : block.level === 3 ? "h3" : "h2";
          return (
            <HeadingTag key={`${block.type}-${index}`} className="text-xl font-semibold text-slate-900">
              {block.text}
            </HeadingTag>
          );
        }

        if (block.type === "list" && block.items) {
          return (
            <ul key={`${block.type}-${index}`} className="list-disc space-y-2 pl-5 text-slate-700">
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          );
        }

        return (
          <p key={`${block.type}-${index}`} className="text-sm text-slate-700">
            {block.text}
          </p>
        );
      })}
    </div>
  );
};

export default RichContentRenderer;
