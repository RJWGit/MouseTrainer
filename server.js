const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => res.send("asdf !"));
app.get("/login", (req, res) => {});

app.post("localhost:3000/login", (req, res) => {
  console.log(req.body);
  res.send("Login Recieved");
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);

//TODO:
//1. Make GET/POST requests for login/Create Account
//2. Create Login/Create Account page
//3. Add mongoDB to store the information from the requests
//4. Migrate client/server into one repo
//5. Push changes to live site
//6. Hash passwords
//7. Add email verification???
