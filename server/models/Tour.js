import mongoose from "mongoose";

const tourSchema = mongoose.Schema(
  {
    title: String,
    description: String,
    name: String,
    creator: String,
    tags: [String],
    imageFile: String,
    likes: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Tour", tourSchema);
