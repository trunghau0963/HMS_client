import React from "react";
import {
  CardTitle,
  CardHeader,
  CardDescription,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function AppleIcon(props: any) {
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
      <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z" />
      <path d="M10 2c1 .5 2 2 2 5" />
    </svg>
  );
}

function CloudIcon(props: any) {
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
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    </svg>
  );
}

function DatabaseIcon(props: any) {
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
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5V19A9 3 0 0 0 21 19V5" />
      <path d="M3 12A9 3 0 0 0 21 12" />
    </svg>
  );
}

const Service = () => {
  return (
    <div>
      <Card className="mb-4">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CloudIcon className="w-6 h-6" />
            <CardTitle>Cloud Service</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <CardDescription>
            Our Cloud service offers secure and scalable Backup records solutions
            for businesses of all sizes.
          </CardDescription>
        </CardContent>
        <CardFooter className="p-4">
          <Button variant="link">Learn more</Button>
        </CardFooter>
      </Card>
      <Card className="mb-4">
        <CardHeader>
          <div className="flex items-center gap-2">
            <DatabaseIcon className="w-6 h-6" />
            <CardTitle>Database Service</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <CardDescription>
            Our database service allows for easy management, access, and
            security of your record.
          </CardDescription>
        </CardContent>
        <CardFooter className="p-4">
          <Button variant="link">Learn more</Button>
        </CardFooter>
      </Card>
      <Card className="mb-4">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AppleIcon className="w-6 h-6" />
            <CardTitle>AI Service</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <CardDescription>
            Our AI service incorporates machine learning to provide insightful
            data analysis and predictive modeling.
          </CardDescription>
        </CardContent>
        <CardFooter className="p-4">
          <Button variant="link">Learn more</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Service;
