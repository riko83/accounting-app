import mysql from 'mysql2/promise';

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
  },
};
