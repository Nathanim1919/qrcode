import jwt from "jsonwebtoken";
// import { sendError, sendSuccess } from "../utils/ApiResponse.util";

  export const loginUser = async(req, res) => {
    try {
      const { email, password } = req.body;

      // Load the admin credentials from environment variables
      const adminEmail = process.env.ADMIN_EMAIL;
      const adminPassword = process.env.ADMIN_PASSWORD_HASH;

      // Check if email matches the admin email
      if (email !== adminEmail) {
        res.status(401).json(
            { 
                success: false,
                message: "Invalid email or password",
             }
        );
        return;
      }

      // Verify password
        const isPasswordValid = password === adminPassword;
      if (!isPasswordValid) {
        res.status(401).json(
            { 
                success: false,
                message: "Invalid email or password",
            }
        );
        return;
      }

      // Generate JWT token
      const tokenPayload = { role: "admin", email: adminEmail };
      const accessToken = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
        expiresIn: "12hr", // 12 hours
      });

      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        sameSite: "lax", // Lax is fine for local development
        secure: false, // Ensure this is false for HTTP
        maxAge: 12 * 60 * 60 * 1000, // 12 hours
      });
      

    
    return res.status(200).json(
        {   
            success: true,
            message: "User logged in successfully", 
            email: adminEmail 
        }
    );

    } catch (error) {
        console.error("Error in loginUser:", error);
        res.status(500).json(
            { 
                success: false,
                message: "An error occurred while logging in",
            }
        );
    }
  }