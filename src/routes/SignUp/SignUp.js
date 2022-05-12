import { React, useState } from "react";
import Axios from "axios";
import "./SignUp.css";
import { FaUserCircle, FaLock, FaAddressCard } from "react-icons/fa";
import { GrMail } from "react-icons/gr";
import { Link } from "react-router-dom";
import UserImg from "../../components/User/UserImg";

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
    <div className="signup">
      <UserImg />

      <div className="signupBox">
        <div className="signupBox_login">
          <h2>이미 회원이신가요?</h2>
          <span>회원이시면 아래 로그인 버튼을 눌러주세요</span>
          <Link to={`/Login`}>
            <button>로그인</button>
          </Link>
        </div>

        <div className="signupBox_join">
          <div className="signupBox_join_div">
            <div className="signupBox_join-label">
              <FaAddressCard className="signupBox_join-label-icons" />
              <label>Name</label>
            </div>
            <input
              type="text"
              value={name}
              onChange={nameValue}
              id="name"
              placeholder="Your Name"
            />
          </div>
          <div className="signupBox_join_div">
            <div className="signupBox_join-label">
              <GrMail className="signupBox_join-label-icons" />
              <label>Email</label>
            </div>
            <input
              type="text"
              value={email}
              onChange={mailValue}
              onBlur={mailDIS}
              placeholder="Your Email@gmail.com"
            />
            {mailIndex === 200 ? (
              <label className="Error-Label">{MailCheck}</label>
            ) : null}
          </div>
          <div className="signupBox_join_div">
            <div className="signupBox_join-label">
              <FaUserCircle className="signupBox_join-label-icons" />
              <label>ID</label>
            </div>
            <input
              type="text"
              value={id}
              onChange={idValue}
              onBlur={idDIS}
              placeholder="Your ID"
            />
            {idIndex === 201 ? (
              <label className="Error-Label">{IdCheck}</label>
            ) : null}
          </div>
          <div className="signupBox_join_div">
            <div className="signupBox_join-label">
              <FaLock className="signupBox_join-label-icons" />
              <label>Password</label>
            </div>
            <input
              type="password"
              value={pass}
              onChange={passValue}
              onBlur={findDIS}
              placeholder="Your Password"
            />
          </div>
          {findInex === 202 ? (
            <Link to={"/Login"}>
              <button
                className="signupBox_join-label-button"
                onClick={onSubmit}
              >
                Join In
              </button>
            </Link>
          ) : (
            <button className="signupBox_join-label-button">Join In</button>
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
