import { request } from 'undici';
import { getDateForCurrentQuarter, calculateTotals } from '../utils/index.js';

export async function getPayouts(req, res, next) {
  try {
    const { created_start_date, created_end_date } = req.query;
    
    const dateQuery = created_start_date && created_end_date 
      ? { queryParams: `created_start_date=${created_start_date}&created_end_date=${created_end_date}&per_page=100` }
      : getDateForCurrentQuarter();
    
    const { statusCode, body } = await request(`https://api.reverb.com/api/my/payouts?${dateQuery.queryParams}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${req.reverbToken}`,
        'Content-Type': 'application/hal+json',
        'Accept': 'application/hal+json',
        'Accept-Version': '3.0'
      }
    });
    
    if (statusCode !== 200) {
      throw { 
        statusCode, 
        message: 'Error fetching data from Reverb API',
        body: await body.json().catch(() => null)
      };
    }
    
    const payoutsData = await body.json();
    const payoutTotals = calculateTotals(payoutsData.payouts);
    
    return res.status(200).json({
      success: true,
      dollarAmount: payoutTotals,
      dateRange: dateQuery,
      data: payoutsData
    });
  } catch (error) {
    next(error);
  }
}