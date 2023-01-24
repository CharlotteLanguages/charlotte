import { Router } from "express";
import {
  createPatrocinador,
  deletePatrocinador,
  getPatrocinadors,
  getPatrocinador,
  updatePatrocinador,
} from "../controllers/patrocinador.controller.js";

const router = Router();

// GET all Sponsor
router.get("/sponsors", getPatrocinadors);

// GET An Sponsor
router.get("/sponsors/idPatrocinador", getPatrocinador);

// DELETE An Sponsor
router.delete("/sponsors/:idPatrocinador", deletePatrocinador);

// INSERT An Sponsor
router.post("/sponsors", createPatrocinador);

router.patch("/sponsors/:idPatrocinador", updatePatrocinador);

export default router;
