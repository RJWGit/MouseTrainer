const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const path = require("path");
const cors = require("cors");
const app = express();
const authRoute = require("./routes/auth");
require("dotenv").config();

const port = process.env.PORT || 3000;

app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "client/dist")));
app.use("/api/user", authRoute);

//Server static files, must rebuild client to update client changes
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/dist", "index.html"));
});

const uri = process.env.URI;

// Database initialization
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, () =>
  console.log("Connected to db")
);

app.listen(port, () => console.log(`App listening at port:${port}`));
