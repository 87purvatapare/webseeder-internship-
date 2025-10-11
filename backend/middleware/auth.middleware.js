// // middleware/auth.middleware.js
// import jwt from "jsonwebtoken";
// import User from "../models/user.model.js";

// export const protectRoute = async (req, res, next) => {
//   try {
//     let token;

//     // 1) Authorization header
//     if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
//       token = req.headers.authorization.split(" ")[1];
//     }
//     // 2) or cookie
//     else if (req.cookies && req.cookies.accessToken) {
//       token = req.cookies.accessToken;
//     }

//     if (!token) return res.status(401).json({ message: "Not authenticated" });

//     const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
//     const user = await User.findById(decoded.userId).select("-password");
//     if (!user) return res.status(401).json({ message: "User not found" });

//     req.user = user;
//     next();
//   } catch (err) {
//     console.error("Auth middleware error:", err);
//     return res.status(401).json({ message: "Invalid or expired token" });
//   }
// };



// middleware/auth.middleware.js
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    let token;

    // 1) Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }
    // 2) or cookie
    else if (req.cookies && req.cookies.accessToken) {
      token = req.cookies.accessToken;
    }

    // ✅ Handle empty / undefined / "null" / "undefined" tokens safely
    if (!token || token === "null" || token === "undefined") {
      return res.status(401).json({ message: "Not authenticated" });
    }

    // ✅ Try-catch token verification separately to prevent crash on malformed token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (verifyError) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user;
    next();
  } catch (err) {
    console.error("Auth middleware error:", err);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
