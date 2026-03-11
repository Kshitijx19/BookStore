import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { authActions } from "../store/auth";  
import { useDispatch } from "react-redux";

const Login = () => {
  const [Values, setValues]=useState({
    username:"",
    password:"",
  });
  const navigate=useNavigate();
  const dispatch = useDispatch(); // get the dispatch function from Redux
  const change=(e)=>{
    const {name,value}=e.target;
    setValues({...Values,[name]:value});
  };
  const submit = async (e) => {
  e.preventDefault();

  try {
    if (Values.username === "" || Values.password === "") {
      alert("Please fill all the fields");
      return;
    }

    const response = await axios.post(
      "http://localhost:1000/api/v1/sign-in",
      Values
    );

    console.log(response.data);

    // store login data\
    dispatch(authActions.login()); // update Redux state to logged in
    dispatch(authActions.changeRole(response.data.role));
    localStorage.setItem("id", response.data.id);
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("role", response.data.role);
    navigate("/profile");
    alert(response.data.message);

    navigate("/"); // go to home page
  } catch (error) {
    console.log(error);
    alert(error.response?.data?.message || "Login failed");
  }
};
  return (
    <div className="min-h-screen bg-zinc-900 px-12 py-8 flex items-center justify-center">
      
      <div className="bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6">

        <p className="text-zinc-200 text-xl">Login</p>

        <div className="mt-4">

          {/* Username */}
          <div>
            <label className="text-zinc-400">Username</label>

            <input
              type="text"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="username"
              name="username"
              required
              value={Values.username}
              onChange={change}
            />
          </div>

          {/* Password */}
          <div className="mt-4">
            <label className="text-zinc-400">Password</label>

            <input
              type="password"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="password"
              name="password"
              required
              value={Values.password}
              onChange={change}
            />
          </div>

          {/* Button */}
          <div className="mt-6">
            <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-all duration-300"onClick={submit}>
              Login
            </button>
          </div>

          {/* Sign up link */}
          <div className="mt-4 text-center">
            <p className="text-zinc-400">
              Don’t have an account?{" "}
              <Link to="/signup" className="text-blue-500 hover:underline">
                Sign Up
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login