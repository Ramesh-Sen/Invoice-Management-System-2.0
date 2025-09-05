"use client";

import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import { Button, Divider, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { setSnackBarData } from "@/redux/reducers/snackBarSlice";
import { useDispatch } from "react-redux";

type SignUpData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const defaultSignUpData = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function SignUp(): React.ReactElement {
  const [signUpData, setSignUpData] = useState<SignUpData>(defaultSignUpData);
  const dispatch = useDispatch();

  const handleOnChange = (key: string, value: string): void => {
    setSignUpData({ ...signUpData, [key]: value });
  };

  const router = useRouter();
  const handleSubmit = (): void => {
    const user = {
      name: signUpData.name,
      email: signUpData.email,
      password: signUpData.password,
    };
    fetch("/api/users/signUp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
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
    setSignUpData(defaultSignUpData);
  };

  return (
    <>
      <Grid container rowGap={3} width={"100%"}>
        <TextField
          id="email"
          required
          fullWidth
          value={signUpData.email}
          variant="outlined"
          label="Email"
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
          id="name"
          value={signUpData.name}
          variant="outlined"
          required
          fullWidth
          label="Name"
          onChange={(e) => handleOnChange("name", e.target.value)}
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
          value={signUpData.password}
          required
          fullWidth
          variant="outlined"
          label="Password"
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

        <TextField
          id="confirmPassword"
          value={signUpData.confirmPassword}
          required
          fullWidth
          variant="outlined"
          label="Confirm Password"
          onChange={(e) => handleOnChange("confirmPassword", e.target.value)}
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
            onClick={() => router.push("/users/login")}
          >
            Login
          </Button>
        </Grid>
        <Grid size={4}>
          <Button
            onClick={handleReset}
            variant="outlined"
            disabled={
              !(
                signUpData?.name ||
                signUpData?.email ||
                signUpData?.password ||
                signUpData?.confirmPassword
              )
            }
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
          >
            Clear
          </Button>
        </Grid>
        <Grid size={4}>
          <Button
            onClick={handleSubmit}
            variant="outlined"
            disabled={
              !(
                signUpData?.name &&
                signUpData?.email &&
                signUpData?.password &&
                signUpData?.confirmPassword
              )
            }
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
            Sign Up
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
