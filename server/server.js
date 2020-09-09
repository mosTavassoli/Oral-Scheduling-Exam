//import express
const express = require("express");
const morgan = require("morgan"); // logging middleware
const jwt = require("express-jwt");
const cookieParser = require("cookie-parser");
const jwtSecret = "12345";
// Authorization error
const authErrorObj = {
  errors: [{ param: "Server", msg: "Authorization error" }],
};

//create application
const app = express();
const port = 3001;

// Set-up logging
app.use(morgan("tiny"));

// Process body content
app.use(express.json());

// Public Routes
const publicRoutes = require("./routes/public");
app.use("/api", publicRoutes);
app.use(cookieParser());

// For the rest of the code, all APIs require authentication
app.use(
  jwt({
    secret: jwtSecret,
    getToken: (req) => req.cookies.token,
  })
);

// To return a better object in case of errors
app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401).json(authErrorObj);
  }
});

// AUTHENTICATED REST API endpoints
const privateRoutes = require("./routes/private");
app.use("/api", privateRoutes);

//activate server
app.listen(port, () => console.log(`Server ready on port ${port}`));
