import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Paper } from '@mui/material';
import Logger from '../middleware/Loggers';
import axios from 'axios';
import '../App.css';

export default function ShortenerForm({ onShorten }) {
  const [urls, setUrls] = useState([{ longUrl: '', validity: '', shortcode: '' }]);

  const handleChange = (index, field, value) => {
    const updated = [...urls];
    updated[index][field] = value;
    setUrls(updated);
  };

  const handleSubmit = async () => {
    const API_KEY = 'jhZa24EiTjhH358Zn4W6C4QLZVZnob8VyYLIxE5wrNd0whu7fy6qjFBuByyL'; 

    try {
      const promises = urls.map(async (entry) => {
        const response = await axios.post(
          'https://api.tinyurl.com/create',
          {
            url: entry.longUrl,
            domain: 'tinyurl.com'
          },
          {
            headers: {
              Authorization: `Bearer ${API_KEY}`,
              'Content-Type': 'application/json'
            }
          }
        );

        const shortUrl = response.data.data.tiny_url;
        Logger('Shortened', { original: entry.longUrl, short: shortUrl });

        return {
          ...entry,
          shortUrl,
          createdAt: new Date().toISOString(),
          expiresAt: 'N/A (TinyURL API)',
          clicks: []
        };
      });

      const results = await Promise.all(promises);
      onShorten(results);
    } catch (error) {
      alert('URL shortening failed. Please check the URL or your internet connection.');
    }
  };

  return (
    <Paper elevation={4} className="form-container">
      <Typography variant="h5" className="form-title">
        
      </Typography>
      {urls.map((entry, i) => (
        <Box key={i} className="input-group">
          <TextField
            label="Original URL"
            placeholder="https://example.com"
            fullWidth
            variant="outlined"
            value={entry.longUrl}
            onChange={(e) => handleChange(i, 'longUrl', e.target.value)}
          />
        </Box>
      ))}
      <Button variant="contained" size="large" color="primary" onClick={handleSubmit} className="submit-button">
         Shorten URL
      </Button>
    </Paper>
  );
}
