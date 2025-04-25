import { Request, Response } from "express";
import { ImageProcessor } from "../services/image-processor.service";
import { uploadToS3 } from "../utils/s3";
import { create as createFile } from "../services/files.service";
import { CreateFileDto } from "../interfaces/create-file.dto";

export async function processImageHandler(
  req: Request,
  res: Response
): Promise<void> {
    console.log("🔥 Requisição recebida em /image-upload/upload");

  const file = req.file;
  const { targetResolution, customWidth, customHeight, keepAspectRatio } = req.body;

  if (!file || !targetResolution) {
    res.status(400).json({ error: "File and targetResolution are required" });
    return;
  }

  const width = parseInt(customWidth) || 300;
  const height = parseInt(customHeight) || 300;

  const shouldKeepAspectRatio =
    keepAspectRatio === "true" || keepAspectRatio === true;

  try {
    const processedBuffer = await ImageProcessor.resizeImage(
      file.buffer,
      width,
      height,
      file.mimetype,
      shouldKeepAspectRatio
    );

    const uploadResult = await uploadToS3({
      originalname: file.originalname,
      mimetype: file.mimetype,
      buffer: processedBuffer,
    });

    const fileRecord: CreateFileDto = {
      originalname: file.originalname,
      mimetype: file.mimetype,
      url: uploadResult.Location,
      size: processedBuffer.length,
    };

    const saved = await createFile(fileRecord);
    res.status(201).json(saved);
  } catch (error: any) {
    console.error("Erro completo no processImageHandler:", error);
    const errorMessage =
      error?.message || "Erro desconhecido ao processar imagem";
    const statusCode = errorMessage.includes("distorcem o formato original")
      ? 400
      : 500;

    res.status(statusCode).json({
      error: "Erro ao processar imagem",
      detail: errorMessage,
    });
  }
}
