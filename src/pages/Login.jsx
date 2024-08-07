import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { authActions } from "../store/auth";
import toast, { Toaster } from "react-hot-toast";
import anim from "./Animation - 1718948202578.json"
import Lottie from "lottie-react";


const Login = () => {
  const [Data, setData] = useState({ username: "", password: "" });
  const history = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  if (isLoggedIn === true) {
    history("/");
  }

  const dispatch = useDispatch();
  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };
  const submit = async (e) => {
    e.preventDefault();
    try {
      if (Data.username === "" || Data.password === "") {
        toast.error("All fields are required", {
          style: {
            backgroundColor: "red",
            color: "white",
          },
        });
      } else {
        const response = await axios.post(
          "https://my-book-store-tgmm.onrender.com/api/v1/login",
          Data
        );
        setData({ username: "", password: "" });
        dispatch(authActions.login());
        history("/profile");
        dispatch(authActions.changeRole(response.data.role));
        localStorage.setItem("id", response.data._id);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
      }
    } catch (error) {
      toast.error(error.response.data.message, {
        style: {
          backgroundColor: "red",
          color: "white",
        },
      });
    }
  };
  return (
    <div className="h-screen bg-zinc-900 px-12 py-8  lg:flex  lg:gap-6 items-center justify-center ">
      <Toaster />
      <Lottie animationData={anim} className=" h-64 "/>
      <div className="bg-white rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6">
        <p className="text-2xl text-center font-bold text-orange-600">LOGIN</p>
        <div className="mt-4">
          <div>
            <label htmlFor="" className="text-black">
              Username
            </label>
            <input
              type="text"
              className="w-full mt-2 bg-gray-300 text-black p-2 outline-none"
              placeholder="username"
              name="username"
              required
              value={Data.username}
              onChange={change}
            />
          </div>
          <div className="mt-4">
            <label htmlFor="" className="text-black">
              Password
            </label>
            <input
              type="password"
              className="w-full mt-2 bg-gray-300 text-black p-2 outline-none"
              placeholder="password"
              name="password"
              required
              value={Data.password}
              onChange={change}
            />
          </div>
          <div className="mt-4">
            <button
              className="w-full bg-orange-600 text-white font-semibold py-2 rounded hover:bg-orange-800 transition-all duration-300"
              onClick={submit}
            >
              LogIn
            </button>
          </div>
          <p className="flex mt-4 items-center justify-center text-zinc-200 font-semibold">
            Or
          </p>
          <p className="flex mt-4 items-center justify-center text-zinc-500 font-semibold">
            Don't have an account? &nbsp;
            <Link to="/signup" className="hover:text-blue-500">
              <u>Sign Up</u>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
