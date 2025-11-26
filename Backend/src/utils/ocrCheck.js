// NOTE: Ini versi ringan, menggunakan OCR minimal
// Bisa diganti dengan Tesseract.js jika ingin 100% OCR nanti.

const sensitiveWords = [
  "nik",
  "no induk",
  "paspor",
  "passport",
  "universitas",
  "ktm",
  "kartu mahasiswa",
  "id card",
  "ktp"
];

const ocrCheck = async (buffer) => {
  try {
    // Karena OCR penuh berat, kita pakai deteksi teks ringan dulu (placeholder)
    // Bisa di-upgrade ke Tesseract.js bila diperlukan.
    const fakeExtractedText = ""; // placeholder

    const text = fakeExtractedText.toLowerCase();

    return sensitiveWords.some((word) => text.includes(word));
  } catch (error) {
    console.error("OCR Error:", error);
    return false;
  }
};

export default ocrCheck;
