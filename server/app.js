const express = require("express");
const app = express();
const port = 4000;

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const cors = require("cors");
const bcrypt = require("bcrypt");
const passport = require("passport");

const { sequelize, movie } = require("./models");

const joinRouter = require("./routes/User/join");
const LoginRouter = require("./routes/User/login");
const LogoutRouter = require("./routes/User/logout");
const MovieRouter = require("./routes/Movie/movieInfo");
const PostRouter = require("./routes/Movie/comment");
const ScreenRouter = require("./routes/Movie/screenInfo");
const SeatRouter = require("./routes/Movie/seat");
const TiketRouter = require("./routes/Movie/tiket");

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
  res.send("Hello");
});

app.use("/join", joinRouter);
app.use("/login", LoginRouter);
app.use("/logout", LogoutRouter);
app.use("/movieInfo", MovieRouter);
app.use("/commentpost", PostRouter);
app.use("/screenInfo", ScreenRouter);
app.use("/seatInfo", SeatRouter);
app.use("/tiketInfo", TiketRouter);

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
