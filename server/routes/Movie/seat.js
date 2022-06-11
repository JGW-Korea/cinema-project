const express = require("express");
const router = express.Router();

const { sequelize, Tiket, screen } = require("../../models");
const { Op } = require("sequelize");

const SeatText = [
  ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8"],
  ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8"],
  ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8"],
  ["D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8"],
  ["E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8"],
];

router.get("/:id", async (req, res) => {
  const { ScreenNum } = req.query;

  try {
    const OccupiedSeat = await Tiket.findAll({
      attributes: ["TiketSeat"],
      where: [
        {
          ScreenNumber: { [Op.eq]: [ScreenNum] },
        },
      ],
    });

    let count = 0;

    if (OccupiedSeat) {
      const SeatChange = [
        ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8"],
        ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8"],
        ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8"],
        ["D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8"],
        ["E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8"],
      ];

      while (count < OccupiedSeat.length) {
        for (let i = 0; i < SeatChange.length; i++) {
          for (let j = 0; j < SeatChange[i].length; j++) {
            if (SeatChange[i][j] === OccupiedSeat[count].dataValues.TiketSeat) {
              SeatChange[i][j] = "X";
            }
          }
        }
        count++;
      }

      res.send(SeatChange);
    } else {
      res.send(SeatText);
    }
  } catch (error) {
    console.error(error);
  }
});

router.post("/:id/tiket", async (req, res) => {
  const { MovieInfo, DateTime, FirstIndex, LastIndex, User, Seat } = req.body;

  let str = "";
  for (let i = 0; i < 6; i++) {
    str += Math.floor(Math.random() * 10);
  }

  const num = parseInt(str);

  const UserSeat = SeatText[FirstIndex][LastIndex];

  try {
    const ScreenDate = await screen.findOne({
      attributes: ["screenDate", "screenTime"],
      where: {
        id: { [Op.eq]: [DateTime] },
      },
    });

    if (ScreenDate) {
      const DateNum = parseInt(DateTime);

      await Tiket.create({
        TiketNumber: num,
        ScreenNumber: DateNum,
        MovieName: MovieInfo,
        TiketDate: ScreenDate.dataValues.screenDate,
        TiketTime: ScreenDate.dataValues.screenTime,
        TiketSeat: UserSeat,
        TiketUser: User[0],
      });

      console.log("예약 완료");
    }
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
