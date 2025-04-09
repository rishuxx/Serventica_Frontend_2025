import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home";
import Painting from "../pages/Services/painting";
import Signup from "../components/Signup";
import UpProfile from "../pages/dashboard/UpProfile";
import Electrician from "../pages/Services/electrician";
import Plumbing from "../pages/Services/plumbing";
import Cleaning from "../pages/Services/cleaning";
import Cart from "../pages/Cart/Cart";
import DashboardLayout from "../layout/DashboardLayout";
import Privaterouter from "../PrivateRouter/Private";
import Dashboard from "../pages/dashboard/admin/Dashboard";
import Users from "../pages/dashboard/admin/Users";
import Login from "../components/Login";
import AddMenu from "../pages/dashboard/admin/AddMenu";
import ManageItems from "../pages/dashboard/admin/ManageItems";
import UpdateMenu from "../pages/dashboard/admin/UpdateMenu";
import Payment from "../pages/menuPage/Payment";
import Order from "../pages/dashboard/Order";
import ManageBookings from "../pages/dashboard/admin/ManageBookings";
import AcRepair from "../pages/Repair/AcRepair";
import FanRepair from "../pages/Repair/FanRepair";
import RoRepair from "../pages/Repair/RoRepair";
import TvRepair from "../pages/Repair/TvRepair";
import WmRepair from "../pages/Repair/WmRepair";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/order",
        element: <Order />,
      },
      {
        path: "/painting",
        element: <Painting />,
      },

      {
        path: "/electrician",
        element: <Electrician />,
      },

      {
        path: "/plumbing",
        element: <Plumbing />,
      },

      {
        path: "/cleaning",
        element: <Cleaning />,
      },

      {
        path: "/ac-repair",
        element: <AcRepair />,
      },

      {
        path: "fan-repair",
        element: <FanRepair />,
      },

      {
        path: "ro-repair",
        element: <RoRepair />,
      },
      {
        path: "tv-repair",
        element: <TvRepair />,
      },

      {
        path: "wm-repair",
        element: <WmRepair />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },

      {
        path: "/update-profile",
        element: <UpProfile />,
      },
      {
        path: "/process-checkout",
        element: <Payment />,
      },
    ],
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  // admin Routes
  {
    path: "dashboard",
    element: (
      <Privaterouter>
        <DashboardLayout />
      </Privaterouter>
    ),
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "add-menu",
        element: <AddMenu />,
      },
      {
        path: "manage-items",
        element: <ManageItems />,
      },

      {
        path: "update-menu/:id",
        element: <UpdateMenu />,
        loader: ({ params }) =>
          fetch(`http://localhost:6001/menu/${params.id}`),
      },

      {
        path: "bookings",
        element: <ManageBookings />,
      },
    ],
  },
]);
export default router;
