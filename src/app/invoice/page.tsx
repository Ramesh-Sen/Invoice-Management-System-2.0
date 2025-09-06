import Grid from "@mui/material/Grid2";
import AddEditModal from "./AddEditModal";
import Correspondence from "./Correspondence";
import DeleteModal from "./DeleteModal";
import FileUpload from "./FileUpload";
import Header from "./Header";
import Main from "./Main";

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
