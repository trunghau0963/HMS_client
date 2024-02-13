export enum Role {
  Guest = "Guest",
  Patient = "Patient",
  Dentist = "Dentist",
  Staff = "Staff",
  Admin = "Admin",
}

export enum Routes {
  DASHBOARD = "/dashboard",
  RECORDS = "/records",
  INVOICES = "/invoices",
  DRUGS = "/drugs",
  SERVICES = "/services",
  SETTINGS = "/settings",
  LOGIN = "/login",
  REGISTER = "/register",
  FORGOT_PASSWORD = "/forgot-password",
  RESET_PASSWORD = "/reset-password",
  PROFILE = "/profile",
  NOT_FOUND = "/404",
  ERROR = "/500",
}

export enum AuthRoutes {
  LOGIN = "/auth/login",
  REGISTER = "/auth/signup",
  REFRESH = "/auth/refresh",
  FORGOT_PASSWORD = "/auth/forgot-password",
  RESET_PASSWORD = "/auth/reset-password",
  PROFILE = "/auth/profile",
  VERIFY = "/auth/verify-token",
}

export enum UserRoutes {
  PATIENT = "/user/patient",
  DENTIST = "/user/dentist",
  STAFF = "/user/staff",
  NAMEPATIENT = "/user/patient/all-name",
  CHANGESTATUS = "/user/changestatus",
}

export enum DrugRoutes {
  DRUGS = "/drug",
  AVAILABLE = "/drug/available",
  UNAVAILABLE = "/drug/unavailable",
  ADD = "/drug/add",
}

export enum ServiceRoutes {
  SERVICES = "/service",
  ADD = "/service/add",
  DELETE = "/service/delete",
  PUT = "/service/put",
}

export enum ScheduleRoutes {
  SCHEDULE = "/schedule",
  ADD = "/schedule/add",
  DELETE = "/schedule/delete",
}

export enum AppointmentRoutes {
  APPOINTMENT = "/appointment",
  ADD = "/appointment/add",
  DELETE = "/appointment/delete",
  PUT = "/appointment/put",
}

export enum RecordRoutes {
  DENTIST = "/record/dentist",
  RECORDS = "/record",
  PRESCRIPTION = "/record/prescription",
  SERVICES_INDICATORS = "/record/service-indicator",
  ADD_RECORD = "/record/add-record",
  ADD_PRESCRIPTION = "/record/add-prescription",
  ADD_SERVICES_INDICATORS = "/record/add-service-indicator",
  DELETE_RECORD = "/record/delete",
  DELETE_PRESCRIPTION = "/record/delete-prescription",
  DELETE_DRUG_PRESCRIPTION = "/record/delete-drug/prescription",
  DELETE_SERVICES_INDICATORS = "/record/delete-services-indicator",
  DELETE_SERVICES = "/record/delete-service/service-indicator",
  DELETE_ALL = "/record/delete-all",
  UPDATE_RECORD = "/record/update-record",
}