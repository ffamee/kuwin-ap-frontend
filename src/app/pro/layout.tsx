import { cookies } from "next/headers";

import { AppSidebar } from "@/components/sidebar/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import DynamicBreadcrumbs from "@/components/breadcrumb/dynamic-breadcrmb";
import { User } from "lucide-react";
import Link from "next/link";
import getToken from "@/lib/token";
import { User as UserData } from "@/types/user-type";
import { Zone } from "@/types/zone-type";

export default async function ProLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  {
    const cookieStore = await cookies();
    const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";
    const token = await getToken();
    const user: UserData = { id: "", username: "Guest" };
    if (token) {
      const res = await fetch("http://localhost:3001/users/profile", {
        credentials: "include",
        headers: {
          Cookie: `accessToken=${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        user.id = data.id;
        user.username = data.username;
      } else {
        console.log("Failed to fetch user data.", res);
      }
    } else {
      console.log("No token found.");
    }
    let zoneList: Zone[] = [];
    const res = await fetch("http://localhost:3001/zones", {
      credentials: "include",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch zones.");
    }
    zoneList = await res.json();
    return (
      <SidebarProvider
        defaultOpen={defaultOpen}
        className="flex h-screen w-screen overflow-hidden"
      >
        <AppSidebar zoneList={zoneList} prop={{}} token={token} />
        <div className="w-full h-full">
          <header className="flex items-center h-auto justify-between">
            <div className="flex items-center h-auto">
              <SidebarTrigger className="size-12" />
              <Separator
                orientation="vertical"
                className="mr-4 data-[orientation=vertical]:h-6"
              />
              <DynamicBreadcrumbs />
            </div>
            <Link
              href="/login"
              className="mx-2 flex items-center h-auto gap-2 p-2 border border-accent rounded-md hover:border-accent-foreground hover:bg-accent transition-colors duration-200 ease-in-out"
            >
              <p className="text-foreground">{user.username}</p>
              <User />
            </Link>
          </header>
          <Separator className="mb-4" />
          <SidebarInset className="w-full h-full transition-[width,height] ease-linear overflow-auto no-scrollbar">
            {children}
          </SidebarInset>
        </div>
      </SidebarProvider>
    );
  }
}
