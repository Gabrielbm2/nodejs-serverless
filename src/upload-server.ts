import express from "express";
import { uploadMiddleware } from "./utils/upload";
import { config } from "dotenv";
import { processImageHandler } from "./controllers/image-upload.controller";
config();

const app = express();

app.post("/image-upload/upload", uploadMiddleware, processImageHandler);

app.listen(process.env.PORT || 3000, () => {
  console.log(
    `Image upload server running on port ${process.env.PORT || 3000}`
  );
});
