import React, { useState } from 'react';
import ShortenerForm from './components/ShortenerForm';
import StatisticsPage from './components/StatisticsPage';
import { Container, Box, Typography } from '@mui/material';
import './App.css';

export default function App() {
  const [stats, setStats] = useState([]);

  const handleShorten = (shortenedResults) => {
    setStats(shortenedResults);
  };

  return (
    <Container maxWidth="md" className="app-container">
      <Box className="app-header">
        <Typography variant="h3" className="app-title">
    
        </Typography>
        <Typography variant="subtitle1" className="app-subtitle">
          Enter your long URLs and get short, shareable links instantly
        </Typography>
      </Box>
      <ShortenerForm onShorten={handleShorten} />
      <StatisticsPage stats={stats} />
    </Container>
  );
}