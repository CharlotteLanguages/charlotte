import { Router } from "express";
import {
  createSocialNetworks,
  deleteSocialNetworks,
  getSocialNetworks,
  getSocialNetworkss,
  updateSocialNetworks,
} from "../controllers/socialNetworks.controller.js";

const router = Router();

// GET all Social networks
router.get("/socialNetworks", getSocialNetworkss);

// GET An Social networks
router.get("/socialNetworks/:idSocialNetworks", getSocialNetworks);

// DELETE An Social networks
router.delete("/socialNetworks/:idSocialNetworks", deleteSocialNetworks);

// INSERT An Social networks
router.post("/socialNetworks", createSocialNetworks);

router.patch("/socialNetworks/:idSocialNetworks", updateSocialNetworks);

export default router;
