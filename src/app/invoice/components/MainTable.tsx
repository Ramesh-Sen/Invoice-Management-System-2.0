"use client";

import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setIdArr } from "@/redux/reducers/idArrSlice";
import type { RootState } from "@/redux/store";
import { setInvoiceDatas } from "@/redux/reducers/invoiceDataSlice";
import Pagination from "@mui/material/Pagination";

export default function MainTable({ result }: any) {
  const invoiceDatas = useSelector(
    (state: RootState) => state.invoiceDataStore.invoiceDatas,
  );
  const modalValue = useSelector(
    (state: RootState) => state.modalStore.modalValue,
  );
  const addEditModal = useSelector(
    (state: RootState) => state.modalStore.addEditModal,
  );
  const deleteModal = useSelector(
    (state: RootState) => state.modalStore.deleteModal,
  );
  const correspondenceModal = useSelector(
    (state: RootState) => state.modalStore.correspondenceModal,
  );
  const uploadModal = useSelector(
    (state: RootState) => state.modalStore.uploadModal,
  );
  const idArr = useSelector((state: RootState) => state.idArrStore.idArr);
  const dispatch = useDispatch();

  const [allChecked, setAllChecked] = useState(false);

  const toCheckeAll = (): void => {
    if (allChecked) {
      dispatch(setIdArr([]));
    } else {
      let arr = document.getElementsByClassName("PrivateSwitchBase-input");
      let tempArr = [];

      for (let i = 1; i < arr.length; i++) {
        tempArr.push(arr[i].id);
        (arr[i] as HTMLInputElement).checked = true;
      }
      dispatch(setIdArr(tempArr));
    }
    setAllChecked(!allChecked);
  };

  const isAllChecked = (): Array<string> => {
    let arr = document.getElementsByClassName("PrivateSwitchBase-input");
    let tempArr = [];

    for (let i = 1; i < arr.length; i++) {
      if ((arr[i] as HTMLInputElement).checked) {
        tempArr.push(arr[i].id);
      }
    }
    dispatch(setIdArr(tempArr));
    return tempArr;
  };

  // useEffect(() => {
  //   console.log(1, "hello");

  //   if (modalValue === "reload")
  //     fetch(
  //       "/api/invoice"
  //     )
  //       .then((res) => res.json())
  //       .then((result) => {
  //         console.log(result);
  //         dispatch(setInvoiceDatas(result.data));
  //         // setLoading(false);
  //         // console.log(data);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  // }, [dispatch, modalValue]);

  const [page, setPage] = React.useState(1);

  useEffect(() => {
    if (modalValue == "edit" && !addEditModal) {
      console.log(2, "edit");
      dispatch(setIdArr([]));
    } else if (modalValue == "delete" && !deleteModal) {
      console.log(3, "delete");
      dispatch(setIdArr([]));
    } else if (modalValue == "correspondence" && !correspondenceModal) {
      console.log("correspondence");
      dispatch(setIdArr([]));
    }
    fetch(`/api/invoice/?page=${page}&limt=${10}`)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        dispatch(setInvoiceDatas(result.data));
        // setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [
    dispatch,
    addEditModal,
    deleteModal,
    modalValue,
    correspondenceModal,
    uploadModal,
    page,
  ]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <>
      <Table sx={{ minWidth: 650, height: "80vh" }} aria-label="simple table">
        <TableHead>
          <TableRow className=" h-[20px]">
            <TableCell sx={{ padding: "0px 0px 0px 16px", border: "0px" }}>
              <Checkbox
                sx={{ color: "whitesmoke", border: "0px" }}
                onClick={toCheckeAll}
                checked={idArr.length === 10 ? true : false}
              />
            </TableCell>
            <TableCell
              sx={{
                padding: "0px 0px 0px 16px",
                color: "whitesmoke",
                border: "0px",
              }}
            >
              Customer Name
            </TableCell>
            <TableCell
              sx={{
                padding: "0px 0px 0px 16px",
                color: "whitesmoke",
                border: "0px",
              }}
            >
              Customer No.
            </TableCell>
            <TableCell
              sx={{
                padding: "0px 0px 0px 16px",
                color: "whitesmoke",
                border: "0px",
              }}
            >
              Invoice No.
            </TableCell>
            <TableCell
              sx={{
                padding: "0px 0px 0px 16px",
                color: "whitesmoke",
                border: "0px",
              }}
              align="right"
            >
              Invoice Amount
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
              Predicted Payment Date
            </TableCell>
            <TableCell
              sx={{
                padding: "0px 0px 0px 16px",
                color: "whitesmoke",
                border: "0px",
              }}
            >
              Predicted Aging Bucket
            </TableCell>
            <TableCell
              sx={{
                padding: "0px 0px 0px 16px",
                color: "whitesmoke",
                border: "0px",
              }}
            >
              Notes
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {invoiceDatas &&
            invoiceDatas.map((invoiceData: any) => (
              <TableRow
                // className=" h-[20px]"
                key={invoiceData._id}
                sx={{
                  height: "20px",
                  "&nth-of-type(even)": { backgroundColor: "#000000" },
                }}
              >
                <TableCell
                  sx={{ padding: "0px 0px 0px 16px", border: "0px" }}
                  scope="row"
                >
                  <Checkbox
                    checked={idArr.includes(invoiceData._id) ? true : false}
                    // checked={allCheck}
                    id={invoiceData._id}
                    className="rowCheckBox"
                    onClick={isAllChecked}
                    sx={{ color: "whitesmoke", border: "0px" }}
                  />
                </TableCell>
                <TableCell
                  id={`customerName-${invoiceData._id}`}
                  sx={{
                    padding: "0px 0px 0px 16px",
                    color: "whitesmoke",
                    border: "0px",
                  }}
                >
                  {invoiceData.customerName}
                </TableCell>
                <TableCell
                  id={`customerNo-${invoiceData._id}`}
                  sx={{
                    padding: "0px 0px 0px 16px",
                    color: "whitesmoke",
                    border: "0px",
                  }}
                >
                  {invoiceData.customerNo}
                </TableCell>
                <TableCell
                  id={`invoiceNo-${invoiceData._id}`}
                  sx={{
                    padding: "0px 0px 0px 16px",
                    color: "whitesmoke",
                    border: "0px",
                  }}
                >
                  {invoiceData.invoiceNo}
                </TableCell>
                <TableCell
                  id={`invoiceAmount-${invoiceData._id}`}
                  sx={{
                    padding: "0px 0px 0px 16px",
                    color: "whitesmoke",
                    border: "0px",
                  }}
                  align="right"
                >
                  {invoiceData.invoiceAmount}K
                </TableCell>
                <TableCell
                  id={`dueDate-${invoiceData._id}`}
                  sx={{
                    padding: "0px 0px 0px 16px",
                    color: "whitesmoke",
                    border: "0px",
                  }}
                  align="right"
                >
                  {invoiceData.dueDate}
                </TableCell>
                <TableCell
                  id={`predictedPaymentDate-${invoiceData._id}`}
                  sx={{
                    padding: "0px 0px 0px 16px",
                    color: "whitesmoke",
                    border: "0px",
                  }}
                  align="center"
                >
                  --
                </TableCell>
                <TableCell
                  id={`predictedAgingBucket${invoiceData._id}`}
                  sx={{
                    padding: "0px 0px 0px 16px",
                    color: "whitesmoke",
                    border: "0px",
                  }}
                  align="center"
                >
                  --
                </TableCell>
                <TableCell
                  id={`notes-${invoiceData._id}`}
                  sx={{
                    padding: "0px 20px 0px 16px",
                    color: "whitesmoke",
                    border: "0px",
                  }}
                >
                  {invoiceData.notes}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Pagination
        color="primary"
        count={10}
        page={page}
        onChange={handleChange}
      />
    </>
  );
}
