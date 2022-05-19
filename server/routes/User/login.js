const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");

const { sequelize, userSignUp } = require("../../models");
const { Op } = require("sequelize");

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
      console.log("아이디 일치");
      if (check) {
        req.session.user = await userSignUp.findAll({
          where: {
            [Op.or]: [{ userId: { [Op.eq]: [selectID] } }],
          },
        });
        res.status(200).send(req.session.user);
      } else {
        res.status(201).send("아이디 또는 비밀번호가 틀렸습니다.");
      }
    } else {
      res.status(201).send("아이디 또는 비밀번호가 틀렸습니다.");
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.get("/", async (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

module.exports = router;
