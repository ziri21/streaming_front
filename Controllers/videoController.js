const Video = require('../models/Video');

// POST /videoRouter/add
exports.addVideo = async (req, res) => {
  try {
    const { title, description, url, thumbnail, previewUrl } = req.body;

    const video = new Video({
      title,
      description,
      url,
      thumbnail,   
      previewUrl,  
     
    });

    const savedVideo = await video.save();
    res.status(201).json(savedVideo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GET /videoRouter/videos
exports.getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find();
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// GET /videoRouter/search?title=...
exports.searchVideos = async (req, res) => {
  try {
    const { title } = req.query;

    if (!title || !title.trim()) {
     
      const videos = await Video.find();
      return res.status(200).json(videos);
    }

    const regex = new RegExp(title.trim(), "i");
    const videos = await Video.find({ title: regex });

    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// DELETE /videoRouter/videos/:id
exports.deleteVideo = async (req, res) => {
  try {
    const videoId = req.params.id;
    const video = await Video.findById(videoId);

    if (!video) {
      return res.status(404).json({ message: "Vidéo non trouvée" });
    }

    await Video.findByIdAndRemove(videoId);
    res.status(200).json({ message: "Vidéo supprimée avec succès" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
