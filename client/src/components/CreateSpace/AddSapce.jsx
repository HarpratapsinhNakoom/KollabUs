import React from 'react'
import { useAddContext } from '../../context/context'
import { Box, Button, Modal, TextField, Typography } from '@mui/material';

const AddSapce = () => {
    const {createSpace, setCreateSpace} = useAddContext();
    const handleClose = () => setCreateSpace(false);

    const [roomName, setRoomName] = React.useState("");
    const [roomCode, setRoomCode] = React.useState("");

    const handleRandomCode = () => {
        setRoomCode("--This is a random code--");
    }

    const handleRoomName = (e) => setRoomName(e.target.value);
    const handleRoomCode = (e) => setRoomCode(e.target.value);

    const handleCreate = () => {
        setRoomCode("");
        setRoomName("");
        setCreateSpace(false);
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
        open={createSpace}
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
        m={"0 0 30px 0"}>
            Create your personal workspace
        </Typography>
      <div>
        <TextField
          required
          id="standard-required"
          label="Room Name"
          variant="standard"
          value={roomName}
          onChange={handleRoomName}
        />
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
        m:"10px 0",
        }}
      variant="text"
      onClick={handleRandomCode}>Generate Code</Button><br />


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
      onClick={handleCreate}>Create Workspace</Button>
    </Box>
    </Modal>
  )
}

export default AddSapce