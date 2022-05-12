const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");

const { sequelize, userSignUp } = require("../../models");
const { Op } = require("sequelize");

const InsertRouter = require("./insert");

router.post("/", async (req, res, next) => {
  const { createName, createEmail, createId, createPass } = req.body;

  try {
    const hash = await bcrypt.hash(createPass, 10);

    await userSignUp.create({
      userName: createName,
      userEmail: createEmail,
      userId: createId,
      userPass: hash,
    });
  } catch (err) {
    console.error("에러");
    next(err);
  }
});

router.use("/insert", InsertRouter);

router.get("/img", (req, res) => {
  const ImgFile = [
    { Number: 1, Imgs: "action.jpg" },
    { Number: 2, Imgs: "animation.jpg" },
    { Number: 3, Imgs: "crime.jpg" },
    { Number: 4, Imgs: "romance.jpg" },
    { Number: 5, Imgs: "Hobie.jpg" },
  ];

  const n = Math.floor(Math.random() * Object.keys(ImgFile).length);
  const num = ImgFile[n].Imgs;

  res.send(num);
});

module.exports = router;
