const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
// Middleware to explicitly set Content-Type for .js files
app.use((req, res, next) => {
    if (req.path.endsWith('.js')) {
        res.setHeader('Content-Type', 'application/javascript');
    }
    next();
});

// Serve static files from the "frontend" directory
app.use(express.static(path.join(__dirname, '../frontend')));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // replace with your MySQL username
    password: '17116',
    database: 'todolist'
});

db.connect(err => {
    if (err) {
        throw err;
    }
    console.log('MySQL connected...');
});

app.get('/tasks', (req, res) => {
    const sql = 'SELECT * FROM tasks';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.post('/tasks', (req, res) => {
    const newTask = { text: req.body.text };
    const sql = 'INSERT INTO tasks SET ?';
    db.query(sql, newTask, (err, result) => {
        if (err) throw err;
        res.json({ id: result.insertId, ...newTask });
    });
});

app.delete('/tasks/:id', (req, res) => {
    const sql = `DELETE FROM tasks WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.sendStatus(204);
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
