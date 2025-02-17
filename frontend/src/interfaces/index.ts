// Form Input Interfaces
export interface IFormInput {
  name: string;
  type: string;
  label: string;
  placeholder?: string;
  accept?: string;
}

// Pagination Interfaces
export interface IPaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface IPaginationMeta {
  first_page_url: string;
  from: number;
  last_page: number;
  links: IPaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}
