import { Router } from "express";
import {
  createEvent,
  getEventById,
  getAllEvents,
  updateEvent,
  deleteEvent,
} from "../controller/event.controller.js";

const router = Router();

// Create a new event
router.post("/events", createEvent);

// Get all events
router.get("/events", getAllEvents);

// Get a single event by ID
router.get("/events/:id", getEventById);

// Update event details
router.put("/events/:id", updateEvent);

// Delete an event
router.delete("/events/:id", deleteEvent);

export default router;
