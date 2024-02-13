"use client";
import { signUp } from '@/app/api/route';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import React from 'react';

const SignUpPage = () => {
  const { toast } = useToast();
  const navigate = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    phoneNumber: "",
    password: "",
    userName: "",
    role: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      console.log("User : ", user);
      const response = await signUp(user);
      toast({
        variant: "success",
        title: "Success",
        description: "Sign up successful",
      });
      console.log("Signup success", response.data);
      navigate.push("/sign-in");
    } catch (error: any) {
      if(error.response.status === 400){
        toast({
          variant: user.phoneNumber.length > 0 && user.password.length > 0 ? "destructive" : "default",
          title: "Uh oh! Something went wrong.",
          description: user.phoneNumber.length > 0 && user.password.length > 0 ? "Bad request" : "Please fill in the form",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (
      user.email.length > 6 &&
      user.password.length > 4 &&
      user.userName.length > 3
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <main
      className="flex justify-center items-center h-screen overflow-hidden"
      style={{
        backgroundImage: "url('/img/background/HMS.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100%",
        height: "120vh",
      }}
    >
      <div className="relative w-full h-full opacity-30 bg-gray-900" />
      <Card className="max-w-md w-full space-y-6 absolute">
        <CardHeader className="flex justify-center">
          <h1 className="text-3xl font-bold">Sign Up</h1>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className='grid grid-cols-2 gap-2'>
            <div className="space-y-2">
              <Label htmlFor="email">
                <MailboxIcon className="w-4 h-4 mr-2" />
                Email
              </Label>
              <Input
                id="email"
                placeholder="m@example.com"
                required
                type="email"
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div >
            <div className="space-y-2">
              <Label htmlFor="phone">
                <PhoneIcon className="w-4 h-4 mr-2" />
                Phone
              </Label>
              <Input autoComplete="tel" id="phone" placeholder="123-456-7890" required type="tel" onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })} />
            </div>
          </div>
          <div className='grid grid-cols-2 gap-2'>
            <div className="space-y-2">
              <Label htmlFor="UserName">
                <PhoneIcon className="w-4 h-4 mr-2" />
                UserName
              </Label>
              <Input id="UserName" placeholder="Test123" required type="text" onChange={(e) => setUser({ ...user, userName: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">
                <KeyIcon className="w-4 h-4 mr-2" />
                Password
              </Label>
              <Input autoComplete="current-password" id="password" required type="password" onChange={(e) => setUser({ ...user, password: e.target.value })} />
            </div>
          </div>
          <div className="pace-y-2 w-full">
            <Label htmlFor="role">Role</Label>
            <Select onValueChange={(value) => setUser({ ...user, role: value })}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Role</SelectLabel>
                  <SelectItem value="Patient">Patient</SelectItem>
                  <SelectItem value="Dentist">Dentist</SelectItem>
                  <SelectItem value="Staff">Staff</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <Button
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            type="submit"
            onClick={onSignup}
          >
            Sign Up
          </Button>
          <div className="flex justify-center">
            <p className="text-center text-sm">
              Already have an account?
              <Link className="underline ml-1 font-extrabold text-slate-400" href="/sign-in">
                Login
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}

function MailboxIcon(props: any) {
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
      <path d="M22 17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.5C2 7 4 5 6.5 5H18c2.2 0 4 1.8 4 4v8Z" />
      <polyline points="15,9 18,9 18,11" />
      <path d="M6.5 5C9 5 11 7 11 9.5V17a2 2 0 0 1-2 2v0" />
      <line x1="6" x2="7" y1="10" y2="10" />
    </svg>
  );
}

function PhoneIcon(props: any) {
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
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function KeyIcon(props: any) {
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
      <circle cx="7.5" cy="15.5" r="5.5" />
      <path d="m21 2-9.6 9.6" />
      <path d="m15.5 7.5 3 3L22 7l-3-3" />
    </svg>
  );
}

export default SignUpPage
