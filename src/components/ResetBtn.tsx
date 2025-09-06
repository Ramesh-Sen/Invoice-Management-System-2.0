import React from "react";
import { Button } from "@mui/material";

interface ResetBtnProps {
  disabled: boolean;
  onClick: () => void;
}

const ResetBtn: React.FC<ResetBtnProps> = ({ disabled, onClick }) => {
  return (
    <Button
      variant="outlined"
      disabled={disabled}
      onClick={onClick}
      sx={{
        width: "100%",
        color: "#fff",
        borderColor: "#fff",
        "&:hover": {
          backgroundColor: "#3E5766",
          borderColor: "#fff",
        },
        "&:focus": {
          backgroundColor: "#3E5766",
          border: "2px solid #fff",
        },
        "&:disabled": {
          color: "#AAAAAA",
          borderColor: "#AAAAAA",
        },
      }}
    >
      Clear
    </Button>
  );
};

export default ResetBtn;
