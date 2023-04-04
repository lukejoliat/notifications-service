import express from "express";
import cors from "cors";
import { notifications } from './notifications.mjs'
import { preferences } from './preferences.mjs'

const app = express();

// Enable CORS
app.use(cors());

// Parse JSON request body
app.use(express.json());

// CRUD routes
app.get("/health", (req, res) => {
  res.status(200).send("ok");
});

app.use('/notifications', notifications)
app.use('/preferences', preferences)

// Start server
app.listen(8080, () => {
  console.log("Server started on port 8080");
});
