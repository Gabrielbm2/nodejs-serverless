import express from "express";
import * as filesController from "../controllers/files.controller";

const router = express.Router();

router.get("/files/list", filesController.list);
router.get("/files", filesController.findAll);
router.get("/files/:id", (req, res) =>
  filesController.findOne(req, res)
);
router.post("/files", filesController.create);
router.put("/files/:id", (req, res) =>
  filesController.update(req, res)
);
router.delete("/files/:id", (req, res) =>
  filesController.remove(req, res)
);

// rota de teste simples
router.get("/teste", (req, res) => {
  res.send("testando novamente");
});

export default router;
