// import React from "react";

import { Button, Card, Form } from "react-bootstrap";
import MainScreen from "../../components/MainScreen/MainScreen";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { updateNote } from "../../slices/notesSlice";
import Loading from "../../components/Loading/Loading";
import ErrorMessage from "../../components/ErrorComponent/ErrorMessage";
const API_URL = "https://react-notezipper-backend.onrender.com";
const UpdateNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { loading, error } = useSelector((state) => state.noteList);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/api/notes/${id}`);
        setTitle(data.title);
        setContent(data.content);
        setCategory(data.category);
        setDate(data.updatedAt);
      } catch (error) {
        console.error("Failed to fetch note:", error);
      }
    };
    fetchNote();
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content || !category) return;
    dispatch(updateNote({ id, title, content, category }));
    navigate("/mynotes");
  };
  return (
    <MainScreen title="Edit Note">
      <Card>
        <Card.Header>Edit your Note</Card.Header>
        <Card.Body>
          {loading && <Loading />}
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                placeholder="Enter the title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="content">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter the content"
                value={content}
                rows={4}
                onChange={(e) => {
                  setContent(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>

            {content && (
              <Card>
                <Card.Header>Note Preview</Card.Header>
                <Card.Body>
                  <ReactMarkdown>{content}</ReactMarkdown>
                </Card.Body>
              </Card>
            )}

            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the Category"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>
            {loading && <Loading />}
            <Button variant="primary" type="submit">
              Update Note
            </Button>
            <Button
              variant="danger"
              className="mx-2"
              onClick={() => navigate("/mynotes")}
            >
              Cancel
            </Button>
          </Form>
        </Card.Body>
        <Card.Footer className="text-muted">
          Updated on - {date.substring(0, 10)}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
};

export default UpdateNote;
