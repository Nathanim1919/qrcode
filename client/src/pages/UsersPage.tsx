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

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get(`/users`);
      const data = response.data;
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      {/* Header */}
      <div className="w-full md:w-[80%] mx-auto flex justify-between items-center mb-6">
        <Link
          to="/admin"
          className="text-sky-600 font-medium hover:text-sky-800 flex items-center gap-2 transition"
        >
          ← Back to Admin
        </Link>
        <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight">
          Users Management
        </h2>
      </div>

      {/* Summary Section */}
      <div className="w-full md:w-[80%] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="flex flex-col items-center justify-center bg-sky-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition">
          <h1 className="font-extrabold text-5xl text-sky-600">{users?.length}</h1>
          <h3 className="flex items-center gap-2 text-sky-600 mt-2">
            <FaUsers size={20} />
            Total Guests
          </h3>
        </div>
        <form className="flex flex-col md:flex-row gap-4 items-center justify-end">
          <input
            type="text"
            placeholder="Search user by name..."
            className="p-3 border border-gray-300 rounded-lg w-full md:w-2/3 focus:ring-4 focus:ring-sky-300 focus:outline-none transition"
          />
          <button
            type="submit"
            className="bg-sky-600 text-white py-3 px-6 rounded-lg hover:bg-sky-700 transition"
          >
            Search
          </button>
        </form>
      </div>

      {/* Users Table */}
      <div className="w-full md:w-[80%] mx-auto bg-white border border-gray-300 rounded-lg shadow-lg">
        <div className="h-[70vh] overflow-y-auto">
          <table className="w-full text-sm text-gray-700">
            <thead className="bg-sky-600 text-white sticky top-0 shadow-md">
              <tr>
                <th className="py-4 px-6">#</th>
                <th className="py-4 px-6">Unique ID</th>
                <th className="py-4 px-6">Name</th>
                <th className="py-4 px-6">Address</th>
                <th className="py-4 px-6">Email</th>
                <th className="py-4 px-6">Phone</th>
                <th className="py-4 px-6">Actions</th>
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
                  <td className="py-4 px-6 text-center">{index + 1}</td>
                  <td className="py-4 px-6">{user.uniqueId}</td>
                  <td className="py-4 px-6">{user.name}</td>
                  <td className="py-4 px-6">{user.address}</td>
                  <td className="py-4 px-6">{user.email}</td>
                  <td className="py-4 px-6">{user.phone}</td>
                  <td className="py-4 px-6 text-center">
                    <Link
                      to={`/guests/${user._id}`}
                      className="bg-sky-600 text-white py-2 px-4 rounded-lg hover:bg-sky-700 transition flex items-center justify-center"
                    >
                      <MdNavigateNext size={20} />
                    </Link>
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
