import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import AddFolder from './AddFolderButton';
import { useLocalContext } from '../../../context/context';
import { useFolder } from '../../../hooks/useFolder';
// import bgSvg from '../../../assets/images/headerbg.svg'
// import bgJgep from '../../../assets/images/header2.jpg'
import CreateFolder from '../../Modals/CreateFolder'
import FolderItem from './FolderItem';
import FolderBreadcrumbs from './FolderBreadcrumbs';
import { useLocation, useParams } from 'react-router-dom';

const Worksapce = () => {
    const {folderId} = useParams();
    const {selectedSpace, currentRootFolder} = useLocalContext()
    const {state = {}} = useLocation()
    const {folder, childFolders} = useFolder(folderId? folderId : currentRootFolder,state?  state.folder : null);
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
    <>
        {selectedSpace.code ?
            <Box
            height="100%">
            <Box style={headerBox}>
                <Box style={spaceHeading}>
                    <Typography
                        variant="h2"
                        color={"Tomato"}
                        fontWeight="medium"
                        letterSpacing={"1px"}
                    >
                        {selectedSpace.name}
                    </Typography>
                </Box>
                <Box style={subHeader}>
                    <Box style={spaceDescription}>
                        CODE : {selectedSpace.code}
                    </Box>
                    <Box style={newButton}>
                        <AddFolder/>
                    </Box>
                </Box>
            </Box>
            <Box style={folderSection}>
                <FolderBreadcrumbs currentFolder={folder}/>
                <Grid container spacing={3}>
                {childFolders.length > 0 && 
                        childFolders.map((childFolder, index) => {
                            return (<FolderItem key={index} folder={childFolder}/>)
                        })
                }    
                </Grid>                
            </Box>
            <CreateFolder currentFolder={folder}/>
        </Box>
        :
        <h1>Select a space</h1>
    }
    </>
  )
}

export default Worksapce