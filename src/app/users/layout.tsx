"use client";

import { usePathname } from "next/navigation";
import Grid from "@mui/material/Grid2";
import { Typography } from "@mui/material";
import StyledDivider from "@/components/StyledDivider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactNode {
  const path = usePathname();

  return (
    <Grid container height={"100%"} width={"100%"} justifyContent={"center"} alignItems={"center"}>
      <Grid
        container
        flexDirection={"column"}
        width="31rem"
        bgcolor="#2D424E"
        border={1}
        borderColor="#000"
        borderRadius="0.5rem"
      >
        <Typography variant="h4" color="whitesmoke" p={2}>
          {path.includes("login") ? "Login" : "Sign Up"}
        </Typography>

        <StyledDivider />

        {children}
      </Grid>
    </Grid>
  );
}
