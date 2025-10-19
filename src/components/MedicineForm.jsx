// MedicineForm.jsx
import React, { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Grid } from "@mui/material";

export default function MedicineForm({ open = false, initial = null, onClose, onSave }) {
  const [name, setName] = useState("");
  const [qty, setQty] = useState(0);
  const [expiry, setExpiry] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (initial) {
      setName(initial.name || "");
      setQty(initial.qty || 0);
      setExpiry(initial.expiry || "");
      setNotes(initial.notes || "");
    } else {
      setName(""); setQty(0); setExpiry(""); setNotes("");
    }
  }, [initial, open]);

  function submit() {
    if (!name.trim()) return alert("Provide medicine name");
    onSave({ name: name.trim(), qty: Number(qty), expiry: expiry || "", notes: notes.trim() });
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{initial ? "Edit medicine" : "Add medicine"}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ pt: 1 }}>
          <Grid item xs={12}>
            <TextField label="Medicine name" fullWidth value={name} onChange={e=>setName(e.target.value)} />
          </Grid>
          <Grid item xs={6}><TextField label="Qty" type="number" fullWidth value={qty} onChange={e=>setQty(e.target.value)} /></Grid>
          <Grid item xs={6}><TextField label="Expiry" type="date" fullWidth value={expiry} onChange={e=>setExpiry(e.target.value)} InputLabelProps={{ shrink:true }} /></Grid>
          <Grid item xs={12}><TextField label="Notes" fullWidth value={notes} onChange={e=>setNotes(e.target.value)} multiline rows={2} /></Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={submit}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}
