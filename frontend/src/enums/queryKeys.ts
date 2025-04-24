enum Query_Keys {
  GET_USER_PROFILE = "user",

  // Notifications
  NOTIFICATIONS = "notifications",

  // Dashboard
  GET_ALL_CLINICS = "clinics",
  GET_ALL_DOCTORS = "doctors",
  GET_ONE_DOCTOR = "doctor",
  GET_ALL_EMPLOYEES = "employees",
  GET_ONE_EMPLOYEE = "employee",
  GET_ALL_PATIENTS = "patients",
  GET_ONE_PATIENT = "patient",
  GET_ALL_DOCTOR_ACTIONS = "doctorActions",
  GET_ALL_DOCTOR_WORKING_DAYS = "doctorWorkingDays",
  GET_ONE_DOCTOR_WORKING_DAYS = "doctorWorkingDay",
  GET_ALL_DRUGS = "drugs",
  GET_ALL_ANALYTICS = "analysis",
  GET_ALL_SCANS = "scans",
  GET_ALL_TREASURIES = "treasuries",
  GET_ALL_EXPENSES = "expenses",
  GET_ONE_EXPENSE = "expense",
  GET_ALL_EXPENSES_CATEGORIES = "expensesCategories",
  GET_ALL_ONE_EXPENSES_CATEGORY = "expensesCategory",
  GET_ALL_BOOKINGS = "bookings",
  GET_ONE_BOOKING = "booking",
  GET_ALL_CLINIC_DOCTORS = "clinicDoctors",
  GET_AVAILABLE_BOOKINGS_TIME = "availableBookingsTimes",
  GET_ALL_TRANSACTIONS = "transactions",
  GET_ONE_TRANSACTION = "transaction",
  GET_ALL_PATIENT_LAST_VISITS = "patientLastVisits",
  GET_ALL_TRANSACTION_PATIENT_BALANCES = "patientTransactionBalances",
  GET_ALL_PATIENT_TRANSACTIONS_BALANCES = "patientTransactionsBalances",
  GET_ALL_DOSAGES = "dosages",
  GET_ALL_PRESCRIPTIONS = "prescriptions",
  GET_ONE_PRESCRIPTION = "prescription",

  // Patient
  GET_ALL_PATIENT_BOOKINGS = "patientBookings",
  GET_ONE_PATIENT_BOOKING = "patientBooking",
  GET_ALL_PATIENT_BALANCES = "patientBalances",

  // Doctor
  DOCTOR_CLINICS = "doctorClinics",
  DOCTOR_BOOKINGS = "doctorBookings",
}

export default Query_Keys;
