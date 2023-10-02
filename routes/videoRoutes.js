const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// Define video routes
router.post('/upload-video', upload.single('video'), videoController.uploadVideo);
router.post('/upload-videos', upload.array('videos', 10), videoController.uploadVideos);
router.post('/start-recording', videoController.startRecording);
router.post('/stop-recording', videoController.stopRecording);
router.post('/transcribe/:videoId', videoController.transcribeVideo);

module.exports = router;
