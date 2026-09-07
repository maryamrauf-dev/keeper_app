import { Box, Typography } from "@mui/material";
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import NoteForm from "./components/noteform";
import NoteCard from "./components/notecard";
import Trash from "./components/trash";
import EditNoteDialog from "./components/editNoteDialog";
import React, { useEffect, useState } from "react";

function App() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [notes, setNotes] = useState([]);
  const [trash, setTrash] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [view, setView] = useState("notes");

  const [editOpen, setEditOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  const addNote = () => {
    if (
      title.trim() === "" ||
      content.trim() === ""
    ) {
      return;
    }

    const newNote = {
      id: Date.now(),
      title: title.trim(),
      content: content.trim(),
    };

    setNotes((prevNotes) => [
      ...prevNotes,
      newNote,
    ]);

    setTitle("");
    setContent("");
  };

  const deleteNote = (id) => {
    const noteToDelete = notes.find(
      (note) => note.id === id
    );

    if (!noteToDelete) {
      return;
    }

    setNotes((prevNotes) =>
      prevNotes.filter(
        (note) => note.id !== id
      )
    );

    setTrash((prevTrash) => [
      ...prevTrash,
      noteToDelete,
    ]);
  };

  const editNote = (note) => {
    setEditingNote(note);
    setEditOpen(true);
  };

  const updateNote = () => {
  if (!editingNote) {
    return;
  }

  if (
    editingNote.title.trim() === "" ||
    editingNote.content.trim() === ""
  ) {
    return;
  }

  setNotes((prevNotes) =>
    prevNotes.map((note) =>
      note.id === editingNote.id
        ? {
            ...note,
            title: editingNote.title.trim(),
            content: editingNote.content.trim(),
          }
        : note
    )
  );

  setEditOpen(false);
  setEditingNote(null);
};

  const restoreNote = (id) => {
    const noteToRestore = trash.find(
      (note) => note.id === id
    );

    if (!noteToRestore) {
      return;
    }

    setTrash((prevTrash) =>
      prevTrash.filter(
        (note) => note.id !== id
      )
    );

    setNotes((prevNotes) => [
      ...prevNotes,
      noteToRestore,
    ]);
  };

  const permanentlyDelete = (id) => {
    setTrash((prevTrash) =>
      prevTrash.filter(
        (note) => note.id !== id
      )
    );
  };


return (
  <Box
    sx={{
      minHeight: "100vh",
    }}
  >
    <Header />

    <Box
      sx={{
        display: "flex",
        minHeight: "calc(100vh - 70px)",
      }}
    >
      <Sidebar
        view={view}
        setView={setView}
        open={sidebarOpen}
        setOpen={setSidebarOpen}
      />

      <Box
        sx={{
          flex: 1,
        }}
      >
        {view === "notes" && (
          <Box sx={{ p: 4 }}>
            <NoteForm
              title={title}
              content={content}
              setTitle={setTitle}
              setContent={setContent}
              addNote={addNote}
            />

            <Box
              sx={{
                mt: 5,

                display: "grid",

                gridTemplateColumns:
                  "repeat(2, 1fr)",

                gap: 3,
              }}
            >
              {notes.length === 0 ? (
                <Typography
                  sx={{
                    textAlign: "center",
                    gridColumn: "1 / -1",
                  }}
                >
                  No notes yet. Add your first note!
                </Typography>
              ) : (
                notes.map((note, index) => (
                  <NoteCard
                    key={note.id}
                    note={note}
                    index={index}
                    deleteNote={deleteNote}
                    editNote={editNote}
                  />
                ))
              )}
            </Box>
          </Box>
        )}

        {view === "trash" && (
          <Trash
            trash={trash}
            restoreNote={restoreNote}
            permanentlyDelete={
              permanentlyDelete
            }
          />
        )}
      </Box>
    </Box>

    {editingNote && (
      <EditNoteDialog
        open={editOpen}
        note={editingNote}
        setNote={setEditingNote}
        onClose={() => {
          setEditOpen(false);
          setEditingNote(null);
        }}
        onSave={updateNote}
      />
    )}
  </Box>
);

}

export default App;