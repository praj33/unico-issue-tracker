require('dotenv').config();
const express = require('express');
const cors = require('cors');
const healthRoutes = require('./routes/health.routes');
const errorHandler = require('./middleware/errorHandler');
const pool = require('./db/pool');
const usersRoutes = require('./routes/users.routes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/health', healthRoutes);
app.use('/users', usersRoutes);
app.use('/issues', require('./routes/issues.routes'));

// 404 handler
app.use((req, res, next) => {
  const error = new Error('Route not found');
  error.statusCode = 404;
  next(error);
});

// centralized error middleware
app.use(errorHandler);

const startServer = async () => {
  try {
    // Try to get DB connection
    const connection = await pool.getConnection();
    console.log('Database connected successfully');
    connection.release();

    // Start server only if DB works
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error('Database connection failed:', error.message);
    process.exit(1); // Stop app completely
  }
};

startServer();