import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import MedicalAssistantMainPage from "./pages/Mainpage.jsx";
import AddMedicinePage from "./pages/AddMedicinePage.jsx";
import ProfilePage from "./pages/Profilepage.jsx";
import ExpiryCheckPage from "./pages/ExpiryCheckPage.jsx";

// Page transition wrapper (must be used inside a Router provided by the app root)
const AnimatedRoutes = ({ themeMode, setThemeMode }) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.4 }}>
              <MedicalAssistantMainPage themeMode={themeMode} setThemeMode={setThemeMode} />
            </motion.div>
          }
        />
        <Route
          path="/add-medicine"
          element={
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.4 }}>
              <AddMedicinePage themeMode={themeMode} setThemeMode={setThemeMode} />
            </motion.div>
          }
        />
        <Route
          path="/profile"
          element={
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.4 }}>
              <ProfilePage themeMode={themeMode} setThemeMode={setThemeMode} />
            </motion.div>
          }
        />
        <Route
          path="/expiry-check"
          element={
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.4 }}>
              <ExpiryCheckPage themeMode={themeMode} setThemeMode={setThemeMode} />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

export default function App({ themeMode, setThemeMode }) {
  return <AnimatedRoutes themeMode={themeMode} setThemeMode={setThemeMode} />;
}
