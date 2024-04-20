const express = require('express');
const app = express();
const cors = require("cors");
const buildingRouter = require('./routes/building');
const roomRouter = require('./routes/room');

app.use(express.json());
app.use(cors());

// Define a route handler for the root path
app.use('/building', buildingRouter);
app.use('/room', roomRouter);

// Define the port where the server will listen for incoming requests
const port = 8000;

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
