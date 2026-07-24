import { createServer } from "node:http";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const exportDir = path.join(projectRoot, "design-sync");
const exportFile = path.join(exportDir, "figma-export.json");
const port = Number(process.env.FIGMA_EXPORT_PORT || 8787);
const maxBodySize = 20 * 1024 * 1024;

const send = (response, status, data) => {
  response.writeHead(status, {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json; charset=utf-8",
  });
  response.end(JSON.stringify(data, null, 2));
};

const readBody = (request) =>
  new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;

    request.on("data", (chunk) => {
      size += chunk.length;

      if (size > maxBodySize) {
        reject(new Error("Export is larger than 20 MB."));
        request.destroy();
        return;
      }

      chunks.push(chunk);
    });

    request.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    request.on("error", reject);
  });

const server = createServer(async (request, response) => {
  if (request.method === "OPTIONS") {
    send(response, 200, { ok: true });
    return;
  }

  if (request.method === "GET" && request.url === "/health") {
    send(response, 200, { ok: true, file: exportFile });
    return;
  }

  if (request.method === "POST" && request.url === "/figma-export") {
    try {
      const body = await readBody(request);
      const data = JSON.parse(body);
      const savedAt = new Date().toISOString();

      await mkdir(exportDir, { recursive: true });
      await writeFile(exportFile, JSON.stringify({ savedAt, ...data }, null, 2), "utf8");

      send(response, 200, { ok: true, savedAt, file: exportFile });
    } catch (error) {
      send(response, 400, { ok: false, error: error.message });
    }
    return;
  }

  send(response, 404, { ok: false, error: "Not found" });
});

server.listen(port, () => {
  console.log(`Figma export server is running: http://localhost:${port}`);
  console.log(`Exports will be saved to: ${exportFile}`);
});
