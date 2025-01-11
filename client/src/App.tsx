import "./App.css";
import { ValidateQrCode } from "./components/validateQrCode";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/validateQrCode" element={<ValidateQrCode/>} />
    </Routes>
  );
}

export default App;
