import { IoMdClose } from "react-icons/io";
import { IQrcode } from "../interface/IQrcode";
import axios from "axios";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaIdCard, FaClipboardCheck, FaCalendarAlt } from "react-icons/fa";
import axiosInstance, { BASE_URL } from "../constants/config";
import { FaCheckCircle, FaSpinner } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IEvent } from "../interface/IEvent";

interface IUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  uniqueId: string;
  qrCode: IQrcode;
}

interface IAttendance {
  userId: IUser;
  eventId: IEvent;
  qrCodeId: IQrcode;
  scannedAt: Date;
}

const UserDetailCard: React.FC = () => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);
  const [attendance, setAttendance] = useState<IAttendance[] | null>(null);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getUserById = async (id: string) => {
    try {
      const res = await axiosInstance.get(`/users/${id}`);
      setUser(res.data);
    } catch (error) {
      console.error("Error fetching user by ID:", error);
    }
  };

  const getUserAttendance = async (id: string) => {
    try {
      const res = await axiosInstance.get(`/attendance/userAttendance/${id}`);
      setAttendance(res.data);
      console.log(res.data);
    } catch (error) {
      console.error("Error fetching user attendance:", error);
    }
  };

  const handlePrintQrCode = () => {
    const printContent = document.getElementById("qr-print-section");
    if (printContent) {
      const newWindow = window.open("", "", "width=800,height=600");
      newWindow?.document.write("<html><head><title>Print QR Code</title>");
      newWindow?.document.write(`
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; text-align: center; }
          .qr-container { margin-bottom: 20px; }
          .qr-container img { width: 150px; height: 150px; margin-bottom: 20px; }
          .unique-id { font-size: 20px; font-weight: bold; }
        </style>
      `);
      newWindow?.document.write("</head><body>");
      newWindow?.document.write(printContent?.innerHTML || "");
      newWindow?.document.write("</body></html>");
      newWindow?.document.close();
      newWindow?.print();
    }
  };

  const handleGenerateQrCode = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post(`${BASE_URL}/qrcode/generateQrCode`, {
        userId: user?._id,
      });
      setQrCodeUrl(res.data.response);
      const qrCodeBase64 = res.data.response.replace(
        /^data:image\/png;base64,/,
        ""
      );
      setUser((prevUser) =>
        prevUser
          ? { ...prevUser, qrCode: { ...prevUser.qrCode, code: qrCodeBase64 } }
          : null
      );
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserById(id ?? "");
    getUserAttendance(id ?? "");
  }, [id, qrCodeUrl]);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl">
        {/* Header Section */}
        <div className="bg-blue-500 text-white text-center py-6">
          <h2 className="text-2xl font-bold">Nathanim Tadele</h2>
          <p className="text-sm opacity-90">Admin</p>
        </div>

        {/* Details Section */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Info */}

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-300">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Personal Information
            </h3>
            <div className="text-sm space-y-4">
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-blue-500" />
                <span className="font-medium text-gray-600">Email:</span>
                <span className="text-gray-800">{user?.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaPhone className="text-green-500" />
                <span className="font-medium text-gray-600">Phone:</span>
                <span className="text-gray-800">{user?.phone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaMapMarkerAlt className="text-red-500" />
                <span className="font-medium text-gray-600">Address:</span>
                <span className="text-gray-800">{user?.address}</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaIdCard className="text-purple-500" />
                <span className="font-medium text-gray-600">Unique ID:</span>
                <span className="text-gray-800">{user?.uniqueId}</span>
              </div>
            </div>
          </div>

          {/* QR Code Section */}
          {user?.qrCode ? (
            <div className="bg-gray-200 border grid gap-3  border-gray-300">
              <h3 className="font-semibold p-1 px-4  flex items-center justify-center text-lg mb-4 text-gray-700">
                <span>QR Code</span>
              </h3>
              <div className="h-40 w-full rounded-lg flex flex-col items-center justify-center">
                {user.qrCode.code ? (
                  <img
                    src={`data:image/png;base64, ${user.qrCode.code}`}
                    alt="QR Code"
                    className="h-48 w-48"
                  />
                ) : (
                  <img src={qrCodeUrl} alt="QR Code" className="h-48 w-48" />
                )}
                <h2 className="font-bold text-center">{user.uniqueId}</h2>
              </div>
              <button
                onClick={handlePrintQrCode}
                className="mt-4 w-[60%] border border-blue-700 bg-blue-400 text-white py-2 my-3 mx-auto rounded-lg font-medium hover:bg-blue-600 transition"
              >
                Print QR Code
              </button>

              {/* Hidden print section */}
              <div id="qr-print-section" className="hidden">
                <div>
                  <h1>{user.name}</h1>
                </div>
                <div className="qr-container">
                  <img
                    src={`data:image/png;base64, ${user.qrCode.code}`}
                    alt="QR Code"
                    className="h-48 w-48"
                  />
                  <div className="unique-id">{user.uniqueId}</div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <h3 className="font-semibold text-lg mb-4 text-gray-700">
                No QR Code Found
              </h3>
              <button
                onClick={handleGenerateQrCode}
                className={`mt-4 w-full bg-blue-400 text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition`}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2 justify-center">
                    <FaSpinner className="animate-spin" />
                    Generating...
                  </span>
                ) : (
                  "Regenerate QR Code"
                )}
              </button>
            </div>
          )}
        </div>

        {/* Hidden print section */}
        <div id="qr-print-section" className="hidden">
          <div>
            <h1>{user?.name}</h1>
          </div>
          <div className="qr-container">
            <img
              src={`data:image/png;base64, ${user?.qrCode?.code || ""}`}
              alt="QR Code"
              className="h-40 w-40"
            />
            <div className="unique-id">{user?.uniqueId}</div>
          </div>
        </div>
        <div>
            <h1 className="font-bold text-3xl text-gray-800 p-4 text-center">Attendance</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-[100%] mx-auto p-8">
              {attendance?.map((att) => (
                <div
                  key={att._id}
                  className="bg-gray-50 p-4 rounded-lg shadow-lg border border-gray-300 grid place-items-start"
                >
                  <div className="flex items-center space-x-2 mb-4">
                    <FaClipboardCheck className="text-green-500" />
                    <h2 className="text-lg font-semibold text-gray-700">{att.eventId.name}</h2>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaCalendarAlt className="text-blue-500" />
                    <p className="text-sm text-gray-600">
                      {formatDate(new Date(att.scannedAt))}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
      </div>
    </div>
  );
};

export default UserDetailCard;
