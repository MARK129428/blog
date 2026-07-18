// Using Function constructor to hide spawn() from Turbopack's static dependency analysis.
// Turbopack traces all import-level calls and tries to resolve spawn arguments as modules.
const factory = new Function(
  'codes',
  `
  var spawn = require('child_process').spawn;
  var path = require('path');

  return new Promise(function (resolve) {
    var scriptPath = path.resolve(process.cwd(), 'scripts', 'render-tikz.mjs');
    var input = JSON.stringify(codes);
    var child = spawn('node', [scriptPath], {
      stdio: ['pipe', 'pipe', 'pipe'],
      timeout: 60000,
    });

    var stdout = '';
    var stderr = '';

    child.stdout.on('data', function (d) { stdout += d; });
    child.stderr.on('data', function (d) { stderr += d; });

    child.on('error', function (err) {
      console.error('[tikz] spawn error:', err.message);
      resolve(codes.map(function () { return '<span class=\\"tikz-error\\">Error: render process failed</span>'; }));
    });

    child.on('close', function (code) {
      if (stderr) console.error('[tikz]', stderr.trim());
      if (code !== 0) {
        console.error('[tikz] exit code:', code);
        resolve(codes.map(function () { return '<span class=\\"tikz-error\\">Error: render process failed</span>'; }));
        return;
      }
      try {
        resolve(JSON.parse(stdout));
      } catch (err) {
        console.error('[tikz] parse error:', err.message);
        resolve(codes.map(function () { return '<span class=\\"tikz-error\\">Error: invalid output</span>'; }));
      }
    });

    child.stdin.write(input);
    child.stdin.end();
  });
`,
);

export function batchRenderTikz(codes: string[]): Promise<string[]> {
  return factory(codes);
}
