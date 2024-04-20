import React, { useEffect, useState } from "react";
import requests from "../request";
import axios from "axios";
const Main = () => {
  const [movies, setMovies] = useState();
  const [readMore, setReadMore] = useState(false);
  let movie = null;
  if (movies && movies.length > 0) {
    movie = movies[Math.floor(Math.random() * movies.length)];
  }

  useEffect(() => {
    axios.get(requests.requestPopular).then((response) => {
      setMovies(response.data.results);
    });
  }, []);

  const description = readMore ? `${movie?.overview}` : `${movie?.overview.substring(0,150)}...`;

  function readMoreHandler(){
    setReadMore(!readMore);
  }
  return (
    <div className="w-full h-[550px] text-white ">
      <div className="w-full, h-full">
        <div className="absolute w-full h-[550px] bg-gradient-to-r from-black "></div>
        <img
          className="w-full h-full object-cover  hover:grayscale-0"
          src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
          alt=""
        />

        <div className="absolute w-full top-[25%] p-4 md:p-0 ml-4 space-y-6">
          <h1 className="text-3xl md:text-5xl font-bold">
            {movie?.original_title}
          </h1>
          <button className="border bg-gray-300 text-black py-2 px-5 ">
            Play
          </button>
          <button className="border text-gray-300 py-2 px-5 ml-4">
            Watch Later
          </button>

          <div>
            <p className="text-gray-300 text-sm ">
              Released Date: {movie?.release_date}
            </p>
            <p className="w-full md:max-w-[70%] lg:max-w-[50%] text-gray-200">
              {description}
              <span onClick={readMoreHandler} className="cursor-pointer text-[#12b0e8] font-medium">
                {readMore ? ` Show Less` : ` Show More`}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
