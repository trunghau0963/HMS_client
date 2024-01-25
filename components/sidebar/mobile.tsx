"use client";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { AppDispatch } from "@/redux/store";
import Sidebar from ".";

interface MobileSidebarProps {
  userLimitCount: number;
  isProPlan?: boolean;
}
const MobileSidebar = () => {
  // const { isOpen } = useSidebarStore();
  const dispatch: AppDispatch = useDispatch();
  const { value } = useSelector((state: RootState) => state.sidebar);
  return (
    <div>
      <Sheet open={value.isOpen}>
        <SheetContent
          side="left"
          className="w-screen border-none bg-gray p-0 pt-8"
        >
          <Sidebar />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileSidebar;
