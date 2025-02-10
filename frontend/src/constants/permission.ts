import { Permission, TRole } from "@/types";

const CLINIC: Permission[] = [
  "delete_clinic",
  "add_clinic",
  "update_clinic",
  "manage_clinic",
];

export const ROLE_PERMISSIONS: Record<TRole, Permission[]> = {
  admin: [...CLINIC],
  doctor: ["view_patients", "view_appointments", "manage_appointments"],
  employee: [
    "view_patients",
    "manage_patients",
    "view_appointments",
    "manage_appointments",
  ],
  patient: ["view_appointments", "manage_appointments"],
};
