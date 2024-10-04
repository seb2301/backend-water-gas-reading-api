'use client'
import React from 'react';
import NavBar from '../components/NavBar';
import { Box, Typography } from '@mui/material';
import UploadComponent from '../components/Upload';

export default function UploadPage() {
  
  return (
      <>
        <NavBar />
        <div className="upload-container">
          <Box className='home-menu' sx={{ width: '100%', maxWidth: 360 }}>
          <div className="title">
            <Typography gutterBottom variant='h4' component='div' textAlign={'center'}>
                Upload Measure
            </Typography>
          </div>
  
          <UploadComponent />
          </Box>
        </div>
      </>
    );
}