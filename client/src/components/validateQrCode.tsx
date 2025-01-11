import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "../styles/validationCard.css";

interface IResponse {
  message: string;
  success: boolean;
}

export const ValidateQrCode = () => {
  const [searchParams] = useSearchParams();
  const qrcodeId = searchParams.get("qrcodeId");
  const [isCalled, setIsCalled] = useState<boolean>(false);

  // State variables
  const [headerText, setHeaderText] = useState<string>(
    "We are validating your QR code"
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [validationResult, setValidationResult] = useState<
    "success" | "failure" | null
  >(null);

  // Function to validate QR code
  const handleValidation = async () => {
    if (!qrcodeId) {
      setHeaderText("QR code is invalid or missing.");
      setValidationResult("failure");
      setLoading(false);
      return;
    }

    setLoading(true);
    setValidationResult(null);

    try {
      const { data }: { data: IResponse } = await axios.get(
        `https://12378be28cd946.lhr.life/qrcode/validate?qrcodeId=${qrcodeId}`
      );

      if (data.success) {
        setHeaderText(data.message);
        setValidationResult("success");
      } else {
        setHeaderText("Validation failed. Please try again.");
        setValidationResult("failure");
      }
    } catch (error) {
      console.error("Error during validation:", error);
      setHeaderText("Failed to validate the QR code. Please try again.");
      setValidationResult("failure");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isCalled) {
      setIsCalled(true);
      handleValidation();
    }
  }, []); // Dependency array is empty to ensure the function runs once on mount.

  return (
    <div className="container">
      <div className="card">
        <h1>{headerText}</h1>
        {loading && <div className="loader">Validating...</div>}
        {!loading && validationResult === "success" && (
          <div className="success-message">🎉 Validation Successful!</div>
        )}
        {!loading && validationResult === "failure" && (
          <div className="failure-message">⚠️ Validation Failed!</div>
        )}
      </div>
    </div>
  );
};
