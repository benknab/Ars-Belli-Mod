/**
 * Syncs the Ars Belli MP Mod design document from Google Docs to local markdown files.
 *
 * Usage:
 *   deno run --allow-net --allow-write --allow-read scripts/sync-doc.ts
 *
 * This fetches the Google Doc as HTML, parses it, converts to markdown,
 * and writes one file per top-level (h1) section into the docs/ folder.
 */

import { DOMParser, Element, Node } from "jsr:@b-fuze/deno-dom";

const DOC_ID = "1VPUVjGxkVeCmzmg8pG48wF0XbuIY_n3DjZziTgRjhWE";
const EXPORT_URL = `https://docs.google.com/document/d/${DOC_ID}/export?format=html`;
const DOCS_DIR = "docs";

// --- CSS class detection ---

/** Parse the <style> block to find which classes map to bold/italic/underline */
function parseCssClasses(styleText: string): {
  boldClasses: Set<string>;
  italicClasses: Set<string>;
  underlineClasses: Set<string>;
} {
  const boldClasses = new Set<string>();
  const italicClasses = new Set<string>();
  const underlineClasses = new Set<string>();

  // Match class definitions like .c0{font-weight:700}
  const classRegex = /\.(c\d+)\s*\{([^}]+)\}/g;
  let match;
  while ((match = classRegex.exec(styleText)) !== null) {
    const [, className, props] = match;
    if (/font-weight\s*:\s*700/.test(props)) boldClasses.add(className);
    if (/font-style\s*:\s*italic/.test(props)) italicClasses.add(className);
    if (/text-decoration\s*:\s*underline/.test(props))
      underlineClasses.add(className);
  }

  return { boldClasses, italicClasses, underlineClasses };
}

// --- HTML to Markdown conversion ---

interface ConvertContext {
  boldClasses: Set<string>;
  italicClasses: Set<string>;
  underlineClasses: Set<string>;
}

/** Get list nesting level from ul/ol class attribute */
function getListLevel(el: Element): number {
  const classes = el.getAttribute("class") ?? "";
  const levelMatch = classes.match(/lst-kix_\w+-(\d+)/);
  return levelMatch ? parseInt(levelMatch[1], 10) : 0;
}

/** Check if an element is a comment footnote div */
function isCommentDiv(el: Element): boolean {
  return (
    el.tagName === "DIV" && (el.getAttribute("class") ?? "").includes("c41")
  );
}

/** Get text content, stripping comment references like [a], [b] */
function stripCommentRefs(text: string): string {
  return text.replace(/\[[a-z]\]/g, "");
}

/** Convert inline spans to markdown text */
function convertInline(node: Node, ctx: ConvertContext): string {
  if (node.nodeType === 3) {
    // Text node
    return node.textContent ?? "";
  }

  if (node.nodeType !== 1) return "";

  const el = node as Element;
  const tag = el.tagName;

  // Skip comment reference links entirely
  if (tag === "SUP") return "";

  if (tag === "A") {
    const href = el.getAttribute("href") ?? "";
    // Skip internal comment anchors
    if (href.startsWith("#cmnt") || (el.getAttribute("id") ?? "").startsWith("cmnt")) {
      return "";
    }
  }

  // Recursively convert children
  let text = "";
  for (const child of el.childNodes) {
    text += convertInline(child, ctx);
  }

  if (!text.trim()) return text;

  // Detect formatting from classes
  const classes = (el.getAttribute("class") ?? "").split(/\s+/);
  const isBold = classes.some((c) => ctx.boldClasses.has(c));
  const isItalic = classes.some((c) => ctx.italicClasses.has(c));

  if (isBold && isItalic) {
    text = `***${text.trim()}***`;
    // Preserve surrounding whitespace
    const pre = (el.textContent ?? "").match(/^\s+/) ? " " : "";
    const post = (el.textContent ?? "").match(/\s+$/) ? " " : "";
    text = pre + text + post;
  } else if (isBold) {
    const trimmed = text.trim();
    const pre = text.startsWith(" ") || text.startsWith("\u00a0") ? " " : "";
    const post = text.endsWith(" ") || text.endsWith("\u00a0") ? " " : "";
    text = `${pre}**${trimmed}**${post}`;
  } else if (isItalic) {
    const trimmed = text.trim();
    const pre = text.startsWith(" ") || text.startsWith("\u00a0") ? " " : "";
    const post = text.endsWith(" ") || text.endsWith("\u00a0") ? " " : "";
    text = `${pre}*${trimmed}*${post}`;
  }

  return text;
}

