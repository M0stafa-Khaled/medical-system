// Form Input Interfaces
export interface IFormInput {
  name: string;
  type: string;
  label: string;
  placeholder?: string;
  accept?: string;
}

// Pagination Interfaces
export interface IPaginationMeta {
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
}

// Get interface
export interface IGetTokenPageSearch {
  token: string;
  page?: number;
  search?: string;
}
