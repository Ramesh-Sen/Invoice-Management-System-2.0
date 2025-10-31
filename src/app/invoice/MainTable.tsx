"use client";

import React, { useEffect, useState } from "react";
import {
  Checkbox,
  Grid2,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/redux/store";
import Pagination from "@mui/material/Pagination";
import { setCommonError, setIdArr, setInvoiceDatas } from "@/redux/reducers/invoiceSlice";
import { InvoiceDataI } from "@/util/types";
import { formatAmount, formatDate } from "@/util/formatUtil";

export default function MainTable(): React.ReactElement {
  const invoiceDatas = useSelector((state: RootState) => state.invoice.invoiceDatas);
  const idArr = useSelector((state: RootState) => state.invoice.idArr);
  const dispatch = useDispatch();

  const [page, setPage] = React.useState(1);
  const [pageCount, setPageCount] = React.useState(1);
  const [allChecked, setAllChecked] = useState(false);

  const toCheckeAll = (): void => {
    if (allChecked) {
      dispatch(setIdArr([]));
    } else {
      const arr = document.getElementsByClassName("PrivateSwitchBase-input");
      const tempArr = [];

      for (let i = 1; i < arr.length; i++) {
        tempArr.push(arr[i].id);
        (arr[i] as HTMLInputElement).checked = true;
      }
      dispatch(setIdArr(tempArr));
    }
    setAllChecked(!allChecked);
  };

  const isAllChecked = (): Array<string> => {
    const arr = document.getElementsByClassName("PrivateSwitchBase-input");
    const tempArr = [];

    for (let i = 1; i < arr.length; i++) {
      if ((arr[i] as HTMLInputElement).checked) {
        tempArr.push(arr[i].id);
      }
    }
    dispatch(setIdArr(tempArr));
    return tempArr;
  };

  useEffect(() => {
    fetch(`/api/invoice/?page=${page}&limt=${10}`)
      .then((res) => res.json())
      .then((result) => {
        dispatch(setInvoiceDatas(result.data));
        setPageCount(result?.totalPages);
      })
      .catch((err) => {
        console.log(err);
        dispatch(setCommonError(err?.message || err?.error || "Something Went Wrong"));
      });
  }, [page]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number): void => {
    setPage(value);
  };

  return (
    <Grid2
      container
      size={12}
      height={"95%"}
      width={"100%"}
      flexDirection={"row"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <TableContainer
        sx={{
          height: "95%",
          "& .MuiTableCell-root": {
            color: "whitesmoke",
            border: "0px",
            padding: "0.5rem",
          },
        }}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox
                  onClick={toCheckeAll}
                  checked={idArr.length === 10 ? true : false}
                  sx={{ color: "whitesmoke" }}
                />
              </TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Customer No.</TableCell>
              <TableCell>Invoice No.</TableCell>
              <TableCell>Invoice Amount</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Predicted Payment Date</TableCell>
              <TableCell>Predicted Aging Bucket</TableCell>
              <TableCell>Notes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody
            sx={{
              "& tr:nth-of-type(even)": {
                backgroundColor: "#1e6cacff",
              },
              "& tr:nth-of-type(odd)": {
                backgroundColor: "#3A5061",
              },
            }}
          >
            {invoiceDatas?.map((invoiceData: InvoiceDataI) => (
              <TableRow key={invoiceData._id}>
                <TableCell scope="row">
                  <Checkbox
                    checked={idArr.includes(invoiceData._id) ? true : false}
                    // checked={allCheck}
                    id={invoiceData._id}
                    className="rowCheckBox"
                    onClick={isAllChecked}
                    sx={{ color: "whitesmoke", border: "0px" }}
                  />
                </TableCell>
                <TableCell id={`customerName-${invoiceData._id}`}>
                  {invoiceData.customerName}
                </TableCell>
                <TableCell id={`customerNo-${invoiceData._id}`}>{invoiceData.customerNo}</TableCell>
                <TableCell id={`invoiceNo-${invoiceData._id}`}>{invoiceData.invoiceNo}</TableCell>
                <TableCell id={`invoiceAmount-${invoiceData._id}`} align="right">
                  {formatAmount(invoiceData.invoiceAmount)}
                </TableCell>
                <TableCell id={`dueDate-${invoiceData._id}`} align="right">
                  {formatDate(invoiceData?.dueDate)}
                </TableCell>
                <TableCell id={`predictedPaymentDate-${invoiceData._id}`} align="center">
                  --
                </TableCell>
                <TableCell id={`predictedAgingBucket${invoiceData._id}`} align="center">
                  --
                </TableCell>
                <TableCell id={`notes-${invoiceData._id}`}>{invoiceData.notes}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={pageCount}
        page={page}
        size="medium"
        color="primary"
        onChange={handleChange}
        sx={{
          "& .MuiPaginationItem-root": {
            mx: { md: "1rem" },
            color: "#ECEFF1", // default text color
            border: "1px solid #607D8B", // subtle border
            backgroundColor: "transparent",
          },
          "& .MuiPaginationItem-root:hover": {
            backgroundColor: "#37474F",
          },
          "& .Mui-selected": {
            backgroundColor: "#90CAF9",
            color: "#1A1A1A",
            fontWeight: "bold",
            border: "none",
            "&:hover": {
              backgroundColor: "#64B5F6",
            },
          },
          "& .MuiPaginationItem-ellipsis": {
            color: "#B0BEC5",
          },
        }}
      />
    </Grid2>
  );
}
