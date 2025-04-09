import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../hooks/useAxiosPublic";
import backgroundImage from "../assets/signup.jpg";
import { IoIosArrowBack } from "react-icons/io";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const [errorMessage, seterrorMessage] = useState("");
  const { signUpWithGmail, login } = useAuth();
  const axiosPublic = useAxiosPublic();

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  //react hook form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    login(email, password)
      .then((result) => {
        // Signed in
        const user = result.user;

        const userInfo = {
          email: result.user?.email,
          name: result.user?.displayName,
        };
        axiosPublic.post("/users", userInfo).then((res) => {
          console.log(res.data);
          navigate("/");
        });
        // console.log(user);
        Swal.fire({
          title: "Enjoy",
          text: "Login Successfully",
          icon: "success",
        });
        navigate("/");
        // ...
      })
      .catch((error) => {
        const errorMessage = error.message;
        seterrorMessage("Please provide valid email & password!");
      });
    reset();
  };

  // login with google
  const handleRegister = () => {
    signUpWithGmail()
      .then((result) => {
        const user = result.user;
        const userInfo = {
          email: result.user?.email,
          name: result.user?.displayName,
        };
        axiosPublic.post("/users", userInfo).then((res) => {
          console.log(res.data);
          //alert("Login successful!");
          navigate("/");
        });
      })
      .catch((error) => console.log(error));
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
        <div className="mb-5">
          <form
            className="card-body"
            method="dialog"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Link to="/" className="btn btn-sm btn-circle btn-ghost ml-5">
              <IoIosArrowBack />
            </Link>
            <h3 className="font-semibold text-2xl text-center">Login</h3>

            {/* email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white text-lg">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                className="input input-bordered"
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
                placeholder="password"
                className="input input-bordered text-black"
                {...register("password", { required: true })}
              />
              <label className="label">
                <a
                  href="#"
                  className="label-text-alt link link-hover mt-2 text-white"
                >
                  Forgot password?
                </a>
              </label>
            </div>

            {/* show errors */}
            {errorMessage ? (
              <p className="text-red-500 text-xs italic ">
                Provide a correct username & password.
              </p>
            ) : (
              ""
            )}

            {/* submit btn */}
            <div className="form-control mt-4">
              <input
                type="submit"
                className="btn bg-yellow border-none"
                value="Login"
              />
            </div>

            <p className="text-center my-2">
              Not have an account?
              <Link
                to="/signup"
                className="underline text-red ml-1 text-green-600"
              >
                Signup Now
              </Link>
            </p>
          </form>
          <div className="text-center space-x-3">
            <button
              onClick={handleRegister}
              className="btn btn-circle hover:bg-green hover:text-white"
            >
              <FaGoogle />
            </button>
            <button className="btn btn-circle hover:bg-green hover:text-white">
              <FaFacebookF />
            </button>
            <button className="btn btn-circle hover:bg-green hover:text-white">
              <FaGithub />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
