"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  //   BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const defaultItems = [
  { href: "#", label: "Home" },
//   { href: "#", label: "Documentation" },
//   { href: "#", label: "Building Your Application" },
//   { href: "#", label: "Data Fetching" },
//   { label: "Caching and Revalidating" },
];

type itemProps = {
    href?:string,
    label?: string
}

const ITEMS_TO_DISPLAY = 3;

export function BreadcrumbDemo({items = defaultItems}: {items?: itemProps[]}) {
    const startIndex = (items.length - ITEMS_TO_DISPLAY < 0) ? 1 : -ITEMS_TO_DISPLAY + 1
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <Breadcrumb>
      <BreadcrumbList className="capitalize">
        <BreadcrumbItem>
          <BreadcrumbLink href={items[0].href}>{items[0].label}</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {items.length > ITEMS_TO_DISPLAY ? (
          <>
            <BreadcrumbItem>
              {isDesktop ? (
                <DropdownMenu open={open} onOpenChange={setOpen}>
                  <DropdownMenuTrigger className="flex items-center gap-1" aria-label="Toggle menu">
                    <BreadcrumbEllipsis className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    {items.slice(1, -2).map((item, index) => (
                      <DropdownMenuItem key={index}>
                        <Link href={item.href ? item.href : "#"}>{item.label}</Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Drawer open={open} onOpenChange={setOpen}>
                  <DrawerTrigger aria-label="Toggle Menu">
                    <BreadcrumbEllipsis className="h-4 w-4" />
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader className="text-left">
                      <DrawerTitle>Navigate to</DrawerTitle>
                      <DrawerDescription>Select a page to navigate to.</DrawerDescription>
                    </DrawerHeader>
                    <div className="grid gap-1 px-4 ">
                      {items.slice(1, -2).map((item, index) => (
                        <Link key={index} href={item.href ? item.href : "#"} className="py-1 text-sm">
                          {item.label}
                        </Link>
                      ))}
                    </div>
                    <DrawerFooter className="pt-4">
                      <DrawerClose asChild>
                        <Button variant="outline">Close</Button>
                      </DrawerClose>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
              )}
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </>
        ) : null}
        {items.slice(startIndex).map((item, index) => (
          <BreadcrumbItem key={index}>
            {item.href ? (
              <>
                <BreadcrumbLink asChild className="max-w-20 truncate md:max-w-none">
                  <Link href={item.href}>{item.label}</Link>
                </BreadcrumbLink>
                <BreadcrumbSeparator />
              </>
            ) : (
              <BreadcrumbPage className="max-w-20 truncate md:max-w-none">{item.label}</BreadcrumbPage>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export function BreadcrumbSeparator({ children = <ChevronRight /> }: { children?: React.ReactNode }) {
  return (
    <span role="presentation" aria-hidden="true" className="[&>svg]:w-3.5 [&>svg]:h-3.5">
      {children}
    </span>
  );
}
