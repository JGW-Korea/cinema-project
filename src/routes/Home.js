import Axios from "axios";
import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  Axios.defaults.withCredentials = true;

  const [login, setLogin] = useState(false);

  useEffect(() => {
    Axios.get("http://localhost:4000/login").then((res) => {
      setLogin(res.data.loggedIn);
    });
  }, []);

  const Logout = () => {
    Axios.get("http://localhost:4000/logout").then((res) => {
      setLogin(res.data.loggedIn);
    });
  };

  // useEffect(() => {
  //   Logout();
  // }, []);

  return (
    <div>
      {login ? (
        <button onClick={Logout}>Logout</button>
      ) : (
        <button>
          <Link to={`/Login`}>Login</Link>
        </button>
      )}

      <button>
        <Link to={`/Join`}>Join</Link>
      </button>
    </div>
  );
}

export default Home;
