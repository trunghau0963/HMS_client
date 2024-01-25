"use client";
import {
    CardTitle,
    CardDescription,
    CardHeader,
    CardContent,
    Card,
    CardFooter,
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import Link from "next/link";
import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import axios from "axios";

export const GetAddAppointment = ({
    patientsName,
    idDentist,
    dateOfAppointment,
    hourOfAppointment,
}: {
    patientsName: string[];
    idDentist: string;
    dateOfAppointment: Date;
    hourOfAppointment: string;
}) => {
    const [idPatient, setIdPatient] = React.useState<string>("");
    const cutString = (str: string) => {
        const startIndex = str.lastIndexOf("-");
        if (startIndex !== -1) {
            return str.slice(startIndex + 2);
        }
        return str;
    };
    const cutId = cutString(idPatient);

    const postAppointment = async () => {
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
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
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
                                onClick={() => postAppointment()}
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
        </div>
    );
};