export interface ApiQueryParams {
  start_date?: string;
  end_date?: string;
  date_type?: 'updated' | 'created';
  per_page?: number;
  page?: number;
}
