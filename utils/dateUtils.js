export function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  
  return `${year}-${month}-${day}T${hours}:${minutes}-00:00`;
}

export function getDateForCurrentQuarter() {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  let quarterStartDate, quarterEndDate;

  if (currentMonth <= 2) {
    quarterStartDate = new Date(currentYear, 0, 1);
    quarterEndDate = new Date(currentYear, 2, 31, 23, 59, 59);
  } else if (currentMonth <= 5) {
    quarterStartDate = new Date(currentYear, 3, 1);
    quarterEndDate = new Date(currentYear, 5, 30, 23, 59, 59);
  } else if (currentMonth <= 8) {
    quarterStartDate = new Date(currentYear, 6, 1);
    quarterEndDate = new Date(currentYear, 8, 30, 23, 59, 59);
  } else {
    quarterStartDate = new Date(currentYear, 9, 1);
    quarterEndDate = new Date(currentYear, 11, 31, 23, 59, 59);
  }

  const startDateString = formatDate(quarterStartDate);
  const endDateString = formatDate(quarterEndDate);

  return {
    startDate: startDateString,
    endDate: endDateString,
    queryParams: `created_start_date=${startDateString}&created_end_date=${endDateString}&per_page=100`
  };
}