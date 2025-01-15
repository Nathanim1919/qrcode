import { useSearchParams, useNavigate } from "react-router-dom";
import { IEvent } from "../interface/IEvent";
import { useEffect, useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import axiosInstance from "../constants/config";


export const ScanningOption: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [events, setEvents] = useState<IEvent[]>([]);
  const [userAttendance, setUserAttendance] = useState<any[]>([]);
  const navigate = useNavigate();
  const qrcodeId = searchParams.get("qrcodeId");
  const [isLoaded, setIsLoaded] = useState(false);

  // Get the current date
  const today = new Date();
  const formattedFullDate = today.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const handleChooseOption = (
    scanTime: string,
    scanType: string,
    eventId: string
  ) => {
    navigate(
      `/validateQrCode?qrcodeId=${qrcodeId}&scanTime=${scanTime}&scanType=${scanType}&eventId=${eventId}`
    );
  };

  useEffect(() => {
    setIsLoaded(true);
    const fetchEvents = async () => {
      try {
        const res = await axiosInstance.get(`/events/today`);
        setEvents(res.data.data);
      } catch (error) {
        console.error("Failed to fetch events", error);
      }
      setIsLoaded(false);
    };

    fetchEvents();
  }, []);

  const getUserAttendance = async (qrcodeId: string) => {
    try {
      const res = await axiosInstance.get(
        `/attendance/userAttendanceByQrcode/${qrcodeId}`
      );
      setUserAttendance(res.data);
    } catch (error) {
      console.error("Error fetching user attendance:", error);
    }
  };

  useEffect(() => {
    if (qrcodeId) {
      getUserAttendance(qrcodeId);
    }
  }, [qrcodeId]);

  if (isLoaded) {
    return (
      <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-sky-500 text-white">
        <ImSpinner2 className="animate-spin text-3xl" />
      </div>
    );
  }

  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex flex-col justify-center items-center bg-sky-500 text-white">
      {/* Header */}
      <h1 className="text-2xl w-[90%] mb-4 md:text-3xl font-bold text-center">
        Select Scanning Option for{" "}
        <span className="underline">{formattedFullDate}</span>
      </h1>

      {/* Options Container */}
      <div className="grid grid-cols-2 gap-4 max-w-lg w-[90%] md:w-[700px]">
        {events.length > 0 &&
          events.map((event: IEvent) => {
            const alreadyScanned = userAttendance.some(
              (attendance) => attendance.eventId._id === event._id
            );

            return (
              <div
                key={event._id}
                className={`relative border border-gray-100 bg-gradient-to-r from-blue-700 to-sky-500 text-center p-6 rounded-lg shadow-lg transition-transform duration-200 ${
                  alreadyScanned
                    ? "opacity-60 cursor-not-allowed"
                    : "hover:scale-105 hover:from-blue-800 hover:to-sky-600"
                }`}
              >
                {alreadyScanned && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-80 rounded-lg backdrop-blur-lg z-10">
                    <div className="text-lg font-bold text-white">
                      <h1>{event.time} {event.name}</h1>
                      <h2>✅ Already Scanned</h2>
                    </div>
                  </div>
                )}
                <button
                  disabled={alreadyScanned}
                  onClick={() =>
                    handleChooseOption(event.time, event.type, event._id)
                  }
                  className="w-full h-full flex flex-col items-center justify-center text-white"
                >
                  <h2 className="text-xl font-semibold">
                    {event.time} {event.type} Scan
                  </h2>
                  <p className="text-sm opacity-80 mt-2">{event.name}</p>
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ScanningOption;
