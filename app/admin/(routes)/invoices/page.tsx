"use client";
import React from "react";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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

const Invoice = () => {
  return (
    <div>
      <main className="flex flex-col gap-4 p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle>Invoices</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice Number</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
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
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Invoice;
