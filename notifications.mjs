import express from 'express'
import { pool } from './db.mjs'

const router = express.Router()

// Create
router.post("/", (req, res) => {
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
router.get("/", (req, res) => {
    console.log("notifications request received");
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
router.get("/:id", (req, res) => {
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
router.put("/:id", (req, res) => {
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
router.delete("/:id", (req, res) => {
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


export { router as notifications }