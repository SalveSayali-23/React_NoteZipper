import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import LandingPage from "./screens/LandingPage/LandingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyNotes from "./screens/MyNotes/MyNotes";
import LoginScreen from "./screens/loginScreen/LoginScreen";
import RegisterScreen from "./screens/registerScreen/ResgisterScreen";
import CreateNotes from "./screens/CreateNote/createNote";
import UpdateNote from "./screens/CreateNote/updateNote";
import { useState } from "react";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";

function App() {
  const [search, setSearch] = useState("");
  // console.log(search);

  return (
    <>
      <BrowserRouter>
        <Header setSearch={setSearch} />
        <main>
          <Routes>
            <Route path="/" Component={LandingPage} />
            <Route path="/login" Component={LoginScreen} />
            <Route path="/profile" Component={ProfileScreen} />
            <Route path="/register" Component={RegisterScreen} />
            <Route path="/createnote" Component={CreateNotes} />
            <Route path="/note/:id" Component={UpdateNote} />
            <Route
              path="/mynotes"
              Component={() => <MyNotes search={search} />}
            />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
