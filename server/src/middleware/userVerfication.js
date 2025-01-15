

const authenticateUser = async (req, res, next) => {
    // get the access from the cookie
    const token = req.cookies.accessToken;
  
    if (!token) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
  
    const decoded = await AuthUtils.verifyToken(token);
  
    try {
      const user = await User.findById(decoded.userId).select('_id email role');
  
      if (!user) {
        res.status(401).json({ message: 'User not found' });
        return;
      }
  
      req.user = user._id.toString(); // Attach user with role to the request object
      req.role = user.role;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Invalid token' });
    }
  };