export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
}

export function calculateTotals(payouts) {
  const total = payouts.reduce((acc, payout) => {
    return acc + Number(payout.total.amount);
  }, 0);

  return "$" + total.toFixed(2);
}