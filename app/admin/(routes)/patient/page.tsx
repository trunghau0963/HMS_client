"use client";
import { changestatus, getAllPatient, useAuthToken } from "@/app/api/route";
import DetailsUser from "@/components/admin/DetailsUser";
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Patient } from "@/model/model";
import Link from "next/link";
import { useEffect, useState } from "react";

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

const Patient = () => {

  const token = useAuthToken() as string;
  const header = `${token}`;
  const [patients, setPatients] = useState<Patient[]>([]);

  console.log('header', header);

  const fetcher = async () => {
    try {
      const response = await getAllPatient(header);
      setPatients(response.data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  const onChangeStatus = async (id: string) => {
    try {
      console.log('id', id)
      console.log('header', header)
      await changestatus(`patient/${id}`, header);
      // console.log('change status respone', response.data);
      fetcher();
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  }

  useEffect(() => {
    fetcher();
  }, []);

  // fetcher();


  console.log('patients', patients)
  return (
    <div>
      <main className="flex flex-col gap-4 p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle>Patients</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>No.</TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Number Phone</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>More</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {
                  patients.map((patient: Patient, idx: number) => (
                    <TableRow className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                      <TableCell>{idx + 1}</TableCell>
                      <TableCell>
                        <Link href="#">{patient.id}</Link>
                      </TableCell>
                      <TableCell>{patient.userName}</TableCell>
                      <TableCell>{`+84 ${patient.phoneNumber.slice(1, 3)} ${patient.phoneNumber.slice(3, 6)} ${patient.phoneNumber.slice(6)}`}</TableCell>
                      <TableCell>
                        {
                          patient.islock ? <Badge onClick={() => onChangeStatus(patient.id)} className="bg-red-500 text-white">Lock</Badge> : <Badge onClick={() => onChangeStatus(patient.id)} className="bg-green-500 text-white">Active</Badge>
                        }
                      </TableCell>
                      <TableCell>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size="icon" variant="ghost">
                              <ArrowRightIcon className="w-4 h-4" />
                              <span className="sr-only">Details</span>
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle className="text-center">User Information</AlertDialogTitle>
                            </AlertDialogHeader>
                            <hr />
                            <AlertDialogDescription>
                              <DetailsUser user={patient} />
                            </AlertDialogDescription>
                            <hr />
                            <AlertDialogFooter>
                              <AlertDialogCancel className="bg-black text-white">
                                Close
                              </AlertDialogCancel>
                              {patient.islock ? (
                                <AlertDialogAction className="bg-yellow-500 text-white" onClick={() => onChangeStatus(patient.id)}>
                                  Enable
                                </AlertDialogAction>
                              ) : (<AlertDialogAction className="bg-red-500 text-white" onClick={() => onChangeStatus(patient.id)}>
                                Disable
                              </AlertDialogAction>)}
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Patient;

{/* <TableRow className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
  <TableCell>
    <Link href="#">INV001</Link>
  </TableCell>
  <TableCell>22/12/2023</TableCell>
  <TableCell>$250.00</TableCell>
  <TableCell>
    <Badge className="bg-green-500 text-white">Paid</Badge>
  </TableCell>
  <TableCell>
    <Button size="icon" variant="ghost">
      <ArrowRightIcon className="w-4 h-4" />
      <span className="sr-only">Details</span>
    </Button>
  </TableCell>
</TableRow>
<TableRow className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
  <TableCell>
    <Link href="#">INV002</Link>
  </TableCell>
  <TableCell>23/12/2023</TableCell>
  <TableCell>$150.00</TableCell>
  <TableCell>
    <Badge className="bg-yellow-500 text-white">Pending</Badge>
  </TableCell>
  <TableCell>
    <Button size="icon" variant="ghost">
      <ArrowRightIcon className="w-4 h-4" />
      <span className="sr-only">Details</span>
    </Button>
  </TableCell>
</TableRow>
<TableRow className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
  <TableCell>
    <Link href="#">INV003</Link>
  </TableCell>
  <TableCell>24/12/2023</TableCell>
  <TableCell>$350.00</TableCell>
  <TableCell>
    <Badge className="bg-red-500 text-white">Unpaid</Badge>
  </TableCell>
  <TableCell>
    <Button size="icon" variant="ghost">
      <ArrowRightIcon className="w-4 h-4" />
      <span className="sr-only">Details</span>
    </Button>
  </TableCell>
</TableRow> */}