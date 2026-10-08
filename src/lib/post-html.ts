import { fromHtml } from "hast-util-from-html";
import { toHtml } from "hast-util-to-html";
import { toText } from "hast-util-to-text";
import { visit, EXIT } from "unist-util-visit";

export function getExcerpt(html: string): string {
  const tree = fromHtml(html, { fragment: true });
  let excerpt = "";
  visit(tree, "element", (node) => {
    if (node.tagName !== "p") return;
    const text = toText(node).trim();
    if (!text) return;
    excerpt = text;
    return EXIT;
  });
  return excerpt;
}

export function getFeedHtml(html: string, siteUrl: string): string {
  const tree = fromHtml(html, { fragment: true });
  visit(tree, "element", (node) => {
    for (const attribute of ["src", "href"]) {
      const value = node.properties[attribute];
      if (typeof value === "string" && /^(?:\/|\.|#)/.test(value)) {
        node.properties[attribute] = new URL(value, siteUrl).href;
      }
    }
  });
  return toHtml(tree);
}
