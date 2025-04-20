const jwt = require("jsonwebtoken");
const Student = require("../models/Student");
const Admin = require("../models/Admin");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Check for student
      const student = await Student.findById(decoded.id).select("-password");
      if (student) {
        req.user = { ...student._doc, role: "student" };
        return next();
      }

      // Check for admin
      const admin = await Admin.findById(decoded.id).select("-password");
      if (admin) {
        req.user = { ...admin._doc, role: "admin" };
        return next();
      }

      return res.status(401).json({ message: "User not found" });
    } catch (error) {
      console.error("Token validation failed:", error.message);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

module.exports = { protect };