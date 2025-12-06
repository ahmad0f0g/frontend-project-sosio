import sharp from "sharp";

const detectSensitiveDocument = async (buffer) => {
  try {
    const image = sharp(buffer);
    const metadata = await image.metadata();

    // 1. Cek Geometri (Rasio)
    const ratio = metadata.width / metadata.height;
    // Range rasio kartu ID (agak longgar sedikit biar aman)
    const isIdCardRatio = ratio > 1.50 && ratio < 1.65;

    // 2. Cek Warna Dominan
    const { dominant } = await image.stats();
    
    // Logika warna: Elemen Biru (b) harus lebih tinggi dari Merah (r) dan Hijau (g)
    // Dan tingkat kecerahan birunya harus cukup tinggi (>100)
    const isBlueDominant = 
      dominant.b > dominant.r && 
      dominant.b > dominant.g && 
      dominant.b > 100;

    // KEPUTUSAN FINAL: Harus memenuhi KEDUANYA
    if (isIdCardRatio && isBlueDominant) {
        console.log("[Security] Blocked: Shape matches ID Card AND Color is Blue.");
        return true; // Terdeteksi sebagai dokumen sensitif
    }

    return false; // Aman (Mungkin dompet coklat, atau buku merah)
  } catch (error) {
    console.error("Document detection error:", error);
    return false;
  }
};

export default detectSensitiveDocument;