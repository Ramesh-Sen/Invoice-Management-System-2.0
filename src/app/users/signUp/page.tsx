"use client";

import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import { useRouter } from "next/navigation";
import { setCommonError, setCommonSuccess } from "@/redux/reducers/snackBarSlice";
import { useDispatch } from "react-redux";
import PrimaryBtn from "@/components/PrimaryBtn";
import SecondaryBtn from "@/components/SecondaryBtn";
import ResetBtn from "@/components/ResetBtn";
import TextInputField from "@/components/TextInputField";
import StyledDivider from "@/components/StyledDivider";

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

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSignUpData({ ...signUpData, [e.target.id]: e.target.value });
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
          dispatch(setCommonError(data?.error));
        } else {
          dispatch(setCommonSuccess(data?.message));
        }
      })
      .catch((err) => {
        dispatch(setCommonError(err?.message || err?.error || "Internal Server Error"));
      });
  };

  const handleReset = (): void => {
    setSignUpData(defaultSignUpData);
  };

  return (
    <>
      <Grid container spacing={3} width={"100%"} p={2}>
        <TextInputField
          id="email"
          label="Email"
          value={signUpData.email}
          onChange={handleOnChange}
        />

        <TextInputField id="name" label="Name" value={signUpData.name} onChange={handleOnChange} />

        <TextInputField
          id="password"
          label="Password"
          type="password"
          value={signUpData.password}
          onChange={handleOnChange}
        />

        <TextInputField
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          value={signUpData.confirmPassword}
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
          <SecondaryBtn label="Login" onClick={() => router.push("/users/login")} />
        </Grid>
        <Grid size={4}>
          <ResetBtn
            disabled={
              !(
                signUpData?.name ||
                signUpData?.email ||
                signUpData?.password ||
                signUpData?.confirmPassword
              )
            }
            onClick={handleReset}
          />
        </Grid>
        <Grid size={4}>
          <PrimaryBtn
            label="Sign Up"
            disabled={
              !(
                signUpData?.name &&
                signUpData?.email &&
                signUpData?.password &&
                signUpData?.confirmPassword
              )
            }
            onClick={handleSubmit}
          />
        </Grid>
      </Grid>
    </>
  );
}
