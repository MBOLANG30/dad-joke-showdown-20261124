import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Dad Joke Showdown — one original dad joke, the whole entry.
// The pun: hair grows, and a dad grows on people. Delivered straight-faced,
// no wink, no laugh track — the groan is the point.
const JOKE =
  "I asked my dad why he never gets a haircut. He said, 'I'm trying to grow on people.'";

// The gate: entry.txt must be UTF-8 text of 1 to 200 characters,
// not only white space. Fail loudly here instead of shipping a bad entry.
function validateJoke(text: string): void {
  if (text.length < 1 || text.length > 200) {
    throw new Error(
      `joke must be 1-200 characters, got ${text.length}`,
    );
  }
  if (text.trim().length === 0) {
    throw new Error("joke must not be only white space");
  }
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

validateJoke(JOKE);

// Create the output dir if missing, but NEVER delete it or its contents:
// the grader mounts it.
mkdirSync(outDir, { recursive: true });

// Exactly the joke: no trailing newline, no extra text.
writeFileSync(join(outDir, "entry.txt"), JOKE, "utf8");
