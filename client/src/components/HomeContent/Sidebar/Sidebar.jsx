import {Box, Button, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material'
import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import WorkspacesIcon from '@mui/icons-material/Workspaces';


const Sidebar = () => {
    const workspaces = ["Google Developers", "React Mastery", "Make computers Learn",
    "Diving into Production"]
    const showWorkspaces = workspaces.map((space, index) => {
        return (
            <ListItem key={index}
            sx={{
                borderBottom:"1px solid black",
                "&:hover":{
                    borderRadius:"5px",
                    cursor:"pointer",
                    backgroundColor:"whitesmoke"
                }
            }}>
                <ListItemIcon sx={{
                    minWidth:"35px"
                }}>
                    <WorkspacesIcon />
                </ListItemIcon>
                <ListItemText
                    primaryTypographyProps={{
                        fontSize:"15px"
                    }}
                    primary={space}
                />
            </ListItem>
        );
    })

  return (
    <Box
        height="100%"
        p={"15px 20px"}
        >
        
        <Button sx={{
            backgroundColor:"#41b27a",
            "&:hover" :{
                opacity:"0.8",
                backgroundColor: "#41b27a"
            }
        }}
        variant="contained" startIcon={<AddIcon />}>
            New Workspace
        </Button>

        <Box
            m={"32px 0"}>
            <Typography variant='h5'>My Workspaces</Typography>
            <List >
              {showWorkspaces}
            </List>
        </Box>
    </Box>
  )
}

export default Sidebar