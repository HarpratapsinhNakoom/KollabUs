import { Grid } from '@mui/material'
import React from 'react'
import Sidebar from './Sidebar/Sidebar'
import Worksapce from './WorkSpace/Worksapce'

const MainContent = () => {
  return (
    <Grid container
          gap={"20px"}
          m={"20px"}
          height="100%">
          <Grid item md={2.5}><Sidebar /></Grid>
          <Grid item md={8.5}><Worksapce /></Grid>
    </Grid>
  )
}

export default MainContent