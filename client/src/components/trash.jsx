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
    <Box sx={{ p: { xs: 2, sm: 3, lg: 4 }, minWidth: 0 }}>
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
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))",
            gap: { xs: 2, sm: 3 },
          }}
        >
          {trash.map((note) => (
            <Card
              key={note.id}
              sx={{
                backgroundColor: "background.paper",
                border: "1px solid",
                borderColor: "divider",
                minHeight: 160,
                overflowWrap: "anywhere",
              }}
            >
              <CardContent>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "bold",
                    mb: 1.5,
                    fontSize: { xs: "1.15rem", sm: "1.3rem" },
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