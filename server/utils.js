export const errorHandler = (err, req, res, next) => {
    const status = err.status || 500; 
    const message = err.message || 'An unexpected error occurred';
    
    res.status(status).json({
      success: false,
      status,
      message,
    });
  };

