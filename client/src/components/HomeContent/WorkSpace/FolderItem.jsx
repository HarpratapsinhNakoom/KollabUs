import { Button, Grid } from '@mui/material'
import React from 'react'
import FolderIcon from '@mui/icons-material/Folder';

const FolderItem = ({folder}) => {
  return (
    <Grid item >
        <Button variant="outlined" startIcon={<FolderIcon />}>
          {folder.name}
      </Button>
    </Grid>
  )
}

export default FolderItem