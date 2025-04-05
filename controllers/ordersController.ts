import { request } from 'undici';
import { Request, Response, NextFunction } from 'express';
import { getDateForCurrentQuarter } from '../utils/index';
import { ReverbOrdersResponse } from '../types/reverb/order';
import { ApiQueryParams } from '../types/reverb/index';
import { ApiError } from '../types/express/api';

interface DateRange {
  start_date: string;
  end_date: string;
}

export async function getOrders(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {

    const { 
      start_date, 
      end_date, 
      date_type = 'updated',
      per_page = 100, 
      page = 1 
    } = req.query as unknown as ApiQueryParams;
    

    const dateInfo: DateRange = start_date && end_date 
    ? { start_date, end_date } 
    : getDateForCurrentQuarter();
  
  const queryParams = new URLSearchParams({
    [`${date_type}_start_date`]: dateInfo.start_date,
    [`${date_type}_end_date`]: dateInfo.end_date,
    per_page: String(per_page),
    page: String(page)
  }).toString();
    
    const { statusCode, body } = await request(`https://api.reverb.com/api/my/orders/selling/all?${queryParams}`, {
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
      const error = new Error('Error fetching data from Reverb API') as ApiError;
      error.name = 'ReverbAPIError';
      error.statusCode = statusCode;
      error.body = errorBody;
      throw error;
    }
    
    const ordersData: ReverbOrdersResponse = await body.json() as ReverbOrdersResponse;
    
    res.status(200).json({
      success: true,
      dateRange: {
        start_date: dateInfo.start_date,
        end_date: dateInfo.end_date,
        date_type
      },
      data: ordersData
    });
  } catch (error) {
    next(error);
  }
}