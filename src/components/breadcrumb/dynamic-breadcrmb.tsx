"use client";

import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from "../ui/breadcrumb";
import { ChevronRight } from "lucide-react";

export default function DynamicBreadcrumbs() {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter((segment) => segment !== "");

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pathSegments.map((segment, index) => {
          const isLastSegment = index === pathSegments.length - 1;
          const url = `/${pathSegments.slice(0, index + 1).join("/")}`;
          if (segment === "pro") segment = "Home";
          // else => format the segment to be more readable
          return (
            <BreadcrumbItem key={url} className="h-full">
              {!isLastSegment ? (
                <div className="flex space-x-1 items-center">
                  <BreadcrumbLink href={url}>{segment}</BreadcrumbLink>
                  <ChevronRight />
                </div>
              ) : (
                <BreadcrumbPage className="font-bold">{segment}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
