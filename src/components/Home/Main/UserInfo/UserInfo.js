import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../../Sidebar/Sidebar";
import styles from "./UserInfo.module.css";
import Axios from "axios";

import TiketInfo from "./TiketInfo/TiketInfo";

import Slider from "react-slick";
import "../slick.css";
import "../slick-theme.css";

function UserInfo() {
  const { name } = useParams();
  const [FindTiket, setFindTiket] = useState([]);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToScroll: 4,
    slidesToShow: 4,
  };

  useEffect(() => {
    Axios.get("http://localhost:4000/tiketInfo", {
      params: {
        UserName: name,
      },
    }).then((res) => {
      setFindTiket([...res.data]);
    });
  }, [name]);

  return (
    <div className={styles.body}>
      <Sidebar />

      <div className={styles.UserInfobody}>
        <h2 className={styles.UserInfo_Title}>환영합니다 {name} 님</h2>

        <hr className={styles.UserInfo_Line} />

        <div className={styles.UserInfo_TiketBox}>
          <h3 className={styles.UserInfo_TiketBox_Text}>예매 목록</h3>
          <Slider {...settings}>
            {FindTiket &&
              FindTiket.map((find) => (
                <TiketInfo
                  key={find.TiketNumber}
                  TiketId={find.TiketNumber}
                  TiketMovieTitle={find.MovieName}
                  TiketDate={find.TiketDate}
                  TiketTime={find.TiketTime}
                  TiketUser={find.TiketUser}
                  TiketSeat={find.TiketSeat}
                />
              ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
