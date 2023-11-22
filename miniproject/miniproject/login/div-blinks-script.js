const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3000; // Change the port as needed

// MongoDB configuration
mongoose.connect('mongodb://localhost:27017/your_database', { useNewUrlParser: true, useUnifiedTopology: true });
const User = mongoose.model('User', {
  username: String,
  password: String,
});

// Middleware for parsing JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve your HTML file
app.use(express.static(__dirname));

// Handle form submissions
app.post('/submit', (req, res) => {
  const { username, password } = req.body;

  // Create a new user document and save it to MongoDB
  const user = new User({ username, password });
  user.save()
    .then(() => {
      res.send('User data saved to MongoDB.');
    })
    .catch((error) => {
      res.status(500).send('Error saving user data: ' + error);
    });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
