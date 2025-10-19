// Scanner.jsx
import React from "react";
import { Box, Button } from "@mui/material";

export default function Scanner({ onDetected = () => {} }) {
  // minimal camera stub; replace with @zxing/library or QuaggaJS for production
  return (
    <Box>
      <Box sx={{ height: 120, borderRadius: 1, bgcolor: "background.paper", display:"flex", alignItems:"center", justifyContent:"center", mb:1 }}>
        <div style={{ textAlign: "center", color: "#666" }}>Camera scanner (demo)</div>
      </Box>
      <Box display="flex" gap={1}>
        <Button variant="outlined" onClick={() => onDetected("SIM-123")}>Simulate scan</Button>
      </Box>
    </Box>
  );
}
