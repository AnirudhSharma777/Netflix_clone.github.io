import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { UserAuth } from "../context/AuthContext";
import { db } from "../Firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { toast } from "react-hot-toast";

const Movies = ({ items }) => {
  const [like, setLike] = useState(false);
  const [saved, SetSaved] = useState(false);
  const { user } = UserAuth();
  
  const movieId = doc(db, 'user', `${user?.email}`);

  const saveHandler = async(e) =>{
    if(user?.email){
      setLike(!like);
      SetSaved(true);
      await updateDoc(movieId,{
        saveShows: arrayUnion({
          id:items.id,
          title: items.original_title,
          image: items.backdrop_path,
          released_date: items.release_date
        })
      })
      toast.success("Added in MyShows")
    }else{
      toast.error('Please logIn');
    }
  }
  
  return (
    <div className="w-[160px] sm:w-[200px] lg:w-[280px] inline-block cursor-pointer relative p-1">
      <img
        className="w-full h-auto block"
        src={`https://image.tmdb.org/t/p/original/${items?.backdrop_path}`}
        alt=""
        loading="lazy"
      />

      <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-gray-300">
        <p className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full">
          {items?.title}
        </p>

        <p onClick={saveHandler} className="absolute top-4 left-4">
          {like ? <FaHeart /> : <FaRegHeart />}
        </p>
      </div>
    </div>
  );
};

export default Movies;
