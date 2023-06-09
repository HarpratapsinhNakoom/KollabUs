import {Box, Button, List, ListItem, ListItemIcon, ListItemText, Menu, MenuItem, Typography } from '@mui/material'
import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import { useLocalContext } from '../../../context/context';
import {useNavigate} from 'react-router-dom'
import { useFolder } from '../../../hooks/useFolder';

const Sidebar = (props) => {
    const navigate = useNavigate();
    const {setCreateSpace,
        setJoinSpace,
        setSelectedSpace,
        setCurrentRootFolder,
        setCurrentVoiceChannels,
        setVoiceChannelsCount} = useLocalContext();
    
    const [anchorEl, setAnchorEl] = React.useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const handleAddOption = (event) => {
        setAnchorEl(event.currentTarget);
    }
    const handleCreateClick = () => {
        setCreateSpace(true);
        setAnchorEl(null);
    };
    
    const handleJoinClick = () => {
        setJoinSpace(true);
        setAnchorEl(null);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        id={menuId}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={isMenuOpen}
        onClose={()=>setAnchorEl(null)}
      >
        <MenuItem onClick={handleCreateClick}>Create Workspace</MenuItem>
        <MenuItem onClick={handleJoinClick}>Join Workspace</MenuItem>
      </Menu>
    );

    const showWorkspaces = props.workspaces.map((space, index) => {
        return (
            <div key={index}>
                {
                    space &&
                    <ListItem 
                    sx={{
                        borderBottom:"1px solid black",
                        "&:hover":{
                            borderRadius:"5px",
                            cursor:"pointer",
                            backgroundColor:"whitesmoke"
                        }
                    }}
                    onClick={() => {
                        setSelectedSpace(space)
                        setCurrentRootFolder(space.rootFolderId)
                        navigate(`/${space.code}`)
                        setCurrentVoiceChannels([]);
                        setVoiceChannelsCount(0);
                    }}
                    >
                        <ListItemIcon sx={{
                            minWidth:"35px"
                        }}>
                            <WorkspacesIcon />
                        </ListItemIcon>
                        <ListItemText
                            primaryTypographyProps={{
                                fontSize:"15px"
                            }}
                            primary={space.name}
                        />
                    </ListItem>
                }
            </div>
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
            },
        }}
        variant="contained"
        startIcon={<AddIcon />}
        aria-label="account of current user"
        aria-controls={menuId}
        aria-haspopup="true"
        onClick={handleAddOption}>
            Add
        </Button>

        <Box
            m={"32px 0"}>
            <Typography variant='h5'>My Workspaces</Typography>
            <List >
              {props.workspaces.length > 0 && showWorkspaces}
            </List>
        </Box>
        {renderMenu}
        
    </Box>
  )
}

export default Sidebar