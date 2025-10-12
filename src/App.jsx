import React from "react";
import MedicalAssistantMainPage from "./pages/Mainpage.jsx";

export default function App({ themeMode, setThemeMode }) {
	return <MedicalAssistantMainPage themeMode={themeMode} setThemeMode={setThemeMode} />;
}

