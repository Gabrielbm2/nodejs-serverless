import express from "express";
import { uploadMiddleware } from "../utils/upload";
import { processImageHandler } from "../controllers/image-upload.controller";

const router = express.Router();

router.post("/image-upload/upload", uploadMiddleware, processImageHandler);

export default router;
