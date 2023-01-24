import { Router } from "express";
import {
  createMembership,
  deleteMembership,
  getMembership,
  getMemberships,
  updateMembership,
} from "../controllers/membership.controller.js";

const router = Router();

// GET all Membership
router.get("/memberships", getMemberships);

// GET An Membership
router.get("/memberships/:idMembership", getMembership);

// DELETE An Membership
router.delete("/memberships/:idMembership", deleteMembership);

// INSERT An Membership
router.post("/memberships", createMembership);

router.patch("/membership/:idMembership", updateMembership);

export default router;
