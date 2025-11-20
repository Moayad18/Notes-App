import React, { useEffect, useState, useMemo } from "react";
import Container from "@mui/material/Container";
import Note from "./note";
import Grid from "@mui/material/Grid";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import { ThemeProvider } from "@emotion/react";
import { getDesignTokens } from "../theme";
import { createTheme } from "@mui/material";
import {
  Stack,
  Typography,
  TextField,
  Divider,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { pin, add, del, edit } from "../reducers/sliceNote";
const MainContent = () => {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.note.notes);
  const [mode, setMode] = useState(
    localStorage.getItem("currentMode") ?? "light"
  );
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  document.querySelector("body").style.backgroundColor = `${
    mode == "light" ? "rgb(255 246 229)" : theme.palette.background.default
  }`;
  const [infoNote, setInfoNote] = useState({
    id: "",
    title: "",
    body: "",
    fullDate: {
      date: "",
      time: "",
    },
  });
  const [search, setSearch] = React.useState("");
  const [openDialogAdd, setOpenDialogAdd] = React.useState(false);
  const [openDialogEdit, setOpenDialogEdit] = React.useState(false);
  const [openDialogDelete, setOpenDialogDelete] = React.useState(false);
  const [openDialogFullScreen, setOpenDialogFullScreen] = React.useState(false);

  const handleClickOpen = () => {
    setOpenDialogAdd(true);
    setInfoNote({
      id: "",
      title: "",
      body: "",
      fullDate: { date: "", time: "" },
    });
  };

  const handleClickEdit = (note) => {
    setOpenDialogEdit(true);
    setInfoNote(note);
  };
  const handleClickDelete = (note) => {
    setOpenDialogDelete(true);
    setInfoNote(note);
  };
  const handleClickFullScreen = (note) => {
    setOpenDialogFullScreen(true);
    setInfoNote(note);
  };
  const handleClose = () => {
    setOpenDialogAdd(false);
    setOpenDialogEdit(false);
    setOpenDialogDelete(false);
    setOpenDialogFullScreen(false);
  };

  useEffect(() => {
    JSON.parse(localStorage.getItem("notes")) ?? [];
  }, [notes]);

  const addNote = () => {
    if (infoNote.title !== "" && infoNote.body !== "") {
      dispatch(add(infoNote));
      setOpenDialogAdd(false);
    } else {
      if (infoNote.title == "" || infoNote.body == "") {
        document.querySelector(".errorMsg").innerHTML =
          "Please Enter The Title Or Body Before Send";
        setTimeout(() => {
          document.querySelector(".errorMsg").innerHTML = "";
        }, 1500);
      }
    }
  };

  const pinNote = (note) => {
    dispatch(pin(note));
  };
  const editNote = () => {
    dispatch(edit(infoNote));
    setOpenDialogEdit(false);
  };
  const deleteNote = () => {
    dispatch(del(infoNote));
    setOpenDialogDelete(false);
  };

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      return (
        note.title.toLowerCase().includes(search.toLowerCase()) ||
        note.body.toLowerCase().includes(search.toLowerCase())
      );
    });
  }, [notes, search]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container maxWidth="xl">
          {mode == "light" ? (
            <div
              onClick={() => {
                setMode("dark");
              }}
              style={{ cursor: "pointer", width: " fit-content" }}
            >
              <DarkModeOutlinedIcon />
            </div>
          ) : (
            <div
              onClick={() => {
                setMode("light");
              }}
              style={{
                cursor: "pointer",
                width: " fit-content",
                color: "yellow",
              }}
            >
              <LightModeOutlinedIcon />
            </div>
          )}
          <Stack
            direction={"column"}
            gap={2}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Stack
              direction={"row"}
              gap={2}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <div>
                <img
                  src="/images/note.png"
                  alt="note"
                  style={{ width: "50px", height: "50px" }}
                />
              </div>
              <Typography
                variant="h3"
                sx={{
                  textTransform: "uppercase",
                  color: mode == "light" ? "black" : "white",
                }}
              >
                notes
              </Typography>
            </Stack>
            <TextField
              sx={{ borderRadius: "12px", width: "40%", marginBottom: "20px" }}
              variant="outlined"
              placeholder="Search for a note ..."
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              value={search}
            />
          </Stack>
          <Divider />

          <Stack direction={"column"} mt={3}>
            <Stack alignItems={"center"}>
              <img
                onClick={handleClickOpen}
                src="/images/addNote.png"
                alt="note"
                style={{
                  width: "50px",
                  height: "50px",
                  cursor: "pointer",
                  marginBottom: "20px",
                }}
              />
            </Stack>
            <Grid container spacing={6}>
              {filteredNotes.map((note) => {
                return (
                  <Note
                    key={note.id}
                    note={note}
                    pinNote={pinNote}
                    handleClickEdit={handleClickEdit}
                    handleClickDelete={handleClickDelete}
                    handleClickFullScreen={handleClickFullScreen}
                  />
                );
              })}
            </Grid>
          </Stack>
        </Container>
        {/* START DIALOG ADD NOTE */}
        <>
          <Dialog open={openDialogAdd} onClose={handleClose}>
            <DialogTitle>Add Note</DialogTitle>
            <DialogContent>
              <TextField
                style={{ marginBottom: "10px" }}
                autoFocus
                required
                margin="dense"
                id="name"
                placeholder="Title"
                type="text"
                fullWidth
                variant="filled"
                value={infoNote.title}
                onChange={(e) => {
                  setInfoNote({ ...infoNote, title: e.target.value });
                }}
              />
              <TextField
                required
                placeholder="Write Your Note ..."
                margin="dense"
                id="title"
                name="title"
                type="text"
                multiline
                rows={4}
                fullWidth
                variant="filled"
                value={infoNote.body}
                onChange={(e) => {
                  setInfoNote({ ...infoNote, body: e.target.value });
                }}
              />
              <Typography
                className="errorMsg"
                variant="body2"
                color="red"
              ></Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={addNote}>Add Note</Button>
            </DialogActions>
          </Dialog>
        </>
        {/* END DIALOG ADD NOTE */}
        {/* START DIALOG Edit NOTE */}
        <>
          <Dialog open={openDialogEdit} onClose={handleClose}>
            <DialogTitle>Edit Note</DialogTitle>
            <DialogContent>
              <TextField
                style={{ marginBottom: "10px" }}
                autoFocus
                required
                margin="dense"
                id="name"
                placeholder="Title"
                type="text"
                fullWidth
                variant="filled"
                value={infoNote.title}
                onChange={(e) => {
                  setInfoNote({ ...infoNote, title: e.target.value });
                }}
              />
              <TextField
                required
                placeholder="Write Your Note ..."
                margin="dense"
                id="title"
                name="title"
                type="text"
                multiline
                rows={4}
                fullWidth
                variant="filled"
                value={infoNote.body}
                onChange={(e) => {
                  setInfoNote({ ...infoNote, body: e.target.value });
                }}
              />
              <Typography
                className="errorMsg"
                variant="body2"
                color="red"
              ></Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={editNote}>Edit</Button>
            </DialogActions>
          </Dialog>
        </>
        {/* END DIALOG Edit NOTE */}
        {/* START DIALOG DELETE NOTE */}
        <>
          <Dialog
            open={openDialogDelete}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are You Sure Delete The Note?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={deleteNote}>Delete</Button>
            </DialogActions>
          </Dialog>
        </>
        {/* END DIALOG DELETE NOTE */}
        {/* START DIALOG FULL SCREEN NOTE */}
        <>
          <Dialog open={openDialogFullScreen} onClose={handleClose}>
            <DialogContent sx={{ width: "500px" }}>
              <DialogTitle>{infoNote.title}</DialogTitle>
              <DialogContent
                sx={{ paddingBottom: 0 }}
                id="alert-dialog-description"
              >
                {infoNote.body}
              </DialogContent>
            </DialogContent>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
              color={"gray"}
              padding={2}
            >
              <Typography variant="body2">{infoNote.fullDate.date}</Typography>
              <Typography variant="body2">{infoNote.fullDate.time}</Typography>
            </Stack>
          </Dialog>
        </>
        {/* END DIALOG FULL SCREEN NOTE */}
      </ThemeProvider>
    </>
  );
};

export default MainContent;
