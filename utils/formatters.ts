/**
 * Formats a number as USD currency
 * @param amount - The amount to format
 * @returns A formatted currency string
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
}

/**
 * Calculates the total amount from an array of payout objects
 * @param payouts - Array of payout objects from the Reverb API
 * @returns A formatted currency string of the total
 */
export function calculateTotals(payouts: Array<{ total: { amount: string | number } }>): string {
  const total = payouts.reduce((acc, payout) => {
    return acc + Number(payout.total.amount);
  }, 0);

  return "$" + total.toFixed(2);
}