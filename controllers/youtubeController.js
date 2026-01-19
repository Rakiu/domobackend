import axios from "axios";

export const searchVideos = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          part: "snippet",
          q: query,
          maxResults: 12,
          type: "video",
          key: process.env.YOUTUBE_API_KEY,
        },
      }
    );

    const videos = response.data.items.map((item) => ({
      title: item.snippet.title,
      videoId: item.id.videoId,
      thumbnail: item.snippet.thumbnails.medium.url,
    }));

    res.json(videos);
  } catch (error) {
    res.status(500).json({
      message: "YouTube API Error",
      error: error.message,
    });
  }
};
