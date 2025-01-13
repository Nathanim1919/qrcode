import User from "../model/User.model.js";
import { Attendance } from "../model/Attendance.model.js";

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate("qrCodeId");
    return res.status(200).json(users);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error. Could not fetch users." });
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;

    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists." });
    }

    const newUser = new User({
      name,
      email,
      phone,
      address,
    });

    const user = await newUser.save();
    return res.status(201).json(user);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error. Could not create user." });
  }
};

// Get a user by ID
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).populate("qrCodeId");
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error. Could not fetch user." });
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
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.status(200).json(updatedUser);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error. Could not update user." });
  }
};

// Get a user's attendance (event and meal)
export const getUserAttendance = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const attendance = await Attendance.find({ userId: id }).populate(
      "eventId",
      "name"
    );
    return res.status(200).json(attendance);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error. Could not fetch attendance." });
  }
};
