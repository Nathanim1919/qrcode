import { IoMdClose } from "react-icons/io";
import { IQrcode } from "../interface/IQrcode";
import axios from "axios";
import { BASE_URL } from "../constants/config";
import { FaCheckCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa6";
import { useParams } from "react-router-dom";

interface IUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  uniqueId: string;
  qrCode: IQrcode;
}

const UserDetailCard: React.FC = () => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const {id} = useParams();
  const [isloading, setIsLoading] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);

  const formatDate = (date: Date) => {
    const formattedFullDate = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    return formattedFullDate;
  };


  const getUserById = async (id: string) => {
    try {
      const res = await axios.get(`${BASE_URL}/users/${id}`);
      setUser(res.data);
    } catch (error) {
      console.error("Error fetching user by ID:", error);
    }
  }



  const handlePrintQrCode = () => {
    const printContent = document.getElementById("qr-print-section");

    if (printContent) {
      const newWindow = window.open("", "", "width=800,height=600");
      newWindow?.document.write("<html><head><title>Print QR Code</title>");
      newWindow?.document.write(
        `<style>
          body {
            font-family: Arial, sans-serif;
            padding: 20px;
            text-align: center;
          }
          .qr-container {
            margin-bottom: 20px;
          }
          .qr-container img {
            width: 150px;
            height: 150px;
            margin-bottom: 20px;
          }
          .unique-id {
            font-size: 20px;
            font-weight: bold;
          }
        </style>`
      );
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

      // Update the selectedUser's qrCode property with the new QR code
      setUser((prevUser) =>
        prevUser
          ? {
              ...prevUser,
              qrCode: {
                ...prevUser.qrCode,
                code: qrCodeBase64,
              },
            }
          : null
      );
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserById(id??"");
  }, [id, qrCodeUrl]);

  return (
    <div className="fixed top-0 left-0 grid place-items-center w-screen h-screen bg-black/40 backdrop-blur-sm">
      <div className="w-[90%] md:max-w-[700px] max-h-[95vh] bg-white rounded-lg shadow-lg overflow-y-auto">
        {/* Header Section */}
        <div
          className="text-white sticky top-0 p-8 flex flex-col items-center
          before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-gray-800 before:rounded-br-full before:rounded-bl-full
          "
        >
          <h2 className="text-xl font-bold text-white relative z-10">
            Nathanim Tadele
          </h2>
          <p className="text-sm opacity-90">Admin</p>
        </div>

        {/* Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {/* Personal Info */}
          <div className="bg-gray-200 p-3 border border-gray-300">
            <h3 className="font-semibold text-lg mb-4 text-gray-700">
              Personal Information
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <p className="font-bold text-gray-600">Email:</p>
                <p className="text-gray-700">{user?.email}</p>
              </div>
              <div className="flex justify-between">
                <p className="font-bold text-gray-600">Phone:</p>
                <p className="text-gray-700">{user?.phone}</p>
              </div>
              <div className="flex justify-between">
                <p className="font-bold text-gray-600">Address:</p>
                <p className="text-gray-700">{user?.address}</p>
              </div>
              <div className="flex justify-between">
                <p className="font-bold text-gray-600">Unique ID:</p>
                <p className="text-gray-700">{user?.uniqueId}</p>
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
                  <h2 className="font-bold text-center">
                    {user.uniqueId}
                  </h2>
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
                  <h3>{user.phone}</h3>
                </div>
                <div className="qr-container">
                  <img
                    src={`data:image/png;base64, ${user.qrCode.code}`}
                    alt="QR Code"
                    className="h-48 w-48"
                  />
                </div>
                <div className="unique-id">{user.uniqueId}</div>
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
                {isloading ? (
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

        {/* <div className="p-5">
          <h1 className="font-bold text-2xl text-center">Guest Attendance</h1>

          {userAttendance.length === 0 && (
            <h1 className="text-1xl text-center">No Attendance Found</h1>
          )}

          <div className="flex flex-wrap items-center place-items-center gap-2">
            {userAttendance.map((attendance) => (
              <div className="bg-gray-200 flex-1 p-4 border border-gray-300 ">
                <h2 className="text-blue-500">
                  {formatDate(new Date(attendance.eventId.date))}
                </h2>
                <h3 className="font-bold">{attendance.eventId.name}</h3>
                <p>{attendance.eventId.time}</p>
                <span className="text-white bg-green-500 px-[3px] py-[2px] text-[14px] rounded-full flex items-center gap-1 justify-center">
                  <FaCheckCircle />
                  Attended
                </span>
              </div>
            ))}
          </div>
        </div> */}

        {/* Attendance Section */}
      </div>
    </div>
  );
};

export default UserDetailCard;

// <div className="p-6 bg-gray-50">
//   <h3 className="font-bold text-lg text-gray-700 mb-4">Attendance</h3>
//   <div className="space-y-6">
//     {/* Attendance Day */}
//     {["Jan 23", "Jan 24", "Jan 25"].map((day) => (
//       <div key={day} className="bg-gray-100 p-2">
//         <h4 className="font-medium text-gray-600 mb-2">{day}</h4>
//         <div className="flex justify-between">
//           <div className="flex-1 text-center">
//             <p className="font-medium text-sm text-gray-700">Morning</p>
//             <div className="flex justify-center gap-2 mt-2">
//               <div className="w-6 h-6 bg-green-500 rounded"></div>
//               <div className="w-6 h-6 bg-green-500 rounded"></div>
//             </div>
//           </div>
//           <div className="flex-1 text-center">
//             <p className="font-medium text-sm text-gray-700">
//               Afternoon
//             </p>
//             <div className="flex justify-center gap-2 mt-2">
//               <div className="w-6 h-6 bg-red-500 rounded"></div>
//               <div className="w-6 h-6 bg-red-500 rounded"></div>
//             </div>
//           </div>
//         </div>
//       </div>
//     ))}
//   </div>
// </div>
