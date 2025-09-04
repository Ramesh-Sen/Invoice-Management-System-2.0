"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import ListItemIcon from "@mui/material/ListItemIcon";
import Logout from "@mui/icons-material/Logout";
import Settings from "@mui/icons-material/Settings";
import { openUploadModal } from "@/redux/reducers/modalSlice";
import { useDispatch } from "react-redux";
import { setInvoiceDatas } from "@/redux/reducers/invoiceDataSlice";
import { useRouter } from "next/navigation";

export default function Header() {
  const dispatch = useDispatch();
  const router = useRouter();
  const pages = ["Products", "Pricing", "Blog"];
  const settings = ["Profile", "Account", "Dashboard", "Logout"];

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null,
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogOutUser = () => {
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
      });
  }, []);

  return (
    <AppBar position="fixed">
      <Container maxWidth={false}>
        <Toolbar disableGutters>
          <Image
            className="logo h-[60px] w-[60px]"
            src="/favicon.ico"
            alt="RS"
            width="30"
            height="30"
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            RS
          </Typography>
          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "end" }}>
            {user?.name}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
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
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
