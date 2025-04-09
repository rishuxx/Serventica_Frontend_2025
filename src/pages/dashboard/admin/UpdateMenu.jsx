import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const UpdateMenu = () => {
  const item = useLoaderData();
  console.log(item);

  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // image hosting key

  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?&key=${image_hosting_key}`;

  const onSubmit = async (data) => {
    // console.log(data);
    const imageFile = { image: data.image[0] };
    const hostingImg = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    //console.log(hostingImg);

    if (hostingImg.data.success) {
      // now send the menu item data to the server with the image url
      const menuItem = {
        title: data.title,
        category: data.category,
        price: parseFloat(data.price),
        des: data.des,
        rating: data.rating,
        image: hostingImg.data.data.display_url,
      };
      // console.log(menuItem);

      const postMenuItem = axiosSecure.patch(`/menu/${item._id}`, menuItem);
      console.log(postMenuItem);
      if (postMenuItem) {
        // show success popup
        reset();
        Swal.fire({
          position: "center",
          icon: "success",
          title: `${data.title} is updated to Successfully.`,
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/dashboard/manage-items");
      }
    }
  };

  return (
    <div className="w-full md:w-[870px] px-4 mx-auto">
      <h2 className="text-2xl font-semibold my-4 ">
        Update This <span className="text-red-500">Item</span>{" "}
      </h2>

      {/* form input */}

      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-row">
            <div className="form-control w-full mr-4">
              <label className="label">
                <span className="label-text">Product Name *</span>
              </label>
              <input
                type="text"
                defaultValue={item.title}
                {...register("title", { required: true })}
                placeholder="Product Name"
                className="input input-bordered w-full text-gray-500"
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Rating *</span>
              </label>
              <input
                type="number"
                step="0.1"
                {...register("rating", {
                  required: true,
                  min: 0,
                  max: 5,
                  valueAsNumber: true,
                })}
                placeholder="Enter Rating (0-5)"
                className="input input-bordered w-full"
              />
            </div>
          </div>

          {/* 2 nd row*/}
          <div className="flex items-center gap-4">
            {/* categories */}
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Category *</span>
              </label>
              <select
                {...register("category", { required: true })}
                className="select select-bordered text-gray-500"
                defaultValue={item.category}
              >
                <option disabled value="default">
                  Select a Category
                </option>
                <option value="Painting">Painting</option>
                <option value="Electrician">Electrician</option>
                <option value="Plumbing">Plumbing</option>
                <option value="Cleaning">Cleaning</option>
              </select>
            </div>
            {/* price field*/}
            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text">Price *</span>
              </label>
              <input
                type="number"
                defaultValue={item.price}
                {...register("price", { required: true })}
                placeholder="Price"
                className="input input-bordered w-full text-gray-500 "
              />
            </div>
          </div>

          {/* 3 rd row */}
          <div className="form-control ">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              defaultValue={item.des}
              {...register("des", { required: true })}
              className="textarea textarea-bordered h-24 text-gray-500"
              placeholder="Description"
            ></textarea>
          </div>

          {/* 4 th row */}
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text">Product Image</span>
            </label>
            <input
              {...register("image", { required: true })}
              type="file"
              className="file-input file-input-bordered w-full max-w-xs"
            />
          </div>

          <button className="btn bg-red-500 text-white px-6">
            {" "}
            Add Product{" "}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateMenu;
