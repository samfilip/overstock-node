import express from 'express';
import { getPayouts } from '../controllers/payoutsController.ts';
import { getOrders } from '../controllers/ordersController.ts';
import { verifyReverbToken, errorHandler, validateDateParams } from '../middleware/index.ts';



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