import Claim from "../models/Claim.js";
import Report from "../models/Report.js";

// GET ALL CLAIMS
export const getAllClaims = async (req, res) => {
  if (req.headers.authorization !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const claims = await Claim.find().populate("reportId");
  res.json({ data: claims });
};

// APPROVE CLAIM
export const approveClaim = async (req, res) => {
  if (req.headers.authorization !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const claimId = req.params.id;

  const claim = await Claim.findByIdAndUpdate(
    claimId,
    { status: "approved" },
    { new: true }
  );

  if (!claim) {
    return res.status(404).json({ message: "Claim not found" });
  }

  // Update status report → finished
  await Report.findByIdAndUpdate(claim.reportId, {
    status: "finished",
  });

  res.json({ message: req.t("CLAIM_APPROVED"), data: claim });
};

// REJECT CLAIM
export const rejectClaim = async (req, res) => {
  if (req.headers.authorization !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const claim = await Claim.findByIdAndUpdate(
    req.params.id,
    { status: "rejected" },
    { new: true }
  );

  res.json({ message: req.t("CLAIM_REJECTED"), data: claim });
};
