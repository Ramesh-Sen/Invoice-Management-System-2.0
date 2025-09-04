import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "./reducers/modalSlice";
import idArrSlice from "./reducers/idArrSlice";
import invoiceDataSlice from "./reducers/invoiceDataSlice";
import snackBarSlice from "./reducers/snackBarSlice";
import { createLogger } from "redux-logger";

const logger = createLogger();

export const store = configureStore({
  reducer: {
    modalStore: modalSlice,
    idArrStore: idArrSlice,
    invoiceDataStore: invoiceDataSlice,
    snackBarStore: snackBarSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
