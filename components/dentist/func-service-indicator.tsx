"use client";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "axios";
import exp from "constants";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import {
  addPrescription,
  addServiceIndicator,
  deleteServiceInServiceIndicator,
  getDrugAvailable,
  getService,
  getServiceIndicator,
} from "@/app/api/route";
import { Drug, Prescription, Service, ServiceIndicator } from "@/model/model";

export const FunctionServiceIndicator = ({
  idRecord,
  token,
}: {
  idRecord: string;
  token: string;
}) => {
  const { toast } = useToast();
  const [services, setServices] = React.useState<Service[]>([]);
  const [serviceIndicators, setServiceIndicators] = React.useState<
    ServiceIndicator[]
  >([]);
  const [idService, setIdService] = React.useState("Service_ID");
  const [form, setForm] = React.useState({
    idRecord: idRecord,
    idService: "",
    serviceName: "",
    quantity: 0,
  });

  const idToName = (id: string) => {
    const service = services.find((service) => service.id === id);
    return service?.serviceName;
  };

  const fetchServiceIndicator = async () => {
    try {
      const response = await getServiceIndicator(idRecord, token);
      console.log("fetch respone", response.data);
      setServiceIndicators(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchServices = async () => {
    try {
      const response = await getService();
      console.log("fetch respone", response.data);
      setServices(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const setFormElement = (value: any) => {
    // console.log("value", value);
    const elements = value.split("/");
    // console.log("elements", elements);
    setIdService(elements[0]);
    setForm({
      ...form,
      idService: elements[0],
      serviceName: elements[1],
    });
  };

  const postServiceIndicator = async () => {
    console.log("form", form);
    if (form.idService && form.quantity && form.serviceName) {
      try {
        const response = await addServiceIndicator(form, token);
        console.log("post response", response);
        fetchServiceIndicator();
      } catch (error) {
        console.log(error);
      }
    }
    if (form.quantity === 0) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Quantity cannot be 0. Please try again.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };

  const deleteServiceIndicator = async (
    idRecord: string,
    idService: string
  ) => {
    const data = {
      idRecord: idRecord,
      idService: idService,
    };
    try {
      const response = await deleteServiceInServiceIndicator(data, token);
      console.log("delete response", response);
      fetchServiceIndicator();
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    fetchServices();
    fetchServiceIndicator();
  }, []);
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID Service</TableHead>
          <TableHead>Service Name</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {serviceIndicators.length === 0
          ? ""
          : serviceIndicators.map(
              (serviceIndicator: ServiceIndicator, idx: number) => (
                <TableRow>
                  <TableCell key={idx}>{serviceIndicator.idService}</TableCell>
                  <TableCell key={idx}>
                    {idToName(serviceIndicator.idService)}
                  </TableCell>
                  <TableCell key={idx}>{serviceIndicator.quantity}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="red"
                      className="rounded"
                      type="submit"
                      onClick={() =>
                        deleteServiceIndicator(
                          serviceIndicator.idRecord,
                          serviceIndicator.idService
                        )
                      }
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              )
            )}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell className="font-medium">{idService}</TableCell>
          <TableCell>
            <Select onValueChange={(value) => setFormElement(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Drug List</SelectLabel>
                  {services.map((service) => (
                    <SelectItem
                      value={`${service.id}/${service.serviceName}`}
                    >{`${service.serviceName}`}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </TableCell>
          <TableCell>
            <Input
              id="qunaity"
              placeholder="Quantity"
              required
              type="number"
              onChange={(e) =>
                setForm({ ...form, quantity: Number(e.target.value) })
              }
            />
          </TableCell>
          <TableCell>
            <Button
              variant="cyan"
              className="rounded"
              type="submit"
              onClick={postServiceIndicator}
            >
              Add
            </Button>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};
