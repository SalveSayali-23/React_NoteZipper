import { Button, Col, Form, Row } from "react-bootstrap";
import MainScreen from "../../components/MainScreen/MainScreen";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ErrorMessage from "../../components/ErrorComponent/ErrorMessage";
import Loading from "../../components/Loading/Loading";
import { updateProfile } from "../../slices/userSlice";
import { useNavigate } from "react-router-dom";
import "./ProfileScreen.css";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pic, setPic] = useState();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [picMessage, setPicMessage] = useState("");
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
      setPic(userInfo.pic);
    }
  }, [userInfo, navigate]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      dispatch(updateProfile({ name, email, password, pic }));
      setUpdateSuccess(true);
    }
  };

  return (
    <MainScreen title="EDIT PROFILE">
      <div>
        <Row className="profileContainer">
          <Col md={6}>
            <Form onSubmit={handleSubmit}>
              {loading && <Loading />}
              {!error && !loading && updateSuccess && (
                <ErrorMessage
                  severity="success"
                  message=" Updated Successfully"
                ></ErrorMessage>
              )}
              {error && <ErrorMessage severity="error" message={error} />}
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Form.Group>
              {picMessage && (
                <ErrorMessage severity="error">{picMessage}</ErrorMessage>
              )}
              <Form.Group controlId="pic">
                <Form.Label>Change Profile Picture</Form.Label>
                <Form.File
                  onChange={(e) => postDetails(e.target.files[0])}
                  id="custom-file"
                  type="image/png"
                  label="Upload Profile Picture"
                  custom
                />
              </Form.Group>
              <Button type="submit" variant="primary">
                Update
              </Button>
              <Button
                variant="primary"
                onClick={() => navigate("/mynotes")} // Or reset form fields to initial values
                style={{ marginLeft: "10px" }}
              >
                Cancel
              </Button>
            </Form>
          </Col>
          <Col
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src={pic} alt={name} className="profilePic" />
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
};

export default ProfileScreen;
