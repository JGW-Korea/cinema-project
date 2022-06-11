const express = require("express");
const router = express.Router();

const { sequelize, Tiket } = require("../../models");
const { Op } = require("sequelize");

router.get("/", async (req, res) => {
  const { UserName } = req.query;

  try {
    const findTiket = await Tiket.findAll({
      where: {
        TiketUser: { [Op.eq]: [UserName] },
      },
      order: [["createdAt", "DESC"]],
    });

    res.send(findTiket);
  } catch (error) {
    console.log("err");
  }
});

router.get("/deleted", async (req, res) => {
  const { TiketNum, User } = req.query;

  try {
    const deleteTiket = await Tiket.destroy({
      where: {
        TiketNumber: TiketNum,
        TiketUser: User,
      },
    });

    if (deleteTiket) {
      console.log("티켓 삭제");
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
