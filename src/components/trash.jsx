import React from "react";

import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
} from "@mui/material";

import RestoreIcon from "@mui/icons-material/Restore";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

function Trash({
  trash,
  restoreNote,
  permanentlyDelete,
}) {
  return (
    <Box sx={{ p: 4 }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          mb: 4,
        }}
      >
        Trash
      </Typography>

      {trash.length === 0 ? (
        <Typography  >
          Trash is empty.
        </Typography>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 3,
          }}
        >
          {trash.map((note) => (
            <Card
              key={note.id}
              sx={{
                backgroundColor: "#eeeeee",
                minHeight: 180,
              }}
            >
              <CardContent>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "bold",
                    mb: 2,
                  }}
                >
                  {note.title}
                </Typography>

                <Typography>
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
                    onClick={() =>
                      restoreNote(note.id)
                    }
                    title="Restore"
                  >
                    <RestoreIcon />
                  </IconButton>

                  <IconButton
                    onClick={() =>
                      permanentlyDelete(note.id)
                    }
                    title="Delete permanently"
                  >
                    <DeleteForeverIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
}

export default Trash;