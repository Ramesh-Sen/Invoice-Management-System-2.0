"use client";

import React from "react";
import { Grid2, Modal, Paper, Typography } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import StyledDivider from "@/components/StyledDivider";
import PrimaryBtn from "@/components/PrimaryBtn";
import ResetBtn from "@/components/ResetBtn";
import SecondaryBtn from "@/components/SecondaryBtn";

const modalWidth = {
  small: 400,
  medium: 600,
  large: 776,
  extraLarge: 950,
  doubleExtraLarge: 1100,
};

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  primaryBtnLabel: string;
  secondaryBtnLabel?: string;
  handlePrimaryBtn: () => void;
  handleSecondaryBtn?: () => void;
  children: React.ReactNode;
  size?: "small" | "medium" | "large" | "extraLarge" | "doubleExtraLarge";
}

const BaseModal: React.FC<BaseModalProps> = ({
  isOpen,
  onClose,
  title,
  primaryBtnLabel,
  handlePrimaryBtn,
  handleSecondaryBtn,
  children,
  size = "large",
}) => {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      sx={{
        backdropFilter: "blur(5px)",
      }}
    >
      <Paper
        elevation={3}
        style={{
          width: "100%",
          maxWidth: modalWidth[size],
          backgroundColor: "#2D424E",
          borderRadius: "1rem",
          color: "whitesmoke",
        }}
      >
        <Grid2 container flexDirection={"column"} justifyContent={"center"}>
          <Grid2 container justifyContent={"space-between"} p={2}>
            <Typography
              variant="h6"
              sx={{
                fontSize: "1.5rem",
                color: "#FEFFFE",
              }}
            >
              {title}
            </Typography>

            <CloseRoundedIcon onClick={onClose} sx={{ color: "#C0C6CA" }} />
          </Grid2>

          <StyledDivider />

          <Grid2 container justifyContent={"center"} flexDirection={"column"} spacing={2} p={2}>
            {children}
          </Grid2>

          <StyledDivider />

          <Grid2 container p={2} flexWrap={"nowrap"} spacing={2} flexDirection={"row"}>
            <SecondaryBtn disabled={false} onClick={onClose} />
            {handleSecondaryBtn && <ResetBtn disabled={false} onClick={handleSecondaryBtn} />}
            <PrimaryBtn label={primaryBtnLabel} disabled={false} onClick={handlePrimaryBtn} />
          </Grid2>
        </Grid2>
      </Paper>
    </Modal>
  );
};

export default BaseModal;
