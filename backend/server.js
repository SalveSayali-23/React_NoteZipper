const express = require("express");
const cors = require("cors");
const notes = require("./data/notes");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const noteRoutes = require("./routes/noteRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const app = express();

dotenv.config();
// console.log("JWT_SECRET:", process.env.JWT_SECRET);

connectDB();
// Configure CORS
app.use(
  cors({
    origin: "https://react-notezipper-frontend.onrender.com", // Update this with your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"], // Add the methods your API supports
    // credentials: true, // If you use cookies for authentication
  })
);
app.use(express.json());
app.get("/", (req, res) => {
  res.send("API is running..");
});

// app.get("/api/notes", (req, res) => {
//   res.json(notes);
// });
// app.get("/api/notes/:id", (req, res) => {
//   const note = notes.find((n) => n._id === req.params.id);
//   // console.log(req.params);
//   res.send(note);
// });

app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);

app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on PORT ${PORT}`));
