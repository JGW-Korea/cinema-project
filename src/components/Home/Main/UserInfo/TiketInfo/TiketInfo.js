import React from "react";
import styles from "./TiketInfo.module.css";
import Axios from "axios";

import { MdOutlineCancelPresentation } from "react-icons/md";
import { useParams } from "react-router-dom";

function TiketInfo(props) {
  const { id, name } = useParams();

  const CancelBtn = () => {
    Axios.get("http://localhost:4000/tiketInfo/deleted", {
      params: {
        TiketNum: props.TiketId,
        User: props.TiketUser,
      },
    });
    window.location.replace(`/UserInfo/${id}/${name}`);
  };

  return (
    <div className={styles.Tiket_Box}>
      <div className={styles.Tiket_Box_Info}>
        <button className={styles.CancelBtn} onClick={CancelBtn}>
          <MdOutlineCancelPresentation />
        </button>
        <h3 className={styles.Tiket_Box_Info_Text}>
          예매번호: {props.TiketId}
        </h3>
        <h3 className={styles.Tiket_Box_Info_Text}>
          영화: {props.TiketMovieTitle}
        </h3>
        <h3 className={styles.Tiket_Box_Info_Text}>날짜: {props.TiketDate}</h3>
        <h3 className={styles.Tiket_Box_Info_Text}>
          상영시간: {props.TiketTime}
        </h3>
        <h3 className={styles.Tiket_Box_Info_Text}>이름: {props.TiketUser}</h3>
        <h3 className={styles.Tiket_Box_Info_Text}>좌석: {props.TiketSeat}</h3>
      </div>
    </div>
  );
}

export default TiketInfo;
