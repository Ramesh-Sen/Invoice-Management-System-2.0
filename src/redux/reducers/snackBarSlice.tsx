import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface SnackBarData {
  open: boolean;
  severity: "error" | "warning" | "info" | "success";
  message: string;
}

export interface snackBarDataState {
  snackBarData: SnackBarData;
}

const initialState: snackBarDataState = {
  snackBarData: {
    open: false,
    severity: "info",
    message: "",
  },
};

export const snackBarSlice = createSlice({
  name: "snackBarStore",
  initialState,
  reducers: {
    setSnackBarData: (state, action: PayloadAction<SnackBarData>) => {
      state.snackBarData = action.payload;
    },
    setCommonSuccess: (state, action: PayloadAction<string>) => {
      state.snackBarData = {
        open: true,
        severity: "success",
        message: action.payload,
      };
    },
    setCommonError: (state, action: PayloadAction<string>) => {
      state.snackBarData = {
        open: true,
        severity: "error",
        message: action.payload,
      };
    },
  },
});

export const { setSnackBarData, setCommonSuccess, setCommonError } = snackBarSlice.actions;
export default snackBarSlice.reducer;
