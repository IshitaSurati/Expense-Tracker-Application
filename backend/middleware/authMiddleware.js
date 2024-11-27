const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  let token;

  // Check for token in headers
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Decode the token and attach user info to request
      const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Ensure JWT_SECRET is set in environment
      req.user = decoded;  // Attach user info to request object

      next();  // Continue to the next middleware or route
    } catch (error) {
      console.error("Not authorized:", error);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    // If no token is provided
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

module.exports = protect;
