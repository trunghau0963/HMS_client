"use client";
import React from "react";
import {
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { useTheme } from "next-themes";
import { Checkbox } from "@/components/ui/checkbox";
import { SelectTheme } from "@/components/select-theme";
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
const Setting = () => {
  const { setTheme } = useTheme();
  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      <div className="grid gap-6">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Profile Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" placeholder="Enter your username" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="Enter your email" type="email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                className="min-h-[100px]"
                id="bio"
                placeholder="Enter your bio"
              />
            </div>
          </CardContent>
          <CardFooter>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">Logout</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to logout? You will need to log back
                    in to continue using our services.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="bg-black text-white">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction className="bg-red-500 text-white">
                    <Link href="/sign-in">Logout</Link>
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Button className="ml-auto">Save Profile</Button>
          </CardFooter>
        </Card>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Display Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="theme">Theme</Label>
              <SelectTheme />
            </div>
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="spanish">Spanish</SelectItem>
                  <SelectItem value="french">French</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="ml-auto">Save Display Settings</Button>
          </CardFooter>
        </Card>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="emailNotifications">Email Notifications</Label>
              <div className="flex flex-row items-center gap-2">
                <Checkbox id="emailNotifications" name="notifications" />
                <Label
                  className="text-sm font-normal"
                  htmlFor="emailNotifications"
                >
                  Enable Email Notifications
                </Label>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="smsNotifications">SMS Notifications</Label>
              <div className="flex flex-row items-center gap-2">
                <Checkbox id="smsNotifications" name="notifications" />
                <Label
                  className="text-sm font-normal"
                  htmlFor="smsNotifications"
                >
                  Enable SMS Notifications
                </Label>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="ml-auto">Save Notification Settings</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Setting;
