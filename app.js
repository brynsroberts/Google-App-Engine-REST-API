const express = require("express");
const cors = require("cors");
const path = require("path");
const loginRoutes = require("./routes/login");
const userRoutes = require("./routes/users");
// const apiRoutes = require("./routes/api");
require("dotenv").config();

const app = express();
app.enable("trust proxy");
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "./front-end/build")));

app.use("/", loginRoutes);
app.use("/users", userRoutes);
// app.use("/", apiRoutes);

// app.get("/*", (req, res) => {
//   res.sendFile(path.join(__dirname, "./front-end/build/index.html"));
// });

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
