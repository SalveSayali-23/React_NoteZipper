// import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import MainScreen from "../../components/MainScreen/MainScreen";
import { Link, useNavigate } from "react-router-dom";
import "./LoginScreen.css";
import { useState } from "react";
// import axios from "axios";
import Loading from "../../components/Loading/Loading";
import ErrorMessage from "../../components/ErrorComponent/ErrorMessage";
import { useDispatch } from "react-redux";
import { login } from "../../slices/userSlice";
// import store from "../../store/Store";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const resultAction = await dispatch(login({ email, password }));
      // const resultAction = await dispatch(login({ email: 'test@example.com', password: 'password123' }));
      // console.log("Login Result:", resultAction);
      // console.log("Updated State:", store.getState());
      // console.log(
      //   "Local Storage User Info:",
      //   JSON.parse(localStorage.getItem("userInfo"))
      // );

      if (login.fulfilled.match(resultAction)) {
        // console.log("Login successful:", resultAction.payload);
        // Handle successful login (e.g., redirect user)

        navigate("/mynotes");
      } else {
        // Login failed, handle error here
        setError(resultAction.payload);
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      setError(error.response.data.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <MainScreen title="LOGIN">
        <div className="loginContainer">
          {error && <ErrorMessage message="Invalid Email or Password!" />}
          {loading && <Loading />}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          <Row className="py-3">
            <Col>
              New Customer? <Link to="/register">Register Here</Link>
            </Col>
          </Row>
        </div>
      </MainScreen>
    </>
  );
};
export default LoginScreen;
