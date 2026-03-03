export enum PERMISSIONS {
  // Clinics
  CLINICS = "العيادات",
  ADD_CLINIC = "اضافة-عيادة",
  VIEW_CLINIC = "عرض-عيادة",
  UPDATE_CLINIC = "تعديل-عيادة",
  DELETE_CLINIC = "حذف-عيادة",

  // Doctors
  DOCTORS = "الاطباء",
  ADD_DOCTOR = "اضافة-طبيب",
  VIEW_DOCTOR = "عرض-طبيب",
  DELETE_DOCTOR = "حذف-طبيب",
  UPDATE_DOCTOR = "تعديل-طبيب",

  // Doctors actions
  ADD_ACTION_DOCTOR = "اضافة-اجراء-للطبيب",
  UPDATE_ACTION_DOCTOR = "تعديل-اجراء-للطبيب",
  DELETE_ACTION_DOCTOR = "حذف-اجراء-للطبيب",
  DOCTOR_ACTIONS = "اجراءات الاطباء",
  VIEW_ACTION_DOCTOR = "عرض-اجراء-للطبيب",

  // Patients
  PATIENTS = "المرضي",
  DELETE_PATIENT = "حذف-مريض",
  VIEW_PATIENT = "عرض-مريض",
  ADD_PATIENT = "اضافة-مريض",
  UPDATE_PATIENT = "تعديل-مريض",

  // Employees
  EMPLOYEES = "الموظفين",
  UPDATE_EMPLOYEE = "تعديل-موظف",
  ADD_EMPLOYEE = "اضافة-موظف",
  DELETE_EMPLOYEE = "حذف-موظف",
  VIEW_EMPLOYEE = "عرض-موظف",

  // Expenses
  ADD_EXPENSE = "اضافة-مصروف",
  DELETE_EXPENSE = "حذف-مصروف",
  CANCEL_EXPENSE = "الغاء-مصروف",
  VIEW_EXPENSE = "عرض-مصروف",
  EXPENSES = "المصاريف",

  // Expense categories
  ADD_EXPENSE_CATEGORY = "اضافة-قسم-للمصروف",
  UPDATE_EXPENSE_CATEGORY = "تعديل-قسم-للمصروف",
  DELETE_EXPENSE_CATEGORY = "حذف-قسم-للمصروف",
  EXPENSE_CATEGORIES = "اقسام المصاريف",
  VIEW_EXPENSE_CATEGORY = "عرض-قسم-للمصروف",

  // Treasuries
  UPDATE_TREASURY = "تعديل-خزنة",
  ADD_TREASURY = "اضافة-خزنة",
  DELETE_TREASURY = "حذف-خزنة",
  VIEW_TREASURY = "عرض-خزنة",
  TREASURIES = "الخزائن",
  ANALYZE_TREASURIES = "تحليل-الخزائن",
  TRANSFER_BETWEEN_TREASURIES = "التحويل-بين-الخزائن",

  // Working Days
  WORKING_DAYS = "ايام-العمل",
  UPDATE_WORKING_DAY = "تعديل-ايام-العمل",
  ADD_WORKING_DAY = "اضافة-ايام-العمل",
  DELETE_WORKING_DAY = "حذف-ايام-العمل",
  VIEW_WORKING_DAY = "عرض-ايام-العمل",

  // Bookings
  BOOKINGS = "الحجوزات",
  ADD_BOOKING = "اضافة-حجز-مريض",
  UPDATE_BOOKING = "تعديل-حجز-مريض",
  UPDATE_BOOKING_STATUS = "تحديث-حالة-الحجز",
  VIEW_BOOKING = "عرض-حجز-مريض",
  DELETE_BOOKING = "حذف-حجز-مريض",

  // Transactions
  REFUND_TRANSACTION = "استرداد-تحصيل",
  ADD_TRANSACTION = "اضافة-تحصيل",
  VIEW_TRANSACTION = "عرض-تحصيل",
  TRANSACTIONS = "التحصيلات",
  LAST_PATIENT_TRANSACTIONS = "اخر-تحصيلات-المريض",

  // Patient balances
  PATIENT_BALANCES = "تحصيلات-المريض",
  ADD_PATIENT_PAYMENT = "اضافة-دفع-للمريض",

  // Dosages
  DOSAGES = "الجرعات",
  ADD_DOSAGE = "اضافة-جرعة",
  UPDATE_DOSAGE = "تعديل-جرعة",
  VIEW_DOSAGE = "عرض-جرعة",
  DELETE_DOSAGE = "حذف-جرعة",

  // Subscription
  SUBSCRIPTION = "متابعة-الاشتراك",

  // Company Information
  COMPANY_INFO = "معلومات-الشركة",
  UPDATE_COMPANY_INFO = "تحديث-معلومات-الشركة",

  // Prescriptions
  ADD_PRESCRIPTION = "اضافة-روشتة",
  UPDATE_PRESCRIPTION = "تعديل-روشتة",
  PRESCRIPTIONS = "الروشتات",
  VIEW_PRESCRIPTION = "عرض-روشتة",
  DELETE_PRESCRIPTION = "حذف-روشتة",

  // Doctor Transactions
  DOCTOR_TRANSACTIONS = "تحصيلات-الطبيب",
  ADD_DOCTOR_EXPENSE = "اضافة-مصروف-للطبيب",

  // Notifications
  RECEIVE_NOTIFICATIONS = "استقبال-اشعارات",

  // Reports
  TRANSACTIONS_REPORTS = "تقارير-التحصيلات",
  BOOKINGS_REPORTS = "تقارير-الحجوزات",
  EXPENSES_REPORTS = "تقارير-المصروفات",
  PRESCRIPTIONS_REPORTS = "تقارير-الروشتات",
  TRANSFERS_REPORTS = "تقارير-التحويلات",
  TREASURIES_REPORTS = "تقارير-الخزائن",
  PATIENTS_REPORTS = "تقارير-المرضي",
  PATIENT_BALANCES_REPORTS = "تقارير-حساب-مريض",
}
