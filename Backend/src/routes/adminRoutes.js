import express from "express";
import {
  getAllClaims,
  approveClaim,
  rejectClaim,
} from "../controllers/adminController.js";

const router = express.Router();

// Get all claims
router.get("/claims", getAllClaims);

// Approve claim
router.post("/approve/:id", approveClaim);

// Reject claim
router.post("/reject/:id", rejectClaim);

export default router;
