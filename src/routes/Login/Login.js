import { React, useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import UserImg from "../../components/User/UserImg";
import styles from "./Login.module.css";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import UserImg from "../../components/UserImg";
import { FaUserCircle, FaLock } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";

function Login() {
  const [id, setID] = useState("");
  const [pass, setPass] = useState("");
  const [label, setLabel] = useState("");
  const [status, setStatus] = useState(0);
  const navigate = useNavigate();

  const idChange = (event) => {
    setID(event.target.value);
  };
  const passChange = (event) => {
    setPass(event.target.value);
  };

  Axios.defaults.withCredentials = true;

  const onClick = (event) => {
    event.preventDefault();
    Axios.post("http://localhost:4000/login", {
      selectID: id,
      selectPASS: pass,
    }).then((res) => {
      if (res.status === 200) {
        navigate("/");
      } else if (res.status === 201) {
        setStatus(res.status);
        setLabel(res.data);
      }
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:4000/login");
  }, []);

  return (
    <div className={styles.LoginFrom}>
      <UserImg />

      <div className={styles.LoginFromBox}>
        <div className={styles.LoginFromBox_login}>
          <h2 className={styles.LoginFromBox_login_h2}>회원이 아니신가요?</h2>
          <span className={styles.LoginFromBox_login_span}>
            계정이 없을 경우에는 아래 버튼을 눌러주세요
          </span>
          <Link to={"/Join"}>
            <button className={styles.LoginFromBox_login_btn}>회원가입</button>
          </Link>
        </div>
        <div className={styles.LoginFrom_login}>
          <Link to={"/"}>
            <IoIosArrowBack className={styles.LoginFromBox_login_goHomePage} />
          </Link>
          <div className={styles.LoginFrom_login_div}>
            <div className={styles.LoginFrom_login_label}>
              <FaUserCircle className={styles.LoginFrom_login_label_icons} />
              <label>ID</label>
            </div>
            <input
              type="text"
              value={id}
              onChange={idChange}
              placeholder="아이디를 입력해주세요..."
              className={styles.LoginFrom_login_div_input}
            />
          </div>

          <div className={styles.LoginFrom_login_div}>
            <div className={styles.LoginFrom_login_label}>
              <FaLock className={styles.LoginFrom_login_label_icons} />
              <label>Password</label>
            </div>
            <input
              type="password"
              value={pass}
              onChange={passChange}
              placeholder="비밀번호를 입력해주세요..."
              className={styles.LoginFrom_login_div_input}
            />
          </div>
          {status === 201 ? (
            <label className={styles.Error_Label}>{label}</label>
          ) : null}
          <button
            className={styles.LoginFrom_login_label_button}
            onClick={onClick}
          >
            로그인
          </button>
        </div>
      </div>

      {/* <form className={styles.LoginFrom_form}>
        <input
          type="text"
          value={id}
          onChange={idChange}
          required
          className={styles.LoginFrom_input}
        />
        <input
          type="password"
          value={pass}
          onChange={passChange}
          required
          className={styles.LoginFrom_input}
        />
        {status === 201 ? <label>{label}</label> : null}
        <button className={styles.LoginFrom_btn} onClick={onClick}>
          Login
        </button>
      </form> */}
    </div>
  );
}

export default Login;
