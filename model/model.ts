export interface Patient {
    id: string;
    email: string;
    phoneNumber: string;
    password: string;
    userName: string;
    dob: string | null;
    userAddress: string | null;
    islock: boolean;
    refreshToken: string | null;
}

export type Dentist = {
    id: string;
    userName: string;
    email: string;
    phoneNumber: string;
    userAddress: string;
    dob: Date;
    islock: boolean;
}

export type Staff = {
    id: string;
    userName: string;
    email: string;
    phoneNumber: string;
    userAddress: string;
    dob: Date;
    islock: boolean;
}

export type Drug = {
    idBatch: string;
    idDrug: string;
    drugName: string;
    unit: string;
    indicatotr: string;
    quantity: number;
    expireDate: Date;
    price: number;
    isDelete: boolean;
}

export type Schedule = {
    idDentist: string;
    timeOfAppointment: string;
    dateOfAppointment: Date;
}

export type Appointment = {
    idPatient: string;
    idDentist: string;
    timeOfAppointment: string;
    dateOfAppointment: Date;
    patient: Patient;
}

export interface Record {
    id: string;
    idPatient: string;
    idDentist: string;
    dateOfAppointment: string;
    timeOfAppointment: string;
    total: number;
    diagnose: string;
    symptom: string;
    prescriptions: Prescription[];
    serviceIndicators: any[];
    patient: Patient;
}

export interface Prescription {
    idRecord: string;
    idBatch: string;
    idDrug: string;
    quantity: number;
    description: string;
    total: number;
}

export type ServiceIndicator = {
    idRecord: string;
    idService: string;
    quantity: number;
    total: number;
}

export type Service = {
    id: string;
    serviceName: string;
    price: number;
    isDelete: boolean;
}