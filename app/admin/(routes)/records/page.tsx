"use client";
import React from "react";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import Link from "next/link";

const Record = () => {
  return (
    <main className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Patient Care Kanban Board</h1>
      <div className="grid grid-cols-4 gap-4">
        <div>
          <h2 className="text-lg font-semibold mb-2">Admitted</h2>
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback>PM</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-medium">Patient 1</span>
                  <Badge className="text-xs">Admitted</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm">Age: 45</p>
              <p className="text-sm">Gender: Male</p>
            </CardContent>
            <CardFooter>
              <Link className="text-xs text-blue-500" href="#">
                View Details
              </Link>
            </CardFooter>
          </Card>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">Under Observation</h2>
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-medium">Patient 2</span>
                  <Badge className="text-xs">Under Observation</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm">Age: 60</p>
              <p className="text-sm">Gender: Female</p>
            </CardContent>
            <CardFooter>
              <Link className="text-xs text-blue-500" href="#">
                View Details
              </Link>
            </CardFooter>
          </Card>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">Treatment</h2>
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback>KT</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-medium">Patient 3</span>
                  <Badge className="text-xs">Treatment</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm">Age: 30</p>
              <p className="text-sm">Gender: Male</p>
            </CardContent>
            <CardFooter>
              <Link className="text-xs text-blue-500" href="#">
                View Details
              </Link>
            </CardFooter>
          </Card>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">Discharged</h2>
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback>LP</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-medium">Patient 4</span>
                  <Badge className="text-xs">Discharged</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm">Age: 50</p>
              <p className="text-sm">Gender: Female</p>
            </CardContent>
            <CardFooter>
              <Link className="text-xs text-blue-500" href="#">
                View Details
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default Record;
