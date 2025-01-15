import jwt from "jsonwebtoken";
import { sendError } from "../utils/ApiResponse.util";

const authenticateUser = async (req, res, next) => {
  try {
    // Get the access token from cookies
    const token = req.cookies.accessToken;

    if (!token) {
      sendError(res, "Unauthorized access", "UNAUTHORIZED", 401);
      return;
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Ensure the token contains the required fields
    if (!decoded || !decoded.email || decoded.role !== "admin") {
      sendError(res, "Unauthorized access", "UNAUTHORIZED", 401);
      return;
    }

    // Attach the user information to the request object
    req.user = decoded.email;
    req.role = decoded.role;

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    sendError(res, "Invalid or expired token", "INVALID_TOKEN", 401, {
      stack: error.message,
    });
  }
};

export default authenticateUser;
