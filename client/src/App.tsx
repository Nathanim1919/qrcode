import "./App.css";
import { ValidateQrCode } from "./components/validateQrCode";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import AdminPage from "./pages/AdminPage";
import LoginPage from "./pages/LoginPage";
import ScanningOption from "./components/ScanOption";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/scanOption" element={<ScanningOption />} />
      <Route path="/admin/scanOption" element={<AdminPage />} />
      <Route path="/validateQrCode" element={<ValidateQrCode />} />
    </Routes>
  );
}

export default App;
