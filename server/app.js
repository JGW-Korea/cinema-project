const express = require("express");
const app = express();
const port = 4000;

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const cors = require("cors");
const bcrypt = require("bcrypt");
const passport = require("passport");

const { sequelize, userSignUp } = require("./models");
const joinRouter = require("./routes/User/signup");
const LoginRouter = require("./routes/User/login");

app.use(bodyParser.json());

sequelize
  .sync({ focus: false })
  .then(() => {
    console.log("DB 연결 성공");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);

app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/join", joinRouter);
app.use("/login", LoginRouter);

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
