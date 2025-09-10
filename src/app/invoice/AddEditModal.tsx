"use client";

import React, { useEffect, useState } from "react";
import type { RootState } from "@/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { Grid2, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import {
  openAddEditModal,
  setCommonError,
  setCommonSuccess,
  setInvoiceDatas,
  setModalValue,
} from "@/redux/reducers/invoiceSlice";
import BaseModal from "@/components/BaseModal";
import TextInputField, { inputTheme } from "@/components/TextInputField";

const CURRENT_DATE = dayjs().format("DD-MM-YYYY");
const defaultAddEditFormData = {
  customerName: "",
  customerNo: "",
  invoiceNo: "",
  invoiceAmount: "",
  dueDate: CURRENT_DATE,
  notes: "",
};

export default function AddEditModal(): React.ReactElement {
  const dispatch = useDispatch();
  const invoiceDatas = useSelector((state: RootState) => state.invoice.invoiceDatas);
  const modalValue = useSelector((state: RootState) => state.invoice.modalValue);
  const addEditModal = useSelector((state: RootState) => state.invoice.addEditModal);
  const idArr = useSelector((state: RootState) => state.invoice.idArr);

  const [addEditFormData, setAddEditFormData] = useState(defaultAddEditFormData);

  useEffect(() => {
    setAddEditFormData(
      invoiceDatas?.find(({ _id }) => _id === idArr?.[0]) || defaultAddEditFormData,
    );
  }, [idArr]);

  const handleClose = (): void => {
    dispatch(openAddEditModal(false));
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setAddEditFormData({ ...addEditFormData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (): void => {
    fetch("/api/invoice", {
      method: modalValue === "add" ? "POST" : "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...addEditFormData,
        dueDate: dayjs(addEditFormData.dueDate, "DD-MM-YYYY").toDate(),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        const INDEX = invoiceDatas?.findIndex(({ _id }) => _id === idArr?.[0]);
        const temp = [...invoiceDatas];
        if (INDEX === -1) {
          temp.push(data?.data);
          dispatch(setCommonSuccess("Invoice Added Successfully"));
        } else {
          temp[INDEX] = data?.data;
          dispatch(setCommonSuccess("Invoice Updated Successfully"));
        }

        dispatch(setInvoiceDatas(temp));
        handleClose();
        setAddEditFormData(defaultAddEditFormData);
      })
      .catch((err) => {
        console.log(err);
        dispatch(setCommonError(err?.message || err?.error || "Something Went Wrong"));
      });
    dispatch(setModalValue("reload"));
  };

  const handleReset = (): void => {
    setAddEditFormData(defaultAddEditFormData);
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
            value={addEditFormData?.customerName}
            onChange={handleOnChange}
          />

          <TextInputField
            id="customerNo"
            label="Customer No."
            value={addEditFormData?.customerNo}
            onChange={handleOnChange}
          />

          <TextInputField
            id="invoiceNo"
            label="Invoice No."
            value={addEditFormData?.invoiceNo}
            onChange={handleOnChange}
          />

          <TextInputField
            id="invoiceAmount"
            label="Invoice Amount"
            value={addEditFormData?.invoiceAmount}
            onChange={handleOnChange}
          />
        </Grid2>

        <Grid2 container size={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Due Date"
              value={dayjs(addEditFormData?.dueDate || undefined, "DD-MM-YYYY")}
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
            value={addEditFormData?.notes}
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
