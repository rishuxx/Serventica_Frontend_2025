import React, { useContext } from "react";
import panda from "../assets/panda.png";
import { AuthContext } from "../contexts/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { CgProfile, CgNotes } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
import { MdLogout, MdOutlineDashboard } from "react-icons/md";

import Swal from "sweetalert2";

const Profile = ({ user }) => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      // Sign-out successful.
      Swal.fire({
        title: "Logout Successfully",
        text: "You have been logged out.",
        icon: "success",
      });
      navigate("/"); // Navigate to the desired route after logout
    } catch (error) {
      // An error happened.
      console.error(error);
    }
  };

  return (
    <div>
      <div className="drawer drawer-end z-50">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-4"
            className="drawer-button btn btn-ghost btn-circle avatar border-none"
          >
            <div className="w-10 rounded-full shadow-2xl">
              {user.photoURL ? (
                <img alt="Tailwind CSS Navbar component" src={user.photoURL} />
              ) : (
                <img alt="Tailwind CSS Navbar component" src={panda} />
              )}
            </div>
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            <li>
              <a href="/update-profile" className="text-md">
                <CgProfile className="text-xl" />
                Profile
              </a>
            </li>
            <li>
              <a href="/order" className="text-md">
                <CgNotes className="text-xl" />
                Orders
              </a>
            </li>

            <li>
              <a className="text-md">
                {" "}
                <IoSettingsOutline className="text-xl" />
                Settings
              </a>
            </li>
            <li>
              <Link to="/dashboard" className="text-md">
                <MdOutlineDashboard className="text-xl" />
                Dashboard
              </Link>
            </li>
            <li className="text-md">
              <button onClick={handleLogout}>
                <MdLogout className="text-xl" />
                LogOut
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
