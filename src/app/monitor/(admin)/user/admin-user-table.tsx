"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/table/data-table-header";
import { UserTable } from "@/components/table/user-table";

import { startTransition, useOptimistic, useState } from "react";
import { Button } from "@/components/ui/button";
import UserEdit from "@/components/modal/user-edit";
import UserAdding from "@/components/modal/user-adding";
import { User } from "@/types/user-type";
import { AddUser, DeleteUser } from "./user-handler";

// type User = {
//   id: string;
//   privilege: number;
//   username: string;
// };

export default function UserManageTable({ data }: { data: User[] }) {
  // handler for Users Display
  const [users, setUsers] = useState(data);
  const [optimisticUsers, setOptimisticUsers] = useOptimistic(
    users,
    (currentUsers, optimisticUsers: User) => [optimisticUsers, ...currentUsers]
  );

  //handler for Add User
  const handleAddUser = async (user: {
    username: string;
    password: string;
    privilege: number;
  }) => {
    const data = await AddUser(user);
    startTransition(() => {
      setOptimisticUsers({
        id: "#",
        username: user.username,
        privilege: user.privilege,
      });
    });
    setUsers((prev) => [data, ...prev]);
    alert("Add User Success");
  };

  // handler for delete user
  const handleDelete = async (id: string) => {
    DeleteUser(id);
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  // handler for edit user
  const handleEdit = (editedUser: User) => {
    //console.log(editedUser);
    setUsers((prev) =>
      prev.map((user) => (user.id === editedUser.id ? editedUser : user))
    );
    //setOptimisticUsers(editedUser);
  };

  // Create Table's Header
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
            <UserEdit data={row.original} onUserEdited={handleEdit} />
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
  //console.log(optimisticUsers);
  return (
    <div>
      <UserAdding onUserAdded={handleAddUser} />
      <UserTable columns={columns} data={optimisticUsers} />
    </div>
  );
}
