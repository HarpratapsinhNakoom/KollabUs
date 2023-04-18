import React from 'react'
import { useLocalContext } from '../../context/context'
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';
import { firebase_db } from '../../firebase';
import { useAuth } from '../../context/AuthContext';

const JoinSpace = () => {
    const {joinSpace, setJoinSpace, setWorkSpaceCount} = useLocalContext();
    const [roomCode, setRoomCode] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [message, setMessage] = React.useState("");
    
    const {currentUser} = useAuth();
    const handleClose = () => {
        setJoinSpace(false);
        setMessage("");
        setRoomCode("");
    }
    const handleRoomCode = (e) => setRoomCode(e.target.value);

    const handleJoin= async () => {
        setLoading(true);
        setMessage("");
        try {

            const spaceRef = doc(firebase_db, "workspaces", roomCode);
            const spaceSnap = await getDoc(spaceRef);
            if(spaceSnap.exists()) {
                const userRef = doc(firebase_db, "users", currentUser.uid);
                const userSnap = await getDoc(userRef);
                if(userSnap.data().workspaces.includes(roomCode)) {
                    setMessage("Looks like you are already present in the room");
                    setLoading(false);
                    return;
                } else {
                    await updateDoc(userRef, {
                        workspaces: arrayUnion(roomCode)
                    });

                    await updateDoc(spaceRef, {
                        users: arrayUnion(currentUser.uid)
                    });
                    setWorkSpaceCount(prev => prev + 1);
                }
            }else {
                setMessage("Looks like the code you entered does'nt belongs to any WorkSpace");
                setLoading(false);
                return;
            }
        } catch(err) {
            console.log("Looks like we encountered some message in creating you WorkSpace");
            console.log(err);
        }

        setRoomCode("");
        setJoinSpace(false);
        setLoading(false);
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "50%",
        bgcolor: 'background.paper',
        borderRadius:"10px",
        boxShadow: 24,
        p: 4,
        '& .MuiTextField-root': { m: 1, width: '25ch' },

    };
  return (
    <Modal
        open={joinSpace}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box
        component="form"
        sx={style}
        noValidate
        autoComplete="off">
            <Typography
            color={"#2c4432"}
            letterSpacing={"0.8px"}
            variant='h4'
            m={"0 0 10px 0"}>
                Join Workspace
            </Typography>

            <Typography
            m={"5px 0 15px 0"}>
                Ask the admin for room code, then enter it here.
            </Typography>
        <div>
            <TextField
            required
            id="standard-required"
            label="Room Code"
            variant="standard"
            value={roomCode}
            onChange={handleRoomCode}
            />
        </div>

        <Button
        sx={{
            m:"15px 0 5px 0",
            color:"#41b27a",
            borderColor:"#41b27a",
            '&:hover':{
                borderColor:"#41b27a",
                backgroundColor:"#41b27a",
                color:"#eaebe8"
            }
        }}
        variant="outlined"
        onClick={handleJoin}
        disabled={loading}>Join Workspace</Button>

        {message && <Typography variant='h2'>{message}</Typography>}
        </Box>
    </Modal>
  )
}

export default JoinSpace