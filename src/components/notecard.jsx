import React from "react";

import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function NoteCard({
  note,
  index,
  deleteNote,
  editNote,
}) {

  return (
    <Card
      sx={{
        backgroundColor: "#a8f5df",
        minHeight: 180,
      }}
    >
      <CardContent
        sx={{
          position: "relative",
          height: "100%",
          boxSizing: "border-box",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            mb: 2,
          }}
        >
          {note.title}
        </Typography>

        <Typography variant="body1">
          {note.content}
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mt: 3,
          }}
        >
          <IconButton
            onClick={() => editNote(note)}
          >
            <EditIcon />
          </IconButton>

          <IconButton
            onClick={() => deleteNote(note.id)}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
}

export default NoteCard;