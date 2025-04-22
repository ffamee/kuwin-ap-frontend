import { cookies } from "next/headers";

import { AppSidebar } from "@/components/ui/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default async function ProLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <main className="items-center justify-center bg-background h-screen w-screen">
        <SidebarTrigger className="w-1/12 h-5" />
        {children}
      </main>
    </SidebarProvider>
  );
}
