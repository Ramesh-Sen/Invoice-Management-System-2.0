"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Logout from "@mui/icons-material/Logout";
import Settings from "@mui/icons-material/Settings";
import { openUploadModal, setCommonError } from "@/redux/reducers/invoiceSlice";
import { useDispatch } from "react-redux";
import { setInvoiceDatas } from "@/redux/reducers/invoiceSlice";
import { useRouter } from "next/navigation";
import Grid from "@mui/material/Grid2";

export default function Header(): React.ReactElement {
  const dispatch = useDispatch();
  const router = useRouter();

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (): void => {
    setAnchorElUser(null);
  };

  const handleLogOutUser = (): void => {
    fetch("/api/users/logout")
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        dispatch(setInvoiceDatas([]));
        router.push("/users/login");
      })
      .catch((err) => {
        console.log(err);
        router.push("/users/login");
        dispatch(setCommonError(err?.message || err?.error || "Something Went Wrong"));
      });
  };

  const [user, setUser] = useState({ name: "", email: "" });

  useEffect(() => {
    fetch("/api/users/getLoggedInUser")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
        dispatch(setCommonError(err?.message || err?.error || "Something Went Wrong"));
      });
  }, []);

  return (
    <Grid
      container
      width="100%"
      height={"6%"}
      bgcolor="#4A6375"
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Grid container size={6}>
        <Image src="/favicon.ico" alt="RS" width="30" height="30" />
        <Typography
          variant="h6"
          sx={{
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
          }}
        >
          RS
        </Typography>
      </Grid>
      <Grid container size={6} justifyContent={"flex-end"} alignItems={"center"}>
        <Typography>{user?.name}</Typography>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt={user?.name} src="/next.svg" />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {/* {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                </MenuItem>
              ))} */}

          <MenuItem onClick={handleCloseUserMenu}>
            <Avatar /> Profile
          </MenuItem>
          <MenuItem onClick={() => dispatch(openUploadModal(true))}>
            <Avatar /> File Upload
          </MenuItem>
          <MenuItem onClick={handleCloseUserMenu}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>
          <MenuItem onClick={handleLogOutUser}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Grid>
    </Grid>
  );
}
