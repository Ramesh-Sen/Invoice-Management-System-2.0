"use client";

import { Backdrop, Box, Button, Fade, Modal } from "@mui/material";
import React from "react";
import type { RootState } from "../../../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { openDeleteModal } from "../../../redux/reducers/modalSlice";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

export default function DeleteModal() {
  const dispatch = useDispatch();
  const deleteModal = useSelector(
    (state: RootState) => state.modalStore.deleteModal,
  );
  const idArr = useSelector((state: RootState) => state.idArrStore.idArr);

  const handleClose = () => dispatch(openDeleteModal(false));

  const handleSubmit = () => {
    console.log("Delete File");
    console.log(idArr);
    // for (let i = 0; i < idArr.length; i++) {
    // console.log(idArr[i]);
    fetch("/api/invoice", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: idArr }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        handleClose();
      })
      .catch((err) => {
        console.log(err);
      });
    // }
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={deleteModal}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={deleteModal}>
          <Box
            sx={{
              position: "absolute" as "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "500px",
              backgroundColor: "#2D424E",
              border: "1px solid #000",
              boxShadow: 24,
              borderRadius: "5px",
              color: "whitesmoke",
              p: 0,
            }}
          >
            <span className=" m-5 text-2xl text-[#FEFFFE] relative top-4">
              Delete Invoice(s)?
            </span>
            <CloseRoundedIcon
              onClick={handleClose}
              sx={{
                position: "relative",
                top: "10px",
                left: "210px",
                color: "#C0C6CA",
              }}
            />
            <hr className="border-t-[1px] border-t-black mt-8" />

            <div className="m-5">
              You&apos;ll lose your record(s) after this action. We can&apos;t
              recover them once you delete.
              <br />
              <br />
              Are you sure you want to{" "}
              <span className=" text-[#FE5E5F]">permanently delete</span> them?
            </div>
            <hr className="border-t-[1px] border-t-black  mb-8" />
            <Button
              onClick={handleClose}
              variant="outlined"
              sx={{
                position: "relative",
                bottom: "15px",
                left: "280px",
                color: "#FEFFFE",
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              variant="outlined"
              sx={{
                position: "relative",
                bottom: "15px",
                left: "300px",
                color: "#FEFFFE",
                backgroundColor: "#15AFF0",
              }}
            >
              Delete
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
