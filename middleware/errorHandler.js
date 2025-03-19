export const errorHandler = (err, req, res, next) => {
  console.error(`${err.name}: ${err.message}`);
  return res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Server error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};