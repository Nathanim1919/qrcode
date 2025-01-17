import { Event } from "../model/Event.model.js";

// Create a new event
export const createEvent = async (req, res) => {
  try {
    const { time, type } = req.body;

    // Validation (you can add more specific validation here)
    if (!time || !type) {
      return res.status(400).json({ message: "Event time and type required!" });
    }

    const newEvent = new Event({
      time,
      type,
    });

    const event = await newEvent.save();
    return res.status(201).json(event);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Server error. Could not create event." });
  }
};

// Get event details by ID
export const getEventById = async (req, res) => {
  try {
    const eventId = req.params.id;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found." });
    }

    return res.status(200).json(event);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error. Could not fetch event." });
  }
};

// List all events
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    return res.status(200).json(events);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error. Could not fetch events." });
  }
};

// List all events happening today with visibility set to public
export const getPublicTodayEvents = async (req, res) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0); // Midnight of today

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999); // End of today

    const events = await Event.find({
      date: { $gte: startOfDay, $lte: endOfDay }, // Match dates within today's range
      visibility: "Public", // Match events with public visibility
    });

    return res.status(200).json(events);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error. Could not fetch events." });
  }
};

export const getAllTodayEvents = async (req, res) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0); // Midnight of today

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999); // End of today

    const events = await Event.find({
      date: { $gte: startOfDay, $lte: endOfDay }, // Match dates within today's range
    });

    return res
      .status(200)
      .json({
        data: events,
        message: "Today's events fetched successfully.",
        success: true,
      });
  } catch (error) {
    console.error("Error fetching today's events:", error);
    return res
      .status(500)
      .json({ message: "Server error. Could not fetch events." });
  }
};

// Update event details
export const updateEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const { name, date, location, description } = req.body;

    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      { name, date, location, description },
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found." });
    }

    return res.status(200).json(updatedEvent);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error. Could not update event." });
  }
};

// Delete event
export const deleteEvent = async (req, res) => {
  try {
    const eventId = req.params.id;

    const deletedEvent = await Event.findByIdAndDelete(eventId);
    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found." });
    }

    return res.status(200).json({ message: "Event deleted successfully." });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error. Could not delete event." });
  }
};

// Set Event Visibility to Public or Private
export const setEventVisibility = async (req, res) => {
  try {
    const eventId = req.params.id;
    const { visibility } = req.body;

    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      { visibility },
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found." });
    }

    return res.status(200).json(updatedEvent);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error. Could not update event visibility." });
  }
};
