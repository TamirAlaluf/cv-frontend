"use client";

import * as React from "react";
import Link from "next/link";
import { useAuth, useClerk } from "@clerk/nextjs";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
export default function NavBar() {
  const { isSignedIn } = useAuth();
  const { signOut } = useClerk();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "/#how-it-works", label: "Steps" },
    { href: "/#faq", label: "FAQ" },
    { href: "/#pricing", label: "Pricing" },
  ];

  const NavItems = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
  >(({ className, title, children, ...props }, ref) => {
    return (
      <NavigationMenuLink asChild>
        <a ref={ref} className={navigationMenuTriggerStyle()} {...props}>
          {children}
        </a>
      </NavigationMenuLink>
    );
  });
  NavItems.displayName = "NavItems";

  return (
    <nav className="flex justify-between items-center px-8 py-4 shadow-md fixed w-full top-0 z-50 bg-background">
      <Link href="/#main" className="text-xl font-bold">
        ResuMate
      </Link>

      <div className="hidden md:flex items-center space-x-4">
        <NavigationMenu>
          <NavigationMenuList>
            {navItems.map((item) => (
              <NavigationMenuItem key={item.href}>
                <NavItems href={item.href}>{item.label}</NavItems>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {!isSignedIn && (
          <Button
            asChild
            variant="default"
            className="bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white shadow-md transition-all duration-200"
          >
            <Link href="/sign-in">Sign In</Link>
          </Button>
        )}
        {isSignedIn && (
          <Button
            variant="default"
            className="bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white shadow-md transition-all duration-200"
            onClick={() => signOut()}
          >
            Logout
          </Button>
        )}
      </div>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="outline" size="icon">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <nav className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-lg font-medium"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {!isSignedIn && (
              <Button
                asChild
                variant="default"
                className="bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white shadow-md transition-all duration-200"
              >
                <Link href="/sign-in" onClick={() => setIsOpen(false)}>
                  Login
                </Link>
              </Button>
            )}
            {isSignedIn && (
              <Button
                variant="default"
                className="bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white shadow-md transition-all duration-200"
                onClick={() => {
                  signOut();
                  setIsOpen(false);
                }}
              >
                Logout
              </Button>
            )}
          </nav>
        </SheetContent>
      </Sheet>
    </nav>
  );
}
