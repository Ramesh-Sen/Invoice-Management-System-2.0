"use client";

import { usePathname } from "next/navigation";
import Grid from "@mui/material/Grid2";
import { Divider, Typography } from "@mui/material";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactNode {
  const path = usePathname();

  return (
    <Grid
      container
      height={"100%"}
      width={"100%"}
      justifyContent={"center"}
      alignItems={"center"}
      p={2}
    >
      <Grid
        container
        width="31rem"
        bgcolor="#2D424E"
        border={1}
        borderColor="#000"
        borderRadius="0.5rem"
        p={3}
      >
        <Typography variant="h4" color="whitesmoke">
          {path.includes("login") ? "Login" : "Sign Up"}
        </Typography>
        <Divider
          variant="fullWidth"
          color="black"
          sx={{
            width: "100%",
            my: "1.2rem",
          }}
        />
        {children}
      </Grid>
    </Grid>
  );
}
