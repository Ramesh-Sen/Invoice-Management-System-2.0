import { Divider } from "@mui/material";
import React from "react";

const StyledDivider: React.FC = () => {
  return (
    <Divider
      sx={{
        borderTopWidth: "1px",
        borderColor: "white",
      }}
    />
  );
};

export default StyledDivider;
