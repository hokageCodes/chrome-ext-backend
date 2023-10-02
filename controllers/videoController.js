const { Storage } = require('@google-cloud/storage');
const speech = require('@google-cloud/speech');
const fs = require('fs');
const storage = new Storage();
const client = new speech.SpeechClient();



// Upload single video (requires authentication)
app.post('/upload-video', isAuthenticated, upload.single('video'), (req, res) => {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }
    res.send('Single video uploaded successfully.');
  });

  app.post('/upload-videos', isAuthenticated, upload.array('videos', 10), (req, res) => {
    if (!req.files || req.files.length === 0) {
      return res.status(400).send('No files uploaded.');
    }
    res.send(`${req.files.length} videos uploaded successfully.`);
  });
  
  // Start recording (requires authentication)
  app.post('/start-recording', isAuthenticated, (req, res) => {
    res.send('Recording started');
  });
  
  // Stop recording (requires authentication)
  app.post('/stop-recording', isAuthenticated, (req, res) => {
    res.send('Recording stopped');
  });
  
  // Transcribe video (requires authentication)
  app.post('/transcribe/:videoId', isAuthenticated, (req, res) => {
    const videoId = req.params.videoId;
    res.send('Transcription started');
  });
  