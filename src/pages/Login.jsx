import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { loginUser, signupUser } from '../features/user/userSlice'; 
import { addToCartAsync, fetchCartDataAsync } from "../features/cart/cartSlice";
import { toast } from 'react-toastify';





const Login = ({redirectTo = '/cart'}) => {
 const [state, setState] = useState("Login");
 const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
 });

 const dispatch = useDispatch();
 const navigate = useNavigate();
 const location = useLocation();

 const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
 };

 const login = async () => {
    dispatch(loginUser(formData)).then((response) => {
      console.log('Login response:', response);
      if (response.payload.success) {
        localStorage.setItem('token', response.payload.token);
        dispatch(fetchCartDataAsync());
        toast.success(`Welcome ${response.payload.name}!`, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigate(redirectTo || '/'); 
      } else {
        alert(response.payload.errors);
      }
    });
 };

 const signup = async () => {
    dispatch(signupUser(formData)).then((response) => {
      console.log("Signup response:", response);
      if (response.payload.success) {
        localStorage.setItem('auth-token', response.payload.token);
        toast.success(`Welcome ${response.payload.name}!`, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigate('/'); // Redirect to homepage
      } else {
        alert(response.payload.errors);
      }
    });
 };

 return (
    <section className="pt-36 pb-24 max_padd_container flexCenter text-white flex-col bg-gradient-to-r from-black via-purple-900 to-black">
      <div className="max-w-[555px] h-[600px] bg-[#ffffff57] m-auto px-14 py-10 rounded-md">
        <h3 className="font-anta h3 ">{state}</h3>
        <div className="flex flex-col gap-4 mt-7">
          {state === "Sign Up" ? (
            <input
              name="username"
              type="text"
              placeholder="The Sneakers head's name..."
              value={formData.username}
              onChange={changeHandler}
              className="h-14 w-full pl-5 bg-slate-900/30 outline-none rounded-xl placeholder-white"
            />
          ) : (
            ""
          )}
          <input
            name="email"
            value={formData.email}
            onChange={changeHandler}
            type="email"
            placeholder="Email..."
            className="h-14 w-full pl-5 bg-slate-900/30 outline-none rounded-xl placeholder-white"
          />
          <input
            name="password"
            value={formData.password}
            onChange={changeHandler}
            type="password"
            placeholder="password"
            className="h-14 w-full pl-5 bg-slate-900/30 outline-none rounded-xl placeholder-white"
          />
        </div>
        <button onClick={() => { state === "Login" ? login() : signup(); }} className="btn_dark_rounded my-5 w-full !rounded-md">
          {state}
        </button>

        {state === "Sign Up" ? (
          <p className="text-white/65 font-bold">
            Already have an account?{" "}
            <span
              onClick={() => setState("Login")}
              className="text-white underline cursor-pointer"
            >
              Login
            </span>
          </p>
        ) : (
          <p className="text-white/65 font-bold">
            Don't have an account?{" "}
            <span
              onClick={() => setState("Sign Up")}
              className="text-white underline cursor-pointer"
            >
              Create One
            </span>
          </p>
        )}

        <div className="flexCenter mt-6 gap-3">
          <input type="checkbox" name="" id="" />
          <p className="text-white">
            By continuing, I agree to the terms of use & privacy policy.
          </p>
        </div>
      </div>
    </section>
 );
};

export default Login;
