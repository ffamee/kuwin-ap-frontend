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
import UserMenu from "../dropdown-menu/user-menu";
import { User } from "@/types/user-type";
import { EditUser } from "@/app/monitor/(admin)/user/user-handler";

// type EditModalProps = {
//   data: User;
//   onUserEdited: (editedUser: User) => void;
// };

export default function UserEdit({
  data,
  onUserEdited,
}: {
  data: User;
  onUserEdited: (editedUser: User) => void;
}) {
  const [formData, setFormData] = useState(data);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      setOpen(true);
      return;
    }
    console.log("going to EditUser...");
    const editedUser = await EditUser(data.id, formData);
    console.log("finishing EditUser...");
    console.log(editedUser);

    setOpen(false);
    onUserEdited(formData);
  };

  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({
    username: "",
  });

  const validate = () => {
    const newError = {
      username: "",
    };
    let isValid = true;
    if (!formData.username.trim()) {
      newError.username = "Username is required";
      isValid = false;
    }
    setErrors(newError);
    return isValid;
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setFormData(data)}>
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit} autoComplete="off">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>editing user</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
            <div className="grid gap-3">
              <label>Username:</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
              {errors.username && (
                <p className="text-red-500 text-sm">{errors.username}</p>
              )}
            </div>
            <div className="grid gap-3">
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
