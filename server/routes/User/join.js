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

    console.log("Wow");
  } catch (err) {
    console.error("에러");
    next(err);
  }
});

router.use("/insert", InsertRouter);

router.get("/img", (req, res) => {
  const ImgFile = [
    { Number: 1, Imgs: "0.jpg" },
    { Number: 2, Imgs: "1.jpg" },
    { Number: 3, Imgs: "2.jpg" },
    { Number: 4, Imgs: "3.jpg" },
    { Number: 5, Imgs: "4.jpg" },
    { Number: 6, Imgs: "5.jpg" },
    { Number: 7, Imgs: "6.jpg" },
    { Number: 8, Imgs: "7.jpg" },
    { Number: 9, Imgs: "8.jpg" },
    { Number: 10, Imgs: "9.jpg" },
  ];

  const n = Math.floor(Math.random() * Object.keys(ImgFile).length);
  const num = ImgFile[n].Imgs;

  res.send(num);
});

module.exports = router;
