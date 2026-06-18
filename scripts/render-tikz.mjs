// Batch TikZ renderer: reads JSON array of code blocks from stdin, outputs JSON array of SVGs
import { createRequire } from 'module';
import { createInterface } from 'readline';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const tex2svg = require('node-tikzjax').default;

function wrapTikzCode(code) {
  return `\\usepackage{tikz}
\\usetikzlibrary{arrows.meta,calc,positioning,shapes,shapes.geometric,decorations.pathmorphing,patterns,fit,backgrounds}
\\begin{document}
${code.trim()}
\\end{document}`;
}

async function main() {
  const rl = createInterface({ input: process.stdin });
  let raw = '';
  for await (const line of rl) {
    raw += line;
  }

  let blocks;
  try {
    blocks = JSON.parse(raw);
  } catch (e) {
    process.stderr.write('Invalid JSON input: ' + e.message + '\n');
    process.exit(1);
  }

  const results = [];
  for (const code of blocks) {
    try {
      const source = wrapTikzCode(code);
      const svg = await tex2svg(source, { showConsole: false });
      const match = svg.match(/<svg[\s\S]*<\/svg>/);
      results.push(match ? match[0] : svg);
    } catch (err) {
      process.stderr.write('tikz render error: ' + err.message + '\n');
      results.push(`<span class="tikz-error">Error: ${err.message}</span>`);
    }
  }

  process.stdout.write(JSON.stringify(results));
}

main().catch((err) => {
  process.stderr.write('Fatal error: ' + (err.stack || err.message) + '\n');
  process.exit(1);
});
