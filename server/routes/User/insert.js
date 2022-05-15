const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");

const { sequelize, userSignUp } = require("../../models");
const { Op } = require("sequelize");

router.post("/mail", async (req, res) => {
  const { createEmail } = req.body;
  try {
    const exEmail = await userSignUp.findOne({
      attributes: ["userEmail"],
      where: {
        [Op.or]: [{ userEmail: { [Op.eq]: [createEmail] } }],
      },
    });

    if (exEmail) {
      return res.status(200).send("이미 사용중이거나 탈퇴한 이메일 입니다.");
    } else if (!exEmail) {
      return res.status(206).send("");
    }
  } catch (error) {
    console.log("에러");
    next(err);
  }
});
router.post("/id", async (req, res) => {
  const { createId } = req.body;
  try {
    const exId = await userSignUp.findOne({
      attributes: ["userId"],
      where: {
        [Op.or]: [{ userId: { [Op.eq]: [createId] } }],
      },
    });
    if (exId) {
      return res.status(201).send("이미 사용중이거나 탈퇴한 아이디입니다.");
    } else if (!exId) {
      return res.status(206).send("");
    }
  } catch (error) {
    console.log("에러");
    next(err);
  }
});
router.post("/find", async (req, res, next) => {
  const { createEmail, createId } = req.body;

  try {
    const exEmail = await userSignUp.findOne({
      attributes: ["userEmail"],
      where: {
        [Op.or]: [{ userEmail: { [Op.eq]: [createEmail] } }],
      },
    });
    const exId = await userSignUp.findOne({
      attributes: ["userId"],
      where: {
        [Op.or]: [{ userId: { [Op.eq]: [createId] } }],
      },
    });

    if (!exEmail && !exId) {
      // const hash = await bcrypt.hash(createPass, 10);

      // await userSignUp.create({
      //   userName: createName,
      //   userEmail: createEmail,
      //   userId: createId,
      //   userPass: hash,
      // });
      return res.status(202).send("회원가입이 됬습니다.");

      // return res.status(202);
      // res.status(202).send("회원가입이 됬습니다.");
    } else {
      return res.status(404).send("회원가입이 안됬습니다.");
    }
    // return res.status(404);
  } catch (err) {
    console.error("에러");
    next(err);
  }
});
module.exports = router;
