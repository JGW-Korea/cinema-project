const express = require("express");
const router = express.Router();

const { sequelize, screen, movie } = require("../../models");
const { Op } = require("sequelize");
const moment = require("moment");

// sequelize
//   .sync({ force: false })
//   .then(() => {
//     screen.bulkCreate([
//       {
//         movieNumber: 101010,
//         screenDate: "2022.06.20",
//         screenTime: "09:30",
//       },
//       {
//         movieNumber: 101010,
//         screenDate: "2022.06.20",
//         screenTime: "12:30",
//       },
//       {
//         movieNumber: 101010,
//         screenDate: "2022.06.20",
//         screenTime: "15:30",
//       },
//       {
//         movieNumber: 101010,
//         screenDate: "2022.06.21",
//         screenTime: "09:30",
//       },
//       {
//         movieNumber: 101010,
//         screenDate: "2022.06.21",
//         screenTime: "12:30",
//       },
//       {
//         movieNumber: 101010,
//         screenDate: "2022.06.21",
//         screenTime: "15:30",
//       },
//       {
//         movieNumber: 101010,
//         screenDate: "2022.06.22",
//         screenTime: "09:30",
//       },
//       {
//         movieNumber: 101010,
//         screenDate: "2022.06.22",
//         screenTime: "12:30",
//       },
//       {
//         movieNumber: 101010,
//         screenDate: "2022.06.22",
//         screenTime: "15:30",
//       },
//       {
//         movieNumber: 111111,
//         screenDate: "2022.06.20",
//         screenTime: "09:30",
//       },
//       {
//         movieNumber: 111111,
//         screenDate: "2022.06.20",
//         screenTime: "12:30",
//       },
//       {
//         movieNumber: 111111,
//         screenDate: "2022.06.20",
//         screenTime: "15:30",
//       },
//       {
//         movieNumber: 111111,
//         screenDate: "2022.06.21",
//         screenTime: "09:30",
//       },
//       {
//         movieNumber: 111111,
//         screenDate: "2022.06.21",
//         screenTime: "12:30",
//       },
//       {
//         movieNumber: 111111,
//         screenDate: "2022.06.21",
//         screenTime: "15:30",
//       },
//       {
//         movieNumber: 111111,
//         screenDate: "2022.06.22",
//         screenTime: "09:30",
//       },
//       {
//         movieNumber: 111111,
//         screenDate: "2022.06.22",
//         screenTime: "12:30",
//       },
//       {
//         movieNumber: 111111,
//         screenDate: "2022.06.22",
//         screenTime: "15:30",
//       },
//       {
//         movieNumber: 222222,
//         screenDate: "2022.06.20",
//         screenTime: "09:30",
//       },
//       {
//         movieNumber: 222222,
//         screenDate: "2022.06.20",
//         screenTime: "12:30",
//       },
//       {
//         movieNumber: 222222,
//         screenDate: "2022.06.20",
//         screenTime: "15:30",
//       },
//       {
//         movieNumber: 222222,
//         screenDate: "2022.06.21",
//         screenTime: "09:30",
//       },
//       {
//         movieNumber: 222222,
//         screenDate: "2022.06.21",
//         screenTime: "12:30",
//       },
//       {
//         movieNumber: 222222,
//         screenDate: "2022.06.21",
//         screenTime: "15:30",
//       },
//       {
//         movieNumber: 222222,
//         screenDate: "2022.06.22",
//         screenTime: "09:30",
//       },
//       {
//         movieNumber: 222222,
//         screenDate: "2022.06.22",
//         screenTime: "12:30",
//       },
//       {
//         movieNumber: 222222,
//         screenDate: "2022.06.22",
//         screenTime: "15:30",
//       },
//       {
//         movieNumber: 333333,
//         screenDate: "2022.06.20",
//         screenTime: "09:30",
//       },
//       {
//         movieNumber: 333333,
//         screenDate: "2022.06.20",
//         screenTime: "12:30",
//       },
//       {
//         movieNumber: 333333,
//         screenDate: "2022.06.20",
//         screenTime: "15:30",
//       },
//       {
//         movieNumber: 333333,
//         screenDate: "2022.06.21",
//         screenTime: "09:30",
//       },
//       {
//         movieNumber: 333333,
//         screenDate: "2022.06.21",
//         screenTime: "12:30",
//       },
//       {
//         movieNumber: 333333,
//         screenDate: "2022.06.21",
//         screenTime: "15:30",
//       },
//       {
//         movieNumber: 333333,
//         screenDate: "2022.06.22",
//         screenTime: "09:30",
//       },
//       {
//         movieNumber: 333333,
//         screenDate: "2022.06.22",
//         screenTime: "12:30",
//       },
//       {
//         movieNumber: 333333,
//         screenDate: "2022.06.22",
//         screenTime: "15:30",
//       },
//       {
//         movieNumber: 444444,
//         screenDate: "2022.06.20",
//         screenTime: "09:30",
//       },
//       {
//         movieNumber: 444444,
//         screenDate: "2022.06.20",
//         screenTime: "12:30",
//       },
//       {
//         movieNumber: 444444,
//         screenDate: "2022.06.20",
//         screenTime: "15:30",
//       },
//       {
//         movieNumber: 444444,
//         screenDate: "2022.06.21",
//         screenTime: "09:30",
//       },
//       {
//         movieNumber: 444444,
//         screenDate: "2022.06.21",
//         screenTime: "12:30",
//       },
//       {
//         movieNumber: 444444,
//         screenDate: "2022.06.21",
//         screenTime: "15:30",
//       },
//       {
//         movieNumber: 444444,
//         screenDate: "2022.06.22",
//         screenTime: "09:30",
//       },
//       {
//         movieNumber: 444444,
//         screenDate: "2022.06.22",
//         screenTime: "12:30",
//       },
//       {
//         movieNumber: 444444,
//         screenDate: "2022.06.22",
//         screenTime: "15:30",
//       },
//       {
//         movieNumber: 555555,
//         screenDate: "2022.06.20",
//         screenTime: "09:30",
//       },
//       {
//         movieNumber: 555555,
//         screenDate: "2022.06.20",
//         screenTime: "12:30",
//       },
//       {
//         movieNumber: 555555,
//         screenDate: "2022.06.20",
//         screenTime: "15:30",
//       },
//       {
//         movieNumber: 555555,
//         screenDate: "2022.06.21",
//         screenTime: "09:30",
//       },
//       {
//         movieNumber: 555555,
//         screenDate: "2022.06.21",
//         screenTime: "12:30",
//       },
//       {
//         movieNumber: 555555,
//         screenDate: "2022.06.21",
//         screenTime: "15:30",
//       },
//       {
//         movieNumber: 555555,
//         screenDate: "2022.06.22",
//         screenTime: "09:30",
//       },
//       {
//         movieNumber: 555555,
//         screenDate: "2022.06.22",
//         screenTime: "12:30",
//       },
//       {
//         movieNumber: 555555,
//         screenDate: "2022.06.22",
//         screenTime: "15:30",
//       },
//       {
//         movieNumber: 666666,
//         screenDate: "2022.06.20",
//         screenTime: "09:30",
//       },
//       {
//         movieNumber: 666666,
//         screenDate: "2022.06.20",
//         screenTime: "12:30",
//       },
//       {
//         movieNumber: 666666,
//         screenDate: "2022.06.20",
//         screenTime: "15:30",
//       },
//       {
//         movieNumber: 666666,
//         screenDate: "2022.06.21",
//         screenTime: "09:30",
//       },
//       {
//         movieNumber: 666666,
//         screenDate: "2022.06.21",
//         screenTime: "12:30",
//       },
//       {
//         movieNumber: 666666,
//         screenDate: "2022.06.21",
//         screenTime: "15:30",
//       },
//       {
//         movieNumber: 666666,
//         screenDate: "2022.06.22",
//         screenTime: "09:30",
//       },
//       {
//         movieNumber: 666666,
//         screenDate: "2022.06.22",
//         screenTime: "12:30",
//       },
//       {
//         movieNumber: 666666,
//         screenDate: "2022.06.22",
//         screenTime: "15:30",
//       },
//       {
//         movieNumber: 777777,
//         screenDate: "2022.06.20",
//         screenTime: "09:30",
//       },
//       {
//         movieNumber: 777777,
//         screenDate: "2022.06.20",
//         screenTime: "12:30",
//       },
//       {
//         movieNumber: 777777,
//         screenDate: "2022.06.20",
//         screenTime: "15:30",
//       },
//       {
//         movieNumber: 777777,
//         screenDate: "2022.06.21",
//         screenTime: "09:30",
//       },
//       {
//         movieNumber: 777777,
//         screenDate: "2022.06.21",
//         screenTime: "12:30",
//       },
//       {
//         movieNumber: 777777,
//         screenDate: "2022.06.21",
//         screenTime: "15:30",
//       },
//       {
//         movieNumber: 777777,
//         screenDate: "2022.06.22",
//         screenTime: "09:30",
//       },
//       {
//         movieNumber: 777777,
//         screenDate: "2022.06.22",
//         screenTime: "12:30",
//       },
//       {
//         movieNumber: 777777,
//         screenDate: "2022.06.22",
//         screenTime: "15:30",
//       },
//       {
//         movieNumber: 888888,
//         screenDate: "2022.06.20",
//         screenTime: "09:30",
//       },
//       {
//         movieNumber: 888888,
//         screenDate: "2022.06.20",
//         screenTime: "12:30",
//       },
//       {
//         movieNumber: 888888,
//         screenDate: "2022.06.20",
//         screenTime: "15:30",
//       },
//       {
//         movieNumber: 888888,
//         screenDate: "2022.06.21",
//         screenTime: "09:30",
//       },
//       {
//         movieNumber: 888888,
//         screenDate: "2022.06.21",
//         screenTime: "12:30",
//       },
//       {
//         movieNumber: 888888,
//         screenDate: "2022.06.21",
//         screenTime: "15:30",
//       },
//       {
//         movieNumber: 888888,
//         screenDate: "2022.06.22",
//         screenTime: "09:30",
//       },
//       {
//         movieNumber: 888888,
//         screenDate: "2022.06.22",
//         screenTime: "12:30",
//       },
//       {
//         movieNumber: 888888,
//         screenDate: "2022.06.22",
//         screenTime: "15:30",
//       },
//       {
//         movieNumber: 999999,
//         screenDate: "2022.06.20",
//         screenTime: "09:30",
//       },
//       {
//         movieNumber: 999999,
//         screenDate: "2022.06.20",
//         screenTime: "12:30",
//       },
//       {
//         movieNumber: 999999,
//         screenDate: "2022.06.20",
//         screenTime: "15:30",
//       },
//       {
//         movieNumber: 999999,
//         screenDate: "2022.06.21",
//         screenTime: "09:30",
//       },
//       {
//         movieNumber: 999999,
//         screenDate: "2022.06.21",
//         screenTime: "12:30",
//       },
//       {
//         movieNumber: 999999,
//         screenDate: "2022.06.21",
//         screenTime: "15:30",
//       },
//       {
//         movieNumber: 999999,
//         screenDate: "2022.06.22",
//         screenTime: "09:30",
//       },
//       {
//         movieNumber: 999999,
//         screenDate: "2022.06.22",
//         screenTime: "12:30",
//       },
//       {
//         movieNumber: 999999,
//         screenDate: "2022.06.22",
//         screenTime: "15:30",
//       },
//     ]);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

