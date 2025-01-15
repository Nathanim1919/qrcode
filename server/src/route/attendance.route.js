import { Router } from 'express';
import {
  recordAttendance,
  getEventAttendance,
  checkUserAttendance,
  getAllAttendance,
  getUserAttendance,
  getUserAttendanceByQrCode
} from '../controller/attendance.controller.js';

const router = Router();

// Record attendance
router.post('/', recordAttendance);
router.get('/', getAllAttendance);

// Check if a user has attended
router.get('/check', checkUserAttendance);

// Get all attendance records
// Get attendance for a specific event and type
router.get("/userAttendance/:userId", getUserAttendance);
router.get("/userAttendanceByQrcode/:qrcodeId", getUserAttendanceByQrCode);
router.get('/:eventId/:type', getEventAttendance);





export default router;
