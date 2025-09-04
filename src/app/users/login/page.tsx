"use client";

import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import { Button, Divider, TextField, Typography } from "@mui/material";
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
      .then((res) => res.json())
      .then((data) => {
        if (data?.error) {
          dispatch(
            setSnackBarData({
              open: true,
              severity: "error",
              message: data?.error,
            })
          );
        } else {
          dispatch(
            setSnackBarData({
              open: true,
              severity: "success",
              message: data?.message,
            })
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
          })
        );
      });
  };

  const handleReset = (): void => {
    setLoginData(defaultLoginData);
  };

  return (
    <Grid
      container
      height={"100vh"}
      width={"100vh"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Grid
        container
        width="31rem"
        bgcolor="#2D424E"
        border={1}
        borderColor="#000"
        borderRadius="0.5rem"
        p={3}
      >
        <Typography variant="h4" color="whitesmoke">
          Login
        </Typography>

        <Divider
          variant="fullWidth"
          color="black"
          sx={{
            width: "100%",
            my: "1.2rem",
          }}
        />

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

        <Grid
          container
          width={"100%"}
          justifyContent={"center"}
          alignItems={"center"}
          spacing={2}
        >
          <Grid size={4}>
            <Button
              variant="outlined"
              sx={{ width: "100%" }}
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
                color: "#FEFFFE",
                width: "100%",
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
                color: "#FEFFFE",
                backgroundColor: "#15AFF0",
                width: "100%",
              }}
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
