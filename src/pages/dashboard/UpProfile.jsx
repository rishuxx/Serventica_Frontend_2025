import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import backgroundImage from "../../assets/upProfile.jpg";
import { AuthContext } from "../../contexts/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";

const UpProfile = () => {
  const { updateUserProfile } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    const name = data.name;
    const photoURL = data.photoURL;
    updateUserProfile({ name, photoURL })
      .then(() => {
        // Profile updated!
        navigate(from, { replace: true });
      })
      .catch((error) => {
        // An error occurred
        console.error(error);
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
      <div className="flex item-center justify-center w-screen">
        <div
          className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 text-white border-[1px]"
          style={{
            backdropFilter: "blur(10px)", // Apply blur effect to the background
            backgroundColor: "transparent", // Add a semi-transparent white background for better contrast
          }}
        >
          <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
            <h3 className="font-semibold text-center">Update Profile</h3>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">Name</span>
              </label>
              <input
                {...register("name", { required: true })}
                type="text"
                placeholder="Name"
                className="input input-bordered"
              />
              {errors.name && (
                <span className="text-red-500">Name is required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">Upload Photo</span>
              </label>
              <input
                {...register("photoURL", { required: true })}
                type="text"
                placeholder="Photo URL"
                className="input input-bordered"
              />
              {errors.photoURL && (
                <span className="text-red-500">Photo URL is required</span>
              )}
            </div>
            <div className="form-control mt-6">
              <button className="btn bg-yellow border-none" type="submit">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpProfile;
