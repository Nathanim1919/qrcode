import { useEffect, useState } from "react";
import UserDetailCard from "../components/UserDetailCard";
import axiosInstance from "../constants/config";
import { Link } from "react-router-dom";
import { IEvent } from "../interface/IEvent";
import { FaRegCalendarAlt, FaClock, FaCheckCircle, FaSpinner } from "react-icons/fa";
import { IoIosMore } from "react-icons/io";


interface IUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  uniqueId: string;
  qrCodeId: string;
}

const AdminPage: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [events, setEvents] = useState<IEvent[]>([]);
  const [userAttendance, setUserAttendance] = useState<any[]>([]);

  const today = new Date();
  const formattedFullDate = today.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get(`/users`);
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchEvents = async () => {
    try {
      const res = await axiosInstance.get(`/events/today`);
      setEvents(res.data.data);
    } catch (error) {
      console.error("Failed to fetch events", error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchEvents();
  }, []);

  const getEventStatus = (event: IEvent) => {
    const eventDate = new Date(`${event.date}T${event.time}`);
    if (eventDate > new Date()) return "Ongoing";
    return "Completed";
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:w-[100%] mx-auto">
      <UserDetailCard userAttendance={userAttendance} />

      <div className="bg-white p-4 rounded-lg shadow-lg mb-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-700">{formattedFullDate}</h2>
          <div className="space-x-4">
            <Link
              to="/guests"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition"
            >
              Guests
            </Link>
            <Link
              to="/events"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition"
            >
              Events
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Users */}
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-4xl font-extrabold text-blue-600">{users.length}</h2>
          <p className="text-gray-500">Total Users</p>
        </div>

        {/* Today's Events */}
        <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="font-bold text-xl mb-4">Today's Events</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {events.map((event) => (
              <div
                key={event._id}
                className="p-4 bg-gradient-to-r from-sky-100 via-blue-100 to-sky-200 rounded-lg shadow-md"
              >
                <div className="flex items-center justify-between">
                  <h3 className="flex items-center justify-between text-lg font-semibold mb-2 text-gray-800">{event.name}</h3>
                  <button className="bg-blue-500 text-white text-[14px] py-1 px-2 rounded-md shadow-sm hover:bg-white hover:text-gray-900 hover:border-gray-800 border border-gray-200">Set Private</button>
                </div>

                <p className="text-gray-700 flex items-center mb-2">
                  <FaRegCalendarAlt className="mr-2 text-blue-600" />  {new Date(event.date).toLocaleDateString()}
                </p>

                <p className="text-gray-700 flex items-center mb-2">
                  <FaClock className="mr-2 text-blue-600" /> {event.time}
                </p>

                <p className="text-gray-700 mb-2">
                  <span className="font-semibold">Type:</span> {event.type}
                </p>

                <p
                  className={`flex items-center font-semibold text-sm ${
                    getEventStatus(event) === "Ongoing"
                      ? "text-green-600"
                      : "text-gray-500"
                  }`}
                >
                  {getEventStatus(event) === "Ongoing" ? (
                    <FaSpinner className="mr-2 animate-spin" />
                  ) : (
                    <FaCheckCircle className="mr-2" />
                  )}
                  {getEventStatus(event)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
