const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Welcome to the Video Recording and Transcription App');
});

module.exports = router;
