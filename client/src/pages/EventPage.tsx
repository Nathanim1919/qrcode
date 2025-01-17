import { useEffect, useState } from "react";
import axiosInstance from "../constants/config";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import { AiOutlineCalendar, AiOutlineClockCircle } from "react-icons/ai";
import { MdOutlineEventNote } from "react-icons/md";
import { FiArrowLeft } from "react-icons/fi";

// Event Card Component
const EventCard: React.FC<{ event: any }> = ({ event }) => {
  return (
    <div className="w-full  bg-white shadow-lg rounded-lg p-4 flex flex-col items-start hover:shadow-xl transition-shadow">
      <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
        <MdOutlineEventNote className="text-blue-500" /> {event.name}
      </h3>
      <p className="text-gray-500 text-sm mt-2 flex items-center gap-2">
        <AiOutlineCalendar className="text-blue-500" />{" "}
        {new Date(event.date).toLocaleDateString()}
      </p>
      <p className="text-gray-500 text-sm flex items-center gap-2">
        <AiOutlineClockCircle className="text-blue-500" /> {event.time}
      </p>
      <p className="mt-2 text-gray-700 text-sm">
        <span className="font-semibold">Type:</span> {event.type}
      </p>
    </div>
  );
};

// Main Event Page Component
export const EventPage: React.FC = () => {
  const [createEvent, setCreateEvent] = useState<boolean>(false);
  const [availableEvents, setAvailableEvents] = useState<any[]>([]);
  const [eventData, setEventData] = useState<any>({
    name: "",
    date: "",
    time: "",
    type: "",
  });

  const handleEventCreation = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(`/events`, eventData);
      setAvailableEvents([...availableEvents, response.data]);
      setCreateEvent(false);
      setEventData({ name: "", date: "", time: "", type: "" });
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAllEvents = async () => {
    try {
      const response = await axiosInstance.get(`/events`);
      setAvailableEvents(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllEvents();
  }, []);

  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen">
      {/* Event Creation Modal */}
      {createEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 grid place-items-center z-50">
          <form
            onSubmit={handleEventCreation}
            className="w-[90%] md:w-[400px] bg-white p-6 rounded-lg shadow-lg relative"
          >
            <IoMdClose
              className="absolute top-3 right-3 text-2xl cursor-pointer text-gray-500 hover:text-gray-700"
              onClick={() => setCreateEvent(false)}
            />
            <h2 className="text-lg font-bold mb-4 text-gray-800 flex items-center gap-2">
              <MdOutlineEventNote className="text-blue-500" /> Create New Event
            </h2>
            <label htmlFor="name" className="text-sm font-semibold text-gray-600">
              Event Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full border border-gray-300 p-2 rounded-lg mt-1 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={eventData.name}
              onChange={(e) =>
                setEventData({ ...eventData, name: e.target.value })
              }
              required
            />
            <label htmlFor="date" className="text-sm font-semibold text-gray-600">
              Date
            </label>
            <input
              type="date"
              id="date"
              className="w-full border border-gray-300 p-2 rounded-lg mt-1 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={eventData.date}
              onChange={(e) =>
                setEventData({ ...eventData, date: e.target.value })
              }
              required
            />
            <label htmlFor="time" className="text-sm font-semibold text-gray-600">
              Time
            </label>
            <input
              type="time"
              id="time"
              className="w-full border border-gray-300 p-2 rounded-lg mt-1 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={eventData.time}
              onChange={(e) =>
                setEventData({ ...eventData, time: e.target.value })
              }
              required
            />
            <label htmlFor="type" className="text-sm font-semibold text-gray-600">
              Event Type
            </label>
            <input
              type="text"
              id="type"
              className="w-full border border-gray-300 p-2 rounded-lg mt-1 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={eventData.type}
              onChange={(e) =>
                setEventData({ ...eventData, type: e.target.value })
              }
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
            >
              Create Event
            </button>
          </form>
        </div>
      )}.

      {/* Header */}
      <header className="w-[90%] sticky top-0 mx-auto p-4 flex justify-between items-center">
        <Link
          to="/admin"
          className="flex items-center text-blue-500 font-semibold hover:underline"
        >
          <FiArrowLeft className="mr-2 text-lg" /> Back to Admin
        </Link>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-600 transition"
          onClick={() => setCreateEvent(true)}
        >
          Create Event
        </button>
      </header>

      {/* Available Events */}
      <main className="w-[90%] mx-auto mt-8">
        <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">
          Available Events
        </h2>
        {availableEvents.length === 0 ? (
          <p className="text-center text-gray-500">No events available yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {availableEvents.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
