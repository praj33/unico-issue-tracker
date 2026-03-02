const pool = require('../db/pool');

const createUser = async (userData) => {
  const { name, email } = userData;

  const [result] = await pool.query(
    'INSERT INTO users (name, email) VALUES (?, ?)',
    [name, email]
  );

  return {
    id: result.insertId,
    name,
    email
  };
};

const getAllUsers = async () => {
  const [rows] = await pool.query('SELECT * FROM users');
  return rows;
};

const getUserById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
  return rows[0];
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById
};