"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/table/data-table-header";
import { UserTable } from "@/components/table/user-table";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import UserEdit from "@/components/modal/user-edit";
import UserAdding from "@/components/modal/user-adding";
import { User } from "@/types/user-type";

// type User = {
//   id: string;
//   privilege: number;
//   username: string;
// };

export default function UserManageTable({ data }: { data: User[] }) {
  const [users, setUsers] = useState(data);

  const handleDelete = async (id: string) => {
    try {
      const confirmed = confirm("Are you sure to delete this user");
      if (!confirmed) return;
      const res = await fetch(`http://localhost:3001/users/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to try delete");
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete user");
    }
  };

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "username",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Username" />
      ),
    },
    {
      accessorKey: "privilege",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Role" />
      ),
    },
    {
      id: "action",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Action" />
      ),
      cell: ({ row }) => {
        return (
          <div>
            <UserEdit
              data={row.original}
              onUserEdited={(editedUser: User) => {
                setUsers((prev) =>
                  prev.map((user) =>
                    user.id === editedUser.id ? editedUser : user
                  )
                );
              }}
            />
            <Button
              variant="outline"
              onClick={() => handleDelete(row.original.id)}
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <UserAdding
        onUserAdded={(newUser: User) => {
          setUsers((prev) => [newUser, ...prev]);
        }}
      />
      <UserTable columns={columns} data={users} />
    </div>
  );
}
