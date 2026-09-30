import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import NoteForm from "./components/noteform";
import NoteCard from "./components/notecard";
import Trash from "./components/trash";
import EditNoteDialog from "./components/editNoteDialog";
import Login from "./components/Login";
import Signup from "./components/Signup";
import api from "./api/axios";

function MainApp({ setLoggedIn, username }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [notes, setNotes] = useState([]);
  const [trash, setTrash] = useState([]);
  
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(() => window.innerWidth >= 900);
  const [view, setView] = useState("notes");
  const [editOpen, setEditOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  const fetchNotes = async () => {
    try {
      const { data: allNotes } = await api.get('/notes');
      setNotes(allNotes.filter(n => !n.isTrash));
      setTrash(allNotes.filter(n => n.isTrash));
    } catch (err) {
      console.log('Error fetching notes', err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const addNote = async () => {
    if (title.trim() === "" || content.trim() === "") return;
    try {
      await api.post('/notes', { title, content });
      setTitle("");
      setContent("");
      fetchNotes();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteNote = async (id) => {
    try {
      await api.put(`/notes/${id}`, { isTrash: true });
      fetchNotes();
    } catch (err) {}
  };

  const editNote = (note) => {
    setEditingNote(note);
    setEditOpen(true);
  };

  const updateNote = async () => {
    if (!editingNote || editingNote.title.trim() === "" || editingNote.content.trim() === "") return;
    try {
      await api.put(`/notes/${editingNote._id || editingNote.id}`, {
        title: editingNote.title,
        content: editingNote.content
      });
      setEditOpen(false);
      setEditingNote(null);
      fetchNotes();
    } catch (err) {}
  };

  const restoreNote = async (id) => {
    try {
      await api.put(`/notes/${id}`, { isTrash: false });
      fetchNotes();
    } catch (err) {}
  };

  const permanentlyDelete = async (id) => {
    try {
      await api.delete(`/notes/${id}`);
      fetchNotes();
    } catch (err) {}
  };

  const handleLogout = async () => {
    try {
      await api.post('/logout');
      setLoggedIn(false);
    } catch (err) {}
  };

  const handleDeleteAccount = async () => {
    try {
      await api.delete('/user');
      setLoggedIn(false);
      navigate('/signup');
    } catch (err) {}
  };

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
         <Header onMenuClick={() => setSidebarOpen(true)} showMenu={isMobile} />
      </Box>

      <Box sx={{ display: "flex", minHeight: "calc(100vh - 70px)" }}>
        <Sidebar view={view} setView={setView} open={sidebarOpen} setOpen={setSidebarOpen} username={username} handleLogout={handleLogout} handleDeleteAccount={handleDeleteAccount} />

        <Box sx={{ flex: 1 }}>
          {view === "notes" && (
            <Box sx={{ p: { xs: 2, sm: 3, lg: 4 }, minWidth: 0 }}>
              <NoteForm title={title} content={content} setTitle={setTitle} setContent={setContent} addNote={addNote} />
              
              <Box sx={{ mt: { xs: 3, sm: 5 }, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))", gap: { xs: 2, sm: 3 } }}>
                {notes.length === 0 ? (
                  <Typography sx={{ textAlign: "center", gridColumn: "1 / -1" }}>No notes yet. Add your first note!</Typography>
                ) : (
                  notes.map((note, index) => (
                    <NoteCard key={note._id} note={{...note, id: note._id}} index={index} deleteNote={() => deleteNote(note._id)} editNote={() => editNote(note)} />
                  ))
                )}
              </Box>
            </Box>
          )}

          {view === "trash" && (
            <Trash trash={trash.map(t => ({...t, id: t._id}))} restoreNote={(id) => restoreNote(id)} permanentlyDelete={(id) => permanentlyDelete(id)} />
          )}
        </Box>
      </Box>

      {editingNote && (
        <EditNoteDialog open={editOpen} note={editingNote} setNote={setEditingNote} onClose={() => { setEditOpen(false); setEditingNote(null); }} onSave={updateNote} />
      )}
    </Box>
  );
}

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await api.get('/verify');
        setLoggedIn(data.loggedIn);
        if (data.loggedIn) setUsername(data.username);
      } catch (err) {
        setLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <Routes>
      <Route path="/login" element={loggedIn ? <Navigate to="/" /> : <Login setLoggedIn={setLoggedIn} setUsername={setUsername} />} />
      <Route path="/signup" element={loggedIn ? <Navigate to="/" /> : <Signup />} />
      <Route path="/" element={loggedIn ? <MainApp setLoggedIn={setLoggedIn} username={username} /> : <Navigate to="/login" />} />
    </Routes>
  );
}

export default App;