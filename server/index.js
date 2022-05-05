const express = require("express");
const app = express();
const port = 3002;

const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");

const { sequelize, userSignUp } = require("./models");

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("DB 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("HEllo");
});

app.post("/SignUp", async (req, res) => {
  const signName = req.body.createName;
  const signID = req.body.createId;
  const signPass = req.body.createPass;
  const signEmail = req.body.createEmail;

  sequelize
    .sync()
    .then(() => {
      return userSignUp.create({
        userName: signName,
        userEmail: signEmail,
        userId: signID,
        userPass: signPass,
      });
    })
    .then((result) => {
      console.log("success: true");
    })
    .catch((err) => {
      console.log("success: false");
    });
});

app.listen(port, () => console.log(`Run port: ${port}`));
