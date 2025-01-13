import { Router } from 'express';
import {
  getAllUsers,
  getUserById,
  updateUser,
  getUserAttendance,
  createUser
} from '../controller/user.controller.js';

const router = Router();

// Get all users
router.get('/', getAllUsers);

// Create new user
router.post('/', createUser);

// Get user by ID
router.get('/:id', getUserById);

// Update user
router.put('/:id', updateUser);

// Get user's attendance
router.get('/:id/attendance', getUserAttendance);

export default router;
