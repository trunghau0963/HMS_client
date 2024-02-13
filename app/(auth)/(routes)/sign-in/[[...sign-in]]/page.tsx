"use client";
import { login } from "@/app/api/route";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { setCredentials } from "@/redux/feature/authSlice";
import { AppDispatch, RootState } from "@/redux/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const SignInPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { valueAuth } = useSelector((state: RootState) => state.auth);
  const { toast } = useToast();
  const [user, setUser] = React.useState({
    phoneNumber: "",
    password: "",
    role: "",
  });
  const navigate = useRouter();

  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  
  const onLogin = async () => {
    try {
      setLoading(true);
      console.log(user)

      const response = await login(user);
      console.log("response : ", response.data);
      console.log("User : ", response.data);
      console.log("token : ", response.data.accessToken);

      toast({
        variant: "success",
        title: "Success.",
        description: "Login successful",
      });
      dispatch(
        setCredentials({
          user: response.data.data,
          accessToken: response.data.accessToken,
        })
      );
      document.cookie = `refreshToken=${response.data.refreshToken}; path=/`;

      const url = `/${user.role.toLowerCase()}/dashboard`;
      navigate.push(url);
    } catch (error: any) {
      console.log("error : ", error.response)
      if(error.response.status === 400){
        toast({
          variant: user.phoneNumber.length > 0 && user.password.length > 0 ? "destructive" : "default",
          title: "Uh oh! Something went wrong.",
          description: user.phoneNumber.length > 0 && user.password.length > 0 ? "Invalid phone number or password" : "Please fill in the form",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
      if(error.response.status === 500){
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
      if(error.response.status === 404){
        toast({
          variant: "yellow",
          title: "Uh oh! Something went wrong.",
          description: "User not found",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (user.phoneNumber.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <>
      <main
        className="flex items-center justify-center h-screen"
        style={{
          backgroundImage: "url('/img/background/HMS.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: "100vh",
        }}
      >
        <div className="relative w-full h-full opacity-30 bg-gray-900" />
        <Card className="max-w-md w-full space-y-8 shadow absolute">
          <CardHeader>
            <CardTitle className="mt-6 text-center text-3xl font-extrabold">
              {loading ? "Processing" : "Sign in to your account"}
            </CardTitle>
            <CardDescription className="mt-2 text-center text-sm text-gray-400">
              Or
              <br />
              <Link
                className="font-medium text-indigo-600 hover:text-indigo-500"
                href="/sign-up"
              >
                start your 14-day free trial
              </Link>
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-8 space-y-6">
            <div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  autoComplete="tel"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  id="phone"
                  placeholder="Phone number"
                  required
                  type="tel"
                  onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  autoComplete="current-password"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  id="password"
                  placeholder="Password"
                  required
                  type="password"
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                />
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
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Input
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  id="remember_me"
                  name="remember_me"
                  type="checkbox"
                />
                <Label
                  className="ml-2 block text-sm text-gray-400"
                  htmlFor="remember_me"
                >
                  Remember me
                </Label>
              </div>
              <div className="text-sm">
                <Link
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                  href="#"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>
            <div>
              {/* <Link href="/dashboard"> */}
              <Button
                onClick={onLogin}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                type="submit"
              >
                {buttonDisabled ? "No signin" : "Sign In"}
              </Button>
              {/* </Link> */}
            </div>
          </CardContent>
        </Card>
      </main>
    </>
  );
}

export default SignInPage
