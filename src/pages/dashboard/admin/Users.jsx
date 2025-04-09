import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FaTrash, FaUsers } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Users = () => {
  const axiosSecure = useAxiosSecure();
  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  //console.log(users);

  const handleMakeAdmin = (user) => {
    axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
      alert(`${user.name} is now admin`);
      refetch();
    });
  };

  const handleDeleteUser = (user) => {
    axiosSecure.delete(`/users/${user._id}`).then((res) => {
      alert(`${user.name} is deleted`);
      refetch();
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between m-4">
        <h5>All users</h5>
        <h5>Total Users : {users.length}</h5>
      </div>

      {/* table */}

      <div>
        <div className="overflow-x-auto">
          <table className="table table-zebra md:w-[950px]">
            {/* head */}
            <thead className="bg-red-500 text-white rounded-xl text-md ">
              <tr>
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {users.map((user, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.role === "admin" ? (
                      <button className="btn btn-xs bg-green-500 text-white border-none">
                        {" "}
                        Admin{" "}
                      </button>
                    ) : (
                      <button
                        onClick={() => handleMakeAdmin(user)}
                        className="btn btn-xs border-none"
                      >
                        Users
                      </button>
                    )}
                  </td>
                  <td>
                    <button
                      className="btn btn-ghost btn-sm text-red-500"
                      onClick={() => handleDeleteUser(user)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
