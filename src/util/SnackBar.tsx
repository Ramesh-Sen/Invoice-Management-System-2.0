"use client";

import React from "react";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setSnackBarData } from "@/redux/reducers/invoiceSlice";
import { Alert, Snackbar, SnackbarCloseReason } from "@mui/material";

export default function SnackBar(): React.ReactElement {
  const snackBarData = useSelector((state: RootState) => state.invoice.snackBarData);

  const dispatch = useDispatch();

  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ): void => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(setSnackBarData({ ...snackBarData, open: false }));
  };

  return (
    <Snackbar
      open={snackBarData?.open}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert
        onClose={handleClose}
        severity={snackBarData?.severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {snackBarData?.message}
      </Alert>
    </Snackbar>
  );
}
