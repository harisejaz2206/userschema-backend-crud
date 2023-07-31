// Packages
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require('morgan');

// Importing project files
const userRoute = require('./routes/users');

const app = express();
const port = 8080;

// Middleware
app.use(cors())
app.use(bodyParser.json());
app.use(morgan());

// Address for REST API
app.use("/api/v1", userRoute);

// Start the server
app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});

