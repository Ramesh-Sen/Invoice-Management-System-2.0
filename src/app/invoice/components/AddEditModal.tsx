"use client";

import {
  Backdrop,
  Box,
  Button,
  Fade,
  InputLabel,
  Modal,
  TextField,
} from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import type { RootState } from "../../../redux/store";
import { useSelector, useDispatch } from "react-redux";
import {
  openAddEditModal,
  setModalValue,
} from "../../../redux/reducers/modalSlice";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

export default function AddEditModal() {
  const dispatch = useDispatch();
  const modalValue = useSelector(
    (state: RootState) => state.modalStore.modalValue,
  );
  const addEditModal = useSelector(
    (state: RootState) => state.modalStore.addEditModal,
  );
  const idArr = useSelector((state: RootState) => state.idArrStore.idArr);

  // const addEditFormData = {
  //       customerName: useRef<HTMLInputElement>(null),
  //       customerNo: useRef<HTMLInputElement>(null),
  //       invoiceNo: useRef<HTMLInputElement>(null),
  //       invoiceAmount: useRef<HTMLInputElement>(null),
  //       dueDate: useRef<HTMLInputElement>(null),
  //       notes: useRef<HTMLInputElement>(null),
  //     }

  const [addEditFormData, setAddEditFormData] = useState(
    // modalValue === "add"?
    {
      customerName: "",
      customerNo: "",
      invoiceNo: "",
      invoiceAmount: "",
      dueDate: "",
      notes: "",
    },
    // : {
    //     customerName: document.getElementById(`customerName-${idArr[0]}`)
    //       ?.innerText,
    //     customerNo: document.getElementById(`customerNo-${idArr[0]}`)
    //       ?.innerText,
    //     invoiceNo: document.getElementById(`invoiceNo-${idArr[0]}`)
    //       ?.innerText,
    //     invoiceAmount: document.getElementById(`invoiceAmount-${idArr[0]}`)
    //       ?.innerText,
    //     dueDate: document.getElementById(`dueDate-${idArr[0]}`)?.innerText,
    //     notes: document.getElementById(`notes-${idArr[0]}`)?.innerText,
    //   }
  );

  // useEffect(() =>
  //   console.log(document.getElementById(`customerName${idArr[0]}`))
  // );

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
              customerNo: document.getElementById(`customerNo-${idArr[0]}`)
                ?.innerText as string,
              invoiceNo: document.getElementById(`invoiceNo-${idArr[0]}`)
                ?.innerText as string,
              invoiceAmount: document
                .getElementById(`invoiceAmount-${idArr[0]}`)
                ?.innerText.slice(0, -1) as string,
              dueDate: document.getElementById(`dueDate-${idArr[0]}`)
                ?.innerText as string,
              notes: document.getElementById(`notes-${idArr[0]}`)
                ?.innerText as string,
            },
      ),
    [idArr, modalValue],
  );

  const handleClose = () => dispatch(openAddEditModal(false));

  const onChangeHandler = (id: string, value: string) => {
    if (id === "customerName") {
      let customerName = value;
      setAddEditFormData({ ...addEditFormData, customerName });
    } else if (id === "customerNo") {
      let customerNo = value;
      setAddEditFormData({ ...addEditFormData, customerNo });
    } else if (id === "invoiceNo") {
      let invoiceNo = value;
      setAddEditFormData({ ...addEditFormData, invoiceNo });
    } else if (id === "invoiceAmount") {
      let invoiceAmount = value;
      setAddEditFormData({ ...addEditFormData, invoiceAmount });
    } else if (id === "") {
      let dueDate = dayjs(value).format("YYYY-MM-DD");
      setAddEditFormData({ ...addEditFormData, dueDate });
    } else if (id === "notes") {
      let notes = value;
      setAddEditFormData({ ...addEditFormData, notes });
    }
  };

  const handleSubmit = (): void => {
    console.log("add", addEditFormData);

    fetch("/api/invoice", {
      method: modalValue === "add" ? "POST" : "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        modalValue === "add"
          ? addEditFormData
          : { ...addEditFormData, _id: idArr[0] as string },
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
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={addEditModal}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={addEditModal}>
        <Box
          sx={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "870px",
            backgroundColor: "#2D424E",
            border: "1px solid #000",
            boxShadow: 24,
            borderRadius: "5px",
            color: "whitesmoke",
            p: 0,
          }}
        >
          <span className=" m-5 text-2xl text-[#FEFFFE] relative top-4">
            {modalValue === "add" ? "Add Invoice" : "Edit Invoice"}
          </span>
          <CloseRoundedIcon
            onClick={handleClose}
            sx={{
              position: "relative",
              top: "10px",
              left: "650px",
              color: "#C0C6CA",
            }}
          />
          <hr className="border-t-[1px] border-t-black mt-8" />

          <div className="grid grid-cols-[auto auto auto auto] gap-10 m-8">
            <InputLabel htmlFor="customer-name" sx={{ color: "#97A1A9" }}>
              Customer Name <span className=" text-[#F25A5A]">*</span>
            </InputLabel>
            <TextField
              id="customerName"
              value={addEditFormData.customerName}
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

            <InputLabel htmlFor="customer-name" sx={{ color: "#97A1A9" }}>
              Due Date <span className=" text-[#F25A5A]">*</span>
            </InputLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={dayjs(addEditFormData.dueDate)}
                onChange={(value) => {
                  onChangeHandler("", value as unknown as string);
                }}
                disablePast
                format="YYYY-MM-DD"
                slotProps={{ textField: { size: "small" } }}
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
            </LocalizationProvider>

            <InputLabel htmlFor="customer-name" sx={{ color: "#97A1A9" }}>
              Customer No. <span className=" text-[#F25A5A]">*</span>
            </InputLabel>
            <TextField
              id="customerNo"
              value={addEditFormData.customerNo}
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

            <InputLabel
              htmlFor="customer-name"
              className="itemNotes col-start-3 row-span-3"
              sx={{ color: "#97A1A9" }}
            >
              Notes <span className=" text-[#F25A5A]">*</span>
            </InputLabel>
            <TextField
              id="notes"
              value={addEditFormData.notes}
              onChange={(e) => onChangeHandler(e.target.id, e.target.value)}
              size="small"
              multiline
              rows={6}
              variant="outlined"
              className="itemNotesField col-start-4 row-span-3"
              sx={{
                color: "red",
                height: "0px",
                rightButton: {
                  svgIcon: {
                    color: "white",
                  },
                },
                input: {
                  color: "white",
                  border: "1px solid #335E74",
                  borderRadius: "4px",
                },
              }}
            />

            <InputLabel htmlFor="customer-name" sx={{ color: "#97A1A9" }}>
              Invoice No. <span className=" text-[#F25A5A]">*</span>
            </InputLabel>
            <TextField
              id="invoiceNo"
              // disabled={modalValue === "add" ? false : true}
              value={addEditFormData.invoiceNo}
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

            <InputLabel htmlFor="customer-name" sx={{ color: "#97A1A9" }}>
              Invoice Amount <span className=" text-[#F25A5A]">*</span>
            </InputLabel>
            <TextField
              id="invoiceAmount"
              value={addEditFormData.invoiceAmount}
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
          </div>
          <hr className="border-t-[1px] border-t-black  mb-8" />
          <Button
            variant="outlined"
            onClick={handleClose}
            sx={{
              position: "relative",
              bottom: "15px",
              left: "30px",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleReset}
            variant="outlined"
            sx={{
              position: "relative",
              bottom: "15px",
              left: "580px",
              color: "#FEFFFE",
            }}
          >
            {modalValue === "add" ? "Clear" : "Reset"}
          </Button>
          <Button
            onClick={handleSubmit}
            variant="outlined"
            sx={{
              position: "relative",
              bottom: "15px",
              left: "600px",
              color: "#FEFFFE",
              backgroundColor: "#15AFF0",
            }}
          >
            {modalValue === "add" ? "Add" : "Save"}
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
}
