// import React from 'react'

import { Link, useNavigate } from "react-router-dom";
import MainScreen from "../../components/MainScreen/MainScreen";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
// import notes from "../../data/notes";
import { useEffect } from "react";
// import axios from "axios";
import { listNotes, deleteNote } from "../../slices/notesSlice";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../../components/ErrorComponent/ErrorMessage";
import Loading from "../../components/Loading/Loading";
// import { login } from "../../slices/userSlice";

// eslint-disable-next-line react/prop-types
const MyNotes = ({ search }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const noteList = useSelector((state) => state.noteList);
  const { loading, notes, error } = noteList;

  const user = useSelector((state) => state.user);
  const { userInfo } = user;
  // console.log(userInfo);
  // console.log(noteList);
  const reversedNotes = [...notes].reverse();

  useEffect(() => {
    if (!userInfo) {
      navigate("/"); // Redirect to home if not logged in
    } else {
      dispatch(listNotes()); // Fetch notes if user is logged in
    }
  }, [dispatch, navigate, userInfo]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      dispatch(deleteNote(id)); // Dispatch the deleteNote thunk
    }
  };

  return (
    <MainScreen title={`Welcome Back ${userInfo?.name || ""}...`}>
      <Link to="/createnote">
        <Button style={{ maginLeft: 10, marginBottom: 6 }} size="lg">
          Create New Note
        </Button>
      </Link>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {loading && <Loading />}
      {reversedNotes
        .filter((filteredNote) =>
          // eslint-disable-next-line react/prop-types
          filteredNote.title.toLowerCase().includes(search.toLowerCase())
        )
        .map((note) => (
          <Accordion key={note._id}>
            <Card style={{ margin: 15 }}>
              <Card.Header style={{ display: "flex" }}>
                <span
                  style={{
                    color: "black",
                    textDecoration: "none",
                    flex: 1,
                    alignSelf: "center",
                    fontSize: 18,
                    cursor: "pointer",
                  }}
                >
                  <Accordion.Toggle as={Card.Text} eventKey="0" variant="link">
                    {note.title}
                  </Accordion.Toggle>
                </span>
                <div>
                  <Button href={`/note/${note._id}`}>Edit</Button>
                  <Button
                    variant="danger"
                    className="mx-2"
                    onClick={() => handleDelete(note._id)}
                  >
                    Delete
                  </Button>
                </div>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <blockquote className="blockquote mb-0">
                    <h4>
                      <Badge variant="success">Category-{note.category}</Badge>
                    </h4>

                    <p>{note.content}</p>
                    <footer className="blockquote-footer">
                      Created on{" "}
                      <cite title="Source Title">
                        {note.createdAt.substring(0, 10)}
                      </cite>
                    </footer>
                  </blockquote>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        ))}
    </MainScreen>
  );
};

export default MyNotes;