/** Convert a <p> element to markdown */
function convertParagraph(el: Element, ctx: ConvertContext): string {
  let text = "";
  for (const child of el.childNodes) {
    text += convertInline(child, ctx);
  }
  text = stripCommentRefs(text);
  // Normalize non-breaking spaces
  text = text.replace(/\u00a0/g, " ");
  return text.trim();
}

/** Convert a <table> to markdown */
function convertTable(el: Element, ctx: ConvertContext): string {
  const rows: string[][] = [];
  for (const tr of el.querySelectorAll("tr")) {
    const cells: string[] = [];
    for (const td of tr.querySelectorAll("td")) {
      // Each td can have multiple <p> inside
      const parts: string[] = [];
      for (const p of td.querySelectorAll("p")) {
        const t = convertParagraph(p as Element, ctx);
        if (t) parts.push(t);
      }
      cells.push(parts.join(" / ") || "");
    }
    rows.push(cells);
  }

  if (rows.length === 0) return "";

  // Determine column count from max cells in any row
  const colCount = Math.max(...rows.map((r) => r.length));

  // Pad rows to have equal columns
  for (const row of rows) {
    while (row.length < colCount) row.push("");
  }

  // Escape pipes in cell content
  const escapeCell = (s: string) => s.replace(/\|/g, "\\|");

  const lines: string[] = [];
  // Header row
  const header = rows[0];
  lines.push("| " + header.map(escapeCell).join(" | ") + " |");
  lines.push("| " + header.map(() => "---").join(" | ") + " |");
  // Data rows
  for (let i = 1; i < rows.length; i++) {
    lines.push("| " + rows[i].map(escapeCell).join(" | ") + " |");
  }

  return lines.join("\n");
}

/** Convert a list (ul/ol) to markdown. Returns the lines and last level used. */
function convertListItem(
  el: Element,
  ctx: ConvertContext,
  level: number,
  ordered: boolean,
  counter: number
): string {
  const indent = "  ".repeat(level);
  const bullet = ordered ? `${counter}.` : "-";

  // The <li> typically contains spans directly or has a <p> child
  const pChild = el.querySelector("p");
  let text: string;
  if (pChild) {
    text = convertParagraph(pChild as Element, ctx);
  } else {
    let raw = "";
    for (const child of el.childNodes) {
      raw += convertInline(child, ctx);
    }
    text = stripCommentRefs(raw).replace(/\u00a0/g, " ").trim();
  }

  if (!text) return "";
  return `${indent}${bullet} ${text}`;
}

// --- Section splitting and file writing ---

