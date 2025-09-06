import React from "react";
import { Button } from "@mui/material";

interface PrimaryBtnProps {
  label: string;
  disabled: boolean;
  onClick: () => void;
}

const PrimaryBtn: React.FC<PrimaryBtnProps> = ({ label, disabled, onClick }) => {
  return (
    <Button
      variant="outlined"
      disabled={disabled}
      onClick={onClick}
      sx={{
        width: "100%",
        backgroundColor: "#4CAF50",
        color: "#fff",
        "&:hover": {
          backgroundColor: "#45A049",
        },
        "&:focus": {
          border: "2px solid #fff",
        },
        "&:disabled": {
          backgroundColor: "#A5D6A7",
          color: "#000000ff",
        },
      }}
    >
      {label}
    </Button>
  );
};

export default PrimaryBtn;
