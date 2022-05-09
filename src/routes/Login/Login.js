import { React } from "react";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div>
      <button>
        <Link to={`/Login`}>Login</Link>
      </button>
      <button>
        <Link to={`/Join`}>Join</Link>
      </button>
    </div>
  );
}

export default Login;
