const router = require("express").Router();
const User = require("../models/User");
const { schema } = require("../models/User");
const { registerValidation, loginValidation } = require("../validation");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//AUTHENTICATE TOKEN
function authenticateToken(req, res, next) {
  //Get token
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  //Check if token exists
  if (token == null) return res.sendStatus(401);

  //Check if token is valid
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); //Token  is not valid
    req.user = user.username;
    next();
  });
}

//GENERATE TOKEN
function generateAccessToken(user) {
  return jwt.sign({ username: user }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });
}

//GENERATE NEW TOKEN WITH REFRESH TOKEN
router.post("/token", (req, res) => {
  const refreshToken = req.body.refreshToken;

  //Check is token is empty
  if (refreshToken == null) return res.sendStatus(401);

  //Check if token is valid
  if (!refreshToken.includes(refreshToken)) return res.sendStatus(403);
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, user) => {
      if (err) return res.sendStatus(403); //Not valid

      //Check if username exists
      const username = await User.findOne({ username: user.username });
      if (!username) return res.sendStatus(401); //No user found matching username

      //Check if refresh token is same as in database
      if (username.refreshToken === refreshToken) {
        //Send back new access token
        const accessToken = generateAccessToken({ username: user.username });
        return res
          .status(200)
          .send({ accessToken: accessToken, username: user.username });
      }
      //Token mismatch
      else {
        return res.sendStatus(401);
      }
    }
  );
});

//RETURN LEADERBOARD SCORES
router.get("/leaderboard", async (req, res) => {
  let highscores = [];

  await User.find({}, (err, user) => {
    if (err) return res.status(404);
    user.map((x) =>
      highscores.push({ username: x.username, score: x.highscore })
    );

    highscores.sort((x, y) => {
      if (x.score > y.score) return -1;
      else return 1;
    });
  });

  return res.status(200).send(highscores);
});

//LOGIN - CREATE REFRESH TOKEN
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  //Validate input
  const { error } = loginValidation.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Check if username exists
  const user = await User.findOne({ username });
  if (!user)
    return res.status(400).send({ error: "No user with that name exists." });

  //Check password is correct
  const validPass = await user.isValidPassword(password);
  if (!validPass) return res.sendStatus(500);

  //Generate tokens
  const accessToken = generateAccessToken(username);
  const refreshToken = jwt.sign(
    { username: user.username },
    process.env.REFRESH_TOKEN_SECRET
  );

  //Get highscore
  const score = user.highscore;

  //Update refresh token in database
  user.updateRefreshToken(refreshToken);

  //Send back tokens to user
  return res.status(200).send({ accessToken, refreshToken, score });
});

//RANKED - update highscore
router.post("/ranked", authenticateToken, async (req, res) => {
  const { score } = req.body;
  const name = req.user.username;

  //Check if username exists
  const user = await User.findOne({ username: name });
  if (!user)
    return res.status(400).send({ error: "No user with that name exists." });

  //Update refresh token in database
  user.updateHighScore(score);

  //Send back tokens to user
  return res.sendStatus(200);
});

router.post("/gethighscore", async (req, res) => {
  const name = req.body.username;

  const user = await User.findOne({ username: name });
  if (!user)
    return res.status(400).send({ error: "No user with that name exists." });

  const highscore = user.highscore;
  return res.send({ score: highscore });
});

//LOGOUT - DELETE REFRESH TOKEN - NEED TO FIX SAVE REFRESH TOKENS TO DATABASE AND DELETE WHEN THEY LOGOUT
router.delete("/logout", async (req, res) => {
  const token = req.body.refreshToken;

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
    if (err) return res.sendStatus(403);
    const username = await User.findOne({ username: user.username });

    if (username != null) {
      username.updateRefreshToken("");
      return res.sendStatus(200);
    }
  });
});

//TEST ROUTE
router.post("/testlogin", authenticateToken, (req, res) => {
  console.log("hidden api");
  res.sendStatus(200);
});

//CREATE ACCOUNT
router.post("/createaccount", async (req, res) => {
  let { username, password } = req.body;

  //Validate input
  const { error } = registerValidation.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Check if username exists
  let user = await User.findOne({ username });
  if (user)
    return res
      .status(400)
      .send({ error: "A user with that username already exists." });

  try {
    //Create user
    const user = await User.create({
      username,
      password,
      refreshToken: " ",
      highscore: 0,
    });
  } catch (error) {
    return res.sendStatus(400).send({
      error: "There was an interal error. Please try again later.",
    });
  }

  res.sendStatus(200);
});

module.exports = router;
