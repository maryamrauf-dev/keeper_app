import React from "react";

import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  IconButton,
} from "@mui/material";

import NotesIcon from "@mui/icons-material/Notes";
import DeleteIcon from "@mui/icons-material/Delete";
import MenuIcon from "@mui/icons-material/Menu";

function Sidebar({
  view,
  setView,
  open,
  setOpen,
}) {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? 230 : 70,
        flexShrink: 0,

        "& .MuiDrawer-paper": {
          width: open ? 230 : 70,
          boxSizing: "border-box",

          backgroundColor: "#d9fff3",

          borderRight: "1px solid #42f5cb",

          overflowX: "hidden",

          transition: "width 0.3s",
        },
      }}
    >
      <Toolbar
        sx={{
          minHeight: "70px",

          display: "flex",

          justifyContent: open
            ? "space-between"
            : "center",

          px: 1,
        }}
      >
        {open && (
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "#222",
            }}
          >
            Menu
          </Typography>
        )}

        <IconButton
          onClick={() => setOpen(!open)}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>

      <List>
        {/* Notes */}
        <ListItemButton
          selected={view === "notes"}
          onClick={() => setView("notes")}
          sx={{
            py: 1.5,

            "&:hover": {
              backgroundColor: "#c4fbed",
            },

            "&.Mui-selected": {
              backgroundColor: "#a8f5df",
            },

            "&.Mui-selected:hover": {
              backgroundColor: "#c4fbed",
            },
          }}
        >
          <ListItemIcon>
            <NotesIcon />
          </ListItemIcon>

          {open && (
            <ListItemText
              primary="Notes"
              primaryTypographyProps={{
                fontWeight: "bold",
              }}
            />
          )}
        </ListItemButton>

        {/* Trash */}
        <ListItemButton
          selected={view === "trash"}
          onClick={() => setView("trash")}
          sx={{
            py: 1.5,

            "&:hover": {
              backgroundColor: "#c4fbed",
            },

            "&.Mui-selected": {
              backgroundColor: "#a8f5df",
            },

            "&.Mui-selected:hover": {
              backgroundColor: "#c4fbed",
            },
          }}
        >
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>

          {open && (
            <ListItemText
              primary="Trash"
              primaryTypographyProps={{
                fontWeight: "bold",
              }}
            />
          )}
        </ListItemButton>
      </List>
    </Drawer>
  );
}

export default Sidebar;
