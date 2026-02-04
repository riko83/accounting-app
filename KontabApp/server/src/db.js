import mysql from 'mysql2/promise';
<<<<<<< HEAD
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'accounting_app',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export const db = {
  query: async (sql, params)=> {
    const [rows] = await pool.execute(sql,params);
    return rows;
=======

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 3306),
  user: 'root',
  ...(process.env.DB_PASSWORD
    ? { password: process.env.DB_PASSWORD }
    : {}),
  database: 'kontab_db', 
  connectionLimit: 10,
  queueLimit: 0,
});

export const db = {
  query(sql, params) {
    return pool.execute(sql, params);
>>>>>>> dbd45331346e0c62155f5f224ffe5017c2dd5762
  },
};
