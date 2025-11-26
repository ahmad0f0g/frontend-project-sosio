import Report from "../models/Report.js";
import cloudinary from "../../config/cloudinary.js";

// CREATE REPORT
export const createReport = async (req, res) => {
  try {
    const { title, description, category, location } = req.body;

    // Upload foto ke Cloudinary
    let uploadedImages = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const upload = await cloudinary.uploader.upload_stream(
          { folder: "lostfound" },
          (error, result) => {
            if (error) throw error;
            return result;
          }
        );

        // Karena menggunakan stream, harus manual push
        uploadedImages.push({
          url: upload.url,
          public_id: upload.public_id,
        });
      }
    }

    const report = await Report.create({
      title,
      description,
      category,
      location,
      images: uploadedImages,
    });

    res.json({
      message: req.t("REPORT_CREATED"),
      data: report,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL REPORTS
export const getReports = async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });
    res.json({ data: reports });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SINGLE REPORT
export const getReportById = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ message: req.t("REPORT_NOT_FOUND") });
    }

    res.json({ data: report });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
