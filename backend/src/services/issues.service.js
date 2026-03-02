const pool = require('../db/pool');

const getAllIssues = async (filters) => {
  const conditions = [];
  const params = [];

  if (filters.project_id) {
    conditions.push('i.project_id = ?');
    params.push(filters.project_id);
  }

  if (filters.priority) {
    conditions.push('i.priority = ?');
    params.push(filters.priority);
  }

  if (filters.status) {
    conditions.push('i.status = ?');
    params.push(filters.status);
  }

  if (filters.assignee_id) {
    conditions.push('i.assignee_id = ?');
    params.push(filters.assignee_id);
  }

  if (filters.search) {
    conditions.push('(i.title LIKE ? OR i.description LIKE ?)');
    const searchTerm = `%${filters.search}%`;
    params.push(searchTerm, searchTerm);
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

  const query = `
    SELECT 
      i.id,
      i.title,
      i.description,
      i.project_id,
      i.priority,
      i.status,
      i.assignee_id,
      i.created_at,
      i.updated_at,
      p.name AS project_name,
      u.name AS assignee_name
    FROM issues i
    LEFT JOIN projects p ON i.project_id = p.id
    LEFT JOIN users u ON i.assignee_id = u.id
    ${whereClause}
    ORDER BY i.created_at DESC
  `;

  const [rows] = await pool.query(query, params);
  return rows;
};

const getIssueById = async (id) => {
  const issueQuery = `
    SELECT 
      i.id,
      i.title,
      i.description,
      i.project_id,
      i.priority,
      i.status,
      i.assignee_id,
      i.created_at,
      i.updated_at,
      p.name AS project_name,
      u.name AS assignee_name
    FROM issues i
    LEFT JOIN projects p ON i.project_id = p.id
    LEFT JOIN users u ON i.assignee_id = u.id
    WHERE i.id = ?
  `;

  const [issues] = await pool.query(issueQuery, [Number(id)]);
  
  if (issues.length === 0) {
    return null;
  }

  const commentsQuery = `
    SELECT id, comment, created_at
    FROM comments
    WHERE issue_id = ?
    ORDER BY created_at ASC
  `;

  const [comments] = await pool.query(commentsQuery, [Number(id)]);

  return {
    ...issues[0],
    comments
  };
};

const updateIssueStatus = async (id, status) => {
  const query = 'UPDATE issues SET status = ? WHERE id = ?';
  const [result] = await pool.query(query, [status, Number(id)]);
  return result.affectedRows > 0;
};

const addComment = async (id, comment) => {
  const checkQuery = 'SELECT id FROM issues WHERE id = ?';
  const [issues] = await pool.query(checkQuery, [Number(id)]);
  
  if (issues.length === 0) {
    return false;
  }

  const insertQuery = 'INSERT INTO comments (issue_id, comment) VALUES (?, ?)';
  await pool.query(insertQuery, [Number(id), comment]);
  return true;
};

const getStatusCounts = async () => {
  const query = 'SELECT status, COUNT(*) as count FROM issues GROUP BY status';
  const [rows] = await pool.query(query);

  const counts = {
    Open: 0,
    'In Progress': 0,
    Resolved: 0,
    Closed: 0
  };

  rows.forEach(row => {
    counts[row.status] = row.count;
  });

  return counts;
};

const createIssue = async (issueData) => {
  const projectCheck = 'SELECT id FROM projects WHERE id = ?';
  const [projects] = await pool.query(projectCheck, [issueData.project_id]);
  
  if (projects.length === 0) {
    const error = new Error('Project not found');
    error.statusCode = 400;
    throw error;
  }

  const assigneeCheck = 'SELECT id FROM users WHERE id = ?';
  const [users] = await pool.query(assigneeCheck, [issueData.assignee_id]);
  
  if (users.length === 0) {
    const error = new Error('Assignee not found');
    error.statusCode = 400;
    throw error;
  }

  const insertQuery = `
    INSERT INTO issues (title, description, project_id, priority, assignee_id, status)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  
  await pool.query(insertQuery, [
    issueData.title,
    issueData.description,
    issueData.project_id,
    issueData.priority,
    issueData.assignee_id,
    issueData.status
  ]);
};

module.exports = {
  getAllIssues,
  getIssueById,
  updateIssueStatus,
  addComment,
  getStatusCounts,
  createIssue
};
