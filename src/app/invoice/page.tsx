import Header from "./components/Header";
import Main from "./components/Main";
import { Paper } from "@mui/material";

export default function Invoice() {
  return (
    <Paper
      sx={{
        backgroundColor: "#2D424E",
        margin: "20px",
      }}
      elevation={1}
    >
      <Header />
      <Main />
    </Paper>
  );
}
