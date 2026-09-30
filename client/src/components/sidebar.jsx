import React, { useState } from "react";

import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Popover,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import NotesIcon from "@mui/icons-material/Notes";
import DeleteIcon from "@mui/icons-material/Delete";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";

function Sidebar({
  view,
  setView,
  open,
  setOpen,
  username,
  handleLogout,
  handleDeleteAccount,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [anchorEl, setAnchorEl] = useState(null);

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleViewChange = (nextView) => {
    setView(nextView);
    if (isMobile) setOpen(false);
  };

  const isMenuOpen = Boolean(anchorEl);

  return (
    <Drawer
      variant={isMobile ? "temporary" : "permanent"}
      open={isMobile ? open : true}
      onClose={() => setOpen(false)}
      ModalProps={{ keepMounted: true }}
      sx={{
        width: isMobile ? 0 : open ? 230 : 70,
        flexShrink: 0,

        "& .MuiDrawer-paper": {
          width: isMobile ? 270 : open ? 230 : 70,
          boxSizing: "border-box",
          backgroundColor: "background.paper",
          borderRight: "1px solid",
          borderColor: "divider",
          overflowX: "hidden",
          transition: "width 0.3s",
        },
      }}
    >
      <Toolbar
        sx={{
          minHeight: { xs: 58, sm: 68 },
          display: "flex",
          justifyContent: open ? "space-between" : "center",
          px: 1,
        }}
      >
        {open && (
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "secondary.dark",
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
          onClick={() => handleViewChange("notes")}
          sx={{
            py: 1.5,

            "&:hover": { backgroundColor: "primary.light" },
            "&.Mui-selected": { backgroundColor: "primary.light", color: "primary.dark" },
            "&.Mui-selected:hover": { backgroundColor: "primary.light" },
          }}
        >
          <ListItemIcon>
            <NotesIcon />
          </ListItemIcon>

          {open && (
            <ListItemText
              primary={<Typography fontWeight="bold">Notes</Typography>}
            />
          )}
        </ListItemButton>

        {/* Trash */}
        <ListItemButton
          selected={view === "trash"}
          onClick={() => handleViewChange("trash")}
          sx={{
            py: 1.5,

            "&:hover": { backgroundColor: "primary.light" },
            "&.Mui-selected": { backgroundColor: "primary.light", color: "primary.dark" },
            "&.Mui-selected:hover": { backgroundColor: "primary.light" },
          }}
        >
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>

          {open && (
            <ListItemText
              primary={<Typography fontWeight="bold">Trash</Typography>}
            />
          )}
        </ListItemButton>
      </List>

      <Box sx={{ flexGrow: 1 }} />

      <List>
        <ListItemButton
          onClick={handleProfileClick}
          sx={{
            py: 1.5,
            "&:hover": { backgroundColor: "primary.light" }
          }}
        >
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>

          {open && (
            <>
              <ListItemText
                primary={<Typography fontWeight="bold" sx={{ color: "secondary.dark" }}>{username || "User"}</Typography>}
              />
              <KeyboardArrowRightIcon />
            </>
          )}
        </ListItemButton>
      </List>

      <Popover
        open={isMenuOpen}
        anchorEl={anchorEl}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <List sx={{ p: 0 }}>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon color="error" />
            </ListItemIcon>
            <ListItemText primary="Logout" sx={{ color: "error.main" }} />
          </ListItemButton>
          <ListItemButton onClick={handleDeleteAccount}>
            <ListItemIcon>
              <PersonRemoveIcon color="error" />
            </ListItemIcon>
            <ListItemText primary="Delete Account" sx={{ color: "error.main" }} />
          </ListItemButton>
        </List>
      </Popover>
    </Drawer>
  );
}

export default Sidebar;
