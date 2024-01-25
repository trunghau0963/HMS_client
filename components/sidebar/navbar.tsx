"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { AppDispatch } from "@/redux/store";
import { closeSidebar } from "@/redux/feature/sidebarSlice";
import { ToolItemsProps } from "@/config/model";

const Navbar = ({ role, NAVIGATIONS, NAVIGATIONS_LIGHT }: {
  role: string, NAVIGATIONS: ToolItemsProps[];
  NAVIGATIONS_LIGHT: ToolItemsProps[];
}) => {
  // const { isMinimal, handleClose } = useSidebarStore();
  const dispatch: AppDispatch = useDispatch();
  const { value } = useSelector((state: RootState) => state.sidebar);

  const pathName = usePathname();

  const navigation = value.isThemeDark ? NAVIGATIONS_LIGHT : NAVIGATIONS;
  const handleClose = () => {
    dispatch(closeSidebar());
  };

  return (
    <div className="px-4">
      {navigation.map(({ title, url, icon }, index) => (
        <div key={index} className="">
          <Link href={`${role}${url}`} onClick={handleClose}>
            <div
              className={cn(
                "flex items-center py-1 rounded-lg px-5 opacity-50 font-normal ",
                "hover:opacity-100 hover:underline",
                value.isMinimal && "px-1",
                pathName.includes(url) && "opacity-100 font-bold"
              )}
            >
              <div className="flex items-center p-2">
                <div>
                  <Image width={24} height={24} src={icon} alt={title} />
                </div>
                {!value.isMinimal && (
                  <span className="ml-4 text-sm">{title}</span>
                )}
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Navbar;
