import Axios from "axios";
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import styles from "./Booking.module.css";
import Calendar from "react-calendar/dist/umd/Calendar";
import "./Calendar.css";
import { Link } from "react-router-dom";
import moment from "moment";

function Booking() {
  const [movies, setMovies] = useState([]);
  const [selectMovie, setSelectMovie] = useState();

  const [date, setDate] = useState(new Date());
  const [selectDay, setSelectDay] = useState(null);

  const [TimeFirst, setTimeFirst] = useState(false);
  const [TimeSecond, setTimeSecond] = useState(false);
  const [TimeLast, setTimeLast] = useState(false);

  const [selectTime, setSelectTime] = useState();

  const [changeTitle, setChangeTitle] = useState(false);
  const [changeDay, setChangeDay] = useState(false);

  const [MovieTime, setMovieTime] = useState([]);
  const [SelectAll, setSelectAll] = useState(false);
  // useEffect(() => {
  //   Axios.get("http://localhost:4000/screenInfo").then((res) => {
  //     console.log(...res.data);
  //   });
  // }, []);

  const MovieBtn = (event) => {
    setSelectMovie(event.target.innerText);

    if (event.target.innerText !== "") {
      setChangeTitle(true);
      // setDate(null);
      setSelectDay(null);
    }
  };

  const onChange = (date) => {
    setDate(date);
    setSelectDay(moment(date).format("YYYY.MM.DD"));

    setChangeDay(true);
  };

  const TimeBtn = (event) => {
    setSelectTime(event.target.innerText);

    if (event.target.innerText === "09:30") {
      setTimeFirst(true);
      setTimeSecond(false);
      setTimeLast(false);
    } else if (event.target.innerText === "12:30") {
      setTimeFirst(false);
      setTimeSecond(true);
      setTimeLast(false);
    } else {
      setTimeFirst(false);
      setTimeSecond(false);
      setTimeLast(true);
    }
  };

  useEffect(() => {
    Axios.get("http://localhost:4000/screenInfo/booking", {
      params: {
        Movie: selectMovie,
        Day: selectDay,
        Time: selectTime,
      },
    }).then((res) => {
      setMovieTime(res.data);
    });
  }, [selectMovie, selectDay, selectTime]);

  useEffect(() => {
    if (
      MovieTime.MovieTitle !== undefined &&
      MovieTime.TiketInfo !== undefined
    ) {
      setSelectAll(true);
    }
  }, [MovieTime, SelectAll]);

  const TimeDiv = () => {
    return (
      <div className={styles.TiketBox_Contents}>
        <button
          className={`${
            TimeFirst ? styles.TiketBox_Time_Btn : styles.TiketBox_Time
          } `}
          onClick={TimeBtn}
        >
          09:30
        </button>
        <button
          className={`${
            TimeSecond ? styles.TiketBox_Time_Btn : styles.TiketBox_Time
          }`}
          onClick={TimeBtn}
        >
          12:30
        </button>

        <button
          className={`${
            TimeLast ? styles.TiketBox_Time_Btn : styles.TiketBox_Time
          }`}
          onClick={TimeBtn}
        >
          15:30
        </button>
      </div>
    );
  };

  // const booking = () => {
  //   Axios.post("http://localhost:4000/info", {
  //     Movie: selectMovie,
  //     Day: selectDay,
  //     Time: selectTime,
  //   }).then((res) => {
  //     const Hello = () => {
  //       return <div>Hello</div>;
  //     };
  //   });
  // };

  // const onClick = () => {
  //   Axios.post("http://localhost:4000/info", {
  //     Movie: selectMovie,
  //     Day: day,
  //   }).then((res) => {
  //     console.log(res.data);
  //   });
  // };

  useEffect(() => {
    Axios.get("http://localhost:4000/movieInfo").then((res) => {
      setMovies([...res.data]);
    });
  }, []);

  return (
    <div>
      <Sidebar />

      <div className={styles.booking}>
        <div className={styles.bookingBox}>
          <div className={styles.bookingBox_Tiket}>
            <div className={styles.TiketBox}>
              <div className={styles.TiketBox_Header}>영화</div>
              <div className={styles.TiketBox_Contents}>
                {movies.map((movie, index) => (
                  <button
                    onClick={MovieBtn}
                    className={styles.TiketBox_Title}
                    key={index}
                  >
                    {movie.movieTitle}
                  </button>
                ))}
              </div>
            </div>
            <div className={styles.TiketBox}>
              <div className={styles.TiketBox_Header}>영화</div>
              <div className={styles.TiketBox_Contents}>
                {changeTitle ? (
                  <Calendar
                    onChange={onChange}
                    value={date}
                    prevLabel={null}
                    prev2Label={null}
                    nextLabel={null}
                    next2Label={null}
                    showNeighboringMonth={false}
                    tileDisabled={({ date, view }) =>
                      date.getDate() !== 20 &&
                      date.getDate() !== 21 &&
                      date.getDate() !== 22
                    }
                    className={styles.Calendar}
                  />
                ) : null}
              </div>
            </div>
            <div className={styles.TiketBox}>
              <div className={styles.TiketBox_Header}>시간</div>
              {changeDay ? <TimeDiv /> : null}
            </div>
          </div>
          {SelectAll ? (
            <Link to={`/Seat/${MovieTime.MovieTitle}/${MovieTime.TiketInfo}`}>
              <button className={styles.bookingBtn}>예약</button>
            </Link>
          ) : (
            <button className={styles.bookingBtn}>예약</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Booking;
