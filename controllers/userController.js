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
  req.session.userId = user.id;

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

  req.session.userId = user.id;
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
    //TO-DO
    res.send('Dashboard - List of Uploaded Videos');
  });
  