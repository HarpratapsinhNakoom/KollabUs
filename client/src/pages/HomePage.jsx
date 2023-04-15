import React from 'react'
import {Box} from '@mui/material'
import Navbar from '../components/Navbar'
import MainContent from '../components/HomeContent/MainContent'
import AddSapce from '../components/Modals/AddSapce'
import JoinSpace from '../components/Modals/JoinSpace'
import CreateFolder from '../components/Modals/CreateFolder'
import { useFolder } from '../hooks/useFolder'

const HomePage = () => {
  const {folder} = useFolder("v8xDP72wj89ReDQKufSY");
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
        <CreateFolder currentFolder={folder}/>
    </Box>
  )
}

export default HomePage