import React, { forwardRef } from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";

const CustomTextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ id = "", label = "", type = "text", error = false, helperText = "", ...props }, ref) => {
    return (
      <TextField
        id={id}
        label={label}
        type={type}
        error={error}
        helperText={error ? helperText : ""}
        inputRef={ref}
        {...props}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "white",
            },
            "&:hover fieldset": {
              borderColor: "white",
            },
            "&.Mui-focused fieldset": {
              borderColor: "white",
            },
          },
          "& .MuiInputBase-input": {
            color: "white",
          },
          "& .MuiFormLabel-root": {
            color: "white",
          },
          "& .MuiFormLabel-root.Mui-focused": {
            color: "white",
          },
        }}
      />
    );
  },
);

CustomTextField.displayName = "CustomTextField";

export default CustomTextField;
