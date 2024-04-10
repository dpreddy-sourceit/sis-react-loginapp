import React from "react";
import { IconButton, IconButtonProps } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

interface EditButtonProps {
  onClick: () => void; // Specify onClick as a function that takes no arguments and returns void
}

const EditButton: React.FC<EditButtonProps> = ({ onClick }) => {
  return (
    <IconButton onClick={onClick}>
      <EditIcon />
    </IconButton>
  );
};

export default EditButton;
