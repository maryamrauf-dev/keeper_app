import React from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

function EditNoteDialog({
  open,
  note,
  setNote,
  onClose,
  onSave,
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        Edit Note
      </DialogTitle>

      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          pt: 2,
        }}
      >
        <TextField
          label="Title"
          value={note.title}
          onChange={(e) =>
            setNote({
              ...note,
              title: e.target.value,
            })
          }
          fullWidth
        />

        <TextField
          label="Content"
          value={note.content}
          onChange={(e) =>
            setNote({
              ...note,
              content: e.target.value,
            })
          }
          multiline
          rows={5}
          fullWidth
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={onSave}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditNoteDialog;