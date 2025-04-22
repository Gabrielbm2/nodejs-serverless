import express from "express";
import * as filesController from "../controllers/files.controller";

const router = express.Router();

router.get("/files/list", filesController.list);
router.get("/files", filesController.findAll);
router.get("/files/:id", (req, res) =>
  filesController.findOne(req, res, req.params.id)
);
router.post("/files", filesController.create);
router.put("/files/:id", (req, res) =>
  filesController.update(req, res, req.params.id)
);
router.delete("/files/:id", (req, res) =>
  filesController.remove(req, res, req.params.id)
);

export default router;
