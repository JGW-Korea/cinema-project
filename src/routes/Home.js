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

  return (
    <div>
      {login ? (
        <button>
          <Link to={`/Login`}>Logout</Link>
        </button>
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
