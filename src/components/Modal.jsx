import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { AuthContext } from "../contexts/AuthProvider";
import Swal from "sweetalert2";

const Modal = () => {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();

  const { signUpWithGmail, login } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");

  //redirecting to homepage or specific page
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    // console.log(email, password);
    login(email, password)
      .then((result) => {
        const user = result.user;

        Swal.fire({
          title: "Enjoy",
          text: "Login Successfully",
          icon: "success",
        });

        document.getElementById("my_modal_5").close();
        navigate(from, { replace: true });
      })
      .catch((error) => {
        const errorMessage = error.message;
        setErrorMessage("Provide a correct email and password!");
      });
  };

  //google signing in
  const handleLogin = () => {
    signUpWithGmail()
      .then((result) => {
        const user = result.user;

        Swal.fire({
          title: "Enjoy",
          text: "Login Successfully",
          icon: "success",
        });
        navigate(from, { replace: true });
      })
      .catch((error) => console.log(error));
  };

  return (
    <dialog id="my_modal_5" className="modal modal-middle sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg text-center">Login</h3>
        <div className="modal-action flex flex-col justify-center mt-0">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            {/* email */}
            <div className="form-control" method="dialog">
              <label className="label">
                <span className="label-text">Email</span>
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
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                className="input input-bordered"
                {...register("password")}
              />
              <label className="label mt-1">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>

            {/* error txt */}
            {errorMessage ? (
              <p className="text-red-500 text-sm italic">{errorMessage}</p>
            ) : (
              ""
            )}
            {/* login btn */}
            <div className="form-control mt-4">
              <input
                type="submit"
                value="Login"
                className="btn bg-yellow border-none"
              />
            </div>
            <p className="text-center mt-5 font-normal text-sm">
              Don't have an account?{" "}
              <Link to="/signup" className="underline text-green-700 ml-1 ">
                Signup Now
              </Link>
            </p>
            <button
              htmlFor="my_model_5"
              onClick={() => document.getElementById("my_modal_5").close()}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
          </form>

          {/* social signin */}
          <div className="text-center space-x-3 mb-4">
            <button
              className="btn btn-circle hover:bg-yellow border-0 "
              onClick={handleLogin}
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
      </div>
    </dialog>
  );
};

export default Modal;
