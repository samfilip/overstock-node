import express from 'express'
import { request } from 'undici'
import helpers from '../helpers/index.js'



export function reverbRouter() {
  const router = express.Router()

  router.get('/payouts', async (req, res) => {
    const quarterInfo = helpers.getDateForCurrentQuarter()

    const { statusCode, headers, body } = await request(`https://api.reverb.com/api/my/payouts?${quarterInfo.queryParams}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.REVERB_API_KEY}`,
        'Content-Type': 'application/hal+json',
        'Accept': 'application/hal+json',
        'Accept-Version': '3.0'
      }
    });

    if (statusCode !== 200) {
      let errorData = null;
      try {
        errorData = await body.json();
      } catch (e) {
        console.log("Request failed with:", e.message);
      }
    
      return res.status(statusCode).json({
        success: false,
        message: 'Error fetching data from Reverb Api',
        error: errorData || 'Request Failed'
      });
    }

    const payoutsData = await body.json();

    return res.status(statusCode).json({
      success: true,
      data: payoutsData,
      dateRange: quarterInfo
    })
  })

  return router
}

export default reverbRouter