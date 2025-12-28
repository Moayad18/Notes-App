import React from "react";
import { Grid, useTheme } from "@mui/material";
import { NavLink } from "react-router";
import { Button } from "@mui/material";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import { useSelector } from "react-redux";
function Navbar({ change }) {
  const theme = useTheme();
  const sharedLinkStyle = {
    fontSize: "24px",
    textTransform: "none",
    mx: 1,
    transition: "0.3s",
    color: "text.primary",

    // الهوفر (Hover)
    "&:hover": {
      color: "primary.main",
      backgroundColor: "transparent",
      transform: "translateY(-2px)",
    },

    // الأكشن (Active)
    "&.active": {
      color: "primary.main",
      fontWeight: "bold",
      borderBottom: "3px solid",
    },
  };
  const { user } = useSelector((state) => state.loginAuth);
  console.log(user);
  return (
    <Grid
      container
      maxWidth="xl"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Grid size={{ xs: 6 }} style={{ display: "flex", fontSize: "24px" }}>
        <Button component={NavLink} sx={sharedLinkStyle} to={"/"}>
          Home
        </Button>
        <Button component={NavLink} sx={sharedLinkStyle} to={"/profile"}>
          Profile
        </Button>
        {!user && (
          <Button component={NavLink} sx={sharedLinkStyle} to={"/login"}>
            Login
          </Button>
        )}
      </Grid>
      {theme.palette.mode == "light" ? (
        <div
          onClick={() => {
            change("dark");
          }}
          style={{ cursor: "pointer", width: " fit-content" }}
        >
          <DarkModeOutlinedIcon />
        </div>
      ) : (
        <div
          onClick={() => {
            change("light");
          }}
          style={{
            cursor: "pointer",
            width: " fit-content",
            color: "yellow",
            textAlign: "right",
          }}
        >
          <LightModeOutlinedIcon />
        </div>
      )}
    </Grid>
  );
}

export default Navbar;
