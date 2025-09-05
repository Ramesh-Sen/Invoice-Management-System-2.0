"use client";

import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import { Button, Divider, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { setSnackBarData } from "@/redux/reducers/snackBarSlice";
import { useDispatch } from "react-redux";

type LoginData = {
  email: string;
  password: string;
};

const defaultLoginData = { email: "", password: "" };

export default function Login(): React.ReactElement {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loginData, setLoginData] = useState<LoginData>(defaultLoginData);

  const handleOnChange = (key: string, value: string): void => {
    setLoginData({ ...loginData, [key]: value });
  };

  const handleSubmit = (): void => {
    fetch("/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data?.error) {
          dispatch(
            setSnackBarData({
              open: true,
              severity: "error",
              message: data?.error,
            }),
          );
        } else {
          dispatch(
            setSnackBarData({
              open: true,
              severity: "success",
              message: data?.message,
            }),
          );
          router.push("/invoice");
        }
      })
      .catch((err) => {
        dispatch(
          setSnackBarData({
            open: true,
            severity: "error",
            message: err?.message || err?.error || "Internal Server Error",
          }),
        );
      });
  };

  const handleReset = (): void => {
    setLoginData(defaultLoginData);
  };

  return (
    <>
      <Grid container rowGap={3} width={"100%"}>
        <TextField
          id="email"
          required
          fullWidth
          label="Email/Full Name"
          value={loginData?.email}
          onChange={(e) => handleOnChange("email", e.target.value)}
          sx={{
            "& label": {
              color: "#B0BEC5", // Label color (soft light)
            },
            "& label.Mui-focused": {
              color: "#FFFFFF", // Label color on focus
            },
            "& .MuiOutlinedInput-root": {
              color: "#FFFFFF", // Input text color
              "& fieldset": {
                borderColor: "#78909C", // Default border
              },
              "&:hover fieldset": {
                borderColor: "#FFFFFF", // On hover
              },
              "&.Mui-focused fieldset": {
                borderColor: "#15AFF0", // On focus
              },
            },
            "& input::placeholder": {
              color: "#B0BEC5",
            },
            "& label.MuiFormLabel-root .MuiInputLabel-asterisk": {
              color: "red",
            },
          }}
        />
        <TextField
          id="password"
          required
          fullWidth
          label="Password"
          value={loginData?.password}
          type="password"
          onChange={(e) => handleOnChange("password", e.target.value)}
          sx={{
            "& label": {
              color: "#B0BEC5", // Label color (soft light)
            },
            "& label.Mui-focused": {
              color: "#FFFFFF", // Label color on focus
            },
            "& .MuiOutlinedInput-root": {
              color: "#FFFFFF", // Input text color
              "& fieldset": {
                borderColor: "#78909C", // Default border
              },
              "&:hover fieldset": {
                borderColor: "#FFFFFF", // On hover
              },
              "&.Mui-focused fieldset": {
                borderColor: "#15AFF0", // On focus
              },
            },
            "& input::placeholder": {
              color: "#B0BEC5",
            },
            "& label.MuiFormLabel-root .MuiInputLabel-asterisk": {
              color: "red",
            },
          }}
        />
      </Grid>
      <Divider
        variant="fullWidth"
        color="black"
        sx={{
          width: "100%",
          my: "1.2rem",
        }}
      />

      <Grid container width={"100%"} justifyContent={"center"} alignItems={"center"} spacing={2}>
        <Grid size={4}>
          <Button
            variant="outlined"
            sx={{
              width: "100%",
              backgroundColor: "#2196F3",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#1976D2",
              },
              "&:focus": {
                border: "2px solid #fff",
              },
              "&:disabled": {
                backgroundColor: "#90CAF9",
                color: "#E0E0E0",
              },
            }}
            onClick={() => router.push("/users/signUp")}
          >
            Sign Up
          </Button>
        </Grid>
        <Grid size={4}>
          <Button
            onClick={handleReset}
            variant="outlined"
            sx={{
              width: "100%",
              color: "#fff",
              borderColor: "#fff",
              "&:hover": {
                backgroundColor: "#3E5766",
                borderColor: "#fff",
              },
              "&:focus": {
                backgroundColor: "#3E5766",
                border: "2px solid #fff",
              },
              "&:disabled": {
                color: "#AAAAAA",
                borderColor: "#AAAAAA",
              },
            }}
            disabled={!(loginData?.email || loginData?.password)}
          >
            Clear
          </Button>
        </Grid>
        <Grid size={4}>
          <Button
            onClick={handleSubmit}
            variant="outlined"
            disabled={!(loginData?.email && loginData?.password)}
            sx={{
              width: "100%",
              backgroundColor: "#4CAF50",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#45A049",
              },
              "&:focus": {
                border: "2px solid #fff",
              },
              "&:disabled": {
                backgroundColor: "#A5D6A7",
                color: "#E0E0E0",
              },
            }}
          >
            Login
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
