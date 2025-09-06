"use client";

import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import { useRouter } from "next/navigation";
import { setCommonError, setCommonSuccess } from "@/redux/reducers/invoiceSlice";
import { useDispatch } from "react-redux";
import PrimaryBtn from "@/components/PrimaryBtn";
import SecondaryBtn from "@/components/SecondaryBtn";
import ResetBtn from "@/components/ResetBtn";
import TextInputField from "@/components/TextInputField";
import StyledDivider from "@/components/StyledDivider";

type LoginData = {
  email: string;
  password: string;
};

const defaultLoginData = { email: "", password: "" };

export default function Login(): React.ReactElement {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loginData, setLoginData] = useState<LoginData>(defaultLoginData);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setLoginData({ ...loginData, [e.target.id]: e.target.value });
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
          dispatch(setCommonError(data?.error));
        } else {
          dispatch(setCommonSuccess(data?.message));
          router.push("/invoice");
        }
      })
      .catch((err) => {
        dispatch(setCommonError(err?.message || err?.error || "Internal Server Error"));
      });
  };

  const handleReset = (): void => {
    setLoginData(defaultLoginData);
  };

  return (
    <>
      <Grid container spacing={3} width={"100%"} p={2}>
        <TextInputField
          id="email"
          label="Email/Full Name"
          value={loginData?.email}
          onChange={handleOnChange}
        />

        <TextInputField
          id="password"
          label="Password"
          type="password"
          value={loginData?.password}
          onChange={handleOnChange}
        />
      </Grid>

      <StyledDivider />

      <Grid
        container
        width={"100%"}
        justifyContent={"center"}
        alignItems={"center"}
        spacing={2}
        p={2}
      >
        <Grid size={4}>
          <SecondaryBtn label="Sign Up" onClick={() => router.push("/users/signUp")} />
        </Grid>
        <Grid size={4}>
          <ResetBtn disabled={!(loginData?.email || loginData?.password)} onClick={handleReset} />
        </Grid>

        <Grid size={4}>
          <PrimaryBtn
            label="Login"
            disabled={!(loginData?.email && loginData?.password)}
            onClick={handleSubmit}
          />
        </Grid>
      </Grid>
    </>
  );
}
