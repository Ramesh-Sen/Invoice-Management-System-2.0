"use client";

import React, { useState } from "react";
import type { RootState } from "@/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { Input, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { openUploadModal } from "@/redux/reducers/invoiceSlice";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import BaseModal from "@/components/BaseModal";

export default function FileUpload(): React.ReactElement {
  const [file, setFile] = useState({ name: "" });

  const dispatch = useDispatch();
  const uploadModal = useSelector((state: RootState) => state.invoice.uploadModal);
  const handleClose = (): void => {
    dispatch(openUploadModal(false));
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files?.length) {
      setFile(e.target.files[0]);
    }
    // if (onUpload) onUpload(files);
  };

  const handleSubmit = (): void => {
    console.log("upload");

    fetch("/api/invoice/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify("add"),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        handleClose();
        // dispatch(refreshInvoiceDatas())
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleReset = (): void => {
    setFile({ name: "" });
  };

  return (
    <BaseModal
      isOpen={uploadModal}
      onClose={handleClose}
      title="Upload Invoice"
      primaryBtnLabel="Upload"
      handlePrimaryBtn={handleSubmit}
      handleSecondaryBtn={handleReset}
      size="medium"
    >
      <Grid
        container
        alignItems="center"
        spacing={2}
        border={"0.1rem dashed gray"}
        borderRadius={3}
        bgcolor={"#f5f5f5"}
        color={"black"}
        p={2}
        component="label"
        sx={{
          cursor: "pointer",
          "&:hover": {
            bgcolor: "#e0e0e0",
          },
        }}
      >
        <UploadFileIcon />
        <Typography color="textPrimary">{file?.name || "Upload File Here"}</Typography>
        <Input type="file" onChange={handleOnChange} style={{ display: "none" }} />
      </Grid>
    </BaseModal>
  );
}
