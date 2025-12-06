import Tesseract from "tesseract.js";

const sensitiveWords = [
  "nik", "kewarganegaraan", "gol. darah", "nomor induk",
  "paspor", "passport", "universitas", "ktm", 
  "kartu mahasiswa", "id card", "ktp", "rtrw"
];

const ocrCheck = async (buffer) => {
  try {
    const { data: { text } } = await Tesseract.recognize(buffer, 'eng', {
      logger: m => {} 
    });
    const lowerText = text.toLowerCase();
    
    const foundWord = sensitiveWords.find(word => lowerText.includes(word));
    
    if (foundWord) {
        console.log(`[Security] OCR Blocked: Found word '${foundWord}'`);
        return true; 
    }

    return false;
  } catch (error) {
    console.error("OCR Error:", error.message);
    return false; 
  }
};

export default ocrCheck;