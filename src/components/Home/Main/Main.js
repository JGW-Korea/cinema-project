import { React } from "react";
import YouTube from "react-youtube";

import style from "./Main.module.css";

function Main() {
  return (
    <div className={style.Main}>
      <div className={style.Main_video}></div>
      <div className={style.Main_movie}>
        <div className={style.Main_movie_img}></div>
        <div className={style.Main_movie_img}></div>
        <div className={style.Main_movie_img}></div>
        <div className={style.Main_movie_img}></div>
      </div>
    </div>
  );
}

export default Main;
