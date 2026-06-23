import crypto from 'crypto';

const cache = new Map<string, string>();

let _tex2svg: ((source: string, options?: { showConsole?: boolean }) => Promise<string>) | null = null;

async function getTex2svg() {
  if (!_tex2svg) {
    const mod = await import('node-tikzjax');
    // Handle CJS/ESM interop: the default export may be the function directly
    // or nested behind .default depending on the bundler
    _tex2svg = (mod as any).default?.default || mod.default || (mod as any);
  }
  return _tex2svg;
}

function hash(source: string): string {
  return crypto.createHash('sha256').update(source).digest('hex').slice(0, 16);
}

function wrapTikzCode(code: string): string {
  return `\\usepackage{tikz}
\\usetikzlibrary{arrows.meta,calc,positioning,shapes,shapes.geometric,decorations.pathmorphing,patterns,fit,backgrounds}
\\begin{document}
${code.trim()}
\\end{document}`;
}

export async function renderTikz(code: string): Promise<string> {
  const key = hash(code);
  const cached = cache.get(key);
  if (cached) return cached;

  const source = wrapTikzCode(code);
  const tex2svg = await getTex2svg();
  try {
    const svg = await tex2svg!(source, { showConsole: false });
    const match = svg.match(/<svg[\s\S]*<\/svg>/);
    const result = match ? match[0] : svg;
    cache.set(key, result);
    return result;
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    const errorSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="80" viewBox="0 0 400 80">
  <rect width="400" height="80" rx="8" fill="#fee2e2" stroke="#ef4444" stroke-width="1"/>
  <text x="200" y="32" text-anchor="middle" fill="#dc2626" font-size="13" font-family="system-ui, sans-serif" font-weight="bold">TikZ 渲染失败</text>
  <text x="200" y="54" text-anchor="middle" fill="#991b1b" font-size="11" font-family="monospace">${message.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').slice(0, 80)}</text>
</svg>`;
    cache.set(key, errorSvg);
    return errorSvg;
  }
}
