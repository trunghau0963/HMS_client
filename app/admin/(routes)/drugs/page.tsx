"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Drug } from "@/model/model";
import axios from "axios";
import { CardTitle, CardHeader, CardContent, Card, CardFooter } from "@/components/ui/card"
import { CarouselItem, CarouselContent, CarouselPrevious, CarouselNext, Carousel } from "@/components/ui/carousel"
import { Badge } from "@/components/ui/badge";
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
const Drugs = () => {

  const [drugs, setDrugs] = React.useState<Drug[]>([]);
  const [drugsDeleted, setDrugDeleted] = React.useState<Drug[]>([]);

  const fetchDrugs = async () => {
    try {
      const response = await axios.get("/api/user/admin/drug/available");
      console.log('fetch respone', response.data);
      setDrugs(response.data);
    } catch (error) {
      console.log(error);
    }
  }


  const fetchDeleteDrugs = async () => {
    try {
      const response = await axios.get(`/api/user/admin/drug/unavailable`);
      console.log('delete respone', response.data);
      setDrugDeleted(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const onChangeStatus = async (id: string) => {
    try {
      console.log('id', id)
      const response = await axios.put(`/api/user/admin/drug/changestatus`, { id });
      console.log('change status respone', response.data);
      fetchDrugs();
      fetchDeleteDrugs();
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  }

  React.useEffect(() => {
    fetchDrugs();
    fetchDeleteDrugs();
  }, []);

  let res = 0;
  if (drugs.length % 4 === 0) {
    res = 0;
  }
  else {
    res = 1;
  }
  const listOfCaruselItems = Math.floor(drugs.length / 4) + res;

  let resDelete = 0;
  if (drugsDeleted.length % 4 === 0) {
    resDelete = 0;
  }
  else {
    resDelete = 1;
  }
  const listOfCaruselItemsAreDeleted = Math.floor(drugsDeleted.length / 4) + resDelete;

  console.log('listOfCaruselItems', listOfCaruselItems);
  console.log('listOfCaruselItemsAreDeleted', drugsDeleted.length / 4);

  let i = 0;
  let j = 4;
  return (
    <section className="w-full py-12 ">
      <div className="container grid gap-6 md:gap-8 px-4 md:px-6 max-w-xl mx-auto lg:max-w-none">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
          <div className="grid gap-1">
            <h1 className="text-2xl font-bold tracking-tight">
              Drug Catalogue
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Explore our comprehensive list of drugs.
            </p>
          </div>
        </div>
        <Carousel className="w-full mx-auto">
          <CarouselContent>
            {
              Array.from({ length: listOfCaruselItems }).map((item, indexCarouselItem) => {
                console.log('index', indexCarouselItem);

                return (
                  <CarouselItem key={indexCarouselItem}>
                    <div className="grid grid-cols-4 gap-4 p-4">
                      {drugs.slice(i + indexCarouselItem * 4, j + indexCarouselItem * 4).map((drug, index) => {
                        console.log('i', i + indexCarouselItem * 4);
                        console.log('j', j + indexCarouselItem * 4);
                        return (
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Card className="cursor-pointer group/item hover:bg-slate-200" key={index}>
                                <CardHeader>
                                  <Image
                                    alt="Drug Image"
                                    className="rounded-lg object-cover w-full aspect-[4/4] group-hover:opacity-50 transition-opacity"
                                    height="100"
                                    src="/items/drug-red.svg"
                                    width="100"
                                  />
                                </CardHeader>
                                <CardContent>
                                  <CardTitle className="text-lg">{drug.drugName}</CardTitle>
                                  <div className="text-sky-700 flex">
                                    <p className="font-bold text-lg">{drug.price}.000/</p>
                                    <p className="font-medium text-sm">{drug.unit}</p>
                                  </div>
                                </CardContent>
                                <CardFooter className="flex col">
                                  <Badge className="bg-slate-300 text-slate-500">{drug.unit}</Badge>
                                </CardFooter>
                              </Card>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle className="text-center">Drug Information</AlertDialogTitle>
                              </AlertDialogHeader>
                              <hr />
                              <AlertDialogDescription>
                                <div className="grid grid-cols-2">
                                  <div className="flex flex-col">
                                    <p className="font-bold">Drug Name</p>
                                    <p>{drug.drugName}</p>
                                  </div>
                                  <div className="flex flex-col">
                                    <p className="font-bold">Drug Price</p>
                                    <p>{drug.price}</p>
                                  </div>
                                  <div className="flex flex-col">
                                    <p className="font-bold">Drug Unit</p>
                                    <p>{drug.unit}</p>
                                  </div>
                                  <div className="flex flex-col">
                                    <p className="font-bold">Drug Quantity</p>
                                    <p>{drug.quantity}</p>
                                  </div>
                                  <div className="flex flex-col">
                                    <p className="font-bold">Drug Expiry Date</p>
                                    <p>{new Date(drug.expireDate).toISOString().split("T")[0]}</p>
                                  </div>
                                </div>
                              </AlertDialogDescription>
                              <hr />
                              <AlertDialogFooter>
                                <AlertDialogCancel className="bg-black text-white">
                                  Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction className="bg-red-500 text-white" onClick={() => onChangeStatus(drug.idBatch)}>
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        )
                      })}
                    </div>
                  </CarouselItem>
                )
              })
            }
          </CarouselContent>
          {/* <CarouselPrevious />
          <CarouselNext /> */}
        </Carousel>

        <Carousel className="w-full mx-auto">
          <CarouselContent>
            {
              Array.from({ length: listOfCaruselItems }).map((item, indexCarouselItem) => {
                console.log('index', indexCarouselItem);

                return (
                  <CarouselItem key={indexCarouselItem}>
                    <div className="grid grid-cols-4 gap-4 p-4">
                      {drugs.slice(i + indexCarouselItem * 4, j + indexCarouselItem * 4).map((drug, index) => {
                        console.log('i', i + indexCarouselItem * 4);
                        console.log('j', j + indexCarouselItem * 4);
                        return (
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Card className="cursor-pointer group/item hover:bg-slate-200" key={index}>
                                <CardHeader>
                                  <Image
                                    alt="Drug Image"
                                    className="rounded-lg object-cover w-full aspect-[4/4] group-hover:opacity-50 transition-opacity"
                                    height="100"
                                    src="/items/drug-yellow.svg"
                                    width="100"
                                  />
                                </CardHeader>
                                <CardContent>
                                  <CardTitle className="text-lg">{drug.drugName}</CardTitle>
                                  <div className="text-sky-700 flex">
                                    <p className="font-bold text-lg">{drug.price}.000/</p>
                                    <p className="font-medium text-sm">{drug.unit}</p>
                                  </div>
                                </CardContent>
                                <CardFooter className="flex col">
                                  <Badge className="bg-slate-300 text-slate-500">{drug.unit}</Badge>
                                </CardFooter>
                              </Card>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle className="text-center">Drug Information</AlertDialogTitle>
                              </AlertDialogHeader>
                              <hr />
                              <AlertDialogDescription>
                                <div className="grid grid-cols-2">
                                  <div className="flex flex-col">
                                    <p className="font-bold">Drug Name</p>
                                    <p>{drug.drugName}</p>
                                  </div>
                                  <div className="flex flex-col">
                                    <p className="font-bold">Drug Price</p>
                                    <p>{drug.price}</p>
                                  </div>
                                  <div className="flex flex-col">
                                    <p className="font-bold">Drug Unit</p>
                                    <p>{drug.unit}</p>
                                  </div>
                                  <div className="flex flex-col">
                                    <p className="font-bold">Drug Quantity</p>
                                    <p>{drug.quantity}</p>
                                  </div>
                                  <div className="flex flex-col">
                                    <p className="font-bold">Drug Expiry Date</p>
                                    <p>{new Date(drug.expireDate).toISOString().split("T")[0]}</p>
                                  </div>
                                </div>
                              </AlertDialogDescription>
                              <hr />
                              <AlertDialogFooter>
                                <AlertDialogCancel className="bg-black text-white">
                                  Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction className="bg-red-500 text-white" onClick={() => onChangeStatus(drug.idBatch)}>
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        )
                      })}
                    </div>
                  </CarouselItem>
                )
              })
            }
          </CarouselContent>
        </Carousel>

        <Carousel className="w-full mx-auto">
          <CarouselContent>
            {
              Array.from({ length: listOfCaruselItems }).map((item, indexCarouselItem) => {
                console.log('index', indexCarouselItem);

                return (
                  <CarouselItem key={indexCarouselItem}>
                    <div className="grid grid-cols-4 gap-4 p-4">
                      {drugs.slice(i + indexCarouselItem * 4, j + indexCarouselItem * 4).map((drug, index) => {
                        console.log('i', i + indexCarouselItem * 4);
                        console.log('j', j + indexCarouselItem * 4);
                        return (
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Card className="cursor-pointer group/item hover:bg-slate-200" key={index}>
                                <CardHeader>
                                  <Image
                                    alt="Drug Image"
                                    className="rounded-lg object-cover w-full aspect-[4/4] group-hover:opacity-50 transition-opacity"
                                    height="100"
                                    src="/items/drug-green.svg"
                                    width="100"
                                  />
                                </CardHeader>
                                <CardContent>
                                  <CardTitle className="text-lg">{drug.drugName}</CardTitle>
                                  <div className="text-sky-700 flex">
                                    <p className="font-bold text-lg">{drug.price}.000/</p>
                                    <p className="font-medium text-sm">{drug.unit}</p>
                                  </div>
                                </CardContent>
                                <CardFooter className="flex col">
                                  <Badge className="bg-slate-300 text-slate-500">{drug.unit}</Badge>
                                </CardFooter>
                              </Card>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle className="text-center">Drug Information</AlertDialogTitle>
                              </AlertDialogHeader>
                              <hr />
                              <AlertDialogDescription>
                                <div className="grid grid-cols-2">
                                  <div className="flex flex-col">
                                    <p className="font-bold">Drug Name</p>
                                    <p>{drug.drugName}</p>
                                  </div>
                                  <div className="flex flex-col">
                                    <p className="font-bold">Drug Price</p>
                                    <p>{drug.price}</p>
                                  </div>
                                  <div className="flex flex-col">
                                    <p className="font-bold">Drug Unit</p>
                                    <p>{drug.unit}</p>
                                  </div>
                                  <div className="flex flex-col">
                                    <p className="font-bold">Drug Quantity</p>
                                    <p>{drug.quantity}</p>
                                  </div>
                                  <div className="flex flex-col">
                                    <p className="font-bold">Drug Expiry Date</p>
                                    <p>{new Date(drug.expireDate).toISOString().split("T")[0]}</p>
                                  </div>
                                </div>
                              </AlertDialogDescription>
                              <hr />
                              <AlertDialogFooter>
                                <AlertDialogCancel className="bg-black text-white">
                                  Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction className="bg-red-500 text-white" onClick={() => onChangeStatus(drug.idBatch)}>
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        )
                      })}
                    </div>
                  </CarouselItem>
                )
              })
            }
          </CarouselContent>
        </Carousel>
      </div>

      {/* delete */}

      <div className="container grid gap-6 md:gap-8 px-4 md:px-6 max-w-xl mx-auto lg:max-w-none my-5">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
          <div className="grid gap-1">
            <h1 className="text-2xl font-bold tracking-tight">
              Deleted
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              There is the list of deleted drugs.
            </p>
          </div>
        </div>
        <Carousel className="w-full max-w-4xl mx-auto">
          <CarouselContent>
            {
              Array.from({ length: listOfCaruselItemsAreDeleted }).map((item, indexCarouselItem) => {
                console.log('index', indexCarouselItem);

                return (
                  <CarouselItem key={indexCarouselItem}>
                    <div className="grid grid-cols-4 gap-4 p-4">
                      {drugsDeleted.slice(i + indexCarouselItem * 4, j + indexCarouselItem * 4).map((drug, index) => {
                        console.log('i', i + indexCarouselItem * 4);
                        console.log('j', j + indexCarouselItem * 4);
                        return (
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Card className="cursor-pointer group/item hover:bg-slate-200" key={index}>
                                <CardHeader>
                                  <Image
                                    alt="Drug Image"
                                    className="rounded-lg object-cover w-full aspect-[4/4] group-hover:opacity-50 transition-opacity"
                                    height="100"
                                    src="/items/drug.svg"
                                    width="100"
                                  />
                                </CardHeader>
                                <CardContent>
                                  <CardTitle className="text-lg">{drug.drugName}</CardTitle>
                                  <div className="text-sky-700 flex">
                                    <p className="font-bold text-lg">{drug.price}.000/</p>
                                    <p className="font-medium text-sm">{drug.unit}</p>
                                  </div>
                                </CardContent>
                                <CardFooter className="flex col">
                                  <Badge className="bg-slate-300 text-slate-500">{drug.unit}</Badge>
                                </CardFooter>
                              </Card>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle className="text-center">Drug Information</AlertDialogTitle>
                              </AlertDialogHeader>
                              <hr />
                              <AlertDialogDescription>
                                <div className="grid grid-cols-2">
                                  <div className="flex flex-col">
                                    <p className="font-bold">Drug Name</p>
                                    <p>{drug.drugName}</p>
                                  </div>
                                  <div className="flex flex-col">
                                    <p className="font-bold">Drug Price</p>
                                    <p>{drug.price}</p>
                                  </div>
                                  <div className="flex flex-col">
                                    <p className="font-bold">Drug Unit</p>
                                    <p>{drug.unit}</p>
                                  </div>
                                  <div className="flex flex-col">
                                    <p className="font-bold">Drug Quantity</p>
                                    <p>{drug.quantity}</p>
                                  </div>
                                  <div className="flex flex-col">
                                    <p className="font-bold">Drug Expiry Date</p>
                                    <p>{new Date(drug.expireDate).toISOString().split("T")[0]}</p>
                                  </div>
                                </div>
                              </AlertDialogDescription>
                              <hr />
                              <AlertDialogFooter>
                                <AlertDialogCancel className="bg-black text-white">
                                  Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction className="bg-green-500 text-white" onClick={() => onChangeStatus(drug.idBatch)}>
                                  Enable
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        )
                      })}
                    </div>
                  </CarouselItem>
                )
              })
            }
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

export default Drugs;
