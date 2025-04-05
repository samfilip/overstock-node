import { request } from 'undici';
import { Request, Response, NextFunction } from 'express'
import { getDateForCurrentQuarter, calculateTotals } from '../utils/index.js';
import { ReverbPayoutsResponse } from '../types/reverb/payouts'
import { ApiQueryParams } from '../types/reverb/index';

export async function getPayouts(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    
    const { 
      start_date, 
      end_date, 
      date_type = 'created',
      per_page = 100, 
      page = 1 
    } = req.query as ApiQueryParams;
    

    const dateInfo = start_date && end_date 
      ? { start_date, end_date } 
      : getDateForCurrentQuarter();
    
    const queryParams = new URLSearchParams({
      [`${date_type}_start_date`]: dateInfo.start_date,
      [`${date_type}_end_date`]: dateInfo.end_date,
      per_page: String(per_page),
      page: String(page)
    }).toString();

    const { statusCode, body } = await request(`https://api.reverb.com/api/my/payouts?${queryParams}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${req.reverbToken}`,
        'Content-Type': 'application/hal+json',
        'Accept': 'application/hal+json',
        'Accept-Version': '3.0'
      }
    });
    
    if (statusCode !== 200) {
      const errorBody = await body.json().catch(() => null);
      throw { 
        statusCode, 
        message: 'Error fetching data from Reverb API',
        body: errorBody
      };
    }
    
    const payoutsData = await body.json() as ReverbPayoutsResponse;
    const payoutTotals = calculateTotals(payoutsData.payouts);
    
    res.status(200).json({
      success: true,
      dollarAmount: payoutTotals,
      dateRange: {
        start_date: dateInfo.start_date,
        end_date: dateInfo.end_date,
        date_type
      },
      data: payoutsData
    });
  } catch (error) {
    next(error);
  }
}