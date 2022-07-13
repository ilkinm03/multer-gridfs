import { Router } from "express";
import upload from "../config/multer";
import uploadController from "../controllers/upload.controller";

const router = Router();

router.post("/upload", upload.single("file"), uploadController);

export default router;
