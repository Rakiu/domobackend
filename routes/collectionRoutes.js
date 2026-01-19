import express from "express";
import auth from "../middleware/authMiddleware.js";
import {
  createCollection,
  getCollections,
  addVideo,
  removeVideo,
} from "../controllers/collectionController.js";

const router = express.Router();

router.post("/", auth, createCollection);
router.get("/",  getCollections);
router.post("/:collectionId/videos", auth, addVideo);
router.delete("/:collectionId/videos/:videoId", auth, removeVideo);

export default router;
