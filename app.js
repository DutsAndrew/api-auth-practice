const express = require('express'),
      jwt = require('jsonwebtoken'),
      app = express();

app.get('/api', (req, res) => {
  res.json({
    message: "Welcome to the API",
  });
});

app.post('/api/posts', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) res.sendStatus(403);
    res.json({
      message: "Post created...",
      authData,
    });
  }); 
});

app.post('/api/login', (req, res) => {
  // Mock user
  const user = {
    id: 1,
    username: "Fred",
    email: "fred@gmail.com",
  }

  jwt.sign({user: user}, 'secretkey', { expiresIn: '30s'}, (err, token) => {
    res.json({
      token: token,
    });
  });
});

// FORMAT OF TOKEN
  // Authorization: Bearer <access_token>

// Verify Token
function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ')[1];
    req.token = bearer;
    next();
  } else {
    // FORBIDDEN
    res.sendStatus(403);
  };
};

app.listen(5000, () => console.log("Server started on port 5000"));