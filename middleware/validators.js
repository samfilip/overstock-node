export function validateDateParams(req, res, next) {
  const { created_start_date, created_end_date } = req.query;
  
  if (!created_start_date && !created_end_date) {
    return next();
  }
  
  if (!created_start_date || !created_end_date) {
    return res.status(400).json({
      success: false,
      message: 'Both start and end dates must be provided together'
    });
  }
  
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(created_start_date) || !dateRegex.test(created_end_date)) {
    return res.status(400).json({
      success: false,
      message: 'Dates must be in YYYY-MM-DD format'
    });
  }
  
  const startDate = new Date(created_start_date);
  const endDate = new Date(created_end_date);
  
  if (startDate > endDate) {
    return res.status(400).json({
      success: false,
      message: 'Start date must be before end date'
    });
  }
  
  next();
}