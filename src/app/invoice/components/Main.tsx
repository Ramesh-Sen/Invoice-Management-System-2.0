import React from "react";
import Navbar from "./Navbar";
import MainTable from "./MainTable";
import AddEditModal from "./AddEditModal";
import DeleteModal from "./DeleteModal";
import Correspondence from "./Correspondence";
import FileUpload from "./FileUpload";

export default function Main() {
  return (
    <>
      <Navbar />
      <MainTable />
      <AddEditModal />
      <DeleteModal />
      <Correspondence />
      <FileUpload />
    </>
  );
}
