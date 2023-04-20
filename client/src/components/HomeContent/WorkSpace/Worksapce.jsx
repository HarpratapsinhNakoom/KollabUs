import {
  Box,
  Button,
  Grid,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Typography,
} from "@mui/material";
import React from "react";
import { useLocalContext } from "../../../context/context";
import { useFolder } from "../../../hooks/useFolder";
// import bgSvg from '../../../assets/images/headerbg.svg'
// import bgJgep from '../../../assets/images/header2.jpg'
import CreateFolder from "../../Modals/CreateFolder";
import FolderItem from "./FolderItem";
import FileItem from "./FileItem";
import FolderBreadcrumbs from "./FolderBreadcrumbs";
import { useLocation, useParams } from "react-router-dom";
import KeyboardVoiceOutlinedIcon from "@mui/icons-material/KeyboardVoiceOutlined";
import Sidebar from "../../Sidebar/Sidebar";
import sidebarStyles from "../../Sidebar/Sidebar.module.css";
import { useAuth } from "../../../context/AuthContext";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import CreateFile from "../../Modals/CreateFile";

const Worksapce = () => {
  const { folderId } = useParams();
  const { selectedSpace, currentRootFolder, setCreateFolder, setCreateFile } =
    useLocalContext();
  const { currentUser } = useAuth();
  const { state = {} } = useLocation();
  const { folder, childFolders, childFiles } = useFolder(
    folderId ? folderId : currentRootFolder,
    state ? state.folder : null
  );

  function showSidebar() {
    const element = document.getElementById("mySidebar");
    element.classList.remove(sidebarStyles.hideSidebar);
    const mask = document.getElementById("myMask");
    // console.log(mask);
    mask.classList.add(sidebarStyles.modalMask);
  }

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const headerBox = {
    margin: "20px 10px",
    minHeight: "300px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    gap: "2px",
    // backgroundImage:`url(${bgSvg})`,
    backgroundImage:
      "url(https://img.freepik.com/free-vector/windows-concept-illustration_114360-5396.jpg?w=996&t=st=1680175727~exp=1680176327~hmac=4a37bece834abe7a3d3798638d4c3a098ae6febf2472a9011a346e41bbbc81c7)",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right",
  };

  const spaceHeading = {
    // border:"1px solid black"
  };

  const subHeader = {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
  };
  const spaceDescription = {
    // border:"1px solid black",
    margin: "20px 10px",
  };
  const folderSection = {
    margin: "20px 10px 40px 10px",
  };
  return (
    <>
      {selectedSpace.code ? (
        <Box height="100%">
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
              <Box style={spaceDescription}>CODE : {selectedSpace.code}</Box>
              <Button variant="outlined" onClick={showSidebar}>
                <KeyboardVoiceOutlinedIcon /> Join Voice Channel
              </Button>
            </Box>
          </Box>
          <Box style={folderSection}>
            <Box m={"15px 0"}>
              <FolderBreadcrumbs currentFolder={folder} />
            </Box>
            <Grid container spacing={3} direction="column">
              <Grid item container spacing={3}>
                {childFolders.length > 0 &&
                  childFolders.map((childFolder, index) => {
                    return <FolderItem key={index} folder={childFolder} />;
                  })}
              </Grid>

              {childFolders.length > 0 && childFiles.length > 0 && <hr />}

              {childFiles.length > 0 && (
                <div className="d-flex flex-wrap m-2">
                  {childFiles.map((Childfile) => (
                    <div
                      key={Childfile.id}
                      style={{ maxWidth: "250px" }}
                      className="p-2"
                    >
                      <FileItem file={Childfile} />
                    </div>
                  ))}
                </div>
              )}
            </Grid>
            <SpeedDial
              ariaLabel="SpeedDial controlled open example"
              sx={{ position: "absolute", bottom: 30, right: 30 }}
              icon={<SpeedDialIcon />}
              onClose={handleClose}
              onOpen={handleOpen}
              open={open}
            >
              <SpeedDialAction
                icon={<CreateNewFolderIcon />}
                tooltipTitle={"Add Folder"}
                onClick={() => setCreateFolder(true)}
              />
              <SpeedDialAction
                icon={<InsertDriveFileIcon />}
                tooltipTitle={"Add File"}
                onClick={() => setCreateFile(true)}
              />
            </SpeedDial>
          </Box>
          <CreateFolder currentFolder={folder} />
          <Sidebar user={currentUser} />
          <CreateFile currentFolder={folder} />
        </Box>
      ) : (
        <>
          <h1>Select a space</h1>
        </>
      )}
    </>
  );
};

export default Worksapce;
