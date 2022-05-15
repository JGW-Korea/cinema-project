import { React, useState } from "react";
import Axios from "axios";
import styles from "./SignUp.module.css";
import { FaUserCircle, FaLock, FaAddressCard } from "react-icons/fa";
import { GrMail } from "react-icons/gr";
import { Link } from "react-router-dom";

import UserImg from "../../components/UserImg";

function SignUp() {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [pass, setPass] = useState("");
  const [email, setEmail] = useState("");

  const [idIndex, setIdIndex] = useState(0);
  const [IdCheck, setIdCheck] = useState("");

  const [mailIndex, setMailIndex] = useState(0);
  const [MailCheck, setMailCheck] = useState("");

  const [findInex, setFindInex] = useState(0);

  const idValue = (event) => {
    setId(String(event.target.value));
  };
  const passValue = (event) => {
    setPass(String(event.target.value));
  };
  const nameValue = (event) => {
    setName(String(event.target.value));
  };
  const mailValue = (event) => {
    setEmail(event.target.value);
  };

  const mailDIS = () => {
    Axios.post("http://localhost:4000/join/insert/mail", {
      createEmail: email,
    }).then((res) => {
      setMailIndex(res.status);
      setMailCheck(res.data);
    });
  };

  const idDIS = () => {
    Axios.post("http://localhost:4000/join/insert/id", {
      createId: id,
    }).then((res) => {
      setIdIndex(res.status);
      setIdCheck(res.data);
    });
  };
  const findDIS = (event) => {
    Axios.post("http://localhost:4000/join/insert/find", {
      createEmail: email,
      createId: id,
    }).then((res) => {
      setFindInex(res.status);
    });
  };

  const onSubmit = (event) => {
    Axios.post("http://localhost:4000/join", {
      createName: name,
      createEmail: email,
      createId: id,
      createPass: pass,
    });
  };

  return (
    <div className={styles.signup}>
      <UserImg />

      <div className={styles.signupBox}>
        <div className={styles.signupBox_login}>
          <h2 className={styles.signupBox_login_h2}>이미 회원이신가요?</h2>
          <span className={styles.signupBox_login_span}>
            회원이시면 아래 로그인 버튼을 눌러주세요
          </span>
          <Link to={`/Login`}>
            <button className={styles.signupBox_login_btn}>로그인</button>
          </Link>
        </div>

        <div className={styles.signupBox_join}>
          <div className={styles.signupBox_join_div}>
            <div className={styles.signupBox_join_label}>
              <FaAddressCard className={styles.signupBox_join_label_icons} />
              <label>Name</label>
            </div>
            <input
              type="text"
              value={name}
              onChange={nameValue}
              id="name"
              placeholder="Your Name"
              className={styles.signupBox_join_div_input}
            />
          </div>
          <div className={styles.signupBox_join_div}>
            <div className={styles.signupBox_join_label}>
              <GrMail className={styles.signupBox_join_label_icons} />
              <label>Email</label>
            </div>
            <input
              type="text"
              value={email}
              onChange={mailValue}
              onBlur={mailDIS}
              placeholder="Your Email@gmail.com"
              className={styles.signupBox_join_div_input}
            />
            {mailIndex === 200 ? (
              <label className={styles.Error_Label}>{MailCheck}</label>
            ) : null}
          </div>
          <div className={styles.signupBox_join_div}>
            <div className={styles.signupBox_join_label}>
              <FaUserCircle className={styles.signupBox_join_label_icons} />
              <label>ID</label>
            </div>
            <input
              type="text"
              value={id}
              onChange={idValue}
              onBlur={idDIS}
              placeholder="Your ID"
              className={styles.signupBox_join_div_input}
            />
            {idIndex === 201 ? (
              <label className={styles.Error_Label}>{IdCheck}</label>
            ) : null}
          </div>
          <div className={styles.signupBox_join_div}>
            <div className={styles.signupBox_join_label}>
              <FaLock className={styles.signupBox_join_label_icons} />
              <label>Password</label>
            </div>
            <input
              type="password"
              value={pass}
              onChange={passValue}
              onBlur={findDIS}
              placeholder="Your Password"
              className={styles.signupBox_join_div_input}
            />
          </div>
          {findInex === 202 ? (
            <Link to={"/Login"}>
              <button
                className={styles.signupBox_join_label_button}
                onClick={onSubmit}
              >
                Join In
              </button>
            </Link>
          ) : (
            <button className={styles.signupBox_join_label_button}>
              Join In
            </button>
          )}
        </div>
      </div>
      {/* <div >
        <div className="signupBox_imgbox">
          <div></div>
          <img src={process.env.PUBLIC_URL + `img/${movieImg}`} alt="action" />
        </div>
        <form className="signupBox_join">
          <div>
            <label htmlFor="name">
              <FaRegUserCircle />
              Name
            </label>
            <input type="text" value={name} onChange={nameValue} id="name" />
          </div>
        </form>
      </div> */}
      {/* 
          <input type="text" value={email} onChange={mailValue} />
          {index === 200 ? <label>{check}</label> : null}
          <input type="text" value={id} onChange={idValue} />
          {index === 201 ? <label>{check}</label> : null}
          <input type="password" value={pass} onChange={passValue} />
           */}
    </div>
    // {/* <form>
    //   <label>name</label>
    //   <input type="text" value={name} onChange={nameValue} />
    //   <label>Email</label>
    //   <input type="text" value={email} onChange={mailValue} />
    //
    //   <label>id</label>
    //   <input type="text" value={id} onChange={idValue} />
    //
    //   <label>password</label>
    //   <input type="password" value={pass} onChange={passValue} />
    //   <button onClick={onSubmit}>Create</button>
    // </form> */}
  );
}

export default SignUp;