router.get("/", async (req, res) => {
  const screenInfo = await screen.findAll({});

  res.send(screenInfo);
});

router.get("/booking", async (req, res) => {
  const { Movie, Day, Time } = req.query;
  console.log(Movie, Day, Time);

  try {
    const movieNum = await movie.findOne({
      attributes: ["movieNumber"],
      where: {
        movieTitle: { [Op.eq]: [Movie] },
      },
    });

    if (Movie != undefined && Day != null && Time != undefined) {
      const Tiket = await screen.findOne({
        where: {
          [Op.and]: [
            { movieNumber: { [Op.eq]: [movieNum.dataValues.movieNumber] } },
            { screenDate: { [Op.eq]: [Day] } },
            { screenTime: { [Op.eq]: [Time] } },
          ],
        },
      });

      res.send({
        MovieTitle: Movie,
        TiketInfo: Tiket.dataValues.id,
      });
    }

    // if (movieNum) {
    //   // console.log("Fuck You");
    //
    //

    //   console.log(Tiket);

    //   // console.log({
    //   //   MovieTitle: Movie,
    //   //   TiketInfo: Tiket,
    //   // });
    // }
  } catch (error) {
    console.log("Error");
  }

  // console.log({
  //   MovieName: Movie,
  //   Month: Day,
  //   SelectTiem: Time,
  // });
});

module.exports = router;
