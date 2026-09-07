import React from "react";
import EditNote from '@mui/icons-material/EditNote';

import {
  AppBar,
  Toolbar,
  Typography,
} from "@mui/material";

import NoteIcon from "@mui/icons-material/Note";

function Header() {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: "#42f5cb",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "center",
          minHeight: "70px",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: "#222",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          Notes Keeper
          <EditNote fontSize="large" />
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;