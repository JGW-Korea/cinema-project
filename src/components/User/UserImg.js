import { React } from "react";
import "../../routes/SignUp/SignUp.css";
import { useEffect, useState } from "react";
import Axios from "axios";

function UserImg() {
  const [movieImg, setMovieImg] = useState("");

  const MovieImg = async () => {
    Axios.get("http://localhost:4000/join/img").then((res) => {
      setMovieImg(res.data);
    });
  };

  useEffect(() => {
    MovieImg();
  }, []);

  return (
    <div className="signupImgBox">
      <div></div>
      <img src={process.env.PUBLIC_URL + `img/${movieImg}`} alt={movieImg} />
    </div>
  );
}

export default UserImg;
