import { React, useEffect, useState } from "react";
import styles from "./Main.module.css";

import Slider from "react-slick";
import "./slick.css";
import "./slick-theme.css";

import Section from "./Contents/Section";
import Axios from "axios";

function Main() {
  const [movies, setMovies] = useState([]);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToScroll: 5,
    slidesToShow: 5,
  };

  useEffect(() => {
    Axios.get("http://localhost:4000/movieInfo").then((res) => {
      setMovies([...res.data]);
    });
  }, []);

  return (
    <div className={styles.Main}>
      <div className={styles.Slider_Contents_Main}>
        <div className={styles.Slider_Contents}>
          <Slider {...settings}>
            {movies &&
              movies.map((movie) => (
                <Section
                  key={movie.movieNumber}
                  movieImage={movie.moviePoster}
                  movieTitle={movie.movieTitle}
                  movieRview={movie.movieReview}
                  movieId={movie.movieNumber}
                />
              ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default Main;
