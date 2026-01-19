import { v2 as cloudinary } from "cloudinary";

// 🔥 DIRECT CLOUDINARY CONFIG (TEMPORARY)
cloudinary.config({
  cloud_name: "dz7xbn8j2",
  api_key: "182218984366669",
  api_secret: "UxnjdPLWhom3PXmXB99LVu6WD-0",
});

// ✅ Optional test log
console.log("✅ Cloudinary configured with direct values");

export default cloudinary;
