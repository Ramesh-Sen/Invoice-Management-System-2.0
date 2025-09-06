"use client";

import { Button, InputAdornment, TextField } from "@mui/material";
import AddSharpIcon from "@mui/icons-material/AddSharp";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import RemoveSharpIcon from "@mui/icons-material/RemoveSharp";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setModalValue,
  openAddEditModal,
  openDeleteModal,
  openCorrespondenceModal,
} from "@/redux/reducers/invoiceSlice";
import type { RootState } from "@/redux/store";
import { setInvoiceDatas } from "@/redux/reducers/invoiceSlice";
import Grid from "@mui/material/Grid2";

export default function Navbar(): React.ReactElement {
  const idArr = useSelector((state: RootState) => state.invoice.idArr);
  const dispatch = useDispatch();

  const handleSearchChange = (value: string): void => {
    fetch(`/api/invoice/?id=${value}`)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        dispatch(setInvoiceDatas(result.data));
        // setLoading(false);
        // console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
    dispatch(setModalValue("reload"));
  };

  return (
    <Grid container width={"100%"} justifyContent={"center"} alignItems={"center"}>
      <Grid container size={4} spacing={2}>
        <Button
          variant="outlined"
          sx={{
            backgroundColor: "#FF9800",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#FB8C00",
            },
            "&:focus": {
              border: "2px solid #fff",
            },
            "&:disabled": {
              backgroundColor: "#5C6B73",
              color: "#B0BEC5",
              cursor: "not-allowed",
            },
          }}
        >
          Predict
        </Button>
        <Button
          variant="outlined"
          disabled={idArr.length === 1 ? false : true}
          onClick={() => {
            dispatch(openCorrespondenceModal(true));
            dispatch(setModalValue("correspondence"));
          }}
          sx={{
            backgroundColor: "#9C27B0",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#7B1FA2",
            },
            "&:focus": {
              border: "2px solid #fff",
            },
            "&:disabled": {
              backgroundColor: "#5C6B73",
              color: "#B0BEC5",
              cursor: "not-allowed",
            },
          }}
        >
          View Correspondence
        </Button>
      </Grid>

      <Grid container size={8} alignItems={"flex-end"} spacing={2} justifyContent={"flex-end"}>
        <Button
          disabled={idArr.length === 0 ? false : true}
          variant="outlined"
          onClick={() => {
            (dispatch(openAddEditModal(true)), dispatch(setModalValue("add")));
          }}
          startIcon={<AddSharpIcon />}
          sx={{
            // margin: "20px 4px 20px 20px",
            backgroundColor: "#43A047", // vibrant, clear green
            color: "#fff",
            "&:hover": {
              backgroundColor: "#388E3C",
            },
            "&:focus": {
              backgroundColor: "#388E3C",
              border: "2px solid #fff",
            },
            "&:disabled": {
              backgroundColor: "#5C6B73",
              color: "#B0BEC5",
              cursor: "not-allowed",
            },
          }}
        >
          Add
        </Button>
        <Button
          disabled={idArr.length === 1 ? false : true}
          variant="outlined"
          onClick={() => {
            (dispatch(openAddEditModal(true)), dispatch(setModalValue("edit")));
          }}
          startIcon={<EditSharpIcon />}
          sx={{
            // margin: "20px 4px 20px 20px",
            backgroundColor: "#2196F3",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#1976D2",
            },
            "&:focus": {
              border: "2px solid #fff",
            },
            "&:disabled": {
              backgroundColor: "#5C6B73",
              color: "#B0BEC5",
              cursor: "not-allowed",
            },
          }}
        >
          Edit
        </Button>
        <Button
          disabled={idArr.length === 0 ? true : false}
          // className="m-5"
          variant="outlined"
          onClick={() => {
            (dispatch(openDeleteModal(true)), dispatch(setModalValue("delete")));
          }}
          startIcon={<RemoveSharpIcon />}
          sx={{
            // margin: "20px 4px 20px 20px",
            backgroundColor: "#F44336",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#D32F2F",
            },
            "&:focus": {
              border: "2px solid #fff",
            },
            "&:disabled": {
              backgroundColor: "#5C6B73",
              color: "#B0BEC5",
              cursor: "not-allowed",
            },
          }}
        >
          Delete
        </Button>
        <TextField
          size="small"
          id="outlined-basic"
          variant="outlined"
          placeholder="Search by Invoice Number"
          onChange={(e) => handleSearchChange(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon sx={{ color: "#90CAF9" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            // margin: "20px 4px 20px 20px",
            // border: "2px solid gray",
            // borderRadius: "4px",
            // input: { color: "white" },

            input: {
              color: "#FFFFFF", // Active text color
              "&::placeholder": {
                color: "#B0BEC5",
                opacity: 1,
              },
            },
            backgroundColor: "#2F3E46", // Rich dark, not flat
            borderRadius: 1,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#90CAF9", // Light blue border
              },
              "&:hover fieldset": {
                borderColor: "#BBDEFB", // Hover brighter
              },
              "&.Mui-focused fieldset": {
                borderColor: "#29B6F6", // Vibrant focus
                borderWidth: "2px",
              },
              "&.Mui-disabled": {
                backgroundColor: "#2F3E46",
                "& fieldset": {
                  borderColor: "#455A64",
                },
                "& input": {
                  color: "#78909C",
                },
                "&::placeholder": {
                  color: "#78909C",
                },
              },
            },
          }}
        />
      </Grid>
    </Grid>
  );
}
