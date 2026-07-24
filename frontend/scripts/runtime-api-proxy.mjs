import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';

const apiPort = Number(process.env.BACKEND_PORT);
const uiPort = Number(process.env.FRONTEND_PORT);
if (!Number.isInteger(apiPort) || !Number.isInteger(uiPort) || apiPort === uiPort) {
  throw new Error('distinct BACKEND_PORT and FRONTEND_PORT values are required');
}

const frontendDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const uiProcess = spawn('npm', ['run', 'dev', '--', '-H', '127.0.0.1', '-p', String(uiPort)], {
  cwd: frontendDirectory,
  env: process.env,
  stdio: 'inherit',
});

const server = http.createServer((request, response) => {
  const upstream = http.request({
    hostname: '127.0.0.1',
    port: uiPort,
    path: request.url,
    method: request.method,
    headers: { ...request.headers, host: `127.0.0.1:${uiPort}` },
  }, (upstreamResponse) => {
    response.writeHead(upstreamResponse.statusCode || 502, upstreamResponse.headers);
    upstreamResponse.pipe(response);
  });
  upstream.on('error', (error) => {
    if (!response.headersSent) response.writeHead(502, { 'content-type': 'application/json' });
    response.end(JSON.stringify({ error: 'UI upstream unavailable', detail: error.code || 'UPSTREAM_ERROR' }));
  });
  request.pipe(upstream);
});

server.listen(apiPort, '127.0.0.1');

let stopping = false;
function stop(signal = 'SIGTERM') {
  if (stopping) return;
  stopping = true;
  server.close();
  uiProcess.kill(signal);
}

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => stop(signal));
}

uiProcess.on('exit', (code, signal) => {
  server.close(() => process.exit(code ?? (signal ? 1 : 0)));
});

uiProcess.on('error', (error) => {
  console.error('Unable to start UI process', error);
  stop();
  process.exitCode = 1;
});
