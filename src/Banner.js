import React, { useEffect, useState } from "react";
import axios from "./axios";
import requests from "./request";
import "./Banner.css";
import movieTrailer from "movie-trailer";
import YouTube from "react-youtube";

const Banner = () => {
  const [movie, setMovie] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchTrending);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }
    fetchData();
  }, []);

  //console.log(movie);
  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie.original_title || movie?.title || movie?.name || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
          console.log(urlParams);
        })
        .catch((error) => console.log(movie));
    }
  };

  const opts = {
    height: "390",
    width: "100%",
    playsInline: true,
    endSeconds: 3,
    allowFullScreen: true,
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner_buttons">
          <button onClick={() => handleClick(movie)} className="banner__button">
            Play
          </button>
          <button className="banner__button">My List</button>
        </div>

        <h1 className="banner__description">
          {truncate(movie?.overview, 150)}
        </h1>
      </div>
      <div className="banner--fadeBottom"></div>
      <div className="banner__Player">
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
      </div>
    </header>
  );
};

export default Banner;
