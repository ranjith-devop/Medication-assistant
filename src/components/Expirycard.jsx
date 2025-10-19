// ExpiryCard.jsx (React + MUI)
import React from 'react';
import { Card, CardContent, Typography, Chip } from '@mui/material';
import { differenceInDays } from 'date-fns';

export default function ExpiryCard({ item }) {
  const daysLeft = differenceInDays(new Date(item.expiryDate), new Date());
  let status = 'safe';
  if (daysLeft < 0) status = 'expired';
  else if (daysLeft <= 7) status = 'urgent';
  else if (daysLeft <= 30) status = 'soon';

  const colorMap = { safe: 'success', soon: 'warning', urgent: 'error', expired: 'default' };

  return (
    <Card sx={{ width: 320, borderRadius: 2, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6">{item.name}</Typography>
        <Typography variant="body2" color="text.secondary">{item.manufacturer}</Typography>
        <Typography sx={{ mt: 1 }}><strong>Expiry:</strong> {new Date(item.expiryDate).toLocaleDateString()}</Typography>
        <Chip label={daysLeft < 0 ? 'Expired' : `${daysLeft} days left`} color={colorMap[status]} sx={{ mt: 1 }} />
        <Typography variant="caption" display="block" sx={{ mt: 1, color: 'text.secondary' }}>
          Batch: {item.batch || '—'} • Qty: {item.quantity}
        </Typography>
      </CardContent>
    </Card>
  );
}
