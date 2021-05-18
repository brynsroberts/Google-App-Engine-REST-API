const express = require("express");
const path = require("path");
// const loginRoutes = require("./routes/login");
// const apiRoutes = require("./routes/api");
const session = require("express-session");
require("dotenv").config();

const app = express();
app.enable("trust proxy");
app.use(express.json());
app.use(express.static(path.join(__dirname, "./front-end/build")));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// app.use("/", loginRoutes);
// app.use("/", apiRoutes);

// app.get("/*", (req, res) => {
//   res.sendFile(path.join(__dirname, "./front-end/build/index.html"));
// });

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
