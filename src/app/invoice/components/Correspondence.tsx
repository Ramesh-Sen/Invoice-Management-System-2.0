"use client";

import {
  Backdrop,
  Box,
  Button,
  Fade,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { RootState } from "@/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { openCorrespondenceModal } from "@/redux/reducers/modalSlice";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { InvoiceData } from "@/util/types";

export default function Correspondence(): React.ReactElement {
  const dispatch = useDispatch();
  const modalValue = useSelector((state: RootState) => state.modalStore.modalValue);
  const correspondenceModal = useSelector(
    (state: RootState) => state.modalStore.correspondenceModal,
  );
  const idArr = useSelector((state: RootState) => state.idArrStore.idArr);

  const invoiceDatas = useSelector(
    (state: RootState) => state.invoiceDataStore.invoiceDatas as InvoiceData[],
  );

  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceData>({
    _id: "",
    customerName: "",
    customerNo: "",
    invoiceNo: "",
    invoiceAmount: "",
    dueDate: "",
    notes: "",
    invoiceDate: "",
  });

  useEffect(() => {
    const selectedData = invoiceDatas?.find((invoice) => invoice._id === idArr[0]);
    if (selectedData) {
      setSelectedInvoice(selectedData);
    }
  }, [idArr, invoiceDatas, modalValue]);

  const handleClose = (): void => {
    dispatch(openCorrespondenceModal(false));
  };

  // const handleSubmit = (): void => {
  //   console.log("add");
  //   fetch(
  //     `http://localhost:8080/invoice-management-system/${
  //       modalValue === "add" ? "add-invoice" : "update-invoice"
  //     }?id=${addEditFormData.invoiceNo}&name=${
  //       addEditFormData.customerName
  //     }&number=${addEditFormData.invoiceNo}&amount=${
  //       addEditFormData.invoiceAmount
  //     }&due=${addEditFormData.dueDate}&notes=${addEditFormData.notes}`
  //   )
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       handleClose();
  //       setAddEditFormData({
  //         customerName: "",
  //         customerNo: "",
  //         invoiceNo: "",
  //         invoiceAmount: "",
  //         dueDate: "",
  //         notes: "",
  //       });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   dispatch(setModalValue("reload"));
  // };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={correspondenceModal}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={correspondenceModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "92%",
              backgroundColor: "#2D424E",
              border: "1px solid #000",
              boxShadow: 24,
              borderRadius: "5px",
              color: "whitesmoke",
              p: 0,
            }}
          >
            <span className=" m-5 text-2xl text-[#FEFFFE] relative top-4">View Correspondence</span>
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
            <div className="m-8">
              Subject: Invoice Details-{selectedInvoice?.customerName} <br />
              Dear Sir/Madam,
              <br /> Greetings! <br />
              <br />
              This is to remind you that there are one or more open invoices on your account. lease
              provide at your earliest convenience an update on the payment details or clarify the
              reason for the delay. If you have any specific issue with the invoice(s), please let
              us know so that we can address it to the correct Department.
              <br />
              <br /> Please find the details of the invoices below:
              <br />
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow className=" h-[20px]">
                    <TableCell
                      sx={{
                        padding: "0px 0px 0px 16px",
                        color: "whitesmoke",
                        border: "0px",
                      }}
                    >
                      Invoice Number
                    </TableCell>

                    <TableCell
                      sx={{
                        padding: "0px 0px 0px 16px",
                        color: "whitesmoke",
                        border: "0px",
                      }}
                      align="right"
                    >
                      Invoice Date
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: "0px 0px 0px 16px",
                        color: "whitesmoke",
                        border: "0px",
                      }}
                      align="right"
                    >
                      Due Date
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: "0px 0px 0px 16px",
                        color: "whitesmoke",
                        border: "0px",
                      }}
                    >
                      Currency
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: "0px 0px 0px 16px",
                        color: "whitesmoke",
                        border: "0px",
                      }}
                      align="right"
                    >
                      Open Amount
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow
                    sx={{
                      height: "20px",
                      "&nth-of-type(even)": { backgroundColor: "#000000" },
                    }}
                  >
                    <TableCell
                      // id={`customerName-${row.docId}`}
                      sx={{
                        padding: "0px 0px 0px 16px",
                        color: "whitesmoke",
                        border: "0px",
                      }}
                    >
                      {selectedInvoice?.invoiceNo}
                    </TableCell>
                    <TableCell
                      // id={`customerNo-${row.docId}`}
                      sx={{
                        padding: "0px 0px 0px 16px",
                        color: "whitesmoke",
                        border: "0px",
                      }}
                      align="right"
                    >
                      {selectedInvoice?.invoiceDate}
                    </TableCell>
                    <TableCell
                      // id={`invoiceNo-${row.docId}`}
                      sx={{
                        padding: "0px 0px 0px 16px",
                        color: "whitesmoke",
                        border: "0px",
                      }}
                      align="right"
                    >
                      {selectedInvoice?.dueDate}
                    </TableCell>
                    <TableCell
                      // id={`invoiceAmount-${row.docId}`}
                      sx={{
                        padding: "0px 0px 0px 16px",
                        color: "whitesmoke",
                        border: "0px",
                      }}
                    >
                      USD
                    </TableCell>
                    <TableCell
                      // id={`dueDate-${row.docId}`}
                      sx={{
                        padding: "0px 0px 0px 16px",
                        color: "whitesmoke",
                        border: "0px",
                      }}
                      align="right"
                    >
                      {selectedInvoice?.invoiceAmount}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <br />
              <br />
              Total Amount to be Paid: $124.00K <br />
              In case you have already made a payment for the above items, please send us the
              details to ensure the payment is posted. <br />
              Let us know if we can be of any further assistance. Looking forward to hearing from
              you.
              <br />
              <br />
              Kind Regards,
              <br />
              Ramesh Sen
              <br />
              Phone: 7209284038
              <br />
              Email : rameshsen999@gmail.com
              <br />
              Company Name : RS
              <br />
            </div>
            {/* <div className="grid grid-cols-[auto auto auto auto] gap-10 m-8">
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
                disabled={modalValue === "add" ? false : true}
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
            </div> */}
            <hr className="border-t-[1px] border-t-black  mb-8" />
            <Button
              variant="outlined"
              onClick={handleClose}
              sx={{
                position: "relative",
                bottom: "15px",
                left: "580px",
              }}
            >
              Cancel
            </Button>
            <Button
              // onClick={handleSubmit}
              variant="outlined"
              sx={{
                position: "relative",
                bottom: "15px",
                left: "590px",
                color: "#FEFFFE",
                backgroundColor: "#15AFF0",
              }}
            >
              Download
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
