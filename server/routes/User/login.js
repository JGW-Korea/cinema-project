const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");

const { sequelize, userSignUp } = require("../../models");
const { Op } = require("sequelize");

const InsertRouter = require("./insert");

router.get("/get", (req, res) => {
  res.send("Hello");
});

router.post("/", async (req, res) => {
  const { selectID, selectPASS } = req.body;
  try {
    const idDB = await userSignUp.findOne({
      attributes: ["userId"],
      where: {
        [Op.or]: [{ userId: { [Op.eq]: [selectID] } }],
      },
    });
    const passDB = await userSignUp.findOne({
      attributes: ["userPass"],
      where: {
        [Op.or]: [{ userId: { [Op.eq]: [selectID] } }],
      },
    });

    if (idDB) {
      const check = await bcrypt.compare(selectPASS, passDB.userPass);
      if (check) {
        res.status(200).send("/");
      } else {
        res.status(201).send("비밀번호가 틀렸습니다.");
      }
    } else {
      res.status(202).send("아이디가 틀렸습니다.");
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
});

module.exports = router;
