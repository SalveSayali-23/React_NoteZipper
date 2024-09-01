import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainScreen from "../../components/MainScreen/MainScreen";
import { Button, Card, Form } from "react-bootstrap";
import ErrorMessage from "../../components/ErrorComponent/ErrorMessage";
import ReactMarkdown from "react-markdown";
import Loading from "../../components/Loading/Loading";
import { createNote } from "../../slices/noteSlice";
import { useNavigate } from "react-router-dom";
const CreateNotes = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, note } = useSelector((state) => state.note);
  console.log("note:", note);

  const handleReset = () => {
    setTitle("");
    setContent("");
    setCategory("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content || !category) return;
    dispatch(createNote({ title, content, category }));
    handleReset();
    navigate("/mynotes");
  };

  return (
    <MainScreen title="Create a Note">
      <Card>
        <Card.Header>Create a New Note</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                placeholder="Enter the title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="content">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter the content"
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />

              {content && (
                <Card>
                  <Card.Header>Note Prview</Card.Header>
                  <Card.Body>
                    <ReactMarkdown>{content}</ReactMarkdown>
                  </Card.Body>
                </Card>
              )}
            </Form.Group>
            <Form.Group controlId="content">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="content"
                placeholder="Enter the category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>
            {loading && <Loading />}
            <Button type="submit" variant="primary">
              Create Note
            </Button>
            <Button className="mx-2" variant="danger" onClick={handleReset}>
              Reset Feilds
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer>
          Created on - {new Date().toLocaleDateString()}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
};

export default CreateNotes;
