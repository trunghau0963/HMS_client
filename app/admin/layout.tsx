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

export const NAVIGATIONS: ToolItemsProps[] = [
  {
    title: "Dashboard",
    icon: "/icons/dashboard.svg",
    url: "/dashboard",
  },
  {
    title: "Patient",
    icon: "/icons/patient.svg",
    url: "/patient",
  },
  {
    title: "Dentist",
    icon: "/icons/dentist.svg",
    url: "/dentist",
  },
  {
    title: "Staff",
    icon: "/icons/staff.svg",
    url: "/staff",
  },
  {
    title: "Records",
    icon: "/icons/records.svg",
    url: "/records",
  },
  {
    title: "invoices",
    icon: "/icons/invoice.svg",
    url: "/invoices",
  },
  {
    title: "drugs",
    icon: "/icons/drugs.svg",
    url: "/drugs",
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

export const NAVIGATIONS_LIGHT: ToolItemsProps[] = [
  {
    title: "Dashboard",
    icon: "/icons/dashboard-light.svg",
    url: "/dashboard",
  },
  {
    title: "Records",
    icon: "/icons/records-light.svg",
    url: "/records",
  },
  {
    title: "invoices",
    icon: "/icons/invoices-light.svg",
    url: "/invoices",
  },
  {
    title: "drugs",
    icon: "/icons/drugs-light.svg",
    url: "/drugs",
  },
  {
    title: "services",
    icon: "/icons/services-light.svg",
    url: "/services",
  },
  {
    title: "Settings",
    icon: "/icons/setting-light.svg",
    url: "/settings",
  },
];


const AdminLayout = (props: { children: React.ReactNode }) => {
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
        role="/admin"
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

export default AdminLayout;
