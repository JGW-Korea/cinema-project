const express = require("express");
const router = express.Router();

const { sequelize, post } = require("../../models");
const { Op } = require("sequelize");

router.get("/get", async (req, res) => {
  const { movieId } = req.query;

  try {
    const info = await post.findAll({
      where: {
        movieNumber: { [Op.eq]: movieId },
      },
      order: [["createdAt", "DESC"]],
    });

    res.send(info);
  } catch (error) {
    console.log("err");
  }
});

router.get("/getAll", async (req, res) => {
  try {
    const info = await post.findAll({
      order: [["createdAt", "DESC"]],
    });

    res.send(info);
  } catch (error) {
    console.log("err");
  }
});

router.post("/", async (req, res) => {
  const { userInfo, commentInfo, movieInfo } = req.body;

  let str = "";
  for (let i = 0; i < 6; i++) {
    str += Math.floor(Math.random() * 10);
  }

  const num = parseInt(str);

  try {
    await post.create({
      postNumber: num,
      postUser: userInfo[0],
      postText: commentInfo,
      movieNumber: movieInfo,
    });
  } catch (error) {
    console.log("Error");
  }
});

module.exports = router;
