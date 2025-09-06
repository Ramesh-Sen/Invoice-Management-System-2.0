import React from "react";
import { Button } from "@mui/material";

interface SecondaryBtnProps {
  label?: string;
  disabled?: boolean;
  onClick: () => void;
}

const SecondaryBtn: React.FC<SecondaryBtnProps> = ({
  label = "Cancel",
  disabled = false,
  onClick,
}) => {
  return (
    <Button
      variant="outlined"
      disabled={disabled}
      onClick={onClick}
      sx={{
        width: "100%",
        backgroundColor: "#2196F3",
        color: "#fff",
        "&:hover": {
          backgroundColor: "#1976D2",
        },
        "&:focus": {
          border: "2px solid #fff",
        },
        "&:disabled": {
          backgroundColor: "#90CAF9",
          color: "#E0E0E0",
        },
      }}
    >
      {label}
    </Button>
  );
};

export default SecondaryBtn;
