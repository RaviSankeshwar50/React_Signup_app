const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./config/db');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Signup API
// Signup API
app.post('/signup', (req, res) => {
    const { name, email, password } = req.body;

    console.log("Received signup request:", name, email, password); // Debug log

    const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    db.query(sql, [name, email, password], (err, result) => {
        if (err) {
            console.error("Database Error:", err); // Log full error to console
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'User registered successfully' });
    });
});




// Login API
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
    db.query(sql, [email, password], (err, results) => {
        if (err) return res.status(500).send(err);

        
        if (results.length > 0) {
            res.send({ message: 'Login successful', user: results[0] });
        } else {
            res.status(401).send({ message: 'Invalid email or password' });
        }
    });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
