import React from "react";
import { Link, Outlet } from "react-router-dom";
import { MdSpaceDashboard } from "react-icons/md";
import { FaCartShopping, FaUsers } from "react-icons/fa6";
import {
  FaHome,
  FaLocationArrow,
  FaQuestionCircle,
  FaShoppingBag,
} from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdMenuOpen } from "react-icons/md";
import { RiLogoutCircleRLine } from "react-icons/ri";
import logo from "../assets/slogo.png";
import Login from "../components/Login";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";

const sharedLink = (
  <>
    <li className="mt-5">
      <Link to="/">
        {" "}
        <FaHome />
        Home
      </Link>
    </li>

    <li>
      <Link to="/menu">
        <FaCartShopping />
        Menu
      </Link>
    </li>

    <li>
      <Link to="/menu">
        <FaLocationArrow />
        Order Tracking
      </Link>
    </li>

    <li>
      <Link to="/menu">
        <FaQuestionCircle />
        Customer Support
      </Link>
    </li>
  </>
);

const DashboardLayout = () => {
  const { loading } = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin();

  return (
    <div>
      {isAdmin ? (
        <div className="drawer sm:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col sm:items-start sm:justify-start my-2">
            {/* Page content here */}
            <div className="flex items-center justify-between mx-4">
              <label
                htmlFor="my-drawer-2"
                className="btn btn-ghost drawer-button btn-lg lg:hidden"
              >
                <MdMenuOpen className="text-2xl" />
              </label>
              <button className=" btn btn-squaremx-3 sm:hidden">
                <RiLogoutCircleRLine className="text-xl" />
              </button>
            </div>
            <div className="mt-5 md:mt-2 mx-4">
              <Outlet />
            </div>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer-2"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
              {/* Sidebar content here */}
              <li>
                <Link to="/" className="flex justify-start mb-3">
                  <img src={logo} alt="" className=" w-36" />
                  <span className="badge badge-primary bg-red-500 border-none text-white">
                    Admin
                  </span>
                </Link>
              </li>
              <hr className="mt-5" />
              <li className="mt-5">
                <Link to="/dashboard">
                  {" "}
                  <MdSpaceDashboard />
                  Dashboard
                </Link>
              </li>

              <li>
                <Link to="/dashboard/bookings">
                  {" "}
                  <FaShoppingBag />
                  Manage Booking
                </Link>
              </li>

              <li>
                <Link to="/dashboard/add-menu">
                  {" "}
                  <FaPlusCircle />
                  Add Menu
                </Link>
              </li>
              <li>
                <Link to="/dashboard/manage-items">
                  {" "}
                  <FaEdit />
                  Manage Items
                </Link>
              </li>

              <li>
                <Link to="/dashboard/users" className="mb-4">
                  <FaUsers />
                  All Users
                </Link>
              </li>

              <hr />
              {/*  */}

              {sharedLink}
            </ul>
          </div>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default DashboardLayout;
