"use client";
import { cn } from "@/lib/utils";
import { BellRing, Search } from "lucide-react";
import { Logo } from "@/components/Shared/Logo";
import { itemsNavBar } from "../../../../../data/itemsNavBar";
import Link from "next/link";

import { useScrollPosition } from "../../../../../hooks/useScrollPosition";
import { NavbarDesktopProps } from "./avbarDesktop.types";
import { SelectorProfiles } from "@/components/Shared/SelectorProfiles";


export function NavbarDesktop(props: NavbarDesktopProps) {
    const { users } = props;
    const scrollPosition = useScrollPosition();
   
  return (
    <div className={cn("z-30 left-0 right-0 top-0 h-16 fixed w-full transition-all duration-300",
        scrollPosition > 20 ? "bg-black" : "bg-transparent"
    )}>
        <div className="px-[4%] mx-auto h-full">
            <div className="flex gap-4 justify-between items-center h-full">
                <div className="flex items-center gap-2">
                    <Logo />
                    <div className="ml-10 flex gap-4">
                        {itemsNavBar.map((item) => (
                            <Link key={item.name} href={item.link} 
                            className="hover:text-gray-300 transition-all duration-300">
                                {item.name}
                            </Link>
                        ))}
                    </div>
                    
                </div>
                <div className="flex items-center gap-4">
                    <Search className="cursor-pointer"/>
                    <BellRing className="cursor-pointer"/>
                    <div className="flwex items-center gap-2">
                       <SelectorProfiles users={users} />
                        

                    </div>
                </div>
            </div>
        </div>
        </div>
  )
}
