import { React, useState, useEffect } from "react";
import styles from "./Section.module.css";
import { Link } from "react-router-dom";
import Axios from "axios";

function Section(props) {
  const [login, setLogin] = useState(false);

  useEffect(() => {
    Axios.get("http://localhost:4000/login").then((res) => {
      setLogin(res.data.loggedIn);
    });
  }, [setLogin]);

  const AlertLogin = () => {
    alert("로그인 후 예매하실 수 있습니다");
  };

  return (
    <div className={styles.Section_box}>
      <div className={styles.Section_img_box}>
        <img
          className={styles.Section_img}
          src={props.movieImage}
          alt={props.movieId}
        />
        <div className={styles.Section_box_shadow}>
          {/* <span className={styles.movieTitle}>{props.movieTitle}</span> */}

          {login ? (
            <Link to={"/Booking"} className={styles.titleBtn}>
              예매하기
            </Link>
          ) : (
            <button onClick={AlertLogin} className={styles.titleBtn}>
              예매하기
            </button>
          )}

          <Link
            to={{
              pathname: `/Movie/${props.movieId}/${props.movieTitle}`,
            }}
            className={styles.reviewBtn}
          >
            상세보기
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Section;
