const helpers = {
  getDateForCurrentQuarter: () => {
    const today = new Date();
    const currentMonth = today.getMonth(); // 0-11 (Jan is 0, Dec is 11)
    const currentYear = today.getFullYear();
    let quarterStartDate, quarterEndDate;

    // Determine quarter based on current month
    if (currentMonth <= 2) {
      // Q1: Jan-Mar
      console.log("Generating date range for Q1")
      quarterStartDate = new Date(currentYear, 0, 1); // Jan 1
      quarterEndDate = new Date(currentYear, 2, 31, 23, 59, 59); // Mar 31 23:59:59
    } else if (currentMonth <= 5) {
      // Q2: Apr-Jun
      console.log("Generating date range for Q2")
      quarterStartDate = new Date(currentYear, 3, 1); // Apr 1
      quarterEndDate = new Date(currentYear, 5, 30, 23, 59, 59); // Jun 30 23:59:59
    } else if (currentMonth <= 8) {
      // Q3: Jul-Sep
      console.log("Generating date range for Q3")
      quarterStartDate = new Date(currentYear, 6, 1); // Jul 1
      quarterEndDate = new Date(currentYear, 8, 30, 23, 59, 59); // Sep 30 23:59:59
    } else {
      // Q4: Oct-Dec
      console.log("Generating date range for Q4")
      quarterStartDate = new Date(currentYear, 9, 1); // Oct 1
      quarterEndDate = new Date(currentYear, 11, 31, 23, 59, 59); // Dec 31 23:59:59
    }

    // Format dates to match the required format: YYYY-MM-DDTHH:MM-00:00
    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      
      return `${year}-${month}-${day}T${hours}:${minutes}-00:00`;
    };

    const startDateString = formatDate(quarterStartDate);
    const endDateString = formatDate(quarterEndDate);

    return {
      startDate: startDateString,
      endDate: endDateString,
      queryParams: `created_start_date=${startDateString}&created_end_date=${endDateString}&per_page=100`
    };
  },
  
  // You can add more helper functions here
  formatCurrency: (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  },
  
  parseReverbResponse: (data) => {
    // Example helper to process Reverb API responses
    return {
      // Process and transform data
    };
  }
};

export default helpers