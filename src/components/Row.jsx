import axios from "axios";
import React, { useEffect, useState } from "react";
import Movies from "./Movies";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const Row = ({ rowid, title, fetchURL }) => {
  const [movies, setMovies] = useState();

  useEffect(() => {
    axios
      .get(fetchURL)
      .then((response) => {
        setMovies(response.data.results);
      })
      .catch(() => {
        console.log("Something went wrong!!");
      });
  }, []);

  const chevronLeftHandler = () => {
    var slider = document.getElementById("slider" + rowid);
    slider.scrollLeft -= 500;
  };

  const chevronRightHandler = () => {
    var slider = document.getElementById("slider" + rowid);
    slider.scrollLeft += 500;
  };

  return (
    <div>
      <h2 className="text-3xl text-white md:text-xl p-4 capitalize">{title}</h2>

      <div className="relative flex items-center group ">
        <MdChevronLeft
          onClick={chevronLeftHandler}
          className="text-black bg-gray-200 rounded-full absolute opacity-75 hover:opacity-100 cursor-pointer z-10 left-1 hidden group-hover:block text-2xl"
          size={40}
        />
        <div
          id={"slider" + rowid}
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smoo
         scrollbar-hide relvative"
        >
          {movies &&
            movies.map((items) => {
              return <Movies key={items?.id} items={items} />;
            })}
        </div>
        <MdChevronRight
          onClick={chevronRightHandler}
          className="text-black bg-gray-200 rounded-full absolute opacity-75 hover:opacity-100 cursor-pointer z-10 right-1 hidden group-hover:block text-2xl"
          size={40}
        />
      </div>
    </div>
  );
};

export default Row;
