export type TRole = "admin" | "doctor" | "employee" | "patient";

export type TBookingStatus =
  | "pending"
  | "collected"
  | "cancelled"
  | "no-show"
  | "ended";

export type TPaymentMethod = "cash" | "visa";

export type TBalanceType = "inquiry" | "payment";
