const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  
  // Set a default status code
  const statusCode = err.statusCode || 500;

  // Provide a custom message for known errors, otherwise a general message
  const message = err.message || 'Internal Server Error';

  // Send the error response
  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message,
    details: err.details || null,  // For custom error details (e.g., ValidationError)
    stack: process.env.NODE_ENV === 'development' ? err.stack : {}  // Hide stack in production
  });
};

export default errorHandler;
