import { useSearchParams, useNavigate } from "react-router-dom";
import { IEvent } from "../interface/IEvent";
import { useEffect, useState } from "react";
import axios from "axios";

export const ScanningOption: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [events, setEvents] = useState<IEvent[]>([]);
  const navigate = useNavigate();
  const qrcodeId = searchParams.get("qrcodeId");

  // Get the current date
const today = new Date();

// Format the current date to "Jan 14"
const formattedFullDate = today.toLocaleDateString("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

  const handleChooseOption = (scanTime: string, scanType:string) => {
    navigate(`/validateQrCode?qrcodeId=${qrcodeId}&scanTime=${scanTime}&scanType=${scanType}`);
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("http://localhost:3000/events/today");
        const data = res.data;
        setEvents(data);
      } catch (error) {
        console.error("Failed to fetch events", error);
      }
    };

    fetchEvents();
  }, []);

  console.log("Availbale Events  are:  ", events);

  if (!qrcodeId) return null;
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex flex-col justify-center items-center bg-sky-500 text-white">
      {/* Header */}
      <h1 className="text-2xl w-[90%] mb-4 md:text-3xl font-bold  text-center">
        Select Scanning Option for <span className="underline">{formattedFullDate}</span>
      </h1>

      {/* Options Container */}
      <div className="grid grid-cols-2 gap-2 max-w-lg w-[90%] md:w-[700px]">
        {/* Morning Event Scan */}
        {events.length > 0 && events.map((event:IEvent) => (
          <button
          onClick={() => handleChooseOption(event.time, event.type)}
          className="border border-gray-100 scanning-option-card bg-gradient-to-r from-blue-700 to-sky-500 hover:from-blue-800 hover:to-sky-600 text-center p-6 rounded-lg shadow-lg"
        >
          <h2 className="text-xl font-semibold">{event.time} {event.type} Scan</h2>
          <p className="text-sm opacity-80 mt-2">
           {event.name}
          </p>
        </button>
        ))}
      </div>
    </div>
  );
};

export default ScanningOption;
