import { React } from "react";
import "../routes/SignUp/SignUp.module.css";
import { useEffect, useState } from "react";
import Axios from "axios";
import styles from "../routes/SignUp/SignUp.module.css";

function UserImg() {
  const [movieImg, setMovieImg] = useState("");

  const MovieImg = async () => {
    Axios.get("http://localhost:4000/join/img").then((res) => {
      setMovieImg(res.data);
    });
  };

  useEffect(() => {
    MovieImg();
  }, []);

  return (
    <div className={styles.signupImgBox}>
      <div className={styles.signupImgBox_div}></div>
      <img
        src={process.env.PUBLIC_URL + `img/${movieImg}`}
        alt={movieImg}
        className={styles.signupImgBox_img}
      />
    </div>
  );
}

export default UserImg;
