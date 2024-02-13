"use client"
import React from "react"
import Link from "next/link"
import { NavigationMenuLink, NavigationMenuList, NavigationMenu } from "@/components/ui/navigation-menu"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CardTitle, CardHeader, CardContent, Card, CardFooter } from "@/components/ui/card"
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
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
import Image from "next/image"
import Autoplay from "embla-carousel-autoplay"
import { Dentist, Drug, Schedule } from "@/model/model"
import axios from "axios"
import { Badge } from "lucide-react"
import { getAllDentist, getDrug, getDrugAvailable, getSchedule, getScheduleById, useAuthToken } from "@/app/api/route"

export default function Dashboard() {
  const token = useAuthToken() as string;
  const [api, setApi] = React.useState<CarouselApi>()
  const [dentist, setDentist] = React.useState<Dentist[]>([]);
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  const [drugs, setDrugs] = React.useState<Drug[]>([]);

  const [Schedule, setSchedule] = React.useState<Schedule[]>([]);

  const fetchDrugs = async () => {
    try {
      const response = await getDrugAvailable();
      // console.log('fetch drug respone', response.data);
      setDrugs(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const fetchDentist = async () => {
    try {
      const response = await getAllDentist();
      // console.log('fetch dentist respone', response.data);
      setDentist(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const onGetSchedule = async ({ id }: { id: string }) => {
    try {
      console.log('dentist id', id);
      const response = await getScheduleById(id,token);
      console.log('fetch schedule respone', response.data);
      setSchedule(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  React.useEffect(() => {
    fetchDrugs();
    fetchDentist();
  }, []);

  let res = 0;
  if (drugs.length % 4 === 0) {
    res = 0;
  }
  else {
    res = 1;
  }
  const listOfCaruselItems = Math.floor(drugs.length / 4) + res;
  let i = 0;
  let j = 4;

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex h-14 items-center justify-between px-4 md:px-6">
        <Link className="flex items-center gap-2" href="#">
          <MountainIcon className="h-6 w-6" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuLink asChild>
              <Link
                className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                href="#home"
              >
                Home
              </Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
              <Link
                className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                href="#product"
              >
                Products
              </Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
              <Link
                className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                href="#appointment"
              >
                Appointment
              </Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
              <Link
                className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                href="#contact"
              >
                Contact
              </Link>
            </NavigationMenuLink>
          </NavigationMenuList>
        </NavigationMenu>
      </header>
      <main className="flex-1" id="home">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <Carousel setApi={setApi} className="w-full max-w-4xl" opts={{
                loop: true,
              }}
                plugins={[
                  Autoplay({
                    delay: 2000,
                  }),
                ]}
              >
                <CarouselContent>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <CarouselItem key={index}>
                      <Card>
                        <CardContent className="bg-slate-300 rounded-lg flex aspect-square items-center justify-center p-1">
                          <Image
                            alt="Image"
                            className="rounded-lg w-full h-full"
                            height="400"
                            src={`/img/dashboard/slideItem${index + 1}.jpg`}
                            width="400"
                            style={{ objectFit: 'cover' }} />
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    The Hospital Management System
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    is a platform or software that ensures that all the daily activities and interactions that happen in the hospital or clinics work smoothly.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                    href="#appointment"
                  >
                    Book Appointment
                  </Link>
                  <Link
                    className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                    href="#contact"
                  >
                    Contact Staff
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32" id="appointment">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Meet our Customers</h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Trusted by the best teams in the world. We help teams of all sizes.
              </p>
            </div>
            <div className="divide-y rounded-lg border">
              <div className="grid w-full grid-cols-3 items-stretch justify-center divide-x md:grid-cols-3">
                {dentist.map((dentist, index) => {
                  return (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <div className="rounded-lg mx-auto flex w-full items-center justify-center p-8 cursor-pointer group/item hover:bg-slate-200" onClick={() => onGetSchedule({ id: dentist.id })}>
                          <Avatar className="h-24 w-24 bg-slate-500">
                            <AvatarImage alt="User avatar" src="/placeholder-avatar.jpg" />
                            <AvatarFallback>{dentist.id}</AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col items-center justify-center ml-4">
                            <h3 className="text-xl font-bold">{dentist.userName}</h3>
                            <p className="text-gray-500">{dentist.phoneNumber}</p>
                          </div>
                        </div>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle className="text-center">List Of Schedules</AlertDialogTitle>
                        </AlertDialogHeader>
                        <hr />
                        <AlertDialogDescription>
                          {Schedule.length > 0 ? Schedule.map((schedule, index) => (
                            <div className="max-w-7xl mx-auto py-2 cursor-pointer">
                              <div className="relative group">
                                <div className="absolute -inset-1 bg-slate-200 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-200 group-hover:duration-200"></div>
                                <div className="relative px-7 py-6 bg-white ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top justify-start space-x-6">
                                  <Image width={32} height={32} src='/icons/schedule/appointment.svg' alt='Appointment' />
                                  <div className="space-y-2">
                                    <div>
                                      <p className="text-lg font-bold">{schedule.dateOfAppointment.toString().split("T")[0]}</p>
                                      <p className="text-gray-500">{schedule.timeOfAppointment.toString().split("T")[1].split(".")[0]}</p>
                                    </div>
                                    <a href={`http://localhost:5432/patient/appointments/${schedule.idDentist}/${schedule.dateOfAppointment}/${schedule.timeOfAppointment}`} className="block text-indigo-400 group-hover:text-slate-800 transition duration-200" target="_blank">Book This Appointment →</a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                          ) : <p className="text-center">No Schedule</p>}
                        </AlertDialogDescription>
                        <hr />  
                        <AlertDialogFooter>
                          <AlertDialogCancel className="bg-black text-white">
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction className="bg-red-500 text-white">
                            More Schedule
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>

                  )
                })}
              </div>
            </div>
            <div className="flex justify-center space-x-4">
              <Link
                className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                href="#contact"
              >
                Contact Sales
              </Link>
              <Link
                className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                href="#"
              >
                Learn more
              </Link>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800" id="contact">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Experience the workflow the best frontend teams love.
              </h2>
              <p className="text-center text-gray-500">
                Let your team focus on shipping features instead of managing infrastructure with automated CI/CD.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <form className="flex space-x-2">
                <Input className="max-w-lg flex-1" placeholder="Enter your email" type="email" />
                <Button type="submit">Sign Up</Button>
              </form>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Sign up to get notified when we launch.
                <Link className="underline underline-offset-2" href="#">
                  Terms & Conditions
                </Link>
              </p>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32" id="product">
          <div className="container px-4 md:px-6">
            <Carousel className="w-full mx-auto" >
              <CarouselContent>
                {
                  Array.from({ length: listOfCaruselItems }).map((item, indexCarouselItem) => {
                    return (
                      <CarouselItem key={indexCarouselItem}>
                        <div className="grid grid-cols-4 gap-4 p-4 cursor-pointer">
                          {drugs.slice(i + indexCarouselItem * 4, j + indexCarouselItem * 4).map((drug, index) => {
                            return (
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Card>
                                    <CardHeader>
                                      <CardTitle>{drug.drugName}</CardTitle>
                                      <Image
                                        alt={`${drug.drugName} Image`}
                                        className="rounded-lg object-cover w-full aspect-[4/4] group-hover:opacity-50 transition-opacity"
                                        height="300"
                                        src="/items/drug.svg"
                                        width="600"
                                      />
                                    </CardHeader>
                                    <CardContent>
                                      <p className="text-gray-500 dark:text-gray-400">{drug.drugName} description</p>
                                      <Button className="mt-4">Add to Cart</Button>
                                    </CardContent>
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
                                    <AlertDialogAction className="bg-red-500 text-white">
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
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 border-t">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 px-10 md:gap-16 lg:grid-cols-2">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                  Performance
                </div>
                <h2 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                  Traffic spikes should be exciting, not scary.
                </h2>
                <Link
                  className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                  href="#"
                >
                  Get Started
                </Link>
              </div>
              <div className="flex flex-col items-start space-y-4" />
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

function MountainIcon(props: any) {
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
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}
