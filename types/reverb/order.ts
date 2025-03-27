/**
 * Types for Reverb API Orders Response
 */

// Common currency amount type
export interface CurrencyAmount {
  amount: string;
  amount_cents: number;
  currency: string;
  symbol: string;
  display: string;
}

// Address information
export interface ShippingAddress {
  region: string;
  locality: string;
  country_code: string;
  display_location: string;
  id: string;
  primary: boolean;
  name: string;
  street_address: string;
  extended_address: string | null;
  postal_code: string;
  phone: string;
  unformatted_phone: string;
  complete_shipping_address: boolean;
  _links: {
    self: {
      href: string;
    };
  };
}

// Photo links
export interface PhotoLinks {
  _links: {
    large_crop: {
      href: string;
    };
    small_crop: {
      href: string;
    };
    full: {
      href: string;
    };
    thumbnail: {
      href: string;
    };
  };
}

// Order resource links
export interface OrderLinks {
  photo: {
    href: string;
  };
  feedback_for_buyer?: {
    href: string;
  };
  feedback_for_seller?: {
    href: string;
  };
  listing: {
    href: string;
  };
  conversation?: {
    href: string;
  };
  start_conversation: {
    href: string;
  };
  web_tracking: {
    href: string;
  };
  web: {
    href: string;
  };
  web_listing: {
    href: string;
  };
  self: {
    href: string;
  };
  mark_picked_up: {
    href: string;
  };
  payments: {
    href: string;
  };
  contact_buyer: {
    web: {
      href: string;
    };
  };
}

// Order details
export interface Order {
  amount_product: CurrencyAmount;
  amount_product_subtotal: CurrencyAmount;
  shipping: CurrencyAmount;
  amount_tax: CurrencyAmount;
  total: CurrencyAmount;
  buyer_name: string;
  buyer_first_name: string;
  buyer_last_name: string;
  buyer_id: number;
  created_at: string;
  order_number: string;
  needs_feedback_for_buyer: boolean;
  needs_feedback_for_seller: boolean;
  order_type: string;
  paid_at: string;
  quantity: number;
  shipping_address: ShippingAddress;
  shipping_date: string;
  shipped_at: string;
  shipping_provider: string;
  shipping_code: string;
  shipping_method: string;
  local_pickup: boolean;
  shop_name: string;
  status: string;
  title: string;
  updated_at: string;
  payment_method: string;
  order_bundle_id: string;
  product_id: string;
  photos: PhotoLinks[];
  sku?: string;
  selling_fee: CurrencyAmount;
  shipping_label_fee: CurrencyAmount;
  direct_checkout_fee: CurrencyAmount;
  affirm_promotion_fee?: CurrencyAmount;
  tax_on_fees?: CurrencyAmount;
  tax_responsible_party?: "reverb" | "seller";
  direct_checkout_payout: CurrencyAmount;
  _links: OrderLinks;
}

// Main response type
export interface ReverbOrdersResponse {
  total: number;
  current_page: number;
  total_pages: number;
  orders: Order[];
  _links: Record<string, unknown>;
}