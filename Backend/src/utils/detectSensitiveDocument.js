import sharp from "sharp";

const detectSensitiveDocument = async (buffer) => {
  try {
    const image = sharp(buffer);
    const metadata = await image.metadata();

    // 1. Cek rasio mendekati ID Card (85.6mm × 53.98mm → ~1.586)
    const ratio = metadata.width / metadata.height;
    if (ratio > 1.55 && ratio < 1.62) return true;

    // 2. Analisis warna dominan (KTP Indonesia dominan biru)
    const { dominant } = await image.stats();

    const isMostlyBlue =
      dominant.r < 80 && dominant.g < 120 && dominant.b > 130;

    if (isMostlyBlue) return true;

    return false;
  } catch (error) {
    console.error("Document detection error:", error);
    return false;
  }
};

export default detectSensitiveDocument;
