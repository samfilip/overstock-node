const helpers = {
  getDateForCurrentQuarter: () => {
    const today = new Date()
    const currentMonth = today.getMonth()
    const currentYear = today.getFullYear()
    let quarterStartDate, quarterEndDate

    if (currentMonth <= 2) {
      // Q1: Jan-Mar
      quarterStartDate = new Date(currentYear, 0, 1) // Jan 1
      quarterEndDate = new Date(currentYear, 2, 31, 23, 59, 59) // Mar 31 23:59:59
    } else if (currentMonth <= 5) {
      // Q2: Apr-Jun
      quarterStartDate = new Date(currentYear, 3, 1) // Apr 1
      quarterEndDate = new Date(currentYear, 5, 30, 23, 59, 59) // Jun 30 23:59:59
    } else if (currentMonth <= 8) {
      // Q3: Jul-Sep
      quarterStartDate = new Date(currentYear, 6, 1) // Jul 1
      quarterEndDate = new Date(currentYear, 8, 30, 23, 59, 59) // Sep 30 23:59:59
    } else {
      // Q4: Oct-Dec
      quarterStartDate = new Date(currentYear, 9, 1) // Oct 1
      quarterEndDate = new Date(currentYear, 11, 31, 23, 59, 59) // Dec 31 23:59:59
    }

    const startDateString = helpers.formatDate(quarterStartDate)
    const endDateString = helpers.formatDate(quarterEndDate)

    return {
      startDate: startDateString,
      endDate: endDateString,
      queryParams: `created_start_date=${startDateString}&created_end_date=${endDateString}&per_page=100`
    }
  },
  
  // You can add more helper functions here
  formatCurrency: (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
  },

  formatDate: (date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    
    return `${year}-${month}-${day}T${hours}:${minutes}-00:00`
  },

  calculateTotals: (payouts) => {
   const total = payouts.reduce((acc, payout) => {
      return acc + Number(payout.total.amount)
    }, 0);

    return "$" + total.toFixed(2);
  }
}

export default helpers