import React from "react";
import Navbar from "./Navbar";
import MainTable from "./MainTable";

import Grid from "@mui/material/Grid2";

export default function Main(): React.ReactElement {
  return (
    <Grid container width={"100%"} height={"93%"} p={2}>
      <Navbar />
      <MainTable />
    </Grid>
  );
}
