import { useState } from "react";
import MainScreen from "../../components/MainScreen/MainScreen";
import "./RegisterScreen.css";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ErrorMessage from "../../components/ErrorComponent/ErrorMessage";
// import axios from "axios";
import Loading from "../../components/Loading/Loading";
import { useDispatch } from "react-redux";
import { register } from "../../slices/userRegister";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pic, setPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [message, setMessage] = useState(null);
  const [picMessage, setPicMessage] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const {userInfo} = useSelector((state) => state.user); //access user info from redux store

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      setMessage(null);
      setLoading(true);
      try {
        // Dispatch the register action
        const resultAction = await dispatch(
          register({ name, email, password, pic })
        );

        if (register.fulfilled.match(resultAction)) {
          console.log("Registration successful:", resultAction.payload);
          // Handle successful registration (e.g., redirect user)

          navigate("/login");
        } else {
          // Registration failed, handle error here
          setError(resultAction.payload || "An unexpected error occurred");
        }
      } catch (error) {
        console.error("An unexpected error occurred:", error);
        setError(error.message || "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    }
  };

  const postDetails = (pics) => {
    if (!pics) {
      return setPicMessage("Please Select an Image");
    }
    setPicMessage(null);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "mernNotezipper");
      data.append("cloud_name", "dfj5lqm8g");
      fetch("https://api.cloudinary.com/v1_1/dfj5lqm8g/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setPic(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setPicMessage("Please select an image");
    }
  };

  return (
    <MainScreen title="REGISTER">
      <div className="registerContainer">
        {error && <ErrorMessage message={error} />}
        {message && <ErrorMessage message={message} />}
        {loading && <Loading />}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
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
          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder=" Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
          {picMessage && <ErrorMessage message={picMessage} />}

          <Form.Group controlId="pic">
            <Form.Label>Profile Picture</Form.Label>
            <Form.File
              onChange={(e) => postDetails(e.target.files[0])}
              id="custom-file"
              type="image/png"
              label="Upload Profile Picture"
              custom
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            Have an Account ? <Link to="/login">Login</Link>
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
};
export default RegisterScreen;
