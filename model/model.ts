export type Patient = {
    id: string;
    userName: string;
    email: string;
    phoneNumber: string;
    userAddress: string;
    dob: Date;
    islock: boolean;
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

export type Record = {
    id: string;
    idPatient: string;
    idDentist: string;
    timeOfAppointment: string;
    dateOfAppointment: Date;
    total: number;
    diagnose: string;
    symptom: string;
    patient: Patient;
}

export type Prescription = {
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