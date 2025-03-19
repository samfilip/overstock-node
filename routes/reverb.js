import express from 'express';
import { getPayouts } from '../controllers/payoutsController.js';
import { verifyReverbToken, errorHandler, validateDateParams } from '../middleware/index.js';



export function reverbRouter() {
  const router = express.Router();

  router.use(verifyReverbToken);
  router.use(errorHandler);
  
  // Set up routes
  router.get('/payouts', validateDateParams, getPayouts);
  
  // router.get('/listings', getListings);
  // router.get('/orders', getOrders);
  
  return router;
}

export default reverbRouter