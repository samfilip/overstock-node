# Reverb API Wrapper

A simple Express.js router for interacting with the Reverb.com API, focusing on payouts data.

## Overview

This project provides an Express router that creates an endpoint to fetch and process payout data from the Reverb.com API. It's designed to simplify accessing your Reverb seller payouts with date filtering capabilities.

## Installation

```bash
npm install express undici
```

## Setup

You'll need to set up your environment with a Reverb API token:

```bash
# In your .env file
REVERB_API_KEY=YOUR_REVERB_API_TOKEN
```

Environment variables in your main application file load with `npm start`

## Usage

Add your REVERB API Key and easily calculate running quarterly payouts.

## Endpoints

### GET /api/reverb/payouts

Fetches payout data from Reverb.com.

**Query Parameters:**
- `created_start_date` (optional): Start date for filtering payouts (YYYY-MM-DD)
- `created_end_date` (optional): End date for filtering payouts (YYYY-MM-DD)

If dates are not provided, it defaults to the current quarter's date range using the `helpers.getDateForCurrentQuarter()` function.

**Example Request:**
```javascript
// Get payouts for a specific date range
fetch('/api/reverb/payouts?created_start_date=2023-01-01&created_end_date=2023-03-31')
  .then(response => response.json())
  .then(data => console.log(data));

// Get payouts for the current quarter
fetch('/api/reverb/payouts')
  .then(response => response.json())
  .then(data => console.log(data));
```

**Response:**
```json
{
  "success": true,
  "dollarAmount": "$1,234.56",
  "dateRange": {...},
  "data": {...}
}
```

## Implementation Details

The router:
1. Accepts optional date range parameters
2. Defaults to current quarter if not specified
3. Makes authenticated requests to the Reverb API
4. Calculates total payout amounts
5. Returns formatted data with success status

## Helper Functions

The router relies on helper functions from a separate module:

- `getDateForCurrentQuarter()`: Returns date query parameters for the current quarter
- `calculateTotals()`: Processes payout data and returns formatted dollar amounts

## Official Reverb API Documentation

For complete API details, refer to the [official Reverb API documentation](https://reverb.com/page/api).

## Requirements

- Node.js 22.0 or higher
- Express.js
- Undici (for HTTP requests)
- A valid Reverb API token

## License

MIT