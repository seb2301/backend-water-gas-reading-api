'use client'
import React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { AddAPhoto, History } from '@mui/icons-material';

export default function BasicList() {
  const router = useRouter()
  return (
    <div className='container'>
      <div className='home-container'>

      <Box className='home-menu'>
        <Typography gutterBottom variant='h4' component='div' textAlign={'center'}>
          Access Menu 
        </Typography>
        <nav aria-label="main mailbox folders">
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <History />
                </ListItemIcon>
                  <ListItemText primary="Access Water/Gas Consumption History" onClick={() => router.push('/list')}/>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <AddAPhoto />
                </ListItemIcon>
                <ListItemText primary="Upload Water/Gas Measurement" onClick={() => router.push('/uploadMeasure')}/>
              </ListItemButton>
            </ListItem>
          </List>
        </nav>
        <Divider />
      </Box>
      </div>
    </div>
  );
}