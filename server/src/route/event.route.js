import { Router } from "express";
import {
  createEvent,
  getEventById,
  getAllEvents,
  updateEvent,
  deleteEvent,
  getAllTodayEvents,
  getPublicTodayEvents,
  setEventVisibility,
} from "../controller/event.controller.js";
import authenticateUser from "../middleware/userVerfication.js";

const router = Router();

// Create a new event
router.post("/", createEvent);

// get today events
router.get("/today", authenticateUser, getAllTodayEvents);

// get public today events
router.get("/today/public", authenticateUser, getPublicTodayEvents);

// Get all events
router.get("/", authenticateUser, getAllEvents);

// Get a single event by ID
router.get("/:id", authenticateUser, getEventById);

// Update event visibility
router.put("/:id/visibility", authenticateUser, setEventVisibility);

// Update event details
router.put("/:id", updateEvent);

// Delete an event
router.delete("/:id", deleteEvent);

export default router;
