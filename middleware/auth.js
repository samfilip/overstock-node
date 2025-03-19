export const verifyReverbToken = (req, res, next) => {
  if (!process.env.REVERB_API_KEY) {
    return res.status(500).json({
      success: false,
      message: 'Reverb API key not configured'
    });
  }
  req.reverbToken = process.env.REVERB_API_KEY;
  
  next();
};