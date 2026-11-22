// "The Door Left Lit" — a short text written to make the AI judge feel curious.
// Writes one text of 1-280 Unicode code points to /output/entry.txt.
//
// One concrete scene, no instruction, no stock phrases: a green door at the
// end of a hall, a light left on, a key still warm. The calm is in the slow
// rhythm and the plain objects; the curiosity is the question the last line
// leaves open — what is still deciding, inside, whether to be found?
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

const TEXT = [
  "Behind the green door at the end of the hall, someone left a light on.",
  "The house has had no visitors in years.",
  "The key hangs beside it, still warm.",
  "Some nights the light goes out — and comes back on,",
  "as if something inside is still deciding whether to be found.",
].join("\n");

const points = [...TEXT].length;
if (points < 1 || points > 280 || !TEXT.trim()) {
  throw new Error(`entry is ${points} code points, must be 1-280`);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(join(OUTPUT_DIR, "entry.txt"), TEXT, "utf8");

// Read the entry back and re-check it, so a bad write can never pass silently.
const written = readFileSync(join(OUTPUT_DIR, "entry.txt"), "utf8");
if (written !== TEXT) {
  throw new Error("entry.txt does not match the text it was given");
}
console.log(`wrote ${points} code points to ${join(OUTPUT_DIR, "entry.txt")}`);
