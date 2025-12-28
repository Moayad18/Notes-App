import React, { useState } from "react";
import { Button, Card, Alert } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../reducers/sliceLoginAuth";
import { Grid, useTheme } from "@mui/material";
const Profile = () => {
  const { user } = useSelector((state) => state.loginAuth);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();

  const dispatch = useDispatch();
  const handleLogout = async () => {
    setError("");
    try {
      await dispatch(logout());
      navigate("/login");
    } catch {
      setError("Failed to log out");
    }
  };
  return (
    <Grid
      container
      justifyContent={"center"}
      alignItems={"center"}
      display={"flex"}
      sx={{ mt: 10 }}
    >
      <Grid size={{ xs: 11, sm: 10, lg: 6, xl: 4 }} maxWidth={"600px"}>
        <Card
          className="mt-5"
          style={{
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
          }}
        >
          <Card.Body>
            <h2 className="text-center mb-4">Profile</h2>
            {error && <Alert variant="danger"> {error}</Alert>}
            <strong>Email: </strong> {user && user.email}
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          <Button className="btn btn-primary" onClick={handleLogout}>
            Log out
          </Button>
        </div>
      </Grid>
    </Grid>
  );
};

export default Profile;
