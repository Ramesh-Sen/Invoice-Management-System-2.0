import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface ModalState {
  modalValue: string;
  addEditModal: boolean;
  deleteModal: boolean;
  correspondenceModal: boolean;
  uploadModal: boolean;
}

const initialState: ModalState = {
  modalValue: "reload",
  addEditModal: false,
  deleteModal: false,
  correspondenceModal: false,
  uploadModal: false,
};

export const modalSlice = createSlice({
  name: "modalStore",
  initialState,
  reducers: {
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
  },
});

export const {
  setModalValue,
  openAddEditModal,
  openDeleteModal,
  openCorrespondenceModal,
  openUploadModal,
} = modalSlice.actions;
export default modalSlice.reducer;
