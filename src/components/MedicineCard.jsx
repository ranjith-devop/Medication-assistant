// MedicineCard.jsx
import React from "react";
import { Card, CardContent, Typography, Box, IconButton, Chip, Stack } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import MedicationIcon from "@mui/icons-material/Medication";
import { motion } from "framer-motion";
import { daysUntil } from "../utils/medicineUtils";

export default function MedicineCard({ med, onEdit, onDelete, onRecordDose, onAttachFingerprint, onRequestVerify }) {
  const days = daysUntil(med.expiry);
  const gradient = med.imageFingerprint ? "linear-gradient(135deg,#e3f2fd, #bbdefb)" : "linear-gradient(135deg,#ffffff,#f5f7fb)";

  return (
    <Card component={motion.div} whileHover={{ y: -6 }} sx={{ borderRadius: 2, overflow: "visible", background: gradient, boxShadow: 4 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="start">
          <Box>
            <Stack direction="row" gap={1} alignItems="center">
              <MedicationIcon color="primary" />
              <Typography variant="h6" fontWeight={700}>{med.name}</Typography>
            </Stack>
            <Typography variant="body2" color="text.secondary">{med.notes || "—"}</Typography>
            <Box mt={1} display="flex" gap={1} alignItems="center">
              <Chip label={`Qty ${med.qty}`} size="small" />
              <Chip label={`Expiry ${med.expiry || '—'}`} size="small" color={days <= 7 ? "error" : "default"} />
            </Box>
          </Box>

          <Box>
            <IconButton onClick={onEdit} size="small"><EditIcon /></IconButton>
            <IconButton onClick={onDelete} size="small"><DeleteIcon /></IconButton>
            <IconButton onClick={onRecordDose} size="small" color="primary" title="Record dose">
              <LocalHospitalIcon />
            </IconButton>
            <IconButton
              onClick={() => {
                // open file picker then compute fingerprint in the page using utils ( caller will attach )
                const inp = document.createElement("input");
                inp.type = "file"; inp.accept = "image/*";
                inp.onchange = async (e) => {
                  const f = e.target.files?.[0];
                  if (!f) return;
                  // forward to parent via onAttachFingerprint as base64-hash — actual hashing done elsewhere
                  // we'll call a helper exposed on window to compute - or you can integrate the util here
                  const reader = new FileReader();
                  reader.onload = () => {
                    // as quick demo, send base64 so parent can compute fingerprint via util
                    onRequestVerify?.({ med, fileDataUrl: reader.result });
                  };
                  reader.readAsDataURL(f);
                };
                inp.click();
              }}
              size="small"
            ><CameraAltIcon /></IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
