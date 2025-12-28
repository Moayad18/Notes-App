import { Stack, Typography, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid";
import EditNoteIcon from "@mui/icons-material/EditNote";
import CloseIcon from "@mui/icons-material/Close";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";

const Note = ({
  note,
  pinNote,
  handleClickEdit,
  handleClickDelete,
  handleClickFullScreen,
}) => {
  const theme = useTheme();
  return (
    <Grid
      sx={{
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.background.paper,
        borderRadius: "10px",
        height: "200px",
        width: "250px",
        padding: "10px",
        boxShadow: " 0 4px 6px -1px #0000001a",
        placeContent: "center",
      }}
      className="note"
    >
      <Stack direction={"row"} alignItems={"center"}>
        <div
          onClick={() => {
            pinNote(note);
          }}
          style={{
            cursor: "pointer",
            color: note.isPined ? "red" : "grey",
            marginRight: "auto",
          }}
        >
          <PushPinOutlinedIcon />
        </div>
        <div
          onClick={() => {
            handleClickEdit(note);
          }}
          style={{ cursor: "pointer" }}
        >
          <EditNoteIcon />
        </div>
        <div
          onClick={() => {
            handleClickDelete(note);
          }}
          style={{ cursor: "pointer", color: "red" }}
        >
          <CloseIcon />
        </div>
        <div
          onClick={() => {
            handleClickFullScreen(note);
          }}
          style={{ cursor: "pointer" }}
        >
          <FullscreenIcon />
        </div>
      </Stack>

      <Stack pl={2} gap={3}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {note.title}
        </Typography>
        <Typography variant="body1"> {note.body}</Typography>
      </Stack>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        sx={{ mt: "40px", padding: "8px" }}
      >
        <Typography variant="body2" color="grey">
          {note.fullDate.date}
        </Typography>
        <Typography variant="body2" color="grey">
          {note.fullDate.time}
        </Typography>
      </Stack>
    </Grid>
  );
};

export default Note;
