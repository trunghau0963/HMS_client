"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import React, { use } from "react";
import { addAppointment, getPatientById, getProfile, useAuthToken } from "@/app/api/route";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Patient } from "@/model/model";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Appointment() {
  const { toast } = useToast();
  const token = useAuthToken() as string;
  const [idPatient, setIdPatient] = React.useState<string>("");
  const [patient, setPatient] = React.useState<Patient>();
  const [recordForm, setRecordForm] = React.useState<any>({
    idPatient: "",
    idDentist: "",
    date: "",
    time: "",
    diagnose: "",
    symptom: "",
  });

  const url = window.location.pathname as string;

  const idDentist = url.toString().split("/")[3];
  const date = url.toString().split("/")[4];
  const time = url.toString().split("/")[5];
  console.log("url", url.toString().split("/")[3]);

  const fetchProfile = async () => {
    try {
      const response = await getProfile(token);
      // console.log('fetch respone', response.data.sub);
      setIdPatient(response.data.sub);
      const responePatient = await getPatientById(response.data.sub, token);
      // console.log('fetch responePatient', responePatient.data);
      setPatient(responePatient.data);
      setRecordForm({ ...recordForm, idDentist: response.data.sub });
      // return response.data.sub;
    } catch (error) {
      console.error("Error fetching dentist:", error);
    }
  };

  const postAppointment = async (
  ) => {
    try {
      await addAppointment(
        {
          idDentist: idDentist,
          idPatient: idPatient,
          date: date,
          time: time,
        },
        token
      );
      toast({
        variant: "success",
        title: "Success.",
        description: "Add new Appointment is successfully",
      });
    } catch (error: any) {
      if (error.response.status === 400) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "The appointment is already exist",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    }
  };

  React.useEffect(() => {
    fetchProfile();
  }, []);
  console.log("patient", patient);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <div className="container grid gap-6 px-6 py-10 text-center md:grid-cols-3 md:py-16 md:px-10 xl:gap-10">
          {patient ? (
            <form className="space-y-4 md:col-start-2 md:space-y-6">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold">Book an appointment</h1>
                <p className="text-gray-500 dark:text-gray-400">
                  Enter your information to book an appointment
                </p>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="Enter your email"
                    required
                    type="email"
                    value={patient.email}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone number</Label>
                  <Input
                    id="phone"
                    placeholder="Enter your phone number"
                    required
                    type="tel"
                    value={patient.phoneNumber}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Preferred date</Label>
                  <Input
                    id="date"
                    required
                    type="text"
                    readOnly
                    value={date.toString().split("T")[0]}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Preferred time</Label>
                  <Input
                    id="time"
                    required
                    type="text"
                    readOnly
                    value={time.toString().split("T")[1].split(".")[0]}
                  />
                </div>
                {/* <div className="space-y-2">
                  <Label htmlFor="symptom">Symptom</Label>
                  <Input id="symptom" required type="symptom" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="diagnostic">Diagnostic</Label>
                  <Input id="diagnostic" required type="diagnostic" />
                </div> */}
              </div>
              <Button className="w-full" type="submit" onClick={() => {postAppointment()}}>
                Book appointment
              </Button>
            </form>
          ) : (
            <h1>Loading...</h1>
          )}
          <div className="flex items-center justify-center md:col-start-3">
            <Avatar className="h-64 w-64 bg-slate-500">
              <AvatarImage alt="User avatar" src="/placeholder-avatar.jpg" />
              <AvatarFallback>{url.toString().split("/")[3]}</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </main>
      <footer className="border-t">
        <div className="container flex flex-col justify-center min-h-[60px] py-4 md:flex-row md:space-x-4 md:py-6 lg:min-h-[80px] lg:space-x-6 xl:min-h-[100px]">
          <div className="text-center md:text-left">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © 2023 MediCare. All rights reserved.
            </p>
          </div>
          <nav className="flex items-center justify-center order-1 space-x-4 text-sm md:order-0 md:justify-end">
            <Link
              className="text-gray-500 underline dark:text-gray-400"
              href="#"
            >
              Terms
            </Link>
            <Link
              className="text-gray-500 underline dark:text-gray-400"
              href="#"
            >
              Privacy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}

function FlagIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" x2="4" y1="22" y2="15" />
    </svg>
  );
}
