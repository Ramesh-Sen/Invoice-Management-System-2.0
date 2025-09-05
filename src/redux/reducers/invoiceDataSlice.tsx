import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface InvoiceDatas {
  invoiceDatas: [];
}

const initialState: InvoiceDatas = {
  invoiceDatas: [],
};

export const invoiceDataSlice = createSlice({
  name: "invoiceDataStore",
  initialState,
  reducers: {
    setInvoiceDatas: (state, action: PayloadAction<[]>) => {
      state.invoiceDatas = action.payload;
    },
    refreshInvoiceDatas: (state, action: PayloadAction<[]>) => {
      fetch("/api/invoice")
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          state.invoiceDatas = action.payload;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
});

export const { setInvoiceDatas, refreshInvoiceDatas } = invoiceDataSlice.actions;
export default invoiceDataSlice.reducer;
