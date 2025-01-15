import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "../styles/validationCard.css";
import { FaCheck } from "react-icons/fa";
import QrCodeImage from "../assets/qr.png"
import { IoCloseSharp } from "react-icons/io5";
import { ImSpinner2 } from "react-icons/im";
import axiosInstance, { BASE_URL } from "../constants/config";

interface IResponse {
  message: string;
  success: boolean;
}

export const ValidateQrCode = () => {
  const [searchParams] = useSearchParams();
  const qrcodeId = searchParams.get("qrcodeId");
  const scanTime = searchParams.get("scanTime");
  const scanType = searchParams.get("scanType");
  const eventId = searchParams.get("eventId");

  const [success, setSuccess] = useState<boolean>(false);

  const [headerText, setHeaderText] = useState<string>(
    ""
  );
  const [loading, setLoading] = useState<boolean>(true);

  // To prevent duplicate requests
  const hasValidated = useRef(false);

  const handleValidation = async () => {
    if (!qrcodeId) {
      setHeaderText("QR code is invalid or missing.");
      setLoading(false);
      setSuccess(false);
      return;
    }

    if (hasValidated.current) return; // Prevent duplicate validation
    hasValidated.current = true;

    setLoading(true);

    try {
      const { data }: { data: IResponse } =

        await axiosInstance.get(
          `/qrcode/validate?qrcodeId=${qrcodeId}&scanTime=${scanTime}&scanType=${scanType}&eventId=${eventId}`
        );
      setHeaderText(data.message);
      setSuccess(data.success);
    } catch (error) {
      setSuccess(false);
      setHeaderText("Failed to validate the QR code. Please try again.");
    } finally {
      setLoading(false);
      // navigate(`/admin`);
    }
  };

  useEffect(() => {
    handleValidation();
  }, []);

  return (
    <div className="container fixed w-screen h-screen bg-sky-300 grid place-items-center">
      <div className={`w-[80%] md:w-[300px] bg-white p-6 shadow-2xl rounded-md`}>
        {loading ? (
          <div className="loader flex justify-center items-center gap-2">
            <ImSpinner2 className="text-5xl animate-spin text-blue-500" />
            Checking QR code...
          </div>
        ) : (
          <div className="success-message">
           <div className="relative w-full h-[60%]">
            <img src={QrCodeImage} alt="QR Code" className="qrcode-image w-full h-full" />
            <span className={`w-20 border-8 border-white h-20 text-4xl rounded-full grid place-items-center absolute bottom-4 text-whit right-4 text-white
            ${success ? "bg-green-500" : "bg-red-500"}
              `}>
             {success ?<FaCheck/>:<IoCloseSharp/>
              }
            </span>
           </div>
            <div className="iconBox flex flex-col justify-center items-center my-4">
              {success?<h1 className="text-3xl text-green-500 font-bold">SUCCESS</h1>
              :<h1 className="text-3xl text-red-500 font-extrabold">ERROR</h1>}
            <p
              className={`text-center font-bold ${
                success ? "text-green-400" : "text-red-400"
              }`}
              >{headerText}</p>
              </div>
          <button
            onClick={handleValidation}
            className={`w-full mt-4 p-2 rounded-md text-white font-bold ${
              success ? "bg-green-500" : "bg-red-500"
            }`}
          >
              {success ? "Thank You!" : "Try Again"}
          </button>
          </div>
        )}
      </div>
    </div>
  );
};
