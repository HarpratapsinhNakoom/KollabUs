import {Box, Button, List, ListItem, ListItemIcon, ListItemText, Menu, MenuItem, Typography } from '@mui/material'
import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import { useLocalContext } from '../../../context/context';
import { doc, getDoc } from 'firebase/firestore';
import { firebase_db } from '../../../firebase';
import { useAuth } from '../../../context/AuthContext';


const Sidebar = () => {
    
    const [workspaces, setWorkspaces] = React.useState([]);
    const {currentUser} = useAuth();
    React.useEffect(() => {
        
        async function getData() {
            try{
                const userRef = doc(firebase_db, "users", currentUser.uid);
                const userSnap = await getDoc(userRef);
                
                const workspaceids = userSnap.data().workspaces;
                const t = [];
                for (let index = 0; index < workspaceids.length; index++) {
                    const ele = (await getDoc(doc(firebase_db, "workspaces", workspaceids[index]))).data().name;
                    t.push(ele);
                }

                setWorkspaces(t);
                // setWorkspaces(
                //     workspaceids.map( (spaceId) => {
                //         const spaceRef = doc(firebase_db, "workspaces", spaceId);
                //         const spaceSnap = getDoc(spaceRef);

                //         return spaceSnap.data().name;
                //     })
                // )
                // setWorkspaces()
            } catch(err) {
                console.log(err);
            }
        }

        getData();
    }, []);
    const {setCreateSpace,
        setJoinSpace} = useLocalContext();

    
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
              {showWorkspaces}
            </List>
        </Box>
        {renderMenu}
        
    </Box>
  )
}

export default Sidebar