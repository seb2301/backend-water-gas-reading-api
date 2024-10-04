'use client'
import { ArrowBack } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function NavBar(){
    const router = useRouter()
    return(
        <nav>
            <IconButton className='nav-icon' onClick={() => router.push('/')}>
                <ArrowBack />
            </IconButton>
        </nav>
    )
}