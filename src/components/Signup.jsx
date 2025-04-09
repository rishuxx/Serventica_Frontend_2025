import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { useForm } from "react-hook-form";
import backgroundImage from "../assets/signup.jpg";

import Modal from "./Modal";
import { AuthContext } from "../contexts/AuthProvider";
import axios from "axios";
import useAxiosPublic from "../hooks/useAxiosPublic";

const Signup = () => {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();

  const { signUpWithGmail, createUser, updateUserProfile } =
    useContext(AuthContext);
  const axiosPublic = useAxiosPublic();

  //redirecting to homepage or specific page
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    createUser(email, password)
      .then((result) => {
        // Signed up
        const user = result.user;
        updateUserProfile(data.email, data.photoURL).then(() => {
          const userInfo = {
            name: data.name,
            email: data.email,
          };
          axiosPublic.post("/users", userInfo).then((response) => {
            // console.log(response);
            alert("Account Created Successfully !");
            document.getElementById("my_modal_5").close();
            navigate(from, { replace: true });
          });
        });

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  //login with google
  const handleRegister = () => {
    signUpWithGmail().then((result) => {
      const user = result.user;
      const userInfo = {
        email: result.user?.email,
        name: result.user?.displayName,
      };
      axiosPublic.post("/users", userInfo).then((res) => {
        console.log(res.data);
        navigate("/");
      });
    });
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="max-w-md shadow-2xl w-full rounded-2xl mx-auto items-center justify-center my-52 text-white border-[1px]"
        style={{
          backdropFilter: "blur(10px)", // Apply blur effect to the background
          backgroundColor: "transparent", // Add a semi-transparent white background for better contrast
        }}
      >
        <Link to="/" className="btn btn-sm btn-circle btn-ghost ml-5">
          <IoIosArrowBack />
        </Link>
        <h3 className="font-semibold text-lg text-center">Signup</h3>

        <div className="modal-action flex flex-col justify-center mt-0">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            {/* Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white text-lg ">Name</span>
              </label>
              <input
                type="name"
                placeholder="Your name"
                className="input text-black"
                {...register("name")}
              />
            </div>
            {/* email */}
            <div className="form-control" method="dialog">
              <label className="label">
                <span className="label-text text-white text-lg">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                className="input text-black"
                {...register("email")}
              />
            </div>

            {/* password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white text-lg">Password</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                className="input text-black"
                {...register("password")}
              />
              <label className="label mt-1">
                <a
                  href="#"
                  className="label-text-alt link link-hover text-red-500"
                >
                  Forgot password?
                </a>
              </label>
            </div>

            {/* error txt */}
            <p>{errors.message}</p>

            {/* submit btn */}

            {/* login btn */}
            <div className="form-control mt-6">
              <input
                type="submit"
                value="Signup"
                className="btn bg-yellow border-none"
              />
            </div>

            <div className="text-center my-2">
              Have an account?
              <Link to="/login">
                <button className="ml-2 underline text-green-500">
                  Login here
                </button>
              </Link>
            </div>
          </form>

          {/* social signin */}
          <div className="text-center space-x-3 mb-4">
            <button
              onClick={handleRegister}
              className="btn btn-circle hover:bg-yellow border-0"
            >
              <FaGoogle />
            </button>
            <button className="btn btn-circle hover:bg-yellow border-0">
              <FaFacebookF />
            </button>
            <button className="btn btn-circle hover:bg-yellow border-0">
              <FaGithub />
            </button>
          </div>
        </div>
        <Modal />
      </div>
    </div>
  );
};

export default Signup;
