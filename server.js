// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();
/* Initializing the main project folder */
app.use(express.static('website'));

const port = 3000;
/* Dependencies */
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());


// Setup Server
const server = app.listen(port, ()=>{console.log(`Hello world! Running on localhost: ${port}`)})

// Routes:

// GET route
app.get('/all', sendData);

function sendData (req, res) {
  res.send(projectData);
};
// POST Route
app.post('/add', function(req, res){
    let data = req.body;
    projectData['temperature'] = data.temperature;
    projectData['date'] = data.date;
    projectData['user_response'] = data.user_response;
    console.log(projectData);
    console.log('Data had been posted!')
    res.send(projectData)
})