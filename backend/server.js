

import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors"; // <-- import cors

import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./lib/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

// ------------------- CORS Setup -------------------
app.use(cors({
  origin: "http://localhost:5173", // your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true, // allow cookies if using JWT in cookies
}));
// --------------------------------------------------

// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

// Start server
app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
  connectDB();
});



// server.js

// server.js or index.js (whichever you're using)

// import express from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser";

// import authRoutes from "./routes/auth.route.js";  // your auth routes

// const app = express();

// // ✅ MIDDLEWARES
// app.use(cors({
//   origin: "http://localhost:5173",
//   credentials: true
// }));

// app.use(express.json());          // ✅ IMPORTANT: this parses JSON body
// app.use(cookieParser());

// // ✅ ROUTES
// app.use("/api/auth", authRoutes);

// // ✅ DEFAULT
// app.get("/", (req, res) => {
//   res.send("API is running...");
// });

// // ✅ START SERVER
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
