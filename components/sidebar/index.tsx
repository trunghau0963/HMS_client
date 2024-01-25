"use client";
import { cn } from "@/lib/utils";
import React from "react";
import Logo from "../logo";
import SidebarToggle from "./side-bar-toggle";
import { RootState } from "@/redux/store";
import { AppDispatch } from "@/redux/store";
// import { MAX_FREE_COUNT } from "@/constant";
// import { Progress } from "../ui/progress";
// import SubcriptionButton from "../subcription-button";
import Navbar from "./navbar";
// import ThemeToggle from "./theme-toggle";
import { useDispatch, useSelector } from "react-redux";
// import DialogProfile from "./profileButton";
import Link from "next/link";
import { ToolItemsProps } from "@/config/model";

interface SidebarProps {
  className?: string;
  role?: string;
  NAVIGATIONS: ToolItemsProps[];
  NAVIGATIONS_LIGHT: ToolItemsProps[];
}
const Sidebar: React.FC<SidebarProps> = ({ className, role, NAVIGATIONS, NAVIGATIONS_LIGHT }) => {
  const { value } = useSelector((state: RootState) => state.sidebar);
  const { valueAuth } = useSelector((state: RootState) => state.auth);

  return (
    <div className={(cn("shadow-md"), className)}>
      <div className="h-20 pl-7 pr-6">
        <Link className="flex items-center justify-between w-full" href="#">
          <SidebarToggle />
          {!value.isMinimal && <Logo />}
        </Link>
      </div>
      <div className="grow overflow-y-auto scroll-smooth scrollbar-none">
        <Navbar role={role || ""} NAVIGATIONS={NAVIGATIONS}
          NAVIGATIONS_LIGHT={NAVIGATIONS_LIGHT} />
      </div>
    </div>
  );
};

export default Sidebar;
