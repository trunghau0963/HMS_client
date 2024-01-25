"use client";
import React, { useEffect, useState } from "react";
import { CardTitle, CardHeader, CardContent, Card, CardDescription, CardFooter } from "@/components/ui/card";
import {
    TableHead,
    TableRow,
    TableHeader,
    TableCell,
    TableBody,
    Table,
} from "@/components/ui/table";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
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
} from "@/components/ui/alert-dialog"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Appointment, Patient, Prescription, Record, Schedule, ServiceIndicator } from "@/model/model";
import DetailsUser from "@/components/admin/DetailsUser";
import { useRouter } from "next/navigation";
import { GetAddAppointment } from "@/components/dentist/function-schedule";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Calendar } from "@/components/ui/calendar";
import { format, set } from "date-fns";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

function ArrowRightIcon(props: any) {
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
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
        </svg>
    );
}

const Appointments = () => {

    const [idDentist, setIdDentist] = useState<string>("");
    const [schedules, setSchedules] = useState<Schedule[]>([]);
    const [Appointments, setAppointments] = useState<Appointment[]>([]);
    const [patientsName, setPatientsName] = useState<string[]>([]);
    const [records, setRecords] = useState<Record[]>([]);
    const [date, setDate] = useState<Date>()
    const [time, setTime] = useState('10:00');
    const [recordForm, setRecordForm] = useState<any>({
        idPatient: "",
        idDentist: "",
        date: "",
        time: "",
        diagnose: "",
        symptom: ""
    });
    const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
    const [serviceIndicators, setServiceIndicators] = useState<ServiceIndicator[]>([]);

    const [idPatient, setIdPatient] = React.useState<string>("");

    const inputDateString = date ? date : '';
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
    const month = (inputDate.getMonth() + 1).toString().padStart(2, '0'); // zero-padding
    const day = inputDate.getDate().toString().padStart(2, '0'); // zero-padding
    const hours = inputDate.getHours().toString().padStart(2, '0'); // zero-padding
    const minutes = inputDate.getMinutes().toString().padStart(2, '0'); // zero-padding
    const seconds = inputDate.getSeconds().toString().padStart(2, '0'); // zero-padding

    const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
    const formattedTime = `${year}-${month}-${day}T${time}:${seconds}Z`

    const fetchDentistId = async () => {
        try {
            const response = await axios.get("/api/user/dentist");
            console.log('fetch respone', response.data);
            setIdDentist(response.data);
            setRecordForm({ ...recordForm, idDentist: response.data })
        } catch (error) {
            console.error("Error fetching dentist:", error);
        }
    }

    const fetchPatientsNameList = async () => {
        try {
            const response = await axios.get("http://localhost:5000/patient/all-name");
            // console.log('fetch respone', response.data);
            setPatientsName(response.data);
        } catch (error) {
            console.error("Error fetching patients:", error);
        }
    }

    const fetchSchedule = async () => {
        try {
            const response = await axios.get("/api/user/dentist/schedule/get");
            // console.log('fetch respone', response.data);
            setSchedules(response.data);
        } catch (error) {
            console.error("Error fetching schedule:", error);
        }
    }

    const fetchAppointment = async () => {
        try {
            const response = await axios.get("/api/user/dentist/appointment/get");
            console.log('fetch respone', response.data);
            setAppointments(response.data);
        } catch (error) {
            console.error("Error fetching appointment:", error);
        }
    }

    const fetchRecord = async () => {
        try {
            const response = await axios.get("/api/user/dentist/record/get");
            console.log('fetch respone', response.data);
            setRecords(response.data);
        } catch (error) {
            console.error("Error fetching record:", error);
        }
    }

    const fetchPrescription = async (idRecord: string) => {
        try {
            const response = await axios.get(`http://localhost:5000/dentist/record/precription/${idRecord}`);
            console.log('fetch respone', response.data);
            setPrescriptions(response.data);
        } catch (error) {
            console.error("Error fetching prescription:", error);
        }
    }

    const fetchServiceIndicator = async () => {
        try {
            const response = await axios.get("/api/user/dentist/service-indicator/get");
            console.log('fetch respone', response.data);
            setServiceIndicators(response.data);
        } catch (error) {
            console.error("Error fetching service indicator:", error);
        }
    }

    const postSchedule = async () => {
        try {
            // console.log('dentistId', schedules[0]?.idDentist);
            // console.log('date', formattedDate);
            // console.log('time', formattedTime);
            await axios.post(`http://localhost:5000/dentist/schedule/${idDentist}`, {
                date: formattedDate,
                time: formattedTime
            });
            fetchSchedule();
        } catch (error) {
            console.error("Error fetching schedule:", error);
        }
    }

    const postAppointment = async (idDentist: string, dateOfAppointment: Date, hourOfAppointment: string) => {
        try {
            console.log(idDentist);
            console.log(cutId);
            console.log(dateOfAppointment);
            console.log(hourOfAppointment);
            await axios.post(`http://localhost:5000/dentist/add-appointment`, {
                idDentist: idDentist,
                idPatient: cutId,
                date: dateOfAppointment,
                time: hourOfAppointment,
            });
            fetchSchedule();
            fetchAppointment();
        }
        catch (error) {
            console.log(error);
        }
    }

    const postRecord = async (idPatient: string, dateOfAppointment: Date, hourOfAppointment: string) => {
        setRecordForm({ ...recordForm, idPatient: idPatient, date: dateOfAppointment, time: hourOfAppointment });
        console.log('recordForm', recordForm)
        try {
            await axios.post(`http://localhost:5000/dentist/add-record`, recordForm);
            fetchSchedule();
            fetchAppointment();
            fetchRecord();
        } catch (error) {
            console.error("Error fetching record:", error);
        }
    }

    const deleteSchedule = async (dateSchedule: any, timeSchedule: any) => {
        try {
            await axios.delete("/api/user/dentist/schedule/delete", {
                data: {
                    idDentist: idDentist,
                    date: dateSchedule,
                    time: timeSchedule
                }
            });
            fetchSchedule();
        } catch (error) {
            console.error("Error fetching schedule:", error);
        }
    }

    const deleteAppointment = async (idPatient: string, dateSchedule: Date, timeSchedule: string) => {
        try {
            await axios.delete(`/api/user/dentist/appointment/delete`, {
                data: {
                    idPatient: idPatient,
                    idDentist: idDentist,
                    date: dateSchedule,
                    time: timeSchedule
                }
            });
            fetchSchedule();
            fetchAppointment();
        }
        catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        fetchDentistId();
        fetchPatientsNameList();
        fetchSchedule();
        fetchAppointment();
        fetchRecord();
    }, []);

    console.log('idDentist', idDentist);

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
                                Choose Date and Time to make your new free schedule. Click save when you're done.
                            </DialogDescription>
                        </DialogHeader>

                        <div>
                            <Label htmlFor="date">
                                Date
                            </Label>
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
                            <Label htmlFor="time">
                                Time
                            </Label>
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
                            <Button type="submit" onClick={postSchedule}>Save changes</Button>
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
                                {
                                    schedules.length === 0 ? ("") : (schedules.map((schedule: Schedule, idx: number) => (
                                        <TableRow className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                                            <TableCell>{idx + 1}</TableCell>
                                            <TableCell>
                                                <i>Undefined</i>
                                            </TableCell>
                                            <TableCell><i>Undefined</i></TableCell>
                                            <TableCell>{schedule.dateOfAppointment.toString().split("T")[0]}</TableCell>
                                            <TableCell>
                                                {schedule.timeOfAppointment.toString().split("T")[1].split(".")[0]}
                                            </TableCell>
                                            <TableCell>
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button variant="red" className="rounded">
                                                            Add Appointment
                                                            {/* <ArrowRightIcon className="w-4 h-4" /> */}
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="sm:max-w-xl min-vw-sm rounded">
                                                        <DialogHeader>
                                                            <DialogTitle className="text-center">Add Appointment</DialogTitle>
                                                            <DialogDescription className="text-center">
                                                                <Badge className="mr-2 bg-yellow-500 rounded-full">Up coming</Badge>
                                                            </DialogDescription>
                                                        </DialogHeader>
                                                        <Tabs defaultValue="create_appointment" className="w-full">
                                                            <TabsList className="grid w-full grid-cols-2">
                                                                <TabsTrigger value="create_appointment">Create Appointment</TabsTrigger>
                                                                <TabsTrigger value="add_new_patient">Add New Patient</TabsTrigger>
                                                            </TabsList>
                                                            <TabsContent value="create_appointment">
                                                                <Card>
                                                                    <CardHeader>
                                                                        <CardTitle>Create Appointment</CardTitle>
                                                                        <CardDescription>
                                                                            Create an appointment with list of patient here.
                                                                        </CardDescription>
                                                                    </CardHeader>
                                                                    <CardContent className="space-y-2">
                                                                        <div>
                                                                            <Label htmlFor="patientName">
                                                                                Name of Patient
                                                                            </Label>
                                                                            <Select onValueChange={(value) => setIdPatient(value)}>
                                                                                <SelectTrigger className="w-full">
                                                                                    <SelectValue placeholder="Select a patient" />
                                                                                </SelectTrigger>
                                                                                <SelectContent>
                                                                                    <SelectGroup>
                                                                                        <SelectLabel>Patients List</SelectLabel>
                                                                                        {patientsName.map((name) => (
                                                                                            <SelectItem value={name}>{name}</SelectItem>
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
                                                                            onClick={() => postAppointment(schedule.idDentist, schedule.dateOfAppointment, schedule.timeOfAppointment)}
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
                                                                            Create New Patient and book an appointment.
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
                                                                                    <Label htmlFor="Email">
                                                                                        Email
                                                                                    </Label>
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
                                                        <Button variant={'slate'} className="mx-2">Delete</Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                This action cannot be undone. This will permanently delete your
                                                                schedule and remove your data from our servers.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                            <AlertDialogAction onClick={() => deleteSchedule(schedule.dateOfAppointment, schedule.timeOfAppointment)}>
                                                                Delete
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </TableCell>
                                        </TableRow>
                                    )))
                                }
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
                                {
                                    Appointments.length === 0 ? ("") : (Appointments.map((appointment: Appointment, idx: number) => (
                                        <TableRow className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                                            <TableCell>{idx + 1}</TableCell>
                                            <TableCell>
                                                {appointment.idPatient}
                                            </TableCell>
                                            <TableCell>{appointment.patient.userName}</TableCell>
                                            <TableCell>{appointment.dateOfAppointment.toString().split("T")[0]}</TableCell>
                                            <TableCell>
                                                {appointment.timeOfAppointment.toString().split("T")[1].split(".")[0]}
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
                                                            <DialogTitle className="text-center">Create Record</DialogTitle>
                                                            <DialogDescription className="text-center">
                                                                <Badge className="mr-2 bg-red-500 rounded-full">To do</Badge>
                                                            </DialogDescription>
                                                        </DialogHeader>
                                                        <Card>
                                                            <CardHeader>
                                                                <CardTitle>Add New Record</CardTitle>
                                                                <CardDescription>
                                                                    Add the diagnose and the symptom of patient to create new record.
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
                                                                                onChange={(e) => setRecordForm({ ...recordForm, symptom: e.target.value })}
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
                                                                                onChange={(e) => setRecordForm({ ...recordForm, diagnose: e.target.value })}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </form>
                                                            </CardContent>
                                                            <CardFooter>
                                                                <Button
                                                                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-slate-600 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
                                                                    type="submit"
                                                                    onClick={() => postRecord(appointment.idPatient, appointment.dateOfAppointment, appointment.timeOfAppointment)}
                                                                >
                                                                    Create New  Record
                                                                </Button>
                                                            </CardFooter>
                                                        </Card>
                                                    </DialogContent>
                                                </Dialog>
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button variant={'slate'} className="mx-2">Delete</Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                You can make your appointment again if this is a mistake.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                            <AlertDialogAction onClick={() => deleteAppointment(appointment.idPatient, appointment.dateOfAppointment, appointment.timeOfAppointment)}>
                                                                Delete
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </TableCell>
                                        </TableRow>
                                    )))

                                }

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
                                {
                                    records.length === 0 ? ("") : (records.map((record: Record, idx: number) => (
                                        <TableRow className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                                            <TableCell>{idx + 1}</TableCell>
                                            <TableCell>
                                                {record.idPatient}
                                            </TableCell>
                                            <TableCell>{record.patient.userName}</TableCell>
                                            <TableCell>{record.dateOfAppointment.toString().split("T")[0]}</TableCell>
                                            <TableCell>
                                                {record.timeOfAppointment.toString().split("T")[1].split(".")[0]}
                                            </TableCell>
                                            <TableCell>
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button variant="cyan" className="rounded">
                                                            Modify
                                                            {/* <ArrowRightIcon className="w-4 h-4" /> */}
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="md:max-w-3xl min-vw-sm rounded">
                                                        <DialogHeader>
                                                            <DialogTitle className="text-center text-2xl">Modify the record</DialogTitle>
                                                            <DialogDescription className="text-center">
                                                                <Badge className="mr-2 bg-teal-500 rounded-full">In progress</Badge>
                                                            </DialogDescription>
                                                        </DialogHeader>
                                                        <Card>
                                                            <CardHeader>
                                                                <CardTitle className="text-xl">Prescription and ServiceIndicator</CardTitle>
                                                                <CardDescription>
                                                                    Add/modify the prescription and the serviceIndicator of a record.
                                                                </CardDescription>
                                                            </CardHeader>
                                                            <CardContent className="space-y-2">
                                                                <Accordion type="single" collapsible>
                                                                    <AccordionItem value="item-1" onClick={() => fetchPrescription(record.id)}>
                                                                        <AccordionTrigger className="text-bold text-lg">Prescription</AccordionTrigger>
                                                                        <AccordionContent>
                                                                            {prescriptions.length === 0 ? ("") : (prescriptions.map((prescription: Prescription, idx: number) => (
                                                                                <div className="grid grid-cols-2 gap-2">
                                                                                    <div className="space-y-2">
                                                                                        <Label htmlFor="medicine">
                                                                                            Medicine
                                                                                        </Label>
                                                                                        <Input
                                                                                            type="text"
                                                                                            className="shadow-inner border-2"
                                                                                            name="medicine"
                                                                                            id="medicine"
                                                                                            placeholder={prescription.idDrug}
                                                                                        />
                                                                                    </div>
                                                                                    <div className="space-y-2">
                                                                                        <Label htmlFor="quantity">
                                                                                            Quantity
                                                                                        </Label>
                                                                                        <Input
                                                                                            type="text"
                                                                                            className="shadow-inner border-2"
                                                                                            id="quantity"
                                                                                            name="quantity"
                                                                                            placeholder={prescription.quantity.toString()}
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                            )))}
                                                                        </AccordionContent>
                                                                    </AccordionItem>

                                                                    <AccordionItem value="item-2">
                                                                        <AccordionTrigger className="text-bold text-lg">Service Indicator</AccordionTrigger>
                                                                        <AccordionContent>
                                                                            Yes. It adheres to the WAI-ARIA design pattern.
                                                                        </AccordionContent>
                                                                    </AccordionItem>
                                                                </Accordion>

                                                            </CardContent>
                                                            <CardFooter>
                                                                <Button
                                                                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-slate-600 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
                                                                    type="submit"
                                                                >
                                                                    Create New  Record
                                                                </Button>
                                                            </CardFooter>
                                                        </Card>
                                                    </DialogContent>
                                                </Dialog>
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button variant={'slate'} className="mx-2">Delete</Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                You can make this record again if this is a mistake.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                            <AlertDialogAction>
                                                                Delete
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </TableCell>
                                        </TableRow>
                                    )))

                                }

                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
};

export default Appointments;