import {Event} from '../model/Event.model.js';

// Create a new event
export const createEvent = async (req, res) => {
  try {
    const { name, date, time, type } = req.body;

    // Validation (you can add more specific validation here)
    if (!name || !date || !location) {
      return res.status(400).json({ message: 'Event name, date, and location are required.' });
    }

    const newEvent = new Event({
      name,
      date,
      time,
      type,
    });

    const event = await newEvent.save();
    return res.status(201).json(event);
  } catch (error) {
    return res.status(500).json({ message: 'Server error. Could not create event.' });
  }
};

// Get event details by ID
export const getEventById = async (req, res) => {
  try {
    const eventId = req.params.id;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found.' });
    }

    return res.status(200).json(event);
  } catch (error) {
    return res.status(500).json({ message: 'Server error. Could not fetch event.' });
  }
};

// List all events
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    return res.status(200).json(events);
  } catch (error) {
    return res.status(500).json({ message: 'Server error. Could not fetch events.' });
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
      return res.status(404).json({ message: 'Event not found.' });
    }

    return res.status(200).json(updatedEvent);
  } catch (error) {
    return res.status(500).json({ message: 'Server error. Could not update event.' });
  }
};

// Delete event
export const deleteEvent = async (req, res) => {
  try {
    const eventId = req.params.id;

    const deletedEvent = await Event.findByIdAndDelete(eventId);
    if (!deletedEvent) {
      return res.status(404).json({ message: 'Event not found.' });
    }

    return res.status(200).json({ message: 'Event deleted successfully.' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error. Could not delete event.' });
  }
};
