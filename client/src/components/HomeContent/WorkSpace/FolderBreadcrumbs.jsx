import { Breadcrumbs, Link, Typography } from "@mui/material";
import React from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useLocalContext } from "../../../context/context";
import { useNavigate } from "react-router-dom";

const FolderBreadcrumbs = ({ currentFolder }) => {
  const navigate = useNavigate();
  const { currentRootFolder, selectedSpace } = useLocalContext();
  let path =
    currentFolder && currentFolder.id === currentRootFolder
      ? []
      : [{ name: "Home", id: currentRootFolder }];

  if (currentFolder) {
    path = [...path, ...currentFolder.path];
    // console.log("path is ", currentFolder.path);
  }

  const showBreadcrumbs = path.map((ele, index) => {
    return (
      <Link
        underline="hover"
        fontSize="24px"
        key={index}
        color="inherit"
        onClick={() => {
          if (ele.id === currentRootFolder) {
            navigate(`/${selectedSpace.code}`, {
              state: {
                folder: {
                  ...ele,
                  path: path.slice(1, index),
                },
              },
            });
          } else {
            navigate(`/${selectedSpace.code}/folders/${ele.id}`, {
              state: {
                folder: {
                  ...ele,
                  path: path.slice(1, index),
                },
              },
            });
          }
        }}
      >
        {ele.name}
      </Link>
    );
  });
  return (
    <Breadcrumbs
      separator={<ArrowForwardIosIcon />}
      aria-label="breadcrumb"
      sx={{
        mt: "25px",
        mb: "20px",
      }}
    >
      {showBreadcrumbs}
      <Typography key="3" color="text.primary" fontSize="24px">
        {currentFolder && currentFolder.name}
      </Typography>
    </Breadcrumbs>
  );
};

export default FolderBreadcrumbs;
