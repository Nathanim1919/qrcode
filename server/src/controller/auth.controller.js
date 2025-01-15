import { sendError, sendSuccess } from "../utils/ApiResponse.util";
import { validationResult } from "express-validator";

class AuthController {

  async logoutUser(req,res) {
    try {
      res.clearCookie("refreshToken");
      res.clearCookie("accessToken");
      sendSuccess(res, "User logged out successfully");
    } catch (error) {
      sendError(res, "An unexpected error occurred", "SERVER_ERROR", 500, {
        stack: error instanceof Error ? error.message : undefined,
      });
    }
  }

  async registerUser(req,res) {
    try {
      const { data, invitationLink } = req.body;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        sendError(
          res,
          "Validation failed",
          "VALIDATION_ERROR",
          400,
          errors.array()
        );
        return; // Explicitly end the middleware
      }

      const response = await this.authService.registerUser(data);

      if (response.error) {
        sendError(res, response.error, "REGISTER_USER_ERROR", 400);
        return; // Explicitly end the middleware
      }

      if (invitationLink) {
        await this.authService.updateUserInvitation(invitationLink);
      }
      
      sendSuccess(res, "User registered successfully", null);
    } catch (error) {
      sendError(res, "An unexpected error occurred", "SERVER_ERROR", 500, {
        stack: error instanceof Error ? error.stack : undefined,
      });
    }
  }

  async loginUser(req,res) {
    try {
      const { email, password } = req.body;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        sendError(
          res,
          "Validation failed",
          "VALIDATION_ERROR",
          400,
          errors.array()
        );
        return; // Explicitly end the middleware
      }

      const response = await this.authService.loginUser(email, password);

      // Securely set refresh and access tokens in cookies
      res.cookie("refreshToken", response.token.refreshToken, {
        httpOnly: true,
        sameSite: "strict", // Prevent CSRF attacks
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      res.cookie("accessToken", response.token.accessToken, {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        maxAge: 15 * 60 * 1000, // 15 minutes
      });

      sendSuccess(res, "User logged in successfully", response.user);
    } catch (error) {
      sendError(res, "An unexpected error occurred", "SERVER_ERROR", 500, {
        stack: error instanceof Error ? error.message : undefined,
      });
    }
  }

  // update user password
  async updatePassword(req,res) {
    try {
      const { currentPassword, newPassword } = req.body;
      const user = req.user;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        sendError(
          res,
          "Validation failed",
          "VALIDATION_ERROR",
          400,
          errors.array()
        );
        return; // Explicitly end the middleware
      }

      await this.authService.updatePassword(
        user ?? "",
        currentPassword,
        newPassword
      );

      sendSuccess(res, "Password updated successfully");
    } catch (error) {
      sendError(res, "An unexpected error occurred", "SERVER_ERROR", 500, {
        stack: error instanceof Error ? error.message : undefined,
      });
    }
  }

  // update user profile
  async updateProfile(req,res) {
    try {
      const { data } = req.body;
      const user = req.user;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        sendError(
          res,
          "Validation failed",
          "VALIDATION_ERROR",
          400,
          errors.array()
        );
        return; // Explicitly end the middleware
      }

      const response = await this.authService.updateProfile(user ?? "", data);

      sendSuccess(res, "Profile updated successfully", response);
    } catch (error) {
      sendError(res, "An unexpected error occurred", "SERVER_ERROR", 500, {
        stack: error instanceof Error ? error.message : undefined,
      });
    }
  }

  // get the user from the accessTokens from the cookies
  async getCurrentUser(req,res) {
    try {
      const { accessToken } = req.cookies;

      if (!accessToken) {
        sendError(res, "No access token provided", "ACCESS_TOKEN_ERROR", 400);
        return;
      }

      const user = await this.authService.getCurrentUser(accessToken);
      sendSuccess(res, "User fetched successfully", user);
    } catch (error) {
      sendError(res, "An unexpected error occurred", "SERVER_ERROR", 500, {
        stack: error instanceof Error ? error.message : undefined,
      });
    }
  }

  async refreshToken(req,res) {
    try {
      const { refreshToken } = req.cookies;

      if (!refreshToken) {
        sendError(res, "No refresh token provided", "REFRESH_TOKEN_ERROR", 400);
        return;
      }

      const { newAccessToken, newRefreshToken } =
        await this.authService.refreshToken(refreshToken);

      res.cookie("accessToken", newAccessToken, {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        maxAge: 15 * 60 * 1000, // 15 minutes
      });

      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      sendSuccess(res, "Access token refreshed successfully");
    } catch (error) {
      sendError(res, "An unexpected error occurred", "SERVER_ERROR", 500, {
        stack: error instanceof Error ? error.message : undefined,
      });
    }
  }
}

export default AuthController;
