import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "../styles/validationCard.css";
import { FaCircleCheck } from "react-icons/fa6";
import { CgCloseO } from "react-icons/cg";

interface IResponse {
  message: string;
  success: boolean;
}

export const ValidateQrCode = () => {
  const [searchParams] = useSearchParams();
  const qrcodeId = searchParams.get("qrcodeId");
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
        await axios.get(
          `https://a3904b26e6d9b4.lhr.life/qrcode/validate?qrcodeId=${qrcodeId}`
        );
      setHeaderText(data.message);
      setSuccess(data.success);
    } catch (error) {
      setSuccess(false);
      setHeaderText("Failed to validate the QR code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleValidation();
  }, []);

  return (
    <div className="container">
      <div className={`card ${success ? "success" : "error"}`}>
        {loading ? (
          <div className="loader">Validating...</div>
        ) : (
          <div className="success-message">
            <div className="iconBox">
              {success ? (
                <FaCircleCheck className="icon" />
              ) : (
                <CgCloseO className="icon" />
              )}
            </div>
            <h1>{headerText}</h1>
          </div>
        )}
      </div>
    </div>
  );
};
