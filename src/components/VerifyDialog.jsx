// VerifyDialog.jsx
import React, { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, List, ListItem } from "@mui/material";
import { imageFingerprintFromDataUrl, similarityHash } from "../utils/medicineUtils";

/*
  payload expected: { med, fileDataUrl } OR { med } when opening to attach new
*/
export default function VerifyDialog({ open, payload, medicines = [], onClose, onAttach }) {
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (!payload) return setResult(null);
    (async () => {
      if (payload.fileDataUrl) {
        const uploadedHash = await imageFingerprintFromDataUrl(payload.fileDataUrl);
        // compare against DB
        let best = null, bestScore = 0;
        for (const m of medicines) {
          if (!m.imageFingerprint) continue;
          const s = similarityHash(uploadedHash, m.imageFingerprint);
          if (s > bestScore) { bestScore = s; best = m; }
        }
        setResult({ uploadedHash, best, bestScore });
      } else {
        setResult(null);
      }
    })();
  }, [payload, medicines]);

  if (!payload) return null;
  const { med } = payload;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Visual verification</DialogTitle>
      <DialogContent>
        <Typography variant="body2" gutterBottom>Medicine: {med?.name}</Typography>

        {result ? (
          <>
            <Typography variant="body2" color="text.secondary">Best match: {result.best ? result.best.name : "No local match"}</Typography>
            <List>
              <ListItem>
                <Typography variant="body2">Similarity: {(result.bestScore * 100).toFixed(1)}%</Typography>
              </ListItem>
            </List>
            <Typography variant="caption" color="text.secondary">Note: Demo fingerprinting is privacy-preserving. Use a CNN or ORB/SIFT approach in production.</Typography>
          </>
        ) : (
          <Typography variant="body2" color="text.secondary">Upload an image from the medicine card to verify.</Typography>
        )}

      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        {result && <Button variant="contained" onClick={() => { onAttach(med.id, result.uploadedHash); onClose(); }}>Attach fingerprint</Button>}
      </DialogActions>
    </Dialog>
  );
}
