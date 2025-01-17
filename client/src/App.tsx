import "./App.css";
import { ValidateQrCode } from "./components/validateQrCode";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import AdminPage from "./pages/AdminPage";
import LoginPage from "./pages/LoginPage";
import ScanningOption from "./components/ScanOption";
import { EventPage } from "./pages/EventPage";
import { Users } from "./pages/UsersPage";
import UserDetailCard from "./components/UserDetailCard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/events" element={<EventPage />} />
      <Route path="/guests" element={<Users/>}/>
      <Route path="/guests/:id" element={<UserDetailCard/>}/>
      <Route path="/scanOption" element={<ScanningOption />} />
      <Route path="/admin/scanOption" element={<AdminPage />} />
      <Route path="/validateQrCode" element={<ValidateQrCode />} />
    </Routes>
  );
}

export default App;
