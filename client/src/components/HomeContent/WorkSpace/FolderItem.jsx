import { Button, Grid } from '@mui/material'
import React from 'react'
import FolderIcon from '@mui/icons-material/Folder';
import {useNavigate} from 'react-router-dom'
import { useLocalContext } from '../../../context/context';

const FolderItem = ({folder}) => {
  const navigate = useNavigate();
  const {selectedSpace} = useLocalContext();
  return (
    <Grid item >
        <Button
          variant="outlined"
          startIcon={<FolderIcon />}
          onClick={() => {
            navigate(`/${selectedSpace.code}/folders/${folder.id}`, {
              state : {
                folder: folder
              }
            })
          }}>
          {folder.name}
        </Button>
    </Grid>
  )
}

export default FolderItem