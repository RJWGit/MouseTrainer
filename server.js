const express = require("express");
const bycrypt = require("bcrypt");
const mongoose = require("mongoose");
const passport = require("passport");
const cors = require("cors");
const app = express();

const port = process.env.PORT || 3000;

app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const authRoute = require("./routes/auth");
app.use("/api/user", authRoute);

// Database initialization
mongoose.connect(
  "mongodb://localhost:27017",
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Connected to db")
);

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
