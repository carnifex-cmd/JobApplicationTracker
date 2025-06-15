const pool = require('../config/database');

class JobApplication {
  static async create({ userId, company, jobTitle, applicationDate, status, notes }) {
    const query = `
      INSERT INTO job_applications (user_id, company, job_title, application_date, status, notes)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
    
    const result = await pool.query(query, [
      userId, company, jobTitle, applicationDate, status, notes
    ]);
    return result.rows[0];
  }

  static async findByUserId(userId, filters = {}) {
    let query = `
      SELECT * FROM job_applications 
      WHERE user_id = $1
    `;
    const params = [userId];
    let paramCount = 1;

    // Add status filter
    if (filters.status) {
      paramCount++;
      query += ` AND status = $${paramCount}`;
      params.push(filters.status);
    }

    // Add date range filter
    if (filters.dateFrom) {
      paramCount++;
      query += ` AND application_date >= $${paramCount}`;
      params.push(filters.dateFrom);
    }

    if (filters.dateTo) {
      paramCount++;
      query += ` AND application_date <= $${paramCount}`;
      params.push(filters.dateTo);
    }

    // Add sorting
    const sortField = filters.sortBy || 'created_at';
    const sortOrder = filters.sortOrder || 'DESC';
    query += ` ORDER BY ${sortField} ${sortOrder}`;

    const result = await pool.query(query, params);
    return result.rows;
  }

  static async findById(id, userId) {
    const query = `
      SELECT * FROM job_applications 
      WHERE id = $1 AND user_id = $2
    `;
    
    const result = await pool.query(query, [id, userId]);
    return result.rows[0];
  }

  static async update(id, userId, updates) {
    const fields = [];
    const values = [];
    let paramCount = 0;

    // Build dynamic update query
    Object.keys(updates).forEach(key => {
      if (updates[key] !== undefined) {
        paramCount++;
        fields.push(`${key} = $${paramCount}`);
        values.push(updates[key]);
      }
    });

    if (fields.length === 0) {
      throw new Error('No fields to update');
    }

    values.push(id, userId);
    const query = `
      UPDATE job_applications 
      SET ${fields.join(', ')}
      WHERE id = $${paramCount + 1} AND user_id = $${paramCount + 2}
      RETURNING *
    `;

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async delete(id, userId) {
    const query = `
      DELETE FROM job_applications 
      WHERE id = $1 AND user_id = $2
      RETURNING *
    `;
    
    const result = await pool.query(query, [id, userId]);
    return result.rows[0];
  }

  static async getStats(userId) {
    const query = `
      SELECT 
        status,
        COUNT(*) as count
      FROM job_applications 
      WHERE user_id = $1
      GROUP BY status
    `;
    
    const result = await pool.query(query, [userId]);
    return result.rows;
  }
}

module.exports = JobApplication; 