// Define types for date-related functions
interface DateRange {
  start_date: string;
  end_date: string;
}

/**
 * Formats a date into the format required by the Reverb API
 * @param date - The date to format
 * @returns A string in the format YYYY-MM-DDThh:mm-00:00
 */
export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  
  return `${year}-${month}-${day}T${hours}:${minutes}-00:00`;
}

/**
 * Gets formatted start and end dates for the current quarter
 * @returns Object containing start_date, end_date, and queryParams for backward compatibility
 */
export function getDateForCurrentQuarter(): DateRange {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  let quarterStartDate: Date, quarterEndDate: Date;

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

  const start_date = formatDate(quarterStartDate);
  const end_date = formatDate(quarterEndDate);

  return {
    start_date,
    end_date,
  };
}