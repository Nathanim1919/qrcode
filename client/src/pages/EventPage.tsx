import { useEffect, useState } from "react";
import axiosInstance from "../constants/config";
import { IoMdClose } from "react-icons/io";


export const EventPage: React.FC = () => {
  const [createEvent, setCreateEvent] = useState<boolean>(false);
  const [availableEvents, setAvailableEvents] = useState<any[]>([]);
  const [eventData, setEventData] = useState<any>({
    name: "",
    date: "",
    time: "",
    type: "",
  });

  const handleEventCreation = async () => {
    try {
      const response = await axiosInstance.post(`/events`);
      setAvailableEvents([...availableEvents, response.data]);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllEvents = async () => {
    try {
      const response = await axiosInstance.get(`/events`);
      setAvailableEvents(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllEvents();
  }, []);

  return (
    <div>
     {createEvent && <div className="fixed grid place-items-center top-0 left-0 w-full h-full backdrop-blur-2xl">
        <form className="w-[90%] md:w-[400px] bg-white p-4 flex flex-col">
            <IoMdClose className="self-end text-2xl cursor-pointer" onClick={() => setCreateEvent(false)} />
            <label htmlFor="name">Event Name</label>
            <input
                type="text"
                id="name"
                value={eventData.name}
                onChange={(e) =>
                setEventData({ ...eventData, name: e.target.value })
                }
            />
            <label htmlFor="date">Date</label>
            <input
                type="date"
                id="date"
                value={eventData.date}
                onChange={(e) =>
                setEventData({ ...eventData, date: e.target.value })
                }
            />
            <label htmlFor="time">Time</label>
            <input
                type="time"
                id="time"
                value={eventData.time}
                onChange={(e) =>
                setEventData({ ...eventData, time: e.target.value })
                }
            />
            <label htmlFor="type">Event Type</label>
            <input
                type="text"
                id="type"
                value={eventData.type}
                onChange={(e) =>
                setEventData({ ...eventData, type: e.target.value })
                }
            />
            <button type="submit">Create Event</button>
        </form>
      </div>}
      <div className="w-[80%] sticky top-0 bg-white mx-auto p-4 flex justify-between items-center">
        <h1>Event Page</h1>
        <button 
            className="bg-sky-300 p-2 rounded-md"
        onClick={
            () => setCreateEvent(true)
        }>Create Event</button>
      </div>
      <div>
        <h2 className="text-center p-4 font-bold">Available Events</h2>
        <div className="w-[80%] flex flex-wrap items-center gap-2 justify-center mx-auto">
            {
                availableEvents.map((event) => (
                    <div key={event._id} className="bg-sky-300 p-2">
                        <p>{event.name}</p>
                        <p>{event.date}</p>
                        <p>{event.time}</p>
                        <p>{event.type}</p>
                    </div>
                ))
            }
        </div>
      </div>
    </div>
  );
};
