import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div>
      <Skeleton className="h-screen w-screen rounded-xl" />
    </div>
  );
}
