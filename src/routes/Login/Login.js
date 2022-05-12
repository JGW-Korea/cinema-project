import { React, useState } from "react";
// import { Link } from "react-router-dom";
// import UserImg from "../../components/User/UserImg";
import "./Login.css";
import Axios from "axios";

function Login() {
  const [id, setID] = useState("");
  const [pass, setPass] = useState("");

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
      console.log(res.data);
    });
  };
  return (
    <div>
      <h2>Login form</h2>
      <form>
        <input type="text" value={id} onChange={idChange} />
        <input type="password" value={pass} onChange={passChange} />
        <button onClick={onClick}>Login</button>
      </form>
    </div>
  );
}

export default Login;
