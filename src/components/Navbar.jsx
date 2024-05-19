import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useEffect } from "react";

export default function Navbar({ data, role }) {
  return (
    <div className="shadow bg-white font-poppins hidden md:block">
      <div className="h-16 mx-auto px-5 flex items-center justify-start gap-5">
        <div className="flex w-full gap-10 items-end">
          <a className="text-2xl font-semibold hover:text-cyan-500 transition-colors cursor-pointer">
            QuizSDNPU
          </a>
          <div className="flex justify-between items-center w-full">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/dashboard"
                    className={navigationMenuTriggerStyle()}
                    active={true}
                  >
                    Dashboard
                  </NavigationMenuLink>
                  {role !== "users" && (
                    <NavigationMenuLink
                      href="/users"
                      className={navigationMenuTriggerStyle()}
                    >
                      Users
                    </NavigationMenuLink>
                  )}
                  <NavigationMenuLink
                    href="/feedback"
                    className={navigationMenuTriggerStyle()}
                  >
                    Umpan Balik
                  </NavigationMenuLink>
                  {role !== "users" && (
                    <NavigationMenuLink
                      href="/log"
                      className={navigationMenuTriggerStyle()}
                    >
                      Log
                    </NavigationMenuLink>
                  )}
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <DropdownMenu>
              <DropdownMenuTrigger className="text-xs font-semibold bg-blue-600/60  rounded-md p-2 text-white">
                {data.email}
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <a href="/api/auth/signout">
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </a>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
}
