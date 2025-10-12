import React, { useMemo, useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { BrowserRouter } from 'react-router-dom';
import { createTheme } from "@mui/material/styles";
import baseTheme from "./theme";
import './index.css';

function Root() {
  const [themeMode, setThemeMode] = useState(() => {
    try {
      return localStorage.getItem("themeMode") || "light";
    } catch (e) {
      return "light";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("themeMode", themeMode);
    } catch (e) {
      // ignore
    }
  }, [themeMode]);

  const theme = useMemo(() => createTheme({ ...baseTheme, palette: { ...baseTheme.palette, mode: themeMode } }), [themeMode]);

  return (
    <React.StrictMode>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App themeMode={themeMode} setThemeMode={setThemeMode} />
        </ThemeProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Root />);
