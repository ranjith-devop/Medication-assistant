import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#27AE60" }, // Soft Green
    secondary: { main: "#E8F8F5" }, // Light Cyan
    info: { main: "#3498DB" }, // Sky Blue
    text: { primary: "#34495E" }, // Charcoal
    warning: { main: "#E67E22" }, // Orange
    error: { main: "#E74C3C" }, // Red
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
});

export default theme;
