"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useEffect, useState } from "react";

import {
  addAppointment,
  addRecord,
  addSchedule,
  deleteAppointment,
  deleteRecord,
  deleteSchedule,
  getAllNameOfPatient,
  getAppointment,
  getAppointmentById,
  getPrescription,
  getProfile,
  getRecordOfDentist,
  getSchedule,
  getScheduleById,
  getServiceIndicator,
  useAuthToken,
} from "@/app/api/route";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  Appointment,
  Prescription,
  Record,
  Schedule,
  ServiceIndicator,
} from "@/model/model";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { FunctionPrescription } from "@/components/dentist/func-prescription";
import { FunctionServiceIndicator } from "@/components/dentist/func-service-indicator";

const Appointments = () => {
  const { toast } = useToast();
  const token = useAuthToken() as string;
  const [idDentist, setIdDentist] = useState<string>("");
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [Appointments, setAppointments] = useState<Appointment[]>([]);
  const [patientsName, setPatientsName] = useState<string[]>([]);
  const [records, setRecords] = useState<Record[]>([]);
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("10:00");
  const [recordForm, setRecordForm] = useState<any>({
    idPatient: "",
    idDentist: "",
    date: "",
    time: "",
    diagnose: "",
    symptom: "",
  });

  const [idPatient, setIdPatient] = React.useState<string>("");

  const inputDateString = date ? date : "";
  const inputDate = new Date(inputDateString);

  const cutString = (str: string) => {
    const startIndex = str.lastIndexOf("-");
    if (startIndex !== -1) {
      return str.slice(startIndex + 2);
    }
    return str;
  };
  const cutId = cutString(idPatient);

  const year = inputDate.getFullYear();
  const month = (inputDate.getMonth() + 1).toString().padStart(2, "0"); // zero-padding
  const day = inputDate.getDate().toString().padStart(2, "0"); // zero-padding
  const hours = inputDate.getHours().toString().padStart(2, "0"); // zero-padding
  const minutes = inputDate.getMinutes().toString().padStart(2, "0"); // zero-padding
  const seconds = inputDate.getSeconds().toString().padStart(2, "0"); // zero-padding

  const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
  const formattedTime = `${year}-${month}-${day}T${time}:${seconds}Z`;

  const fetchDentistId = async () => {
    try {
      const response = await getProfile(token);
      // console.log('fetch respone', response.data.sub);
      setIdDentist(response.data.sub);
      setRecordForm({ ...recordForm, idDentist: response.data.sub });
      return response.data.sub;
    } catch (error) {
      console.error("Error fetching dentist:", error);
    }
  };

  const fetchPatientsNameList = async () => {
    try {
      const response = await getAllNameOfPatient(token);
      // console.log('fetch name', response.data);
      setPatientsName(response.data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  const fetchSchedule = async () => {
    const id = await fetchDentistId();
    // console.log("id", id);
    if (id) {
      try {
        const response = await getScheduleById(id, token);
        // console.log('fetch respone', response.data);
        setSchedules(response.data);
      } catch (error) {
        console.error("Error fetching schedule:", error);
      }
    }
  };

  const fetchAppointment = async () => {
    const id = await fetchDentistId();
    // console.log("id", id);
    if (id) {
      try {
        const response = await getAppointmentById(id, token);
        // console.log('fetch respone', response.data);
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointment:", error);
      }
    }
  };

  const fetchRecord = async () => {
    const id = await fetchDentistId();
    // console.log("idDentist", idDentist);
    // console.log("id", id);
    if (id) {
      try {
        const response = await getRecordOfDentist(id, token);
        console.log("fetch respone", response.data);
        setRecords(response.data);
        return response.data;
      } catch (error) {
        console.error("Error fetching record:", error);
        return false;
      }
    }
  };

  const postSchedule = async () => {
    try {
      await addSchedule(
        { id: idDentist, date: formattedDate, time: formattedTime },
        token
      );
      fetchSchedule();
      toast({
        variant: "success",
        title: "Success.",
        description: "Add new Schedule is successfully",
      });
    } catch (error: any) {
      if (error.response.status === 400) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "The schedule is already exist",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
      if (error.response.status === 401) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "You are not authorized to add schedule",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
      if (error.response.status === 403) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "You are not allowed to add schedule",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
      if (error.response.status === 500) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    }
  };

  const postAppointment = async (
    idDentist: string,
    dateOfAppointment: Date,
    hourOfAppointment: string
  ) => {
    try {
      await addAppointment(
        {
          idDentist: idDentist,
          idPatient: cutId,
          date: dateOfAppointment,
          time: hourOfAppointment,
        },
        token
      );
      fetchSchedule();
      fetchAppointment();
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

  const postRecord = async (
    dateOfAppointment: Date,
    hourOfAppointment: string
  ) => {
    const data = {
      idDentist: idDentist,
      date: dateOfAppointment,
      time: hourOfAppointment,
    };
    console.log(data);
    if (recordForm.idPatient && data) {
      console.log("recordForm", recordForm);
      try {
        await addRecord(recordForm, token);
        await deleteAppointment(data, token);
        fetchSchedule();
        fetchAppointment();
        fetchRecord();
        toast({
          variant: "success",
          title: "Success.",
          description: "Add new Record is successfully",
        });
      } catch (error: any) {
        if (error.response.status === 400) {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "The record is already exist",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          });
        }
        if (error.response.status === 401) {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "You are not authorized to add record",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          });
        }
        if (error.response.status === 403) {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "You are not allowed to add record",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          });
        }
      }
    }
  };

  const deleteScheduleFunc = async (dateSchedule: any, timeSchedule: any) => {
    const data = {
      id: idDentist,
      date: dateSchedule,
      time: timeSchedule,
    };
    try {
      await deleteSchedule(data, token);
      fetchSchedule();
      toast({
        variant: "success",
        title: "Success.",
        description: "Delete Schedule is successfully",
      });
    } catch (error: any) {
      if (error.response.status === 400) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "The schedule is not exist",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
      if (error.response.status === 401) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "You are not authorized to delete schedule",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
      if (error.response.status === 403) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "You are not allowed to delete schedule",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    }
  };

  const deleteAppointmentFunc = async (
    idPatient: string,
    dateSchedule: Date,
    timeSchedule: string
  ) => {
    const data = {
      // idPatient: idPatient,
      idDentist: idDentist,
      date: dateSchedule,
      time: timeSchedule,
    };
    try {
      await deleteAppointment(data, token);
      fetchSchedule();
      fetchAppointment();
      toast({
        variant: "success",
        title: "Success.",
        description: "Delete Appointment is successfully",
      });
    } catch (error: any) {
      if (error.response.status === 400) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "The appointment is not exist",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
      if (error.response.status === 401) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "You are not authorized to delete appointment",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
      if (error.response.status === 403) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "You are not allowed to delete appointment",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    }
  };

  const deleteRecordFunc = async (id: string) => {
    try {
      await deleteRecord(id, token);
      fetchSchedule();
      fetchAppointment();
      fetchRecord();
      toast({
        variant: "success",
        title: "Success.",
        description: "Delete Record is successfully",
      });
    } catch (error: any) {
      if (error.response.status === 400) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "The record is not exist",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
      if (error.response.status === 401) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "You are not authorized to delete record",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
      if (error.response.status === 403) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "You are not allowed to delete record",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    }
  };

  // console.log('idDentist', idDentist);

  useEffect(() => {
    fetchDentistId();
    fetchPatientsNameList();
    fetchSchedule();
    fetchAppointment();
    fetchRecord();
  }, []);

  // console.log('record', records[0].prescriptions.length)

  return (
    <div>
      <main className="flex flex-col gap-4 p-4 md:p-6">
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add Schedule</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Schedule</DialogTitle>
              <DialogDescription>
                Choose Date and Time to make your new free schedule. Click save
                when you're done.
              </DialogDescription>
            </DialogHeader>

            <div>
              <Label htmlFor="date">Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal shadow-inner border-2",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label htmlFor="time">Time</Label>
              <Input
                onChange={(e) => setTime(e.target.value)}
                defaultValue={time}
                className="w-full shadow-inner border-2"
                type="time"
                name="time"
                required
                pattern="(?:[01]\d|2[0-3]):[0-5]\d" // 24h format
                placeholder="HH:mm"
              />
            </div>
            <DialogClose>
              <Button type="submit" onClick={postSchedule}>
                Save changes
              </Button>
            </DialogClose>
          </DialogContent>
        </Dialog>
        <Card>
          <CardHeader>
            <CardTitle>Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>No.</TableHead>
                  <TableHead>Patient ID</TableHead>
                  <TableHead>Patient Name</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>State</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {schedules.length === 0
                  ? ""
                  : schedules.map((schedule: Schedule, idx: number) => (
                      <TableRow className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                        <TableCell>{idx + 1}</TableCell>
                        <TableCell>
                          <i>Undefined</i>
                        </TableCell>
                        <TableCell>
                          <i>Undefined</i>
                        </TableCell>
                        <TableCell>
                          {schedule.dateOfAppointment.toString().split("T")[0]}
                        </TableCell>
                        <TableCell>
                          {
                            schedule.timeOfAppointment
                              .toString()
                              .split("T")[1]
                              .split(".")[0]
                          }
                        </TableCell>
                        <TableCell>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="red" className="rounded">
                                Add Appointment
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-xl min-vw-sm rounded">
                              <DialogHeader>
                                <DialogTitle className="text-center">
                                  Add Appointment
                                </DialogTitle>
                                <DialogDescription className="text-center">
                                  <Badge className="mr-2 bg-yellow-500 rounded-full">
                                    Up coming
                                  </Badge>
                                </DialogDescription>
                              </DialogHeader>
                              <Tabs
                                defaultValue="create_appointment"
                                className="w-full"
                              >
                                <TabsList className="grid w-full grid-cols-2">
                                  <TabsTrigger value="create_appointment">
                                    Create Appointment
                                  </TabsTrigger>
                                  <TabsTrigger value="add_new_patient">
                                    Add New Patient
                                  </TabsTrigger>
                                </TabsList>
                                <TabsContent value="create_appointment">
                                  <Card>
                                    <CardHeader>
                                      <CardTitle>Create Appointment</CardTitle>
                                      <CardDescription>
                                        Create an appointment with list of
                                        patient here.
                                      </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                      <div>
                                        <Label htmlFor="patientName">
                                          Name of Patient
                                        </Label>
                                        <Select
                                          onValueChange={(value) =>
                                            setIdPatient(value)
                                          }
                                        >
                                          <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select a patient" />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectGroup>
                                              <SelectLabel>
                                                Patients List
                                              </SelectLabel>
                                              {patientsName.map((name) => (
                                                <SelectItem value={name}>
                                                  {name}
                                                </SelectItem>
                                              ))}
                                            </SelectGroup>
                                          </SelectContent>
                                        </Select>
                                      </div>
                                    </CardContent>
                                    <CardFooter>
                                      <Button
                                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        type="submit"
                                        onClick={() =>
                                          postAppointment(
                                            schedule.idDentist,
                                            schedule.dateOfAppointment,
                                            schedule.timeOfAppointment
                                          )
                                        }
                                      >
                                        Create Appointment
                                      </Button>
                                    </CardFooter>
                                  </Card>
                                </TabsContent>
                                <TabsContent value="add_new_patient">
                                  <Card>
                                    <CardHeader>
                                      <CardTitle>Add New Patient</CardTitle>
                                      <CardDescription>
                                        Create New Patient and book an
                                        appointment.
                                      </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                      <form>
                                        <div className="grid grid-cols-2 gap-2">
                                          <div className="space-y-2">
                                            <Label htmlFor="patient_name">
                                              Patient Name
                                            </Label>
                                            <Input
                                              type="text"
                                              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                              name="patient_name"
                                              id="patient_name"
                                              placeholder=""
                                            />
                                          </div>
                                          <div className="space-y-2">
                                            <Label htmlFor="phoneNum">
                                              Patient Phone Number
                                            </Label>
                                            <Input
                                              type="text"
                                              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                              id="phoneNum"
                                              name="phoneNum"
                                            />
                                          </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                          <div className="space-y-2">
                                            <Label htmlFor="Email">Email</Label>
                                            <Input
                                              type="text"
                                              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                              id="Email"
                                              required
                                              name="Email"
                                            />
                                          </div>
                                          <div className="space-y-2">
                                            <Label htmlFor="Password">
                                              Password
                                            </Label>
                                            <Input
                                              type="text"
                                              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                              name="Password"
                                              required
                                              id="Password"
                                            />
                                          </div>
                                        </div>
                                      </form>
                                    </CardContent>
                                    <CardFooter>
                                      <Button
                                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                        type="submit"
                                      >
                                        Create New Patient
                                      </Button>
                                    </CardFooter>
                                  </Card>
                                </TabsContent>
                              </Tabs>
                              {/* <GetAddAppointment patientsName={patientsName} idDentist={schedule.idDentist} dateOfAppointment={schedule.dateOfAppointment} hourOfAppointment={schedule.timeOfAppointment} /> */}
                            </DialogContent>
                          </Dialog>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant={"slate"} className="mx-2">
                                Delete
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Are you absolutely sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will
                                  permanently delete your schedule and remove
                                  your data from our servers.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() =>
                                    deleteScheduleFunc(
                                      schedule.dateOfAppointment,
                                      schedule.timeOfAppointment
                                    )
                                  }
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Appointment</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>No.</TableHead>
                  <TableHead>Patient ID</TableHead>
                  <TableHead>Patient Name</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>State</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Appointments.length === 0
                  ? ""
                  : Appointments.map(
                      (appointment: Appointment, idx: number) => (
                        <TableRow className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                          <TableCell>{idx + 1}</TableCell>
                          <TableCell>{appointment.idPatient}</TableCell>
                          <TableCell>{appointment.patient.userName}</TableCell>
                          <TableCell>
                            {
                              appointment.dateOfAppointment
                                .toString()
                                .split("T")[0]
                            }
                          </TableCell>
                          <TableCell>
                            {
                              appointment.timeOfAppointment
                                .toString()
                                .split("T")[1]
                                .split(".")[0]
                            }
                          </TableCell>
                          <TableCell>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="emerald" className="rounded">
                                  Create Record
                                  {/* <ArrowRightIcon className="w-4 h-4" /> */}
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-xl min-vw-sm rounded">
                                <DialogHeader>
                                  <DialogTitle className="text-center">
                                    Create Record
                                  </DialogTitle>
                                  <DialogDescription className="text-center">
                                    <Badge className="mr-2 bg-red-500 rounded-full">
                                      To do
                                    </Badge>
                                  </DialogDescription>
                                </DialogHeader>
                                <Card>
                                  <CardHeader>
                                    <CardTitle>Add New Record</CardTitle>
                                    <CardDescription>
                                      Add the diagnose and the symptom of
                                      patient to create new record.
                                    </CardDescription>
                                  </CardHeader>
                                  <CardContent className="space-y-2">
                                    <form>
                                      <div className="grid grid-cols-2 gap-2">
                                        <div className="space-y-2">
                                          <Label htmlFor="symptom">
                                            Symptom of Patient
                                          </Label>
                                          <Input
                                            type="text"
                                            className="shadow-inner border-2"
                                            name="symptom"
                                            id="symptom"
                                            placeholder=""
                                            onChange={(e) =>
                                              setRecordForm({
                                                ...recordForm,
                                                symptom: e.target.value,
                                              })
                                            }
                                          />
                                        </div>
                                        <div className="space-y-2">
                                          <Label htmlFor="diagnostic">
                                            Diagnostic of Patient
                                          </Label>
                                          <Input
                                            type="text"
                                            className="shadow-inner border-2"
                                            id="diagnostic"
                                            name="diagnostic"
                                            onChange={(e) =>
                                              setRecordForm({
                                                ...recordForm,
                                                diagnose: e.target.value,
                                                idPatient:
                                                  appointment.idPatient,
                                                date: appointment.dateOfAppointment,
                                                time: appointment.timeOfAppointment,
                                              })
                                            }
                                          />
                                        </div>
                                      </div>
                                    </form>
                                  </CardContent>
                                  <CardFooter>
                                    <Button
                                      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-slate-600 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
                                      type="submit"
                                      onClick={() =>
                                        postRecord(
                                          appointment.dateOfAppointment,
                                          appointment.timeOfAppointment
                                        )
                                      }
                                    >
                                      Create New Record
                                    </Button>
                                  </CardFooter>
                                </Card>
                              </DialogContent>
                            </Dialog>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant={"slate"} className="mx-2">
                                  Delete
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Are you absolutely sure?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    You can make your appointment again if this
                                    is a mistake.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() =>
                                      deleteAppointmentFunc(
                                        appointment.idPatient,
                                        appointment.dateOfAppointment,
                                        appointment.timeOfAppointment
                                      )
                                    }
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </TableCell>
                        </TableRow>
                      )
                    )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Record</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>No.</TableHead>
                  <TableHead>Patient ID</TableHead>
                  <TableHead>Patient Name</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>State</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {records.length === 0
                  ? ""
                  : records.map((record: Record, idx: number) => (
                      <TableRow className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                        <TableCell>{idx + 1}</TableCell>
                        <TableCell>{record.idPatient}</TableCell>
                        <TableCell>{record.patient.userName}</TableCell>
                        <TableCell>
                          {record.dateOfAppointment.split("T")[0]}
                        </TableCell>
                        <TableCell>
                          {record.timeOfAppointment.split("T")[1].split(".")[0]}
                        </TableCell>
                        <TableCell>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="cyan" className="rounded">
                                Modify
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="md:max-w-3xl min-vw-sm rounded">
                              <DialogHeader>
                                <DialogTitle className="text-center text-2xl">
                                  Modify the record
                                </DialogTitle>
                                <DialogDescription className="text-center">
                                  <Badge className="mr-2 bg-teal-500 rounded-full">
                                    In progress
                                  </Badge>
                                </DialogDescription>
                              </DialogHeader>
                              <Card>
                                <CardHeader>
                                  <CardTitle className="text-xl">
                                    Prescription and ServiceIndicator
                                  </CardTitle>
                                  <CardDescription>
                                    Add/modify the prescription and the
                                    serviceIndicator of a record.
                                  </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                  <Accordion type="single" collapsible>
                                    <AccordionItem value="item-1">
                                      <AccordionTrigger className="text-bold text-lg">
                                        Prescription
                                      </AccordionTrigger>
                                      <AccordionContent>
                                        <FunctionPrescription
                                          idRecord={record.id}
                                          token={token}
                                        />
                                      </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="item-2">
                                      <AccordionTrigger className="text-bold text-lg">
                                        Service Indicator
                                      </AccordionTrigger>
                                      <AccordionContent>
                                        <FunctionServiceIndicator
                                          idRecord={record.id}
                                          token={token}
                                        />
                                      </AccordionContent>
                                    </AccordionItem>
                                  </Accordion>
                                </CardContent>
                                <CardFooter>
                                  <Button
                                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-slate-600 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
                                    type="submit"
                                  >
                                    Create New Record
                                  </Button>
                                </CardFooter>
                              </Card>
                            </DialogContent>
                          </Dialog>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant={"slate"} className="mx-2">
                                Delete
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Are you absolutely sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  You can make this record again if this is a
                                  mistake.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => {
                                    deleteRecordFunc(record.id);
                                  }}
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Appointments;
