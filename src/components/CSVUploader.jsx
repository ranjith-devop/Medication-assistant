// CSVUploader.jsx
import React from "react";
import { Button, Box, Typography } from "@mui/material";
import { parseCSV } from "../utils/medicineUtils";

export default function CSVUploader({ onImport }) {
  function openFile() {
    const inp = document.createElement("input");
    inp.type = "file"; inp.accept = ".csv";
    inp.onchange = (e) => {
      const f = e.target.files?.[0]; if (!f) return;
      const reader = new FileReader();
      reader.onload = () => {
        const arr = parseCSV(String(reader.result));
        onImport(arr);
      };
      reader.readAsText(f);
    };
    inp.click();
  }

  return (
    <Box display="flex" gap={1} alignItems="center">
      <Button variant="outlined" onClick={openFile}>Import CSV</Button>
      <Typography variant="caption" color="text.secondary">Format: name,qty,expiry,notes (header)</Typography>
    </Box>
  );
}
