import { React, useState } from "react";
// import { Link } from "react-router-dom";
// import UserImg from "../../components/User/UserImg";
import styles from "./Login.module.css";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

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

  const onClick = (event) => {
    event.preventDefault();
    Axios.post("http://localhost:4000/login", {
      selectID: id,
      selectPASS: pass,
    }).then((res) => {
      if (res.status === 200) {
        navigate(res.data);
      } else if (res.status === 201) {
        setStatus(res.status);
        setLabel(res.data);
      } else if (res.status === 202) {
        setStatus(res.status);
        setLabel(res.data);
      }
    });
  };
  return (
    <div className={styles.LoginFrom}>
      <h2 className={styles.LoginFrom_h2}>Login form</h2>
      <form className={styles.LoginFrom_form}>
        <input
          type="text"
          value={id}
          onChange={idChange}
          required
          className={styles.LoginFrom_input}
        />
        {status === 202 ? <label>{label}</label> : null}
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
      </form>
    </div>
  );
}

export default Login;
