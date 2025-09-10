"use client";

import React, { useEffect, useState } from "react";
import { RootState } from "@/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { InvoiceDataI } from "@/util/types";
import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { openCorrespondenceModal } from "@/redux/reducers/invoiceSlice";
import BaseModal from "@/components/BaseModal";

export default function Correspondence(): React.ReactElement {
  const dispatch = useDispatch();
  const correspondenceModal = useSelector((state: RootState) => state.invoice.correspondenceModal);
  const idArr = useSelector((state: RootState) => state.invoice.idArr);

  const invoiceDatas = useSelector((state: RootState) => state.invoice.invoiceDatas);

  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceDataI>({
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
    const selectedData = invoiceDatas?.find((invoice: InvoiceDataI) => invoice._id === idArr[0]);
    if (selectedData) {
      setSelectedInvoice(selectedData);
    }
  }, [idArr, invoiceDatas]);

  const handleClose = (): void => {
    dispatch(openCorrespondenceModal(false));
  };

  const handleSubmit = (): void => {
    console.log("add");
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
  };

  return (
    <BaseModal
      isOpen={correspondenceModal}
      onClose={handleClose}
      title="View Correspondence"
      primaryBtnLabel="Download"
      handlePrimaryBtn={handleSubmit}
      size="doubleExtraLarge"
    >
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Subject: Invoice Details - {selectedInvoice?.customerName || "Customer"}
      </Typography>
      <Typography variant="subtitle1">
        Dear {selectedInvoice?.customerName || "Customer"},
      </Typography>

      <Typography>
        This is to remind you that there are one or more open invoices on your account. lease
        provide at your earliest convenience an update on the payment details or clarify the reason
        for the delay. If you have any specific issue with the invoice(s), please let us know so
        that we can address it to the correct Department.
      </Typography>
      <Typography>Please find the details of the invoices below:</Typography>

      <Table
        sx={{
          minWidth: 650,
          "& .MuiTableCell-root": {
            color: "whitesmoke",
            border: "0px",
            padding: "0.5rem",
          },
        }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            <TableCell>Invoice No.</TableCell>
            <TableCell>Due Date</TableCell>
            <TableCell>Invoice Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow
            sx={{
              height: "20px",
              "&nth-of-type(even)": { backgroundColor: "#000000" },
            }}
          >
            <TableCell>{selectedInvoice?.invoiceNo}</TableCell>
            <TableCell>{selectedInvoice?.invoiceDate}</TableCell>
            <TableCell>{selectedInvoice?.invoiceAmount}</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <Typography variant="h6">Total Amount to be Paid: $124.00K</Typography>
      <Typography>
        In case you have already made a payment for the above items, please send us the details to
        ensure the payment is completed.
      </Typography>
      <Typography>
        Let us know if we can be of any further assistance. Looking forward to hear from you.
      </Typography>
      <Typography variant="subtitle1">Kind Regards,</Typography>
      <Typography variant="subtitle1">Ramesh Sen</Typography>
      <Typography variant="subtitle1">Phone: 7209284038</Typography>
      <Typography variant="subtitle1">Company Name: RS</Typography>
    </BaseModal>
  );
}
