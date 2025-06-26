import React from 'react';
import { Box, Typography, Button, Paper, Divider } from '@mui/material';
import '../App.css';

export default function StatisticsPage({ stats }) {
  return (
    <Paper elevation={3} className="stats-container">
      <Typography variant="h5" className="stats-title">
        Shortened URLs
      </Typography>
      {stats.map((s, i) => (
        <Box key={i} className="stats-item">
          <Typography>
            <strong>Short URL:</strong> <a href={s.shortUrl} target="_blank" rel="noreferrer">{s.shortUrl}</a>
          </Typography>
          <Typography><strong>Created:</strong> {s.createdAt}</Typography>
          <Typography><strong>Expires:</strong> {s.expiresAt}</Typography>
          <Button
            variant="outlined"
            size="small"
            className="copy-button"
            onClick={() => navigator.clipboard.writeText(s.shortUrl)}
          >
            Copy Link
          </Button>
          {i !== stats.length - 1 && <Divider className="divider" />}
        </Box>
      ))}
    </Paper>
  );
}