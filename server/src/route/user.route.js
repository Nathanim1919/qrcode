import { Router } from 'express';
import {
  getAllUsers,
  getUserById,
  updateUser,
  getUserAttendance,
} from '../controllers/userController';

const router = Router();

// Get all users
router.get('/users', getAllUsers);

// Get user by ID
router.get('/users/:id', getUserById);

// Update user
router.put('/users/:id', updateUser);

// Get user's attendance
router.get('/users/:id/attendance', getUserAttendance);

export default router;
