const pool = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
  static async create({ email, password }) {
    const hashedPassword = await bcrypt.hash(password, 12);
    
    const query = `
      INSERT INTO users (email, password)
      VALUES ($1, $2)
      RETURNING id, email, created_at
    `;
    
    const result = await pool.query(query, [email, hashedPassword]);
    return result.rows[0];
  }

  static async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await pool.query(query, [email]);
    return result.rows[0];
  }

  static async findById(id) {
    const query = 'SELECT id, email, created_at FROM users WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async validatePassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }
}

module.exports = User; 