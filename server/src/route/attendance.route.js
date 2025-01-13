import { Router } from 'express';
import {
  recordAttendance,
  getEventAttendance,
  checkUserAttendance,
  getAllAttendance,
} from '../controllers/attendanceController';

const router = Router();

// Record attendance
router.post('/attendance', recordAttendance);

// Get attendance for a specific event and type
router.get('/attendance/:eventId/:type', getEventAttendance);

// Check if a user has attended
router.get('/attendance/check', checkUserAttendance);

// Get all attendance records
router.get('/attendance', getAllAttendance);

export default router;
