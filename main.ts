// Pigeon Pitch, One Line — make.fun entry
// Writes the one-line elevator pitch to /output/entry.txt.
// Runs on Node 22, no network, no dependencies.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ENTRY =
  "I'm raising a seed round — literally. I'm the city's fastest coo-rier: lunch delivered by beak before your elevator dings, and I work for crumbs.";

const here = dirname(fileURLToPath(import.meta.url));
const entryPath = join(here, "entry.txt");

// The pitch lives in entry.txt next to this program; read it so the
// shipped text is exactly what gets written out.
const text = readFileSync(entryPath, "utf8").trim();
if (text !== ENTRY) {
  throw new Error("entry.txt does not match the pitch in main.ts");
}
// Count Unicode code points (not UTF-16 units, not bytes): the gate counts
// characters, and the pitch's em dashes must count as one character each.
const length = [...text].length;
if (length < 1 || length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${length}`);
}
if (/\n/.test(text)) {
  throw new Error("entry must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), text, "utf8");
console.log(`Wrote ${length} characters to ${join(outDir, "entry.txt")}`);
