import { React, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Sidebar from "../../Sidebar/Sidebar";
import Axios from "axios";
import styles from "./Movieinfo.module.css";
// import ReactPaginate from "react-paginate";
import Pages from "./Pages/Pages";

function Movieinfo() {
  Axios.defaults.withCredentials = true;

  const { id, title } = useParams();

  const [login, setLogin] = useState(false);
  const [movieinfo, setMovieInfo] = useState([]);
  const [comment, setComment] = useState("");
  const [user, setUser] = useState([]);

  const comitChange = (event) => {
    setComment(event.target.value);
  };

  useEffect(() => {
    Axios.get("http://localhost:4000/movieInfo/img", {
      params: { movieKey: id },
    }).then((res) => {
      setMovieInfo(res.data);
    });
  }, [id]);

  useEffect(() => {
    Axios.get("http://localhost:4000/login").then((res) => {
      setLogin(res.data.loggedIn);
      if (login === true) {
        setUser([res.data.user[0].userName]);
      }
    });
  }, [login]);

  const comitClick = (event) => {
    if (comment === "") {
      return true;
    } else {
      event.preventDefault();

      Axios.post("http://localhost:4000/commentpost", {
        userInfo: user,
        commentInfo: comment,
        movieInfo: id,
      });

      setComment("");
    }
  };

  return (
    <div className={styles.MoviePage}>
      <Sidebar />
      <div className={styles.MoviePageMain}>
        <div className={styles.MoviePageMain_Info}>
          <img
            src={movieinfo.moviePoster}
            alt={title}
            className={styles.MoviePage_MoviePoster}
          />

          <div className={styles.MoviePage_MovieInfo}>
            <h3 className={styles.MoviePage_MovieTitle}>{title}</h3>
            <span className={styles.MoviePage_MovieReview}>
              {movieinfo.movieReview}
            </span>

            <hr className={styles.Hr} />

            <div className={styles.MoviePage_MovieActor}>
              <span>감독 : {movieinfo.movieDirector} / </span>
              <span>배우 : {movieinfo.movieActor}</span>
            </div>
            <div className={styles.MoviePage_MovieActor}>
              <span>장르 : {movieinfo.movieGenre} / </span>
              <span>상영시간 : {movieinfo.movieTime}</span>
            </div>
            <div className={styles.MoviePage_MovieActor}>
              <span>{movieinfo.movieRelease}</span>
            </div>

            {login ? (
              <Link to={"/Booking"} className={styles.MoviePage_Btn}>
                예매하기
              </Link>
            ) : (
              <button className={styles.MoviePage_Btn}>예매하기</button>
            )}
          </div>
        </div>
        <hr className={styles.MoviePageMain_Line} />
        <div className={styles.MoviePageComment}>
          {login ? (
            <form className={styles.MoviePageComment_from}>
              <input
                type="text"
                value={comment}
                onChange={comitChange}
                placeholder="댓글을 입력해주세요"
                className={styles.MoviePageComment_input}
                required
              />
              <button
                onClick={comitClick}
                className={styles.MoviePageComment_Btn}
              >
                등록
              </button>
            </form>
          ) : (
            <form className={styles.MoviePageComment_from}>
              <input
                type="text"
                placeholder="로그인 후 사용해주세요"
                value={comment}
                onChange={comitChange}
                className={styles.MoviePageComment_input}
                disabled
                required
              />
              <button disabled className={styles.MoviePageComment_Btn}>
                등록
              </button>
            </form>
          )}

          <div className={styles.MoviePageComment_box}>
            <span className={styles.MoviePageComment_span}>댓글</span>
            <div>
              <Pages />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Movieinfo;
