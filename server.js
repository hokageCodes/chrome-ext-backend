// index.js
const express = require('express');
const session = require('express-session');
const app = express();
const port = process.env.PORT || 3000;

app.use(session({ secret: 'mongopark', resave: false, saveUninitialized: false }));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



  