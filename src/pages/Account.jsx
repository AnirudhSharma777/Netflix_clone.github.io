import React from "react";
import banner from "../asserts/background.jpg";
import SaveShows from "../components/SaveShows";
const Account = () => {
  return (
    <>
      <div className="w-full text-white">
        <img className="w-full h-[400px] object-cover" src={banner} alt="" />
        <div className="bg-black/60 fixed top-0 left-0 w-full h-[550px]"></div>

        <div className="absolute top-[20%] p-4 md:p-8">
          <h1 className="text-3xl md:text-5xl font-bold">My Shows</h1>
        </div>
      </div>
      <SaveShows/>
    </>
  );
};

export default Account;
