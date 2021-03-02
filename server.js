const express = require("express");
const path = require('path');
const fs = require('fs');
const app = express();


const port = 8080;

// Home Page 
app.get('/', (req, res) => res.sendFile(
    path.join(__dirname, '/public/index.html')
));

// Note Taking Page 
app.get('/notes', (req, res) => res.sendFile(
    path.join(__dirname, '/public/notes.html')
));


// --- JSON | Read JSON DB file then send to URL
app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        return res.json(JSON.parse(data));
    })
});

app.use(express.static(__dirname + "/public"));

// Listening Server
app.listen(port, () => console.log(`Server is currently running on http://localhost:${port}`));