import { Router } from "express";
import {
  createNotification,
  deleteNotification,
  getNotifications,
  getNotification,
  updateNotification,
} from "../controllers/notification.controller.js";

const router = Router();

// GET all Notification
router.get("/notifications", getNotifications);

// GET An Notification
router.get("/notifications/:idNotificaciones", getNotification);

// DELETE An Notification
router.delete("/notifications/:idNotificaciones", deleteNotification);

// INSERT An Notification
router.post("/notifications", createNotification);

router.patch("/notifications/:idNotificaciones", updateNotification);

export default router;
