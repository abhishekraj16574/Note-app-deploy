import express from "express"
import { login, logout, signup, userData } from "../Controller/user.js";
import { isAuthenticate } from "../Middleware/auth.js";
import { contact } from "../Controller/Email.js";

const router = express.Router();

router.post("/signup",signup);
router.post("/login",login);
router.post("/logout",logout);
router.get("/me",isAuthenticate,userData);
router.post("/contact",contact);

export default router;