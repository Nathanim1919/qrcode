import { Request, Response } from 'express';
import Attendance from '../models/attendance';
import Event from '../models/event';

// Record attendance
export const recordAttendance = async (req, res) => {
  try {
    const { userId, eventId, type } = req.body; // 'type' can be 'event' or 'meal'

    // Validate request data
    if (!userId || !eventId || !type) {
      return res.status(400).json({ message: 'User ID, Event ID, and type are required.' });
    }

    // Check if the event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found.' });
    }

    // Check if the user already has attendance for the event and type
    const existingAttendance = await Attendance.findOne({ userId, eventId, type });
    if (existingAttendance) {
      return res
        .status(400)
        .json({ message: `Attendance for ${type} has already been recorded for this user.` });
    }

    // Create new attendance
    const newAttendance = new Attendance({
      userId,
      eventId,
      type,
      timestamp: new Date(),
    });

    const attendance = await newAttendance.save();
    return res.status(201).json(attendance);
  } catch (error) {
    return res.status(500).json({ message: 'Server error. Could not record attendance.' });
  }
};

// Get attendance for a specific event and type
export const getEventAttendance = async (req, res) => {
  try {
    const { eventId, type } = req.params; // 'type' can be 'event' or 'meal'

    // Validate event
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found.' });
    }

    const attendanceList = await Attendance.find({ eventId, type }).populate('userId', 'name');
    return res.status(200).json(attendanceList);
  } catch (error) {
    return res.status(500).json({ message: 'Server error. Could not fetch attendance.' });
  }
};

// Check if a user has attended
export const checkUserAttendance = async (req, res) => {
  try {
    const { userId, eventId, type } = req.query; // 'type' can be 'event' or 'meal'

    if (!userId || !eventId || !type) {
      return res.status(400).json({ message: 'User ID, Event ID, and type are required.' });
    }

    const attendance = await Attendance.findOne({ userId, eventId, type });
    if (attendance) {
      return res.status(200).json({ attended: true });
    } else {
      return res.status(200).json({ attended: false });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Server error. Could not check attendance.' });
  }
};

// Get all attendance records
export const getAllAttendance = async (req, res) => {
  try {
    const attendanceRecords = await Attendance.find().populate('userId', 'name').populate('eventId', 'name');
    return res.status(200).json(attendanceRecords);
  } catch (error) {
    return res.status(500).json({ message: 'Server error. Could not fetch attendance records.' });
  }
};
