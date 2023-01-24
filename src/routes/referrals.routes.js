import { Router } from "express";
import {
    createReferral,
    deleteReferral,
    getReferrals,
    getReferral,
    updateReferral,
  } from "../controllers/referrals.constoller.js";

  const router = Router();

// GET all Referrals
router.get("/referrals", getReferrals);

// GET An Referrals
router.get("/referrals/:idReferidos", getReferral);

// DELETE An Referrals
router.delete("/referrals/:idReferidos", deleteReferral);

// INSERT An Referrals
router.post("/referrals", createReferral);

router.patch("/referrals/:idReferidos", updateReferral);

export default router;