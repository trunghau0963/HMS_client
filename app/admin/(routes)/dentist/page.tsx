"use client";
import React, { useEffect, useState } from "react";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import {
  AlertDialogTrigger,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogContent,
  AlertDialog,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Dentist } from "@/model/model";
import DetailsUser from "@/components/admin/DetailsUser";
import { useRouter } from "next/navigation";

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

const Dentist = () => {

  const [dentists, setDentists] = useState<Dentist[]>([]);
  const navigate = useRouter();

  const fetchDentists = async () => {
    try {
      const response = await axios.get("/api/user/admin/user/dentist");
      // console.log('fetch respone', response.data);
      setDentists(response.data);
    } catch (error) {
      console.error("Error fetching Dentists:", error);
    }
  };
  const onChangeStatus = async (id: string) => {
    try {
      console.log('id', id)
      const response = await axios.put(`/api/user/admin/user/dentist/changestatus`, { id });
      console.log('change status respone', response.data);
      fetchDentists();
    } catch (error) {
      console.error("Error fetching Dentists:", error);
    }
  }
  useEffect(() => {
    fetchDentists();
  }, []);


  console.log('Dentists', dentists)
  return (
    <div>
      <main className="flex flex-col gap-4 p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle>Dentists</CardTitle>
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
                  dentists.map((dentist: Dentist, idx: number) => (
                    <TableRow className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                      <TableCell>{idx + 1}</TableCell>
                      <TableCell>
                        <Link href="#">{dentist.id}</Link>
                      </TableCell>
                      <TableCell>{dentist.userName}</TableCell>
                      <TableCell>{`+84 ${dentist.phoneNumber.slice(1, 3)} ${dentist.phoneNumber.slice(3, 6)} ${dentist.phoneNumber.slice(6)}`}</TableCell>
                      <TableCell>
                        {
                          dentist.islock ? <Badge onClick={() => onChangeStatus(dentist.id)} className="bg-red-500 text-white">Lock</Badge> : <Badge onClick={() => onChangeStatus(dentist.id)} className="bg-green-500 text-white">Active</Badge>
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
                              <DetailsUser user={dentist} />
                            </AlertDialogDescription>
                            <hr />
                            <AlertDialogFooter>
                              <AlertDialogCancel className="bg-black text-white">
                                Close
                              </AlertDialogCancel>
                              {dentist.islock ? (
                                <AlertDialogAction className="bg-yellow-500 text-white" onClick={() => onChangeStatus(dentist.id)}>
                                  Enable
                                </AlertDialogAction>
                              ) : (<AlertDialogAction className="bg-red-500 text-white" onClick={() => onChangeStatus(dentist.id)}>
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

export default Dentist;