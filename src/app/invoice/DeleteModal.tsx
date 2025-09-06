"use client";

import React from "react";
import type { RootState } from "@/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { Typography } from "@mui/material";
import { openDeleteModal } from "@/redux/reducers/invoiceSlice";
import BaseModal from "@/components/BaseModal";

export default function DeleteModal(): React.ReactElement {
  const dispatch = useDispatch();
  const deleteModal = useSelector((state: RootState) => state.invoice.deleteModal);
  const idArr = useSelector((state: RootState) => state.invoice.idArr);

  const handleClose = (): void => {
    dispatch(openDeleteModal(false));
  };

  const handleSubmit = (): void => {
    console.log("Delete File");
    console.log(idArr);
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
  };

  return (
    <BaseModal
      isOpen={deleteModal}
      onClose={handleClose}
      title="Delete Invoice(s)?"
      primaryBtnLabel="Delete"
      handlePrimaryBtn={handleSubmit}
      size="small"
    >
      <Typography>
        You&apos;ll lose your record(s) after this action. We can&apos;t recover them once you
        delete.
      </Typography>
      <Typography>
        Are you sure you want to{" "}
        <Typography component="span" color="error" fontWeight="bold">
          Permanently Delete
        </Typography>{" "}
        them?
      </Typography>
    </BaseModal>
  );
}
