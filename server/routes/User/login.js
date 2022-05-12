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
    const findId = await userSignUp.findOne({
      attribute: ["userId", "userPass"],
      where: {
        [Op.or]: [{ userId: { [Op.eq]: [selectID] } }],
      },
    });

    if (findId) {
      res.send(true);
    } else {
      res.send(false);
    }
  } catch (error) {
    console.log("에러");
    next(error);
  }
});

module.exports = router;
