import { Router } from "express";
import {
  createNews,
  deleteNews,
  getNew,
  getNews,
  updateNews,
} from "../controllers/news.controller.js";

const router = Router();

// GET all News
router.get("/news", getNews);

// GET An News
router.get("/news/:idNews", getNew);

// DELETE An News
router.delete("/news/:idNews", deleteNews);

// INSERT An News
router.post("/news", createNews);

router.patch("/news/:idNews", updateNews);

export default router;
