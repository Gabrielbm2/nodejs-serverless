import { IncomingMessage, ServerResponse } from "http";
import * as filesService from "../services/files.service";
import { getRequestBody } from "../utils/http";

export async function create(req: IncomingMessage, res: ServerResponse) {
  const body = await getRequestBody(req);
  const result = await filesService.create(body);
  res.writeHead(201, { "Content-Type": "application/json" });
  res.end(JSON.stringify(result));
}

export async function list(_req: IncomingMessage, res: ServerResponse) {
  const result = await filesService.list();
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(result));
}

export async function findAll(req: IncomingMessage, res: ServerResponse) {
  const url = new URL(req.url || "", `http://${req.headers.host}`);
  const params = Object.fromEntries(url.searchParams.entries());
  const result = await filesService.findAll(params);
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(result));
}

export async function findOne(
  _req: IncomingMessage,
  res: ServerResponse,
  id: string
) {
  const result = await filesService.findOne(id);
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(result));
}

export async function update(
  req: IncomingMessage,
  res: ServerResponse,
  id: string
) {
  const body = await getRequestBody(req);
  const result = await filesService.update(id, body);
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(result));
}

export async function remove(
  _req: IncomingMessage,
  res: ServerResponse,
  id: string
) {
  const result = await filesService.remove(id);
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(result));
}
