/**
 * Types for Reverb API Payouts Response
 */

// Common currency amount type (reusing from previous types if available)
export interface CurrencyAmount {
  amount: string;
  amount_cents: number;
  currency: string;
  symbol: string;
  display: string;
}

// Links for pagination and navigation
export interface PayoutsLinks {
  next?: {
    href: string;
  };
  prev?: {
    href: string;
  };
}

// Individual payout item
export interface Payout {
  total: CurrencyAmount;
  created_at: string;
  updated_at: string;
  _links: {
    line_items: {
      href: string;
    };
  };
}

// Main response type for payouts endpoint
export interface ReverbPayoutsResponse {
  total: number;
  current_page: number;
  per_page: number;
  total_pages: number;
  _links: PayoutsLinks;
  payouts: Payout[];
}

// Optional line items response if we need to fetch them
export interface PayoutLineItem {
  amount: CurrencyAmount;
  order_number: string;
  created_at: string;
  _links: {
    order: {
      href: string;
    };
  };
}

export interface PayoutLineItemsResponse {
  total: number;
  current_page: number;
  per_page: number;
  total_pages: number;
  _links: PayoutsLinks;
  line_items: PayoutLineItem[];
}