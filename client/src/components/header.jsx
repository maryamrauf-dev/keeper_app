import React from "react";
import EditNote from '@mui/icons-material/EditNote';
import MenuIcon from "@mui/icons-material/Menu";

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
} from "@mui/material";

function Header({ onMenuClick, showMenu }) {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: "primary.main",
        color: "text.primary",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "center",
          minHeight: { xs: 58, sm: 68 },
          position: "relative",
          px: { xs: 1.5, sm: 3 },
        }}
      >
        {showMenu && (
          <IconButton
            aria-label="Open navigation menu"
            onClick={onMenuClick}
            sx={{ position: "absolute", left: { xs: 8, sm: 16 }, color: "text.primary" }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            color: "text.primary",
            display: "flex",
            alignItems: "center",
            gap: 0.75,
            fontSize: { xs: "1.2rem", sm: "1.5rem" },
          }}
        >
          Notes Keeper
          <EditNote sx={{ color: "text.primary", fontSize: { xs: 27, sm: 32 } }} />
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;