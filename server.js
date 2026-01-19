import dotenv from "dotenv";
dotenv.config(); // ✅ env guaranteed loaded

import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import connectDB from "./config/db.js";

// ======================
// DB CONNECT
// ======================
connectDB();

// ✅ 🔥 DYNAMIC IMPORT (THIS IS THE FIX)
await import("./config/cloudinary.js");

// ======================
// ROUTES
// ======================
import authRoutes from "./routes/authRoutes.js";
import youtubeRoutes from "./routes/youtubeRoutes.js";
import collectionRoutes from "./routes/collectionRoutes.js";

const app = express();

// ======================
// GLOBAL MIDDLEWARES
// ======================
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use(
  fileUpload({
    limits: { fileSize: 10 * 1024 * 1024 },
    useTempFiles: true,
    tempFileDir: "/tmp/",
    abortOnLimit: true,
  })
);

// ======================
// ROUTES
// ======================
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🚀 YouTube Playlist Curator API is running",
    maxUploadSize: "10MB",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/youtube", youtubeRoutes);
app.use("/api/collections", collectionRoutes);

// ======================
// SERVER
// ======================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
