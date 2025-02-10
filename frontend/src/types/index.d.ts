export type TRole = "admin" | "doctor" | "employee" | "patient";

export type Permission =
  | "manage_clinic"
  | "add_clinic"
  | "update_clinic"
  | "delete_clinic"
  // ---------------
  | "manage_patients"
  | "view_patients"
  | "manage_doctors"
  | "view_doctors"
  | "manage_employees"
  | "view_employees"
  | "manage_appointments"
  | "view_appointments";
