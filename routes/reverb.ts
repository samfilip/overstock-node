import express from 'express';
import { getPayouts } from '../controllers/payoutsController';
import { getOrders } from '../controllers/ordersController';
import { verifyReverbToken, errorHandler, validateDateParams } from '../middleware/index';



export function reverbRouter() {
  const router = express.Router();

  router.use(verifyReverbToken);
  router.use(errorHandler);

  router.get('/payouts', validateDateParams, getPayouts);
  
  // router.get('/listings', getListings);
  router.get('/orders', getOrders);
  
  return router;
}

export default reverbRouter