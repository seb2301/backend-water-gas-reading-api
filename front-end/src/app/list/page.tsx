'use client'
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { fourDigitCodeValidation, warningText } from '../utils';
import { Box, Button, Typography } from '@mui/material';
import { MeasureService } from '../../../service/MeasureService';
import ResultList from '../components/ResultList';
import { IMeasureList } from '../interfaces/IMeasureList';
import NavBar from '../components/NavBar';

export default function Home() {
  const [inputCode, setInputCode] = useState('')
  const [customerData, setCustomerData] = useState({})
  const [hasSearched , setHasSearched] = useState(false)

  const measureService = new MeasureService()

  async function handleClick() {
    measureService.getCustomerMeasures(inputCode)
    .then((response) => {
      setCustomerData(response)
      setHasSearched(true)
      }).catch((error) => {
      console.log(error)
    })
  }

  return (
    <>
      <NavBar />
      <div className="home-container">
        <Box className='home-menu' sx={{ width: '100%', maxWidth: 360 }}>

        <Typography gutterBottom variant='h4' component='div' textAlign={'center'}>
            Consumption History
        </Typography>

        <form className=''>
          <TextField 
            label={fourDigitCodeValidation(inputCode)}
            color={fourDigitCodeValidation(inputCode) !== warningText ? 'success' : 'warning'}
            variant='standard'
            focused
            value={inputCode}
            onChange={({ target }) => setInputCode(target.value)}
            className='inputCode'
          />

          <Button 
            variant="contained"
            onClick={handleClick}
          >
              Search
          </Button>

        </form>
        </Box>
      </div>
      {hasSearched && customerData ? <ResultList results={customerData as IMeasureList} /> : null}
    </>
  );
}
