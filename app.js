const express = require("express");
// const cors = require("cors");
const path = require("path");
const session = require("express-session");
const errorHandler = require("./error/error-handler");
require("dotenv").config();

// routes
const loginRoutes = require("./routes/login");
const userRoutes = require("./routes/users");
const boatRoutes = require("./routes/boats");
const loadRoutes = require("./routes/loads");

// set up app
const app = express();
app.enable("trust proxy");
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(express.static(path.join(__dirname, "./frontend/build")));

// app routes
app.use("/users", userRoutes);
app.use("/boats", boatRoutes);
app.use("/loads", loadRoutes);
app.use("/", loginRoutes);

// get React html page
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "./frontend/build/index.html"));
});

// app error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});