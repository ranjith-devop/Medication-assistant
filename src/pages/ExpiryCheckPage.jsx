import React from 'react';
import { Box, Typography, Grid, Container } from '@mui/material';
import ExpiryCard from '../components/Expirycard';

export default function ExpiryCheckPage() {
  // Sample data - replace with actual data from your backend/state
  const sampleItems = [
    {
      id: 1,
      name: "Paracetamol",
      manufacturer: "GSK",
      expiryDate: "2025-10-25",
      batch: "B123",
      quantity: 50
    },
    {
      id: 2,
      name: "Aspirin",
      manufacturer: "Bayer",
      expiryDate: "2025-11-15",
      batch: "A456",
      quantity: 30
    },
    {
      id: 3,
      name: "Insulin",
      manufacturer: "Novo Nordisk",
      expiryDate: "2025-10-20",
      batch: "I789",
      quantity: 10
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Expiry Check
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Monitor and manage medicine expiry dates
      </Typography>
      
      <Grid container spacing={3}>
        {sampleItems.map((item) => (
          <Grid item key={item.id} xs={12} sm={6} md={4}>
            <ExpiryCard item={item} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}