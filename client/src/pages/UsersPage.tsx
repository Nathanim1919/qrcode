import { useEffect, useState } from "react";
import axiosInstance from "../constants/config";
import { MdNavigateNext } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";

interface IUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  uniqueId: string;
  qrCodeId: string;
}

export const Users = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get(`/users`);
      const data = response.data;
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      {/* Header */}
      <div className="w-full md:w-[80%] mx-auto flex justify-between items-center mb-4">
        <Link
          to="/admin"
          className="text-sky-500 font-semibold hover:underline flex items-center gap-2"
        >
          ← Back to Admin
        </Link>
        <h2 className="text-2xl font-bold text-gray-700">Users</h2>
      </div>

      {/* Summary and Search */}
      <div className="w-full md:w-[80%] mx-auto bg-white p-4 rounded-lg shadow-md mb-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col items-center justify-center bg-sky-100 p-4 rounded-lg">
            <h1 className="font-bold text-3xl text-sky-600">{users?.length}</h1>
            <h3 className="flex items-center gap-2 text-sky-600">
              <FaUsers /> Total Guests
            </h3>
          </div>
          <form className="flex flex-col md:flex-row gap-3 items-center justify-end">
            <input
              type="text"
              placeholder="Search user by name"
              className="p-2 border border-gray-300 rounded-md w-full md:w-2/3 focus:ring-2 focus:ring-sky-400 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-sky-500 text-white py-2 px-4 rounded-md hover:bg-sky-600 transition"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Users Table */}
      <div className="w-full md:w-[80%] mx-auto bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden">
        <div className="h-[70vh] overflow-y-auto">
          <table className="w-full text-sm text-gray-700">
            <thead className="bg-sky-500 text-white sticky top-0">
              <tr>
                <th className="py-3 px-4">#</th>
                <th className="py-3 px-4">Unique ID</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Address</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Phone</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user, index) => (
                <tr
                  key={user._id}
                  className={`hover:bg-gray-100 ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="py-3 px-4 text-center">{index + 1}</td>
                  <td className="py-3 px-4">{user.uniqueId}</td>
                  <td className="py-3 px-4">{user.name}</td>
                  <td className="py-3 px-4">{user.address}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4">{user.phone}</td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => setSelectedUser(user)}
                      className="text-sky-500 border border-sky-400 px-3 py-1 rounded-md hover:bg-sky-100 transition"
                    >
                      <MdNavigateNext />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected User Modal (optional) */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] md:w-[400px]">
            <h3 className="text-lg font-bold text-gray-700 mb-4">
              User Details
            </h3>
            <p>
              <span className="font-semibold">Name:</span> {selectedUser.name}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {selectedUser.email}
            </p>
            <p>
              <span className="font-semibold">Phone:</span> {selectedUser.phone}
            </p>
            <p>
              <span className="font-semibold">Address:</span>{" "}
              {selectedUser.address}
            </p>
            <p>
              <span className="font-semibold">Unique ID:</span>{" "}
              {selectedUser.uniqueId}
            </p>
            <button
              onClick={() => setSelectedUser(null)}
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
