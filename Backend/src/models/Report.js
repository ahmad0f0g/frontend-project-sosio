import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },

    category: {
      type: String,
      required: true,
      enum: ["dompet", "kunci", "hp", "kartu", "lainnya"],
    },

    location: { type: String, required: true },

    images: [
      {
        url: String,
        public_id: String,
      },
    ],

    status: {
      type: String,
      default: "available", // available | claimed | finished
    },

    claimCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Report", reportSchema);
