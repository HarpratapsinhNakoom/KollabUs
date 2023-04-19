import React from 'react'
import { useLocalContext } from '../../context/context'
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { addDoc, arrayUnion, collection, doc, setDoc, updateDoc } from "firebase/firestore"; 
import { firebase_db, getCurrentTimeStamp } from '../../firebase';
// import { v4 as uuidv4} from 'uuid'
import { useAuth } from '../../context/AuthContext';

const AddSapce = ({currentFolder}) => {
    // console.log(currentFolder);
    const {currentUser} = useAuth();
    const {createFolder, setCreateFolder, currentRootFolder} = useLocalContext();
    const handleClose = () => setCreateFolder(false);

    const [loading, setLoading] = React.useState(false);
    const [folderName, setFolderName] = React.useState("");

    const handleFolderName = (e) => setFolderName(e.target.value);

    const handleCreate = async () => {
      if(currentFolder == null) {
        setFolderName("");
        setCreateFolder(false);
        return;
      }
      setLoading(true);

      const current_Folder_Path = [...currentFolder.path]
      if(currentFolder.id !== currentRootFolder) {
        current_Folder_Path.push({
          name: currentFolder.name,
          id: currentFolder.id
        })
      }
      try {
        // console.log(currentUser.uid);
        await addDoc(collection(firebase_db, "folders"), {
          name: folderName,  //name for folder stored in db
          parentId: currentFolder.id,     // id of its parent folder
          userId: currentUser.uid,   //who created this folder
          path: current_Folder_Path,    //path of folders till this folder
          createdAt:getCurrentTimeStamp, //time when it was created
          childFiles:[],
        });

        // const userRef = doc(firebase_db, "users", currentUser.uid);

        // await updateDoc(userRef, {
        //     workspaces: arrayUnion(roomCode)
        // });

        setFolderName("");
        setLoading(false);
        setCreateFolder(false);
      } catch(err) {
        setLoading(false);
        console.log(err);
      }
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
        open={createFolder}
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
            Create a new Folder
        </Typography>
      <div>
        <TextField
          required
          id="standard-required"
          label="Folder Name"
          variant="standard"
          value={folderName}
          onChange={handleFolderName}
        />
      </div>

      <br />


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
      disabled={loading}
      onClick={handleCreate}>Create Folder</Button>
    </Box>
    </Modal>
  )
}

export default AddSapce