/*export const isAuth = (req, res, next) => {
  // Example authentication check - customize based on your auth setup
  if (req.user) {
    next(); // User is authenticated, proceed to the next middleware or route
  } else {
    res.status(401).json({ message: 'Unauthorized' }); // User is not authenticated
  }
};

export const errorHandler = (err, req, res, next) => {
  const status = err.status || 500; 
  const message = err.message || 'An unexpected error occurred';
  
  res.status(status).json({
    success: false,
    status,
    message,
  });
};
*/