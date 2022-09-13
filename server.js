// Setup empty JS object to act as endpoint for all routes
projectData = {};
// Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser')

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
const { json } = require("body-parser");
app.use(cors());


// Initialize the main project folder
app.use(express.static('website'));

// Spin up the server
const port = 3000;
const server = app.listen(port, listening);
 function listening(){
    console.log(server);
    console.log(`running on localhost: ${port}`);
  };

// Initialize all route with a callback function

// Callback function to complete GET '/all'
// GET route
app.get('/all', sendData);

function sendData (request, response) {
  const weather = JSON.stringify(projectData);
    //send the converted data
    response.send(weather);
    console.log("data from get route");
    console.log(weather);
};

// Post Route
app.post('/add', addInfo);

function addInfo(req, res) {
    projectData['date'] = req.body.date;
    projectData['temp'] = req.body.temp;
    projectData['content'] = req.body.content;
    res.send(projectData);
    console.log("Post Received");
  }