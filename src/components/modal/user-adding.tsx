"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useState } from "react";
//import { User } from "@/types/user-type";
import UserMenu from "../dropdown-menu/user-menu";

// type AddModalProps = {
//   onUserAdded: (user: User) => void;
// };

export default function UserAdding({
  onUserAdded,
}: {
  onUserAdded: ({
    username,
    password,
    privilege,
  }: {
    username: string;
    password: string;
    privilege: number;
  }) => void;
}) {
  // handler for form in Adding Modal
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    privilege: 0,
  });

  // handler for changing in form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // handler when form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      setOpen(true);
      return;
    }
    setOpen(false);
    onUserAdded(formData);
  };

  // check if form is validate
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });
  const validate = () => {
    const newError = {
      username: "",
      password: "",
    };
    let isValid = true;
    if (!formData.username.trim()) {
      newError.username = "Username is required";
      isValid = false;
    }
    if (!formData.password.trim()) {
      newError.password = "Password is required";
      isValid = false;
    }
    setErrors(newError);
    return isValid;
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          onClick={() =>
            setFormData({
              username: "",
              password: "",
              privilege: 0,
            })
          }
        >
          Add New User
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit} autoComplete="off">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>adding new user</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
            <div className="grid gap-3">
              <label>Username:</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                autoComplete="false"
                onChange={handleChange}
              />
              {errors.username && (
                <p className="text-red-500 text-sm">{errors.username}</p>
              )}
            </div>
            <div className="grid gap-3">
              Password:
              <input
                type="password"
                name="password"
                value={formData.password}
                autoComplete="false"
                onChange={handleChange}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>
            <div className="grid gap=3">
              Privilege:
              <UserMenu
                selected={formData.privilege}
                onSelectPrivilege={(priv) =>
                  setFormData((prev) => ({ ...prev, privilege: priv }))
                }
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>

            <Button type="submit" variant="outline">
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
