import React, { useState, useEffect } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { UserAuth } from "../context/AuthContext";
import { db } from "../Firebase";
import { updateDoc, doc, onSnapshot } from "firebase/firestore";
import { toast } from "react-hot-toast";
import {AiOutlineClose} from 'react-icons/ai';

const SaveShows = () => {
  const [movies, setMovies] = useState();
  const { user } = UserAuth();

  const chevronLeftHandler = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft -= 500;
  };

  const chevronRightHandler = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft += 500;
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, "user", user?.email), 
      (doc) => {
        setMovies(doc.data()?.saveShows); 
      }
    );
    return () => unsubscribe();
  }, [user?.email]);
  
  const movieId = doc(db, 'user',`${user?.email}`);

  const deleteHandler = async (passId) =>{
    try {
        const result = movies.filter((item) => item.id !== passId);
        
        await updateDoc(movieId, {
            saveShows: result
        });
        toast.success("delete sucessfully..")
    } catch (error) {
        toast.error(error.message);
    }
  }
  return (
    <>
      <div>
        <h2 className="text-3xl text-white md:text-xl p-4 capitalize">
          My Shows
        </h2>

        <div className="relative flex items-center group ">
          <MdChevronLeft
            onClick={chevronLeftHandler}
            className="text-black bg-gray-200 rounded-full absolute opacity-75 hover:opacity-100 cursor-pointer z-10 left-1 hidden group-hover:block text-2xl"
            size={40}
          />
          <div
            id={"slider"}
            className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smoo
         scrollbar-hide relvative"
          >
            {movies &&
              movies.map((items) => {
                return (
                  <div key={items.id} className="w-[160px] sm:w-[200px] lg:w-[280px] inline-block cursor-pointer relative p-1">
                    <img
                      className="w-full h-auto block"
                      src={`https://image.tmdb.org/t/p/original/${items?.image}`}
                      alt=""
                      loading="lazy"
                    />

                    <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-gray-300">
                      <p className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full">
                        {items?.title}
                      </p>
                      <p className="absolute text-gray-300 top-4 right-4"
                      onClick={() => deleteHandler(items.id)}><AiOutlineClose/></p>
                    </div>
                  </div>
                );
              })}
          </div>
          <MdChevronRight
            onClick={chevronRightHandler}
            className="text-black bg-gray-200 rounded-full absolute opacity-75 hover:opacity-100 cursor-pointer z-10 right-1 hidden group-hover:block text-2xl"
            size={40}
          />
        </div>
      </div>
    </>
  );
};

export default SaveShows;
