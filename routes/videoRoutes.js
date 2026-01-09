const express = require('express');
const router = express.Router();
const videoController = require('../Controllers/videoController');

router.post('/add', videoController.addVideo);
router.get('/videos', videoController.getAllVideos);
router.get("/search", videoController.searchVideos);
router.delete('/videos/:id', videoController.deleteVideo);



module.exports = router;
