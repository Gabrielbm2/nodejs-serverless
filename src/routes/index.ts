import { Router } from "express";
import filesRoutes from "./files.routes";
import imageUploadRoutes from "./image-upload.routes";

const router = Router();

router.use(filesRoutes);
router.use(imageUploadRoutes);

export default router;
