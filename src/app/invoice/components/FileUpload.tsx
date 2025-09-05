"use client";
import { Backdrop, Box, Button, Fade, InputLabel, Modal, TextField } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, { useRef } from "react";
import type { RootState } from "@/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { openUploadModal } from "@/redux/reducers/modalSlice";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

export default function FileUpload(): React.ReactElement {
  const file = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const uploadModal = useSelector((state: RootState) => state.modalStore.uploadModal);
  const handleClose = (): void => {
    dispatch(openUploadModal(false));
  };

  const onChangeHandler = (id: string, value: string): void => {
    console.log(id, value);
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

  const handleReset = (): void => {};

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={uploadModal}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={uploadModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "600px",
            backgroundColor: "#2D424E",
            border: "1px solid #000",
            boxShadow: 24,
            borderRadius: "5px",
            color: "whitesmoke",
            p: 0,
          }}
        >
          <Grid container sx={{ padding: "10px", fontSize: "20px" }}>
            <Grid size={11}>Upload Invoice</Grid>
            <Grid size={1}>
              <CloseRoundedIcon
                onClick={handleClose}
                sx={{
                  // position: "relative",
                  // top: "10px",
                  // left: "350px",
                  color: "#C0C6CA",
                }}
              />
            </Grid>
          </Grid>
          <hr className="border-t-[1px] border-t-black" />

          <Grid
            container
            rowSpacing={{ xs: 1, sm: 2, md: 5 }}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            sx={{ padding: "20px" }}
          >
            <Grid size={4}>
              <InputLabel htmlFor="customer-name" sx={{ color: "#97A1A9" }}>
                Upload File <span className=" text-[#F25A5A]">*</span>
              </InputLabel>
            </Grid>
            <Grid size={8}>
              <TextField
                id="uploadDoc"
                type="file"
                value={file.current?.value}
                onChange={(e) => onChangeHandler(e.target.id, e.target.value)}
                variant="outlined"
                size="small"
                sx={{
                  color: "red",
                  height: "0px",
                  input: {
                    color: "white",
                    border: "1px solid #335E74",
                    borderRadius: "4px",
                  },
                }}
              />
            </Grid>
            {/* <CustomTextField
                            ref={file.current?.value}
                            sx={{
                                color: "red",
                                height: "0px",
                                input: {
                                    color: "white",
                                    border: "1px solid #335E74",
                                    borderRadius: "4px",
                                },
                            }}
                            error={false}
                            id="invoiceUpload"
                            type="file"
                            label="Upload Invoice"
                            helperText="Invalid Invoice File"
                        /> */}
          </Grid>

          <hr className="border-t-[1px] border-t-black" />
          <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ padding: "20px" }}>
            <Grid size={4}>
              <Button
                variant="outlined"
                onClick={handleClose}
                sx={{
                  position: "relative",
                  // bottom: "15px",
                  // left: "30px",
                }}
              >
                Cancel
              </Button>
            </Grid>
            <Grid size={4}>
              <Button
                onClick={handleReset}
                variant="outlined"
                sx={{
                  // position: "relative",
                  // bottom: "15px",
                  // left: "300px",
                  color: "#FEFFFE",
                }}
              >
                Reset
              </Button>
            </Grid>
            <Grid size={4}>
              <Button
                onClick={handleSubmit}
                variant="outlined"
                sx={{
                  // position: "relative",
                  // bottom: "15px",
                  // left: "320px",
                  color: "#FEFFFE",
                  backgroundColor: "#15AFF0",
                }}
              >
                Upload
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Fade>
    </Modal>
  );
}
