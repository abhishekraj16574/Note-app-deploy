import express from "express";
import { isAuthenticate } from "../Middleware/auth.js";
import { createNote, deleteNote, getNotes } from "../Controller/Note.js";
const router = express.Router();

router.get("/getnote",isAuthenticate,getNotes);
router.post("/newnote",isAuthenticate,createNote);
router.delete("/deletenote/:id",isAuthenticate,deleteNote);

export default router;