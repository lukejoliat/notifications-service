import mysql from "mysql";
import dotenv from 'dotenv'

dotenv.config();

// Configure MySQL connection pool
const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.NOTIFICATION_DB_HOST,
    user: "admin",
    password: process.env.NOTIFICATION_DB_PASS,
    database: "notifications",
});
console.log('db init');
export { pool }