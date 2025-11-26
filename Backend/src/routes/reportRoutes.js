import express from "express";
import { createReport, getReports, getReportById } from "../controllers/reportController.js";
import upload from "../middleware/upload.js";
import validateImage from "../middleware/validateImage.js";

const router = express.Router();

// Create report
router.post(
  "/",
  upload.array("images", 3),   // upload max 3 foto
  validateImage,               // moderasi foto
  createReport
);

// Get all reports
router.get("/", getReports);

// Get single report
router.get("/:id", getReportById);

export default router;
