import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

// Configure MySQL connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "notifications-instance-1.cvzig3mkblo6.us-east-1.rds.amazonaws.com",
  user: "admin",
  password: "password",
  database: "notifications",
});

// Enable CORS
app.use(cors());

// Parse JSON request body
app.use(express.json());

// CRUD routes

// Create
app.post("/notifications", (req, res) => {
  const { name, description } = req.body;
  const sql = "INSERT INTO NOTIFICATIONS (name, description) VALUES (?, ?)";
  pool.getConnection((err, connection) => {
    if (err) {
      throw err;
    }
    connection.query(sql, [name, description], (err, result) => {
      connection.release();
      if (err) {
        throw err;
      }
      res.status(201).json(result);
    });
  });
});

// Read
app.get("/notifications", (req, res) => {
  const sql = "SELECT * FROM NOTIFICATIONS";
  pool.getConnection((err, connection) => {
    if (err) {
      throw err;
    }
    connection.query(sql, (err, result) => {
      connection.release();
      if (err) {
        throw err;
      }
      res.json(result);
    });
  });
});

// Read
app.get("/notifications/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM NOTIFICATIONS WHERE id = ?";
  pool.getConnection((err, connection) => {
    if (err) {
      throw err;
    }
    connection.query(sql, [id], (err, result) => {
      connection.release();
      if (err) {
        throw err;
      }
      res.json(result);
    });
  });
});

// Update
app.put("/notifications/:id", (req, res) => {
  const id = req.params.id;
  const { name, description } = req.body;
  const sql = "UPDATE NOTIFICATIONS SET name = ?, description = ? WHERE id = ?";
  pool.getConnection((err, connection) => {
    if (err) {
      throw err;
    }
    connection.query(sql, [name, description, id], (err, result) => {
      connection.release();
      if (err) {
        throw err;
      }
      res.json(result);
    });
  });
});

// Delete
app.delete("/notifications/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM NOTIFICATIONS WHERE id = ?";
  pool.getConnection((err, connection) => {
    if (err) {
      throw err;
    }
    connection.query(sql, [id], (err, result) => {
      connection.release();
      if (err) {
        throw err;
      }
      res.json(result);
    });
  });
});

// Start server
app.listen(8080, () => {
  console.log("Server started on port 8080");
});
