const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

//register
const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    console.log("Registration attempt for:", { email, userName });
    
    // Validate input
    if (!userName || !email || !password) {
      console.log("Missing required fields");
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log("Invalid email format:", email);
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    // Validate password strength
    if (password.length < 6) {
      console.log("Password too short");
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }

    const checkUser = await User.findOne({ email });
    if (checkUser) {
      console.log("User already exists:", email);
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      userName,
      email,
      password: hashPassword,
      role: "user",
    });

    await newUser.save();
    console.log("User registered successfully:", email);
    res.status(201).json({
      success: true,
      message: "Registration successful! Please login to continue.",
    });
  } catch (e) {
    console.error("Registration error:", e);
    res.status(500).json({
      success: false,
      message: "Registration failed. Please try again.",
    });
  }
};

//login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("Login attempt for email:", email);
    console.log("Request origin:", req.headers.origin);
    console.log("Request headers:", req.headers);

    // Validate input
    if (!email || !password) {
      console.log("Missing email or password");
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log("Invalid email format");
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      console.log("User not found");
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    console.log("User found, comparing passwords");
    const checkPasswordMatch = await bcrypt.compare(password, checkUser.password);
    console.log("Password match result:", checkPasswordMatch);

    if (!checkPasswordMatch) {
      console.log("Password does not match");
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    console.log("Password matched, generating token");
    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        userName: checkUser.userName,
      },
      process.env.JWT_SECRET || "CLIENT_SECRET_KEY",
      { expiresIn: "24h" }
    );

    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
      path: "/",
    };

    // Set domain based on environment
    if (process.env.NODE_ENV === "production") {
      cookieOptions.domain = ".onrender.com";
    }

    console.log("Setting cookie with options:", cookieOptions);
    console.log("Login successful, sending response");

    res.cookie("token", token, cookieOptions).json({
      success: true,
      message: "Login successful",
      user: {
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser._id,
        userName: checkUser.userName,
      },
    });
  } catch (e) {
    console.error("Login error:", e);
    res.status(500).json({
      success: false,
      message: "Login failed. Please try again.",
    });
  }
};

//logout
const logoutUser = async (req, res) => {
  try {
    console.log("Logout attempt");
    console.log("Request origin:", req.headers.origin);
    console.log("Current cookies:", req.cookies);

    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
    };

    if (process.env.NODE_ENV === "production") {
      cookieOptions.domain = ".onrender.com";
    }

    console.log("Clearing cookie with options:", cookieOptions);
    res.clearCookie("token", cookieOptions).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (e) {
    console.error("Logout error:", e);
    res.status(500).json({
      success: false,
      message: "Logout failed. Please try again.",
    });
  }
};

//auth middleware
const authMiddleware = async (req, res, next) => {
  console.log("Auth middleware - Request details:", {
    origin: req.headers.origin,
    cookies: req.cookies,
    headers: req.headers
  });
  
  const token = req.cookies.token;
  console.log("Auth middleware - Token:", token ? "Present" : "Missing");
  
  if (!token) {
    console.log("Auth middleware - No token found");
    return res.status(401).json({
      success: false,
      message: "Authentication required",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "CLIENT_SECRET_KEY");
    console.log("Auth middleware - Token verified:", decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

module.exports = { registerUser, loginUser, logoutUser, authMiddleware };
