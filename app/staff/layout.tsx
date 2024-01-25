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

const StaffLayout = (props: { children: React.ReactNode }) => {
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
        role="/staff"
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

export default StaffLayout;
