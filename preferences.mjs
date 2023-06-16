// create preference
// update preference
// delete preference

import express from 'express'
import { pool } from './db.mjs'

const router = express.Router()

// get all preferences
router.get("/", (req, res) => {
    const sql = "SELECT * FROM PREFERENCES";
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

// get all preferences for user
router.get("/:username", (req, res) => {
    const username = req.params.username
    const sql = "SELECT * FROM PREFERENCES WHERE username = ?";
    pool.getConnection((err, connection) => {
        if (err) {
            throw err;
        }
        connection.query(sql, [username], (err, result) => {
            connection.release();
            if (err) {
                throw err;
            }
            res.json(result);
        });
    });
});

// get specific preference for user
router.get("/:username/notifications/:id", (req, res) => {
    const username = req.params.username
    const id = req.params.id
    const sql = `SELECT * FROM PREFERENCES p
                LEFT JOIN NOTIFICATIONS 
                ON p.notification = NOTIFICATIONS.id
                WHERE username = ? 
                AND notification = ?`;
    pool.getConnection((err, connection) => {
        if (err) {
            throw err;
        }
        connection.query(sql, [username, id, id], (err, result) => {
            connection.release();
            if (err) {
                throw err;
            }
            if (!result || !result.length || result.length === 0) res.status(404).send('')
            else res.json(result);
        });
    });
});


export { router as preferences }