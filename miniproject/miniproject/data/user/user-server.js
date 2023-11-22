const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3006;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve your HTML file (user registration form)
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/account.html');
});

// Handle user registration POST request
app.post('/register', (req, res) => {
    const newUser = req.body; // Assuming your form fields match the JSON structure

    // Load the existing user data from the JSON file
    const userData = JSON.parse(fs.readFileSync('users.json'));

    // Push the new user data to the array
    userData.push(newUser);

    // Write the updated data back to the JSON file
    fs.writeFileSync('users.json', JSON.stringify(userData, null, 2));

    res.send('Registration successful'); // You can customize this response
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
