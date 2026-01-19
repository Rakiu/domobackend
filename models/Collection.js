import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  videoId: { type: String }, // YouTube ID optional
  thumbnail: { type: String, required: true },
  videoUrl: { type: String }, // Cloudinary video URL
});

const collectionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    videos: [videoSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Collection", collectionSchema);
