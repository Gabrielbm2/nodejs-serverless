import { Request, Response } from "express";
import * as filesService from "../services/files.service";

export async function create(req: Request, res: Response) {
  const result = await filesService.create(req.body);
  res.status(201).json(result);
}

export async function list(_req: Request, res: Response) {
  const result = await filesService.list();
  res.status(200).json(result);
}

export async function findAll(req: Request, res: Response) {
  const params = req.query;
  const result = await filesService.findAll(params);
  res.status(200).json(result);
}

export async function findOne(req: Request, res: Response) {
  const id = req.params.id;
  const result = await filesService.findOne(id);
  res.status(200).json(result);
}

export async function update(req: Request, res: Response) {
  const id = req.params.id;
  const result = await filesService.update(id, req.body);
  res.status(200).json(result);
}

export async function remove(req: Request, res: Response) {
  const id = req.params.id;
  const result = await filesService.remove(id);
  res.status(200).json(result);
}