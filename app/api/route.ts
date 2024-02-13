import {
  AppointmentRoutes,
  AuthRoutes,
  DrugRoutes,
  RecordRoutes,
  ScheduleRoutes,
  ServiceRoutes,
  UserRoutes,
} from "@/enum";
import { getDataFromAccessToken } from "@/helper/getDataFromToken";
import { RootState } from "@/redux/store";
import axios from "axios";
import { User } from "lucide-react";
import { NextResponse } from "next/server";
import { useSelector } from "react-redux";
import type { GetServerSideProps, NextPage } from "next";

const server_url = process.env.NEXT_PUBLIC_SERVER_URL;
const api_root = process.env.NEXT_PUBLIC_API_ROOT;

const instancesApi = axios.create({
  baseURL: `${server_url}${api_root}`,
});

export const useAuthToken = () => {
  const { valueAuth } = useSelector((state: RootState) => state.auth);
  return valueAuth.token;
};

export const verifyToken = async (token: string) => {
  const respone = await instancesApi.post(`${AuthRoutes.VERIFY}`, token);
  console.log("verifyToken", respone);
  return respone.data;
};

export const signUp = async (user: any) => {
  return await instancesApi.post(`${AuthRoutes.REGISTER}`, user);
};

export const login = async (user: any) => {
  return await instancesApi.post(`${AuthRoutes.LOGIN}`, user);
};

export const getAllPatient = async (token: string) => {
  return await instancesApi.get(`${UserRoutes.PATIENT}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getAllNameOfPatient = async (token: string) => {
  return await instancesApi.get(`${UserRoutes.NAMEPATIENT}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getPatientById = async (id: string, token : string) => {
  return await instancesApi.get(`${UserRoutes.PATIENT}/${id}`,
  {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getAllDentist = async () => {
  return await instancesApi.get(`${UserRoutes.DENTIST}`);
};

export const getDentistById = async (id: string) => {
  return await instancesApi.get(`${UserRoutes.DENTIST}/${id}`);
};

export const getAllStaff = async (token: string) => {
  return await instancesApi.get(`${UserRoutes.STAFF}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getStaffById = async (id: string) => {
  return await instancesApi.get(`${UserRoutes.STAFF}/${id}`);
};

export const changestatus = async (id: string, token: string) => {
  console.log("token in api", token);
  try {
    const response = await instancesApi.put(
      `${UserRoutes.CHANGESTATUS}/${id}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error changing status:", error);
    throw error; // Re-throw the error for handling elsewhere
  }
};

export const getProfile = async (token: string) => {
  return await instancesApi.get(`${AuthRoutes.PROFILE}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getDrug = async () => {
  return await instancesApi.get(`${DrugRoutes.DRUGS}`);
};

export const getDrugAvailable = async () => {
  return await instancesApi.get(`${DrugRoutes.AVAILABLE}`);
};

export const getDrugUnavailable = async (token: string) => {
  return await instancesApi.get(`${DrugRoutes.UNAVAILABLE}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const changeStatusDrug = async (id: string, token: string) => {
  try {
    const response = await instancesApi.put(`${DrugRoutes.DRUGS}/${id}`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error changing status:", error);
    throw error; // Re-throw the error for handling elsewhere
  }
};

export const getSchedule = async (token: string) => {
  return await instancesApi.get(`${ScheduleRoutes.SCHEDULE}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getScheduleById = async (id: string, token: string) => {
  return await instancesApi.get(`${ScheduleRoutes.SCHEDULE}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const addSchedule = async (schedule: any, token: string) => {
  console.log("schedule in api", schedule);
  return await instancesApi.post(`${ScheduleRoutes.ADD}`, schedule, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateSchedule = async (
  id: string,
  schedule: any,
  token: string
) => {
  return await instancesApi.put(`${ScheduleRoutes.SCHEDULE}/${id}`, schedule, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteSchedule = async (schedule: any, token: string) => {
  return await instancesApi.delete(
    `${ScheduleRoutes.DELETE}/${schedule.id}/${schedule.date}/${schedule.time}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const getAppointment = async (token: string) => {
  return await instancesApi.get(`${AppointmentRoutes.APPOINTMENT}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getAppointmentById = async (id: string, token: string) => {
  return await instancesApi.get(`${AppointmentRoutes.APPOINTMENT}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const addAppointment = async (appointment: any, token: string) => {
  return await instancesApi.post(`${AppointmentRoutes.ADD}`, appointment, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateAppointment = async (
  id: string,
  appointment: any,
  token: string
) => {
  return await instancesApi.put(
    `${AppointmentRoutes.APPOINTMENT}/${id}`,
    appointment,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const deleteAppointment = async (appointment: any, token: string) => {
  return await instancesApi.delete(
    `${AppointmentRoutes.DELETE}/${appointment.idDentist}/${appointment.date}/${appointment.time}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const getRecord = async (token: string) => {
  return await instancesApi.get(`${RecordRoutes.RECORDS}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const addRecord = async (record: any, token: string) => {
  return await instancesApi.post(`${RecordRoutes.ADD_RECORD}`, record, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateRecord = async (record: any, token: string) => {
  const userId = await getDataFromAccessToken(token);
  return await instancesApi.put(`${RecordRoutes.RECORDS}/${userId}`, record, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteRecord = async (id: string, token: string) => {
  return await instancesApi.delete(`${RecordRoutes.DELETE_RECORD}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getRecordOfDentist = async (id: string, token: string) => {
  console.log("id in api", id);
  return await instancesApi.get(`${RecordRoutes.DENTIST}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getPrescription = async (id: string, token: string) => {
  return await instancesApi.get(`${RecordRoutes.PRESCRIPTION}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const addPrescription = async (prescription: any, token: string) => {
  return await instancesApi.post(
    `${RecordRoutes.ADD_PRESCRIPTION}`,
    prescription,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const deleteDrugPrescription = async (data: any, token: string) => {
  return await instancesApi.delete(
    `${RecordRoutes.DELETE_DRUG_PRESCRIPTION}/${data.idRecord}/${data.idBatch}/${data.idDrug}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const deletePrescription = async (id: string, token: string) => {
  return await instancesApi.delete(
    `${RecordRoutes.DELETE_PRESCRIPTION}/${id}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const getServiceIndicator = async (id: string, token: string) => {
  return await instancesApi.get(`${RecordRoutes.SERVICES_INDICATORS}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getService = async () => {
  return await instancesApi.get(`${ServiceRoutes.SERVICES}`);
};

export const addServiceIndicator = async (
  serviceIndicator: any,
  token: string
) => {
  return await instancesApi.post(
    `${RecordRoutes.ADD_SERVICES_INDICATORS}`,
    serviceIndicator,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const deleteServiceInServiceIndicator = async (data: any, token: string) => {
  return await instancesApi.delete(
    `${RecordRoutes.DELETE_SERVICES}/${data.idRecord}/${data.idService}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};
