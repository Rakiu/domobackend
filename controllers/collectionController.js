import Collection from "../models/Collection.js";
import cloudinary from "../config/cloudinary.js";

// ✅ Create Collection
export const createCollection = async (req, res) => {
  try {
    const collection = await Collection.create({
      name: req.body.name,
    });
    res.status(201).json(collection);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get All Collections
export const getCollections = async (req, res) => {
  try {
    const collections = await Collection.find();
    res.json(collections);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Add Video 
export const addVideo = async (req, res) => {
  try {
    const { collectionId } = req.params;
    const { title, videoId } = req.body;

    const collection = await Collection.findById(collectionId);
    if (!collection) {
      return res.status(404).json({ message: "Collection not found" });
    }

    // 🔹 Thumbnail Upload
    if (!req.files?.thumbnail) {
      return res.status(400).json({ message: "Thumbnail is required" });
    }

    const thumbnailUpload = await cloudinary.uploader.upload(
      req.files.thumbnail.tempFilePath,
      { folder: "thumbnails" }
    );

    // 🔹 Video Upload 
    let videoUrl = "";
    if (req.files?.video) {
      const videoUpload = await cloudinary.uploader.upload(
        req.files.video.tempFilePath,
        {
          resource_type: "video",
          folder: "videos",
        }
      );
      videoUrl = videoUpload.secure_url;
    }

    collection.videos.push({
      title,
      videoId,
      thumbnail: thumbnailUpload.secure_url,
      videoUrl,
    });

    await collection.save();
    res.json(collection);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ✅ Remove Video 
export const removeVideo = async (req, res) => {
  try {
    const { collectionId, videoId } = req.params;

    const collection = await Collection.findById(collectionId);
    if (!collection) {
      return res.status(404).json({ message: "Collection not found" });
    }

    const initialLength = collection.videos.length;

    
    collection.videos = collection.videos.filter(
      (v) => v.videoId !== videoId
    );

    if (collection.videos.length === initialLength) {
      return res.status(404).json({ message: "Video not found in collection" });
    }

    await collection.save();

    res.status(200).json({
      message: "Video removed successfully",
      collection,
    });
  } catch (error) {
    console.error("Remove video error:", error);
    res.status(500).json({ message: error.message });
  }
};

