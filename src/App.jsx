import "./App.css";
import MainContent from "./component/MainContent";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import Navbar from "./component/Navbar";
import { useEffect, useMemo, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import { getDesignTokens } from "./theme";
import Login from "./component/Login";
import { Container } from "react-bootstrap";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./reducers/sliceLoginAuth";
import Signup from "./component/Signup";
import Profile from "./component/Profile";
import RequireAuth from "./component/RequireAuth";
function App() {
  const dispatch = useDispatch();
  const { isLoading, user } = useSelector((state) => state.loginAuth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        dispatch(setUser({ uid: firebaseUser.uid, email: firebaseUser.email }));
      } else {
        dispatch(setUser(null));
      }
    });
    return () => unsubscribe();
  }, [dispatch]);
  const [mode, setMode] = useState("light");
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  document.querySelector("body").style.backgroundColor =
    theme.palette.background.default;
  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  return (
    <ThemeProvider theme={theme}>
      <Container maxwidth="xl">
        <Router>
          <Navbar change={(lastMode) => setMode(lastMode)} />
          <Routes>
            <Route
              path="/"
              element={
                <RequireAuth>
                  <MainContent />
                </RequireAuth>
              }
            ></Route>
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to={"/"} />}
            ></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route
              path="/profile"
              element={
                <RequireAuth>
                  <Profile />
                </RequireAuth>
              }
            ></Route>
          </Routes>
        </Router>
      </Container>
    </ThemeProvider>
  );
}

export default App;
