import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

export default function FileItem({ file }) {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/document/${file.id}`);
  };
  return (
    <Link
      rel="noreferrer"
      target="_blank"
      to={`/document/${file.id}`}
      className="btn btn-outline-dark text-truncate w-100"
    >
      <FontAwesomeIcon icon={faFile} className="mr-2" />
      <span style={{ marginLeft: "8px" }}>{file.name}</span>
    </Link>
  );
}
