// libraries
const express = require("express");
const path = require('path');
const fs = require('fs');
const app = express();

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Port to use; need to later add dynamic port for heroku
const port = 8080;

// Home Page | /
app.get('/', (req, res) => res.sendFile(
    path.join(__dirname, '/public/index.html')
));

// Note Page | /notes
app.get('/notes', (req, res) => res.sendFile(
    path.join(__dirname, '/public/notes.html')
));


// JSON Page | /api/notes
app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        return res.json(JSON.parse(data));
    })
});

// POST / /api/notes
app.post('/api/notes', (req, res) => {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    const newNote = req.body;
    let result = true;

    // Read in the current JSON file
    let json = require('./db/db.json');
    json.push(newNote);

    fs.writeFile('./db/db.json', JSON.stringify(json), function (err) {
        if (err) return console.log(err);
        console.log(`The error is: ${err}`);
        result = false;
    });

    res.send(result);
});

// DELETE | Delete note
app.post('/api/notes/:id', (req, res) => {
    const note = req.params.id;
  
    console.log(note);

  
    return res.json(false);
  });






app.use(express.static(__dirname + "/public"));

// Listening Server
app.listen(port, () => console.log(`Server is currently running on http://localhost:${port}`));