import { Router } from "express";
import {
  createEvent,
  getEventById,
  getAllEvents,
  updateEvent,
  deleteEvent,
  getAllTodayEvents,
} from "../controller/event.controller.js";

const router = Router();

// Create a new event
router.post("/", createEvent);


// get today events
router.get("/today", getAllTodayEvents);

// Get all events
router.get("/", getAllEvents);

// Get a single event by ID
router.get("/:id", getEventById);



// Update event details
router.put("/:id", updateEvent);

// Delete an event
router.delete("/:id", deleteEvent);

export default router;
