import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "../styles/validationCard.css";

export const ValidateQrCode = () => {
  const [searchParams] = useSearchParams();
  const qrcodeId = searchParams.get("qrcodeId");
  const [headerText, setHeaderText] = useState<string>(
    "We are validating your QR code"
  );
  const [loading, setLoading] = useState<boolean>();

  const handleValidation = async () => {
    try {
      const res = await axios.post("http://localhost:3000/qrcode/validate", {
        qrcodeId,
      });
      console.log(res.data);
      setHeaderText(res.data.message);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleValidation();
  }, []);
  return (
    <div className="container">
      <div className="card">
        <h1>{headerText}</h1>
        <div>{loading && <div className="loader">Loading...</div>}</div>
      </div>
    </div>
  );
};
