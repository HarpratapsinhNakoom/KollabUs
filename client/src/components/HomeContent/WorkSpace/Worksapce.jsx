import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import AddIcon from '@mui/icons-material/Add';
// import bgSvg from '../../../assets/images/headerbg.svg'
// import bgJgep from '../../../assets/images/header2.jpg'

const Worksapce = () => {
    const headerBox = {
        margin:"20px 10px",
        minHeight:"300px",
        display:"flex",
        flexDirection:"column",
        justifyContent:"flex-end",
        gap:"2px",
        // backgroundImage:`url(${bgSvg})`,
        backgroundImage: 'url(https://img.freepik.com/free-vector/windows-concept-illustration_114360-5396.jpg?w=996&t=st=1680175727~exp=1680176327~hmac=4a37bece834abe7a3d3798638d4c3a098ae6febf2472a9011a346e41bbbc81c7)',
        backgroundSize:"contain",
        backgroundRepeat:"no-repeat",
        backgroundPosition:"right"
    };
    
    const spaceHeading = {
        // border:"1px solid black"
    };

    const subHeader = {
        display:"flex",
        alignItems:"center",
        justifyContent:"space-between"
    }
    const spaceDescription = {
        // border:"1px solid black",
        margin:"20px 10px",
    };
    const newButton = {
        // border:"1px solid black"
    };
    const folderSection = {
        margin:"20px 10px 40px 10px"
    };
  return (
    <Box
        height="100%">
        <Box style={headerBox}>
            <Box style={spaceHeading}>
                <Typography
                    variant="h2"
                    color={"Tomato"}
                    fontWeight="medium"
                    letterSpacing={"1px"}
                >Google Developers</Typography>
            </Box>
            <Box style={subHeader}>
                <Box style={spaceDescription}>
                    CODE : 120120
                </Box>
                <Box style={newButton}>
                    <Button sx={{
                    backgroundColor:"#41b27a",
                    "&:hover" :{
                        opacity:"0.8",
                        backgroundColor: "#41b27a"
                    }
                }}
                variant="contained" startIcon={<AddIcon />}>
                    New Folder
                </Button>
                </Box>
            </Box>
        </Box>
        <Box style={folderSection}>
            <Typography variant='h1' color="#2c4432">Folders</Typography>
            <Typography variant='h1' color="#2c4432">Folders</Typography>
            <Typography variant='h1' color="#2c4432">Folders</Typography>
            <Typography variant='h1' color="#2c4432">Folders</Typography>
            <Typography variant='h1' color="#2c4432">Folders</Typography>
            <Typography variant='h1' color="#2c4432">Folders</Typography>
            <Typography variant='h1' color="#2c4432">Folders</Typography>
            <Typography variant='h1' color="#2c4432">Folders</Typography>
            <Typography variant='h1' color="#2c4432">Folders</Typography>
            <Typography variant='h1' color="#2c4432">Folders</Typography>
            <Typography variant='h1' color="#2c4432">Folders</Typography>
        </Box>
    </Box>
  )
}

export default Worksapce