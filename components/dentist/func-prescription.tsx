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
import {
  addPrescription,
  deleteDrugPrescription,
  deletePrescription,
  getDrugAvailable,
  getPrescription,
} from "@/app/api/route";
import { Drug, Prescription } from "@/model/model";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

export const FunctionPrescription = ({
  idRecord,
  token,
}: {
  idRecord: string;
  token: string;
}) => {
  const { toast } = useToast();
  const [drugs, setDrugs] = React.useState<Drug[]>([]);
  const [prescriptions, setPrescriptions] = React.useState<Prescription[]>([]);
  const [idBatch, setIdBatch] = React.useState("Batch_ID");
  const [form, setForm] = React.useState({
    idRecord: idRecord,
    idBatch: "",
    idDrug: "",
    drugName: "",
    quantity: 0,
    description: "",
  });

  const idToName = (id: string) => {
    const drug = drugs.find((drug) => drug.idBatch === id);
    return drug?.drugName;
  };
  const fetchPrescriptions = async () => {
    try {
      const response = await getPrescription(idRecord, token);
      console.log("fetch respone", response.data);
      setPrescriptions(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDrugs = async () => {
    try {
      const response = await getDrugAvailable();
      // console.log("fetch respone", response.data);
      setDrugs(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const setFormElement = (value: any) => {
    // console.log("value", value);
    const elements = value.split("/");
    // console.log("elements", elements);
    setIdBatch(elements[0]);
    setForm({
      ...form,
      idBatch: elements[0],
      idDrug: elements[1],
      drugName: elements[2],
    });
  };

  const postPrescription = async () => {
    console.log("form", form);
    if (form.drugName && form.quantity && form.description) {
      try {
        const response = await addPrescription(form, token);
        console.log("post response", response);
        fetchPrescriptions();
      } catch (error: any) {
        if (error.response.status === 400) {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "Drug is already exist. Please try again.",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          });
        }
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
    if (form.description === "") {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Description cannot be empty. Please try again",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };

  const deletePrescriptionFunc = async (
    idRecord: string,
    idBatch: string,
    idDrug: string
  ) => {
    const data = {
      idRecord: idRecord,
      idBatch: idBatch,
      idDrug: idDrug,
    };
    try {
      const response = await deleteDrugPrescription(data, token);
      console.log("post response", response);
      fetchPrescriptions();
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    fetchDrugs();
    fetchPrescriptions();
  }, []);
  return (
    <Table>
      <TableCaption>A list of your recent prescriptions.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID Batch</TableHead>
          <TableHead>Drug Name</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {prescriptions.length === 0
          ? ""
          : prescriptions.map((prescription: Prescription, idx: number) => (
              <TableRow key={idx}>
                <TableCell>{prescription.idBatch}</TableCell>
                <TableCell>{idToName(prescription.idBatch)}</TableCell>
                <TableCell>{prescription.quantity}</TableCell>
                <TableCell>{prescription.description}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="red"
                    className="rounded"
                    type="submit"
                    onClick={() =>
                      deletePrescriptionFunc(
                        prescription.idRecord,
                        prescription.idBatch,
                        prescription.idDrug
                      )
                    }
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell className="font-medium">{idBatch}</TableCell>
          <TableCell>
            <Select onValueChange={(value) => setFormElement(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a drug" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Drug List</SelectLabel>
                  {drugs.map((drug) => (
                    <SelectItem
                      value={`${drug.idBatch}/${drug.idDrug}/${drug.drugName}`}
                    >{`${drug.drugName}`}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </TableCell>
          <TableCell>
            <Input
              id="quantity"
              placeholder="Quantity"
              required
              type="number"
              onChange={(e) =>
                setForm({ ...form, quantity: Number(e.target.value) })
              }
            />
          </TableCell>
          <TableCell className="text-right">
            <Input
              id="description"
              placeholder="Description"
              required
              type="string"
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </TableCell>
          <TableCell>
            <Button
              variant="cyan"
              className="rounded"
              type="submit"
              onClick={postPrescription}
            >
              Add
            </Button>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};
