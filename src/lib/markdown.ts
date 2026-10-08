import type { Element, Root } from "hast";
import { unified } from "@astrojs/markdown-remark";
import type { AstroUserConfig } from "astro";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import { visit } from "unist-util-visit";

export function rehypeFigures() {
  return (tree: Root) => {
    visit(tree, "element", (node) => {
      if (node.tagName !== "p") return;
      const children = node.children.filter(
        (child) => child.type !== "text" || child.value.trim() !== "",
      );
      const image = children[0];
      if (children.length !== 1 || image?.type !== "element" || image.tagName !== "img") return;

      node.tagName = "figure";
      node.children = [image];
      const title = image.properties.title;
      if (typeof title !== "string" || title.trim() === "") return;

      const caption: Element = {
        type: "element",
        tagName: "figcaption",
        properties: {},
        children: [{ type: "text", value: title }],
      };
      delete image.properties.title;
      node.children.push(caption);
    });
  };
}

export const markdownOptions = {
  syntaxHighlight: false,
  processor: unified({
    gfm: false,
    smartypants: false,
    rehypePlugins: [
      rehypeFigures,
      [rehypeSanitize, {
        ...defaultSchema,
        tagNames: [...(defaultSchema.tagNames ?? []), "figure", "figcaption"],
      }],
    ],
  }),
} satisfies NonNullable<AstroUserConfig["markdown"]>;
