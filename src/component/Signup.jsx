import React, { useRef, useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { registerUser } from "../reducers/sliceLoginAuth";

const Signup = () => {
  const dispatch = useDispatch();
  const [errors, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmationRef.current.value) {
      return setError("Password Don't Match");
    }
    try {
      setError("");
      setLoading(true);
      dispatch(
        registerUser({
          email: emailRef.current.value,
          password: passwordRef.current.value,
        })
      );
      navigate("/");
    } catch (error) {
      console.log(error);
      setError("Failed to create an account");
    }
    setLoading(false);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Card className="mt-5" style={{ width: "500px" }}>
        <Card.Body>
          <h2 className="text-center mb-4">Signup</h2>
          {errors && <Alert variant="danger"> {errors}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label htmlFor="emaill">Email</Form.Label>
              <Form.Control type="email" id="emaill" ref={emailRef} required />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="password">Password</Form.Label>
              <Form.Control type="password" id="password" ref={passwordRef} />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="password-confirmation">
                Password Confirmation
              </Form.Label>
              <Form.Control
                type="password"
                id="password-confirmation"
                ref={passwordConfirmationRef}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              className="w-100 mt-2"
              disabled={loading}
            >
              Signup
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to={"/login"}>Log In</Link>
      </div>
    </div>
  );
};

export default Signup;
