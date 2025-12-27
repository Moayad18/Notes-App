/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { Button, Card, Form, Alert } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../reducers/sliceLoginAuth";
import { useTheme } from "@mui/material";
const Login = () => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.loginAuth);
  const [errors, setError] = useState("");
  const location = useLocation();
  const redirectPath = location.state?.from?.pathname || "/";
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.loginAuth);
  const theme = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      dispatch(
        loginUser({
          email: emailRef.current.value,
          password: passwordRef.current.value,
        })
      );
    } catch (error) {
      console.log(error);
      setError("Failed to create an account");
    }
  };
  useEffect(() => {
    if (user) {
      navigate(redirectPath, { replace: true });
    }
  }, [user, navigate, redirectPath]);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Card
        className="mt-5"
        style={{
          width: "500px",
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
        }}
      >
        <Card.Body>
          <h2 className="text-center mb-4">Login</h2>
          {errors && <Alert variant="danger"> {errors}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label htmlFor="emaill">Email</Form.Label>
              <Form.Control type="email" id="emaill" ref={emailRef} />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="password">Password</Form.Label>
              <Form.Control type="password" id="password" ref={passwordRef} />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              className="w-100 mt-2"
              disabled={isLoading}
            >
              Login
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to={"/forget-password"}>Forget Password</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to={"/signup"}>Sign Up</Link>
      </div>
    </div>
  );
};

export default Login;
