const jwt = require("jsonwebtoken");
const Student = require("../models/Student");
const Admin = require("../models/Admin");

const authMiddleware = (allowedRoles = []) => {
  return async (req, res, next) => {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        let user;
        let role;

        // Check for student
        const student = await Student.findById(decoded.id).select("-password");
        if (student) {
          user = student;
          role = "student";
        }

        // Check for admin
        const admin = await Admin.findById(decoded.id).select("-password");
        if (admin) {
          user = admin;
          role = "admin";
        }

        if (!user) {
          return res.status(401).json({ message: "User not found" });
        }

        // Check if the user's role is allowed
        if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
          return res.status(403).json({ message: "Forbidden: Access denied" });
        }

        req.user = { ...user._doc, role };
        next();
      } catch (error) {
        console.error("Token validation failed:", error.message);
        return res.status(401).json({ message: "Not authorized, token failed" });
      }
    } else {
      return res.status(401).json({ message: "Not authorized, no token" });
    }
  };
};

module.exports = authMiddleware;