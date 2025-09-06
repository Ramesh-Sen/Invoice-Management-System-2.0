import React from "react";
import { TextField } from "@mui/material";

export const inputTheme = {
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
};

interface TextInputFieldProps {
  id: string;
  label: string;
  type?: "label" | "password";
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInputField: React.FC<TextInputFieldProps> = ({
  id,
  label,
  type = "label",
  value,
  onChange,
}) => {
  return (
    <TextField
      id={id}
      label={label}
      value={value}
      onChange={onChange}
      type={type}
      required
      fullWidth
      sx={inputTheme}
    />
  );
};

export default TextInputField;
