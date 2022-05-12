const express = require("express");
const app = express();
const port = 4000;

const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const passport = require("passport");

const { sequelize, userSignUp } = require("./models");
const joinRouter = require("./routes/User/signup");
const LoginRouter = require("./routes/User/login");

sequelize
  .sync({ focus: false })
  .then(() => {
    console.log("DB 연결 성공");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/join", joinRouter);
app.use("/login", LoginRouter);

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
