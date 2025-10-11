

// controllers/auth.controller.js
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

/* Helpers */
const generateTokens = (userId) => {
  const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
  return { accessToken, refreshToken };
};

const setCookies = (res, accessToken, refreshToken) => {
  // cookies for browser-based flows (httpOnly)
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 60 * 1000,
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

/* SIGNUP */
export const signup = async (req, res) => {
  try {
    let { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // normalize email
    email = String(email).trim().toLowerCase();

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // Create user - pre('save') will hash password
    const user = new User({ name: String(name).trim(), email, password });
    await user.save();
    console.log("📩 Received signup body:", req.body);

    const { accessToken, refreshToken } = generateTokens(user._id);
    setCookies(res, accessToken, refreshToken);

    res.status(201).json({
      message: "Signup successful",
      user: { _id: user._id, name: user.name, email: user.email },
      token: accessToken,
      user: { _id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Server error during signup" });
  }
};

// /* LOGIN */
// export const login = async (req, res) => {
//   try {
//     let { email, password } = req.body;
//     if (!email || !password) return res.status(400).json({ message: "Email and password required" });

//     email = String(email).trim().toLowerCase();

//     // find user
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: "Invalid email or password" });

//     // compare
//     const isMatch = await user.comparePassword(password);
//     if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

//     const { accessToken, refreshToken } = generateTokens(user._id);
//     setCookies(res, accessToken, refreshToken);

//     res.status(200).json({
//       message: "Login successful",
//       user: { _id: user._id, name: user.name, email: user.email },
//       token: accessToken,
//     });
//   } catch (error) {
//     console.error("Login Error:", error);
//     res.status(500).json({ message: "Server error during login" });
//   }
// };

// ---------------- LOGIN ----------------
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(user._id);
    setCookies(res, accessToken, refreshToken);

    // Send success response
    res.status(200).json({
      message: "Login successful",
      user: { _id: user._id, name: user.name, email: user.email },
      token: accessToken, // store this in frontend localStorage
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
};
 
/* REFRESH TOKEN */
export const refreshToken = async (req, res) => {
  try {
    // try cookie first, then body
    const token = req.cookies?.refreshToken || req.body?.refreshToken;
    if (!token) return res.status(401).json({ message: "No refresh token provided" });

    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) return res.status(401).json({ message: "Invalid refresh token (user not found)" });

    const { accessToken, refreshToken: newRefresh } = generateTokens(user._id);
    setCookies(res, accessToken, newRefresh);

    return res.json({ message: "Tokens refreshed", token: accessToken });
  } catch (err) {
    console.error("Refresh token error:", err);
    return res.status(401).json({ message: "Invalid or expired refresh token" });
  }
};

/* LOGOUT */
export const logout = async (req, res) => {
  try {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    return res.json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout Error:", error);
    res.status(500).json({ message: "Server error during logout" });
  }
};

/* PROFILE */
export const getProfile = async (req, res) => {
  try {
    // protectRoute will set req.user
    return res.json(req.user);
  } catch (error) {
    console.error("Get Profile Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
