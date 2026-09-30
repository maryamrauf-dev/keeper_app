import React from "react";

import {
  Box,
  TextField,
  IconButton,
  Tooltip,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

function NoteForm({
  title,
  content,
  setTitle,
  setContent,
  addNote,
}) {
  return (
    <Box
      sx={{
        maxWidth: 700,
        mx: "auto",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
         sx={{
    "& .MuiOutlinedInput-root.Mui-focused fieldset": { borderColor: "primary.main" },
    "& .MuiInputLabel-root.Mui-focused": { color: "primary.main" },
  }}
      />

      <TextField
        label="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        multiline
        rows={5}
        fullWidth
        sx={{
    "& .MuiOutlinedInput-root.Mui-focused fieldset": { borderColor: "primary.main" },
    "& .MuiInputLabel-root.Mui-focused": { color: "primary.main" },
  }}
      />

      <Tooltip title="Add Note">
        <IconButton
          onClick={addNote}
          sx={{
            alignSelf: "flex-end",
            width: 50,
            height: 50,
            backgroundColor: "primary.main",
            color: "primary.contrastText",

            "&:hover": {
              backgroundColor: "primary.dark",
            },
          }}
        >
          <AddIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
}

export default NoteForm;