interface Section {
  title: string;
  content: string[];
}

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Walk body children, split into sections by h1 */
function splitIntoSections(
  body: Element,
  ctx: ConvertContext
): Section[] {
  const sections: Section[] = [];
  let current: Section | null = null;

  // Track list counters for ordered lists
  let listCounters: Map<string, number> = new Map();

  for (const node of body.children) {
    const el = node as Element;
    const tag = el.tagName;

    // Skip comment divs at the bottom
    if (isCommentDiv(el)) continue;

    if (tag === "H1") {
      const title = (el.textContent ?? "").trim();
      // Skip empty h1s and table of contents
      if (
        !title ||
        title.toLowerCase() === "table of contents" ||
        title.toLowerCase().startsWith("table of contents")
      ) {
        continue;
      }
      // Start a new section
      current = { title, content: [] };
      sections.push(current);
      continue;
    }

    // If no section started yet (pre-h1 content), skip
    if (!current) continue;

    if (tag === "H2") {
      const title = (el.textContent ?? "").trim();
      if (title) {
        current.content.push(`## ${title}`);
        current.content.push("");
      }
      continue;
    }

    if (tag === "H3") {
      const title = (el.textContent ?? "").trim();
      if (title) {
        current.content.push(`### ${title}`);
        current.content.push("");
      }
      continue;
    }

    if (tag === "P") {
      const text = convertParagraph(el, ctx);
      if (text) {
        current.content.push(text);
        current.content.push("");
      }
      continue;
    }

    if (tag === "UL" || tag === "OL") {
      const ordered = tag === "OL";
      const level = getListLevel(el);

      // Determine list id for counter tracking
      const classes = el.getAttribute("class") ?? "";
      const listIdMatch = classes.match(/lst-(kix_\w+)-\d+/);
      const listId = listIdMatch ? listIdMatch[1] : "";
      const startAttr = el.getAttribute("start");

      if (ordered && startAttr) {
        listCounters.set(`${listId}-${level}`, parseInt(startAttr, 10));
      } else if (ordered && classes.includes("start")) {
        listCounters.set(`${listId}-${level}`, 1);
      }

      const items = el.querySelectorAll(":scope > li");
      for (const li of items) {
        const counterKey = `${listId}-${level}`;
        const counter = listCounters.get(counterKey) ?? 1;
        const line = convertListItem(
          li as Element,
          ctx,
          level,
          ordered,
          counter
        );
        if (line) {
          current.content.push(line);
        }
        if (ordered) {
          listCounters.set(counterKey, counter + 1);
        }
      }

      // Add blank line after list only if the next sibling is not another list at deeper level
      const nextSib = el.nextElementSibling;
      const isNextListContinuation =
        nextSib &&
        (nextSib.tagName === "UL" || nextSib.tagName === "OL") &&
        (nextSib.getAttribute("class") ?? "").includes(listId);
      if (!isNextListContinuation) {
        current.content.push("");
      }
      continue;
    }

    if (tag === "TABLE") {
      const table = convertTable(el, ctx);
      if (table) {
        current.content.push(table);
        current.content.push("");
      }
      continue;
    }

    if (tag === "HR") {
      current.content.push("---");
      current.content.push("");
      continue;
    }
  }

  return sections;
}

/** Clean up markdown: remove excessive blank lines, trailing spaces */
function cleanMarkdown(lines: string[]): string {
  let md = lines.join("\n");
  // Collapse 3+ newlines into 2
  md = md.replace(/\n{3,}/g, "\n\n");
  // Remove trailing whitespace on each line
  md = md
    .split("\n")
    .map((l) => l.trimEnd())
    .join("\n");
  // Ensure single trailing newline
  md = md.trimEnd() + "\n";
  return md;
}

// --- Main ---

async function main() {
  console.log(`Fetching Google Doc (${DOC_ID})...`);
  const response = await fetch(EXPORT_URL);
  if (!response.ok) {
    console.error(`Failed to fetch document: ${response.status} ${response.statusText}`);
    Deno.exit(1);
  }

  const html = await response.text();
  console.log(`Fetched ${html.length} bytes of HTML`);

  const doc = new DOMParser().parseFromString(html, "text/html");
  if (!doc) {
    console.error("Failed to parse HTML");
    Deno.exit(1);
  }

  // Parse CSS classes for formatting detection
  const styleEl = doc.querySelector("style");
  const styleText = styleEl?.textContent ?? "";
  const ctx = parseCssClasses(styleText);
  console.log(
    `CSS classes - bold: [${[...ctx.boldClasses].join(", ")}], italic: [${[...ctx.italicClasses].join(", ")}]`
  );

  const body = doc.querySelector("body");
  if (!body) {
    console.error("No <body> element found");
    Deno.exit(1);
  }

  const sections = splitIntoSections(body as Element, ctx);
  console.log(`Found ${sections.length} sections`);

  // Create docs directory
  await Deno.mkdir(DOCS_DIR, { recursive: true });

  // Remove existing markdown files in docs/
  for await (const entry of Deno.readDir(DOCS_DIR)) {
    if (entry.name.endsWith(".md")) {
      await Deno.remove(`${DOCS_DIR}/${entry.name}`);
    }
  }

  // Write each section
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    const num = String(i + 1).padStart(2, "0");
    const slug = slugify(section.title);
    const filename = `${num}-${slug}.md`;
    const filepath = `${DOCS_DIR}/${filename}`;

    const header = `# ${section.title}\n\n`;
    const content = cleanMarkdown(section.content);
    const fullContent = header + content;

    await Deno.writeTextFile(filepath, fullContent);
    console.log(`  ${filename} (${fullContent.length} bytes)`);
  }

  console.log(`\nDone! Wrote ${sections.length} files to ${DOCS_DIR}/`);
}

main();
