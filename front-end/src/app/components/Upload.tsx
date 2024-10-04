'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from '@mui/material'
import { MeasureService } from '../../../service/MeasureService'
import { fourDigitCodeValidation, isFourDigits, warningText } from '../utils'
import { IResponse } from '../interfaces/IResponse'
import { IErrorRes } from '../interfaces/IErrorRes'
import { CheckCircle, Key, ManageSearch } from '@mui/icons-material'

export default function UploadComponent() {
    const [inputCode, setInputCode] = useState('')
    const [measureType, setMeasureType] = useState('Water')
    const [selectedImage, setSelectedImage] = useState<string | null>(null)
    const [imageFile, setImageFile] = useState<File | null>(null)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_error, setError] = useState<IErrorRes | null>(null)
    const [measureResponse, setMeasureResponse] = useState<IResponse | null>(null)
    const [disableButton, setDisableButton] = useState(true)
    const [success, setSucess] = useState<boolean>(false)

    const measureService = new MeasureService()

    const handleChange = (event: SelectChangeEvent) => {
        setMeasureType(event.target.value as string)
      }

    async function handleClick() {
        if (imageFile && inputCode && measureType) {
            measureService.uploadPhoto(imageFile, inputCode, measureType)
                .then((response) => {
                    if (response !== undefined && response.data.error_code) {
                        const { error_code, error_description } = response.data
                        const data: IErrorRes = { error_code, error_description }
                        setError(data)
                    }
                    if (response !== undefined) {
                        const { image_url, measure_value, measure_uuid } = response.data
                        const data: IResponse = { image_url, measure_value, measure_uuid }
                        setMeasureResponse(data)
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        } else {
            console.log('Por favor, selecione uma imagem e preencha os campos necessários.')
        }
    }

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0]
            const imageUrl = URL.createObjectURL(file)
            setSelectedImage(imageUrl)
            setImageFile(file)
        }
    }

    async function handleConfirm() {
        if (measureResponse && measureResponse.measure_uuid && measureResponse.measure_value) {
            const { measure_uuid, measure_value } = measureResponse

            measureService.confirmUpload(measure_uuid, measure_value)
                    .then((response) => {
                        if (response !== undefined) {
                            setSucess(true)
                            setMeasureResponse(null)
                        }
                    })
        }
    }

    useEffect(() => {
        if (isFourDigits(inputCode) || !imageFile) {
            setDisableButton(true)
        }
        if (isFourDigits(inputCode) && imageFile) {
            setDisableButton(false)
        }
        
    }, [inputCode, imageFile])

    return (
        <>
        { !measureResponse && !success &&
        <div className='upload-component'>
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

                <Box sx={{ minWidth: 120, margin: 2 }}>
                    <FormControl fullWidth>
                        <InputLabel id='select-label' color='success'>Measure Type</InputLabel>
                            <Select
                            labelId='select-label'
                            id='select'
                            value={measureType}
                            label='MeasureType'
                            onChange={handleChange}
                            color='success'
                            >
                            <MenuItem value={'Water'}>Water</MenuItem>
                            <MenuItem value={'Gas'}>Gas</MenuItem>
                            </Select>
                    </FormControl>
                    </Box>
            </form>

            <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageUpload}
                className='upload-input' 
            />
            {selectedImage && (
                <div style={{ marginTop: '10px' }}>
                    <Typography>
                        Image Preview:
                    </Typography>
                    <Image 
                        src={selectedImage} 
                        alt="Selected Image" 
                        width={150} 
                        height={150} 
                        style={{ objectFit: 'contain' }}
                    />
                </div>
            )}
            <Button 
            variant='contained'
            onClick={handleClick}
            color={'success'}
            className='upload-button'
            disabled={disableButton}
            >
                Submit
            </Button>
            </div>}
            {measureResponse &&

            <div className='upload-component'>
                <div className='result-line'>
                    <h3>Reading Value:</h3>
                    <div className="value-inline">
                        <ManageSearch className='result-icon'/>
                        {measureResponse.measure_value} m³
                    </div>
                </div>
                <div className='result-line'>
                    <h3>UUID:</h3> 
                    <div className="result-inline">
                        <Key className='result-icon'/>
                        {measureResponse.measure_uuid}
                    </div>
                </div>

                <Button
                    variant='contained'
                    color='success'
                    className='result-button'
                    onClick={handleConfirm}
                >
                    Confirm
                </Button>

            </div>
            }

            {success && !measureResponse &&
            <h1 className='sucess'>Operation Sucessful <CheckCircle /> </h1>
            
            }
        </>
        
    )
}
