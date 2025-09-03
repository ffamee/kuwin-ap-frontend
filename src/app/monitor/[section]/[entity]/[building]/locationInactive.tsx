import DeleteComfirm from "@/components/modal/confirmdelete";
import { DataTableColumnHeader } from "@/components/table/data-table-header";
import InactiveTable from "@/components/table/location-inactive-table";
import { useAuth } from "@/context/auth-context";
import fetcher from "@/lib/fetcher";
import { LocationInactive } from "@/types/location-type";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";

export default function Inactive({
  sectionId,
  entityId,
  buildingId,
}: {
  sectionId: number;
  entityId: number;
  buildingId: number;
}) {
  const { isLogin } = useAuth();
  const [InactiveData, setInactiveData] = useState<LocationInactive[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetcher(
          `/buildings/inactive?sec=${sectionId}&entity=${entityId}&build=${buildingId}`,
          {
            credentials: "include",
          }
        );
        if (res.ok) {
          const data = await res.json();
          setInactiveData(data);
        }
      } catch (error) {
        console.error("Error fetching Building's Inactive", error);
      } finally {
        console.log("Get Inactive done");
      }
    };
    fetchData();
  }, [sectionId, entityId, buildingId]);

  const handleDeleteLocation = async (locationId: number) => {
    try {
      const res = await fetcher(`/locations/${locationId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        setInactiveData((prev) =>
          prev.filter((location) => location.id != locationId)
        );
      }
    } catch (error) {
      console.error("Fetching delete location error", error);
    } finally {
      console.log("delete location done");
    }
  };

  const columns: ColumnDef<LocationInactive>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" className="" />
      ),
      cell: ({ row }) => {
        return <div>{row.original.name}</div>;
      },
    },
    {
      accessorKey: "deletedAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Deleted At" />
      ),
      cell: ({ row }) => {
        const timeStart = new Date(row.original.deletedAt);
        return <div>{timeStart.toString().slice(0, 24)}</div>;
      },
    },
    {
      id: "action",
      header: ({ column }) =>
        isLogin ? (
          <DataTableColumnHeader column={column} title="Action" />
        ) : null,
      cell: ({ row }) => {
        if (!isLogin) return;
        return (
          <div className="flex items-center-safe justify-evenly">
            <div>
              <span>
                <DeleteComfirm
                  onConfirm={() => handleDeleteLocation(row.original.id)}
                />
              </span>
            </div>
          </div>
        );
      },
    },
  ];
  return <InactiveTable columns={columns} data={InactiveData} />;
}
