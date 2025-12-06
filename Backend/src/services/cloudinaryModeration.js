import cloudinary from "../config/cloudinary.js";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import os from "os";   // Modul wajib untuk cek OS
import path from "path"; // Modul wajib untuk gabung path

const cloudinaryModeration = async (buffer) => {
  try {
    // AMBIL PATH FOLDER TEMP YANG BENAR SESUAI OS
    const tempDir = os.tmpdir(); 
    
    // Gabungkan path folder + nama file dengan aman
    const tempFilename = path.join(tempDir, `${uuidv4()}.jpg`);
    
    // Tulis file sementara
    fs.writeFileSync(tempFilename, buffer);

    // Upload ke Cloudinary
    const response = await cloudinary.uploader.upload(tempFilename, {
      moderation: "aws_rek", // Meminta AI Amazon Rekognition via Cloudinary
      folder: "lostfound_temp",
    });

    // Hapus file sampah di komputer lokal
    fs.unlinkSync(tempFilename);

    // Cek hasil AI Cloudinary
    if (
      response.moderation &&
      response.moderation.length > 0 &&
      response.moderation[0].status === "rejected"
    ) {
      console.log("[Security] Cloudinary AI rejected content (Adult/Gore/Etc).");
      // Hapus bukti dari cloud juga
      await cloudinary.uploader.destroy(response.public_id);
      return true; // Ditolak
    }

    return false; // Aman
  } catch (error) {
    console.error("Cloudinary moderation error:", error);
    return false; 
  }
};

export default cloudinaryModeration;