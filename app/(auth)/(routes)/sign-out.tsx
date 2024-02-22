"use client";
import { logOut } from "@/app/api/route";
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
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { setCredentials } from "@/redux/feature/authSlice";
import { AppDispatch } from "@/redux/store";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

export function logOutFunc(dispatch: AppDispatch, navigate: any) {
  localStorage.setItem("refreshToken", "");
  dispatch(setCredentials({ user: null, accessToken: null }));
  navigate.push("/sign-in");
}

export const Logout = () => {
  const dispatch: AppDispatch = useDispatch();
  const { toast } = useToast();
  const navigate = useRouter();

  const onLogOut = async () => {
    try {
      toast({
        variant: "success",
        title: "Success.",
        description: "Logout successful",
      });
      // logOut(dispatch, navigate, setCredentials);
      logOutFunc(dispatch, navigate);
    } catch (error: any) {
      console.log(error.message);
      toast({
        variant: "destructive",
        title: "Error.",
        description: error.message,
      });
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Logout</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to logout? You will need to log back in to
            continue using our services.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-black text-white">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 text-white"
            onClick={() => {
              onLogOut();
            }}
          >
            Logout
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
