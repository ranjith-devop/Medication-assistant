// AddMedicinePage.jsx
import React, { useState } from "react";
import { ThemeProvider, createTheme, CssBaseline, Container, Grid, Box, Typography, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { motion } from "framer-motion";

import MedicineCard from "../components/MedicineCard";
import MedicineForm from "../components/MedicineForm";
import CSVUploader from "../components/CSVUploader";
import Scanner from "../components/Scanner";
import VerifyDialog from "../components/VerifyDialog";
import { uid, predictRefillDate } from "../utils/medicineUtils";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#1976d2" },
    secondary: { main: "#1565c0" },
  },
  components: {
    MuiButton: { defaultProps: { disableElevation: false } },
  },
});

export default function AddMedicinePage() {
  const [medicines, setMedicines] = useState(() => ([
    { id: uid(), name: "Paracetamol", qty: 20, expiry: "2025-11-01", notes: "500mg", history: [{ date: new Date().toISOString().slice(0,10), qtyTaken:1 }], imageFingerprint: null },
  ]));
  const [openForm, setOpenForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [showScanner, setShowScanner] = useState(false);
  const [verifyData, setVerifyData] = useState(null);

  function addMedicine(data) {
    const m = { id: uid(), ...data, history: [], imageFingerprint: null };
    setMedicines(prev => [m, ...prev]);
  }
  function updateMedicine(id, patch) {
    setMedicines(prev => prev.map(m => m.id === id ? { ...m, ...patch } : m));
  }
  function deleteMedicine(id) {
    setMedicines(prev => prev.filter(m => m.id !== id));
  }
  function importCSV(items) {
    // items are already shaped by CSVUploader
    setMedicines(prev => [...items, ...prev]);
  }

  function recordDose(medId) {
    const today = new Date().toISOString().slice(0,10);
    setMedicines(prev => prev.map(m => m.id === medId ? { ...m, qty: Math.max(0, m.qty - 1), history: [...m.history, { date: today, qtyTaken: 1 }] } : m));
  }

  function attachFingerprint(medId, hash) {
    setMedicines(prev => prev.map(m => m.id === medId ? { ...m, imageFingerprint: hash } : m));
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Box>
            <Typography variant="h4" fontWeight={700} gutterBottom>
              Medicine Inventory — Smart
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Visual verification • predictive refill • CSV import • camera scanner
            </Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <Fab
              color="primary"
              onClick={() => { setEditing(null); setOpenForm(true); }}
              component={motion.div}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
            >
              <AddIcon />
            </Fab>
          </Box>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Grid container spacing={2}>
              {medicines.map((m, idx) => (
                <Grid item xs={12} sm={6} key={m.id}>
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.04 }}>
                    <MedicineCard
                      med={m}
                      onEdit={() => { setEditing(m); setOpenForm(true); }}
                      onDelete={() => deleteMedicine(m.id)}
                      onRecordDose={() => recordDose(m.id)}
                      onAttachFingerprint={(hash) => attachFingerprint(m.id, hash)}
                      onRequestVerify={(payload) => setVerifyData(payload)}
                    />
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box mb={2}>
              <motion.div whileHover={{ scale: 1.01 }}>
                <Box sx={{
                  p: 3,
                  borderRadius: 2,
                  background: "linear-gradient(180deg, rgba(25,118,210,0.08), rgba(21,101,192,0.03))",
                  boxShadow: 3
                }}>
                  <Typography variant="h6" gutterBottom>Quick insights</Typography>
                  <Typography variant="body2">Expiring soon</Typography>
                  <Box component="ul" sx={{ pl: 3, mt: 1 }}>
                    {medicines.filter(m => {
                      if (!m.expiry) return false;
                      const days = (new Date(m.expiry) - new Date()) / (1000*60*60*24);
                      return days <= 14;
                    }).map(m => <li key={m.id}><Typography variant="body2">{m.name} — {m.expiry}</Typography></li>)}
                  </Box>

                  <Box mt={2}>
                    <Typography variant="body2">Predictive refills</Typography>
                    <Box component="ul" sx={{ pl: 3, mt: 1 }}>
                      {medicines.map(m => <li key={m.id}><Typography variant="body2">{m.name} — {predictRefillDate(m) || "insufficient data"}</Typography></li>)}
                    </Box>
                  </Box>

                  <Box mt={2}>
                    <Typography variant="body2">Scanner</Typography>
                    <Box mt={1}><Scanner onDetected={(code) => alert("Scanned: " + code)} /></Box>
                  </Box>

                  <Box mt={2}>
                    <CSVUploader onImport={importCSV} />
                  </Box>

                </Box>
              </motion.div>
            </Box>
          </Grid>
        </Grid>

        <MedicineForm
          open={openForm}
          initial={editing}
          onClose={() => { setOpenForm(false); setEditing(null); }}
          onSave={(vals) => {
            if (editing) updateMedicine(editing.id, vals);
            else addMedicine(vals);
            setOpenForm(false);
          }}
        />

        <VerifyDialog
          open={Boolean(verifyData)}
          payload={verifyData}
          medicines={medicines}
          onClose={() => setVerifyData(null)}
          onAttach={(medId, hash) => attachFingerprint(medId, hash)}
        />

      </Container>
    </ThemeProvider>
  );
}

