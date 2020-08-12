# MouseTrainer.io

A website aimed at improving users mouse speed and accuracy.

Check it out at [MouseTrainer.io](www.MouseTrainer.io)

## Motivation

I created this websites from the ground up with two goals in mind. First, to better understand React and modern web development, both fronted and backed. Second, to create a site to have all the features I'd want out of a "mouse clicking game".
 
## Features

- Supports three different games modes:
  - **Classic** - Game mode where circles spawn at a static rate.
  - **Precision** - Game mode where circles spawn at a very slow rate and are very small.
  - **Auto Balance** - Game mode where circles spawn at a dynamic rate, spawn time increases/decreases based on player performance.
- **Ranked** - Players scores are saved and displayed on a leader board.
- **Custom** - Players can pick a mode then customize just about everything including, game width/height, circle respawn times, min/max radius, game time, circle growth rate, and more.
- **User Accounts** - Players can create accounts that allows them to saved and display their ranked scores. Players can also change username, passwords, and delete account.

## Tech

- [React](https://reactjs.org/) - Web framework
- [NodeJS](https://nodejs.org/en/) - JS runtime environment
- [ExpressJS](https://expressjs.com/) - Node.js web application framework
- [MongoDB](https://www.mongodb.com/) - NoSQL database

## Security

- [JWT](https://jwt.io/) (JSON Web Tokens) - Making use of both access tokens and refresh tokens to access restricted API routes, as well as letting the user stay logged in between visits.
- [bcrypt](https://www.npmjs.com/package/bcrypt) - Sensitive information, such as passwords, are hashed and salted before being stored in the database.

## Suggestions

For suggestions, questions, or anything else email me at [MouseTrainer@protonmail.com]() or contact me through github.
