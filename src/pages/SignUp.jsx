import React, { useState } from "react";
import banner from "../asserts/background.jpg";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, signUp } = UserAuth();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await signUp(email, password);
      navigate("/");
      toast.success("Sucessfully SignedUp");
    } catch (error) {
      toast.error(error.message)
    }
  };
  return (
    <>
      <div className="w-full h-screen">
        <img
          className="hidden sm:block absolute w-full h-full object-cover"
          src={banner}
          alt="banner.jpg"
        />
        <div className="bg-black/80 fixed top-0 left-0 w-full h-screen"></div>

        <div className="fixed w-full px-4 py-24 z-50">
          <div
            className="max-w-[450px] h-[600px] 
           bg-black/75 text-white mx-auto"
          >
            <div className="max-w-[330px] mx-auto py-16">
              <h1 className="text-3xl font-bold">Sign Up</h1>
              <form
                onSubmit={submitHandler}
                action=""
                className="w-full flex flex-col py-4"
              >
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="email or phone number"
                  className="p-3 my-2 bg-gray-700 rounded"
                />
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Password"
                  className="p-3 my-2 bg-gray-700 rounded"
                />
                <button className="bg-red-600 py-3 my-6 rounded font-bold">
                  Sign In
                </button>
                <p className="text-center font-light">Forgot Password?</p>
                <div className="flex justify-between items-center text-sm text-grey-600 my-3">
                  <p>
                    <input type="checkbox" className="mr-2" />
                    Remember me
                  </p>
                  <p>Need Help?</p>
                </div>

                <p className="py-4">
                  <span className="text-gray-600">
                    Already subscribed to Netflix?
                  </span>{" "}
                  <Link to={"/login"}>Sign In</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
