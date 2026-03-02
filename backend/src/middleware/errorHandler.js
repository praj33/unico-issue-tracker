const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  // Zod validation error
  if (err.name === 'ZodError') {
    statusCode = 400;
    message = err.errors.map(e => e.message).join(', ');
  }

  // MySQL duplicate email error
  if (err.code === 'ER_DUP_ENTRY') {
    statusCode = 409;
    message = 'Email already exists';
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

module.exports = errorHandler;