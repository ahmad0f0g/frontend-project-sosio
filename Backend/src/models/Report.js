import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, required: true, enum: ["lost", "found"], default: "lost" },
    category: { type: String, required: true, enum: ["Elektronik", "Tas", "Aksesoris", "Dokumen", "Lainnya"] },
    location: { type: String, required: true },

    // TAMBAHAN BARU: No HP Pelapor
    phone: { type: String, required: true }, 

    images: [{ url: String, public_id: String }],
    status: { type: String, default: "available" },
    claimCount: { type: Number, default: 0 },

    dateFound: { 
        type: Date, 
        required: true 
    },
    
    finderName: { 
        type: String, 
        required: true 
    },

    secrets: {
      question1: { type: String },
      answer1: { type: String }, // Jawaban benar dari penemu
      question2: { type: String },
      answer2: { type: String },
      question3: { type: String },
      answer3: { type: String }
    }
  },
  { timestamps: true }
);

export default mongoose.model("Report", reportSchema);