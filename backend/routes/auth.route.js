// import express from "express";
// import { signup, login } from "../controllers/auth.controller.js";

// const router = express.Router();

// // Routes
// router.post("/signup", signup);
// router.post("/login", login);

// export default router;


// routes/auth.route.js
import express from "express";
import { signup, login, logout, refreshToken, getProfile } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";


const router = express.Router();


router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh-token", refreshToken);
router.get("/profile", protectRoute, getProfile);

export default router;

