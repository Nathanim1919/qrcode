import jwt from "jsonwebtoken";
import { sendError, sendSuccess } from "../utils/ApiResponse.util";

class AuthController {
  async loginUser(req, res) {
    try {
      const { email, password } = req.body;

      // Load the admin credentials from environment variables
      const adminEmail = process.env.ADMIN_EMAIL;
      const adminPassword = process.env.ADMIN_PASSWORD_HASH;

      // Check if email matches the admin email
      if (email !== adminEmail) {
        sendError(res, "Invalid email or password", "INVALID_CREDENTIALS", 401);
        return;
      }

      // Verify password
        const isPasswordValid = password === adminPassword;
      if (!isPasswordValid) {
        sendError(res, "Invalid email or password", "INVALID_CREDENTIALS", 401);
        return;
      }

      // Generate JWT token
      const tokenPayload = { role: "admin", email: adminEmail };
      const accessToken = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
        expiresIn: "12hr", // 12 hours
      });

      // Store the token in a secure HTTP-only cookie
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        maxAge: 12 * 60 * 60 * 1000, // 12 hours
      });

      // Send a success response
      sendSuccess(res, "User logged in successfully", { email: adminEmail });
    } catch (error) {
      sendError(res, "An unexpected error occurred", "SERVER_ERROR", 500, {
        stack: error instanceof Error ? error.message : undefined,
      });
    }
  }
}

export default AuthController;
