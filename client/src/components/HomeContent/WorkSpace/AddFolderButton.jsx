import { Button } from '@mui/material'
import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import { useLocalContext } from '../../../context/context';
const AddFolder = () => {
  const { setCreateFolder } = useLocalContext();
  return (
    <Button sx={{
        backgroundColor:"#41b27a",
        "&:hover" :{
            opacity:"0.8",
            backgroundColor: "#41b27a"
        }
    }}
    variant="contained" startIcon={<AddIcon />}
    onClick={() => setCreateFolder(true)}>
        New Folder
    </Button>
  )
}

export default AddFolder