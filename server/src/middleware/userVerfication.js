import jwt from "jsonwebtoken";

const authenticateUser = async (req, res, next) => {
  try {
    // Get the access token from cookies
    const token = req.cookies.accessToken;

    console.log("Access token:", token);

    if (!token) {
      res.status(401).json({ message: "Unauthorized access" });
      return;
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);

    // Ensure the token contains the required fields
    if (!decoded || !decoded.email || decoded.role !== "admin") {
      res.status(401).json({ message: "Unauthorized access" });
      return;
    }

    // Attach the user information to the request object
    req.user = decoded.email;
    req.role = decoded.role;

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Error in authenticateUser:", error);
    res.status(401).json({ message: "Unauthorized access" });
  }
};

export default authenticateUser;
