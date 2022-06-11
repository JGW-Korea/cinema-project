import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Seat.module.css";

import Sidebar from "../../components/Sidebar/Sidebar";

function Seat() {
  const { title, id } = useParams();

  const [SeatInfo, setSeatInfo] = useState([]);

  const [indexNum, setIndexNum] = useState(null);
  const [SecondIndex, setSecondIndex] = useState(null);

  const [login, setLogin] = useState(false);
  const [user, setUser] = useState([]);

  const apiUrl = `http://localhost:4000/seatinfo/${id}`;

  const ScreenBtn = (event, index, j) => {
    if (
      event.target.classList.contains(`${styles.seat}`) &&
      !event.target.classList.contains(`${styles.occupied}`)
    ) {
      event.target.classList.toggle(`${styles.seatSelect}`);
      setIndexNum(index);
      setSecondIndex(j);
    }
  };

  useEffect(() => {
    Axios.get(apiUrl, {
      params: {
        ScreenNum: id,
      },
    }).then((res) => {
      setSeatInfo(res.data);
    });
  }, [id, apiUrl]);

  useEffect(() => {
    Axios.get("http://localhost:4000/login").then((res) => {
      setLogin(res.data.loggedIn);
      if (login === true) {
        setUser([res.data.user[0].userName]);
      }
    });
  }, [login]);

  const RezBtn = (event) => {
    Axios.post(`http://localhost:4000/seatinfo/${id}/tiket`, {
      MovieInfo: title,
      DateTime: id,
      FirstIndex: indexNum,
      LastIndex: SecondIndex,
      User: user,
      Seat: SeatInfo,
    });

    window.location.replace("/");
  };

  return (
    <div className={styles.body}>
      <Sidebar />

      <div className={styles.screenBox}>
        <div className={`${styles.screen}`}></div>
        {SeatInfo &&
          SeatInfo.map((s, index, row) => (
            <div className={styles.row} key={index}>
              <div
                className={`${styles.seat} ${
                  SeatInfo[index][0] === "X" ? styles.occupied : null
                }`}
                onClick={(event) => {
                  ScreenBtn(event, index, 0);
                }}
              ></div>
              <div
                className={`${styles.seat} ${
                  SeatInfo[index][1] === "X" ? styles.occupied : null
                }`}
                onClick={(event) => {
                  ScreenBtn(event, index, 1);
                }}
              ></div>
              <div
                className={`${styles.seat} ${
                  SeatInfo[index][2] === "X" ? styles.occupied : null
                }`}
                onClick={(event) => {
                  ScreenBtn(event, index, 2);
                }}
              ></div>
              <div
                className={`${styles.seat} ${
                  SeatInfo[index][3] === "X" ? styles.occupied : null
                }`}
                onClick={(event) => {
                  ScreenBtn(event, index, 3);
                }}
              ></div>
              <div
                className={`${styles.seat} ${
                  SeatInfo[index][4] === "X" ? styles.occupied : null
                }`}
                onClick={(event) => {
                  ScreenBtn(event, index, 4);
                }}
              ></div>
              <div
                className={`${styles.seat} ${
                  SeatInfo[index][5] === "X" ? styles.occupied : null
                }`}
                onClick={(event) => {
                  ScreenBtn(event, index, 5);
                }}
              ></div>
              <div
                className={`${styles.seat} ${
                  SeatInfo[index][6] === "X" ? styles.occupied : null
                }`}
                onClick={(event) => {
                  ScreenBtn(event, index, 6);
                }}
              ></div>
              <div
                className={`${styles.seat} ${
                  SeatInfo[index][7] === "X" ? styles.occupied : null
                }`}
                onClick={(event) => {
                  ScreenBtn(event, index, 7);
                }}
              ></div>
            </div>
          ))}
        <button className={`${styles.RezBtn}`} onClick={RezBtn}>
          예약하기
        </button>
      </div>
    </div>
  );
}

export default Seat;
