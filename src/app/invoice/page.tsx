import Grid from "@mui/material/Grid2";
import AddEditModal from "./components/AddEditModal";
import Correspondence from "./components/Correspondence";
import DeleteModal from "./components/DeleteModal";
import FileUpload from "./components/FileUpload";
import Header from "./components/Header";
import Main from "./components/Main";

export default function Invoice(): React.ReactElement {
  return (
    <Grid
      container
      flexDirection={"row"}
      height="100%"
      width={"100%"}
      spacing={1}
      sx={{
        backgroundColor: "#2D424E",
      }}
    >
      <Header />
      <Main />
      <AddEditModal />
      <DeleteModal />
      <Correspondence />
      <FileUpload />
    </Grid>
  );
}
