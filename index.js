// index.js
const express = require('express');
const session = require('express-session');
const app = express();
const port = process.env.PORT || 3000;

app.use(session({ secret: 'mongopark', resave: false, saveUninitialized: false }));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


const users = []; // Store user data

// Register a new user
app.post('/register', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send('Username and password are required.');
  }

  if (users.some(user => user.username === username)) {
    return res.status(400).send('Username already exists.');
  }

  const user = { id: Date.now().toString(), username, password };
  users.push(user);
  req.session.userId = user.id; // Set the session ID for the user

  res.status(201).send('Registration successful.');
});

// Login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send('Username and password are required.');
  }

  const user = users.find(user => user.username === username);

  if (!user || user.password !== password) {
    return res.status(401).send('Invalid credentials.');
  }

  req.session.userId = user.id; // Set the session ID for the user
  res.send('Login successful.');
});

// Logout
app.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).send('Logout failed.');
    }
    res.clearCookie('connect.sid'); // Clear session cookie
    res.send('Logout successful.');
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


// Middleware to protect routes that require authentication
function isAuthenticated(req, res, next) {
    if (!req.session.userId) {
      return res.status(401).send('Unauthorized. Please log in.');
    }
    next();
  }
  
  app.get('/dashboard', isAuthenticated, (req, res) => {
    // Implement logic to retrieve and display user's uploaded videos
    res.send('Dashboard - List of Uploaded Videos');
  });
  

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
  