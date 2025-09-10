import { InvoiceDataI } from "@/util/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface SnackBarDataI {
  open: boolean;
  severity: "error" | "warning" | "info" | "success";
  message: string;
}
export interface InvoiceSliceI {
  invoiceDatas: InvoiceDataI[];
  idArr: string[];
  modalValue: string;
  addEditModal: boolean;
  deleteModal: boolean;
  correspondenceModal: boolean;
  uploadModal: boolean;
  snackBarData: SnackBarDataI;
}

const initialState: InvoiceSliceI = {
  invoiceDatas: [],
  idArr: [],
  modalValue: "reload",
  addEditModal: false,
  deleteModal: false,
  correspondenceModal: false,
  uploadModal: false,
  snackBarData: {
    open: false,
    severity: "info",
    message: "",
  },
};

export const invoiceDataSlice = createSlice({
  name: "invoiceDataStore",
  initialState,
  reducers: {
    setInvoiceDatas: (state, action: PayloadAction<InvoiceDataI[]>) => {
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
    setIdArr: (state, action: PayloadAction<string[]>) => {
      state.idArr = action.payload;
    },
    setModalValue: (state, action: PayloadAction<string>) => {
      state.modalValue = action.payload;
    },
    openAddEditModal: (state, action: PayloadAction<boolean>) => {
      state.addEditModal = action.payload;
    },
    openDeleteModal: (state, action: PayloadAction<boolean>) => {
      state.deleteModal = action.payload;
    },
    openCorrespondenceModal: (state, action: PayloadAction<boolean>) => {
      state.correspondenceModal = action.payload;
    },
    openUploadModal: (state, action: PayloadAction<boolean>) => {
      state.uploadModal = action.payload;
    },
    setSnackBarData: (state, action: PayloadAction<SnackBarDataI>) => {
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

export const {
  setInvoiceDatas,
  refreshInvoiceDatas,
  setIdArr,
  setModalValue,
  openAddEditModal,
  openDeleteModal,
  openCorrespondenceModal,
  openUploadModal,
  setSnackBarData,
  setCommonSuccess,
  setCommonError,
} = invoiceDataSlice.actions;
export default invoiceDataSlice.reducer;
