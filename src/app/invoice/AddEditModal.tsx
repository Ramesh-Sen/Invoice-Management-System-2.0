"use client";

import React, { useEffect, useState } from "react";
import type { RootState } from "@/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { Grid2, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { openAddEditModal, setModalValue } from "@/redux/reducers/modalSlice";
import BaseModal from "@/components/BaseModal";
import TextInputField, { inputTheme } from "@/components/TextInputField";

export default function AddEditModal(): React.ReactElement {
  const dispatch = useDispatch();
  const modalValue = useSelector((state: RootState) => state.modalStore.modalValue);
  const addEditModal = useSelector((state: RootState) => state.modalStore.addEditModal);
  const idArr = useSelector((state: RootState) => state.idArrStore.idArr);

  const [addEditFormData, setAddEditFormData] = useState({
    customerName: "",
    customerNo: "",
    invoiceNo: "",
    invoiceAmount: "",
    dueDate: "",
    notes: "",
  });

  useEffect(
    () =>
      setAddEditFormData(
        modalValue === "add"
          ? {
              customerName: "",
              customerNo: "",
              invoiceNo: "",
              invoiceAmount: "",
              dueDate: "",
              notes: "",
            }
          : {
              customerName: document.getElementById(`customerName-${idArr[0]}`)
                ?.innerText as string,
              customerNo: document.getElementById(`customerNo-${idArr[0]}`)?.innerText as string,
              invoiceNo: document.getElementById(`invoiceNo-${idArr[0]}`)?.innerText as string,
              invoiceAmount: document
                .getElementById(`invoiceAmount-${idArr[0]}`)
                ?.innerText.slice(0, -1) as string,
              dueDate: document.getElementById(`dueDate-${idArr[0]}`)?.innerText as string,
              notes: document.getElementById(`notes-${idArr[0]}`)?.innerText as string,
            },
      ),
    [idArr, modalValue],
  );

  const handleClose = (): void => {
    dispatch(openAddEditModal(false));
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setAddEditFormData({ ...addEditFormData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (): void => {
    console.log("add", addEditFormData);

    fetch("/api/invoice", {
      method: modalValue === "add" ? "POST" : "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        modalValue === "add" ? addEditFormData : { ...addEditFormData, _id: idArr[0] as string },
      ),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        handleClose();
        setAddEditFormData({
          customerName: "",
          customerNo: "",
          invoiceNo: "",
          invoiceAmount: "",
          dueDate: "",
          notes: "",
        });
      })
      .catch((err) => {
        console.log(err);
      });
    dispatch(setModalValue("reload"));
  };

  const handleReset = (): void => {
    setAddEditFormData({
      customerName: "",
      customerNo: "",
      invoiceNo: "",
      invoiceAmount: "",
      dueDate: "",
      notes: "",
    });
  };

  return (
    <BaseModal
      isOpen={addEditModal}
      onClose={handleClose}
      title="Add Invoice"
      primaryBtnLabel={modalValue === "add" ? "Add" : "Save"}
      handlePrimaryBtn={handleSubmit}
      handleSecondaryBtn={handleReset}
    >
      <Grid2 container justifyContent={"space-between"}>
        <Grid2 container size={6}>
          <TextInputField
            id="customerName"
            label="Customer Name"
            value={addEditFormData.customerName}
            onChange={handleOnChange}
          />

          <TextInputField
            id="customerNo"
            label="Customer No."
            value={addEditFormData.customerNo}
            onChange={handleOnChange}
          />

          <TextInputField
            id="invoiceNo"
            label="Invoice No."
            value={addEditFormData.invoiceNo}
            onChange={handleOnChange}
          />

          <TextInputField
            id="invoiceAmount"
            label="Invoice Amount"
            value={addEditFormData.invoiceAmount}
            onChange={handleOnChange}
          />
        </Grid2>

        <Grid2 container size={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Due Date"
              value={dayjs(addEditFormData.dueDate || undefined)}
              onChange={(value) => {
                setAddEditFormData({
                  ...addEditFormData,
                  dueDate: dayjs(value).format("DD-MM-YYYY"),
                });
              }}
              disablePast
              format="DD-MM-YYYY"
              slotProps={{
                textField: {
                  size: "medium",
                  fullWidth: true,
                },
                openPickerIcon: {
                  sx: {
                    color: "#B0BEC5",
                  },
                },
              }}
              sx={inputTheme}
            />
          </LocalizationProvider>

          <TextField
            id="notes"
            label="Notes"
            fullWidth
            value={addEditFormData.notes}
            onChange={handleOnChange}
            size="small"
            variant="outlined"
            multiline
            rows={8}
            sx={inputTheme}
          />
        </Grid2>
      </Grid2>
    </BaseModal>
  );
}
