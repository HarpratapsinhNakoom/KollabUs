import React from 'react'
import { useAddContext } from '../../context/context'
import { Box, Button, Modal, TextField, Typography } from '@mui/material';

const JoinSpace = () => {
    const {joinSpace, setJoinSpace} = useAddContext();
    const [roomCode, setRoomCode] = React.useState("");
    const handleClose = () => setJoinSpace(false);

    const handleRoomCode = (e) => setRoomCode(e.target.value);

    const handleJoin= () => {
        setRoomCode("");
        setJoinSpace(false);
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
        onClick={handleJoin}>Join Workspace</Button>
        </Box>
    </Modal>
  )
}

export default JoinSpace