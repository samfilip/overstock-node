import { request } from 'undici';
import { Request, Response, NextFunction } from 'express';
import { getDateForCurrentQuarter } from '../utils/index.js';
import { ReverbOrdersResponse, Order } from '../types/reverb/order.js';
import { ApiQueryParams } from '../types/reverb/index.ts';

interface DateRange {
  start_date: string;
  end_date: string;
}

export async function getOrders(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    // Extract parameters from the request
    const { 
      start_date, 
      end_date, 
      date_type = 'updated', // Default to 'updated'
      per_page = 100, 
      page = 1 
    } = req.query as unknown as ApiQueryParams;
    
    // Get date range either from query or default to current quarter
    const dateInfo: DateRange = start_date && end_date 
    ? { start_date, end_date } 
    : getDateForCurrentQuarter();
  
  // Build query parameters for Reverb API
  const queryParams = new URLSearchParams({
    [`${date_type}_start_date`]: dateInfo.start_date,
    [`${date_type}_end_date`]: dateInfo.end_date,
    per_page: String(per_page),
    page: String(page)
  }).toString();
    
    // Make API request
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
      throw { 
        statusCode, 
        message: 'Error fetching data from Reverb API',
        body: errorBody
      };
    }
    
    // Parse response data
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