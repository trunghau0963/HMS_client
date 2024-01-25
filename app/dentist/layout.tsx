"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { Dashboard } from "@/components/component/dashboard";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { ResponsiveBar } from "@nivo/bar";
import Image from "next/image";
import SidebarToggle from "@/components/sidebar/side-bar-toggle";
import Topbar from "@/components/sidebar/Topbar";
import Sidebar from "@/components/sidebar";
import MobileSidebar from "@/components/sidebar/mobile";
import { ToolItemsProps } from "@/config/model";

const NAVIGATIONS: ToolItemsProps[] = [
  {
    title: "Dashboard",
    icon: "/icons/dashboard.svg",
    url: "/dashboard",
  },
  {
    title: "Appointments",
    icon: "/icons/appointment.svg",
    url: "/appointment",
  },
  {
    title: "Records",
    icon: "/icons/records.svg",
    url: "/records",
  },
  {
    title: "services",
    icon: "/icons/services.svg",
    url: "/services",
  },
  {
    title: "Settings",
    icon: "/icons/setting.svg",
    url: "/settings",
  },
];

const NAVIGATIONS_LIGHT: ToolItemsProps[] = [
  {
    title: "Dashboard",
    icon: "/icons/dashboard.svg",
    url: "/dashboard",
  },
  {
    title: "Appointments",
    icon: "/icons/appointment.svg",
    url: "/appointment",
  },
  {
    title: "Records",
    icon: "/icons/records.svg",
    url: "/records",
  },
  {
    title: "services",
    icon: "/icons/services.svg",
    url: "/services",
  },
  {
    title: "Settings",
    icon: "/icons/setting.svg",
    url: "/settings",
  },
];

const DentistLayout = (props: { children: React.ReactNode }) => {
  return (
    <div
      className={cn(
        "flex h-screen lg:pl-80 lg:pr-7 [&:has([is-navbar-minimal])]:lg:pl-20"
      )}
    >
      <Sidebar
        className={cn(
          "py-7 fixed h-screen shadow-xl left-0 z-20 w-80 hidden [&:has([is-navbar-minimal])]:w-fit",
          "lg:block"
        )}
        role="/dentist"
        NAVIGATIONS={NAVIGATIONS}
        NAVIGATIONS_LIGHT={NAVIGATIONS_LIGHT}
      />
      <MobileSidebar />
      <main className="flex-1 flex flex-col">
        <div
          className={cn(
            "bg-background h-[calc(100vh-56px)]",
            "lg:rounded-2xl lg:p-8"
          )}
        >
          {props.children}
        </div>
      </main>
    </div>
  );
};

export default DentistLayout;
