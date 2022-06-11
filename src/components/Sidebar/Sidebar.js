import { React } from "react";
import styles from "./Sidebar.module.css";
import { FaUnlock, FaUser, FaLock, FaTicketAlt } from "react-icons/fa";
import { RiMovieFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import Axios from "axios";
import { useState, useEffect } from "react";

function Sidebar() {
  Axios.defaults.withCredentials = true;

  const [login, setLogin] = useState(false);
  const [UserInfo, setUserInfo] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:4000/login").then((res) => {
      setLogin(res.data.loggedIn);
      setUserInfo(...res.data.user);
    });
  }, [setLogin]);

  const Logout = () => {
    Axios.get("http://localhost:4000/logout").then((res) => {
      setLogin(res.data.loggedIn);
      setUserInfo(null);
    });

    window.location.replace("/");
  };

  return (
    <div className={styles.Sidebar}>
      <Link to={"/"} className={styles.Sidebar_title}>
        <RiMovieFill className={styles.Sidebar_title_icon} />
        <span className={styles.Sidebar_title_span}>MovStart</span>
      </Link>

      {login ? (
        <div className={styles.Sidebar_option}>
          <Link to={"/Booking"} className={styles.Sidebar_option_btn}>
            <FaTicketAlt className={styles.Sidebar_option_btn_icon} />
            <span>예매</span>
          </Link>
          <div onClick={Logout} className={styles.Sidebar_option_btn}>
            <FaLock className={styles.Sidebar_option_btn_icon} />
            <span>로그아웃</span>
          </div>
          <Link
            to={`/UserInfo/${UserInfo.userNumber}/${UserInfo.userName}`}
            className={styles.Sidebar_option_btn}
          >
            <FaUser className={styles.Sidebar_option_btn_icon} />
            <span>{UserInfo.userName}</span>
          </Link>
        </div>
      ) : (
        <div className={styles.Sidebar_option}>
          {/* <Link to={"/Booking"} className={styles.Sidebar_option_btn}>
            <FaTicketAlt className={styles.Sidebar_option_btn_icon} />
            <span>티켓</span>
          </Link> */}
          <Link to={"/login"} className={styles.Sidebar_option_btn}>
            <FaUnlock className={styles.Sidebar_option_btn_icon} />
            <span>로그인</span>
          </Link>
          <Link to={"/join"} className={styles.Sidebar_option_btn}>
            <FaUser className={styles.Sidebar_option_btn_icon} />
            <span>회원가입</span>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
