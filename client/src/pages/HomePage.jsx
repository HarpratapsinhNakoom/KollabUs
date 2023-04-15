import React from 'react'
import {Box} from '@mui/material'
import Navbar from '../components/Navbar'
import MainContent from '../components/HomeContent/MainContent'
import AddSapce from '../components/Modals/AddSapce'
import JoinSpace from '../components/Modals/JoinSpace'

const HomePage = () => {
  
  return (
    <Box height="100vh"
        display={"flex"}
        flexDirection="column"
        overflow={"hidden"}
        >
        {/* This is the whole homepage box */}
        <Navbar />
        <MainContent />
        <AddSapce />
        <JoinSpace />
    </Box>
  )
}

export default HomePage