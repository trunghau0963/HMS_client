"use client";
import {
  changestatus,
  getAllStaff,
  refreshToken,
  useAuthToken,
} from "@/app/api/route";
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
import { Staff } from "@/model/model";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { setCredentials } from "@/redux/feature/authSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";

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

const Staff = () => {
  const token = useAuthToken() as string;
  const header = `${token}`;
  const { toast } = useToast();
  const dispatch: AppDispatch = useDispatch();

  const [staffs, setStaffs] = useState<Staff[]>([]);
  const navigate = useRouter();

  const fetcher = async () => {
    try {
      const response = await getAllStaff(token);
      // console.log('fetch respone', response.data);
      setStaffs(response.data);
    } catch (error: any) {
      if (error.response.status === 401) {
        try {
          const token = localStorage.getItem("refreshToken");
          const response = await refreshToken({ token: token, role: "admin" });
          dispatch(
            setCredentials({
              user: response.data.data,
              accessToken: response.data.accessToken,
            })
          );
          localStorage.setItem("refreshToken", response.data.refreshToken);
        } catch (error: any) {
          if (error.response.status === 401 || error.response.status === 400) {
            toast({
              variant: "destructive",
              title: "Uh oh! Something went wrong.",
              description: "Unauthorized - Token is invalid or expired",
              action: <ToastAction altText="Try again">Try again</ToastAction>,
            });
            navigate.push("/sign-in");
          }
        }
      }
    }
  };
  const onChangeStatus = async (id: string) => {
    try {
      console.log("id", id);
      console.log("header", header);
      await changestatus(`staff/${id}`, header);
      // console.log('change status respone', response.data);
      fetcher();
    } catch (error: any) {
      if (error.response.status === 401) {
        try {
          const token = localStorage.getItem("refreshToken");
          console.log("token", token);
          const response = await refreshToken({ token: token, role: "admin" });
          dispatch(
            setCredentials({
              user: response.data.data,
              accessToken: response.data.accessToken,
            })
          );
          localStorage.setItem("refreshToken", response.data.refreshToken);
        } catch (error: any) {
          if (error.response.status === 401 || error.response.status === 400) {
            toast({
              variant: "destructive",
              title: "Uh oh! Something went wrong.",
              description: "Unauthorized - Token is invalid or expired",
              action: <ToastAction altText="Try again">Try again</ToastAction>,
            });
            navigate.push("/sign-in");
          }
        }
      }
    }
  };
  useEffect(() => {
    fetcher();
  }, []);

  console.log("Staffs", staffs);
  return (
    <div>
      <main className="flex flex-col gap-4 p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle>Staffs</CardTitle>
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
                {staffs.map((staff: Staff, idx: number) => (
                  <TableRow className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell>
                      <Link href="#">{staff.id}</Link>
                    </TableCell>
                    <TableCell>{staff.userName}</TableCell>
                    <TableCell>{`+84 ${staff.phoneNumber.slice(
                      1,
                      3
                    )} ${staff.phoneNumber.slice(
                      3,
                      6
                    )} ${staff.phoneNumber.slice(6)}`}</TableCell>
                    <TableCell>
                      {staff.islock ? (
                        <Badge
                          onClick={() => onChangeStatus(staff.id)}
                          className="bg-red-500 text-white"
                        >
                          Lock
                        </Badge>
                      ) : (
                        <Badge
                          onClick={() => onChangeStatus(staff.id)}
                          className="bg-green-500 text-white"
                        >
                          Active
                        </Badge>
                      )}
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
                            <AlertDialogTitle className="text-center">
                              User Information
                            </AlertDialogTitle>
                          </AlertDialogHeader>
                          <hr />
                          <AlertDialogDescription>
                            <DetailsUser user={staff} />
                          </AlertDialogDescription>
                          <hr />
                          <AlertDialogFooter>
                            <AlertDialogCancel className="bg-black text-white">
                              Close
                            </AlertDialogCancel>
                            {staff.islock ? (
                              <AlertDialogAction
                                className="bg-yellow-500 text-white"
                                onClick={() => onChangeStatus(staff.id)}
                              >
                                Enable
                              </AlertDialogAction>
                            ) : (
                              <AlertDialogAction
                                className="bg-red-500 text-white"
                                onClick={() => onChangeStatus(staff.id)}
                              >
                                Disable
                              </AlertDialogAction>
                            )}
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

export default Staff;
