import React from "react";
import { Routes, Route } from "react-router-dom";

import MedicalAssistantMainPage from "./pages/Mainpage.jsx";
import AddMedicinePage from "./pages/AddMedicinePage.jsx";
import ProfilePage from "./pages/Profilepage.jsx";
import ExpiryCheckPage from "./pages/ExpiryCheckPage.jsx";

export default function App({ themeMode, setThemeMode }) {
  return (
    <Routes>
      <Route path="/" element={<MedicalAssistantMainPage themeMode={themeMode} setThemeMode={setThemeMode} />} />
      <Route path="/add-medicine" element={<AddMedicinePage themeMode={themeMode} setThemeMode={setThemeMode} />} />
      <Route path="/profile" element={<ProfilePage themeMode={themeMode} setThemeMode={setThemeMode} />} />
      <Route path="/expiry-check" element={<ExpiryCheckPage themeMode={themeMode} setThemeMode={setThemeMode} />} />
    </Routes>
  );
}
