import User from '../models/user';
import { Attendance } from '../model/Attendance.model';

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Exclude password field for security
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: 'Server error. Could not fetch users.' });
  }
};

// Get a user by ID
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).select('-password'); // Exclude password field
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: 'Server error. Could not fetch user.' });
  }
};

// Update user data
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, profilePicture, role } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, profilePicture, role },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found.' });
    }

    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(500).json({ message: 'Server error. Could not update user.' });
  }
};

// Get a user's attendance (event and meal)
export const getUserAttendance = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const attendance = await Attendance.find({ userId: id }).populate('eventId', 'name');
    return res.status(200).json(attendance);
  } catch (error) {
    return res.status(500).json({ message: 'Server error. Could not fetch attendance.' });
  }
};
