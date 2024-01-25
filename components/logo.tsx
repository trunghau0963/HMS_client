import { cn } from "@/lib/utils";
import { Church } from "lucide-react";
import { Poppins } from "next/font/google";
import React from "react";
interface LogoProps {
  className?: string;
}
const fontPoppins = Poppins({ weight: "700", subsets: ["latin"] });
const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <div className={cn("flex items-center", className)}>
      <span className={cn("ml-2 text-xl lining-nums", fontPoppins.className)}>
        Management System
      </span>
    </div>
  );
};

export default Logo;
