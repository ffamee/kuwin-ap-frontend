"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { useState } from "react";

export default function BuildingAdding({
  modalOpen,
  onClose,
  basicDetails,
}: {
  modalOpen: boolean;
  onClose: () => void;
  basicDetails: { section: string; entity: string };
}) {
  // handler for form in Adding Modal
  const formTemplate = {
    name: "",
    section: basicDetails.section,
    entity: basicDetails.entity,
    description: "",
  };
  const [formData, setFormData] = useState(formTemplate);
  const [sectionMenu, selectSectionMenu] = useState(formData.section);

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
    //console.log(errors);
    if (!validate()) {
      modalOpen = true;
      return;
    }
    onClose();
  };

  // check if form is validate
  const [errors, setErrors] = useState({
    name: "",
    section: "",
    entity: "",
    description: "",
  });
  const validate = () => {
    const newError = {
      name: "",
      section: "",
      entity: "",
      description: "",
    };
    let isValid = true;
    if (!formData.name.trim()) {
      newError.name = "building name is required";
      isValid = false;
    }

    setErrors(newError);
    return isValid;
  };

  return (
    <Dialog open={modalOpen} onOpenChange={onClose}>
      <DialogContent>
        <form
          onSubmit={handleSubmit}
          autoComplete="off"
          className="flex flex-col gap-3"
        >
          <DialogHeader>
            <DialogTitle>Add New Building</DialogTitle>
            <DialogDescription>adding new building</DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4">
            <div>
              <div className="flex flex-row gap-3">
                <label className="w-fit text-nowrap">Building name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  autoComplete="false"
                  onChange={handleChange}
                  className="outline w-full"
                />
              </div>
              <div>
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name}</p>
                )}
              </div>
            </div>

            <div className="flex flex-row gap-3">
              <label className="w-fit text-nowrap">Faculty:</label>
              <input
                type="text"
                name="entity"
                value={formData.entity}
                autoComplete="false"
                onChange={handleChange}
                className="outline w-full"
                readOnly
              />
              {errors.entity && (
                <p className="text-red-500 text-sm">{errors.entity}</p>
              )}
            </div>
          </div>
          <div className="flex flex-row gap-3">
            <label className="w-fit">Section:</label>
            <div className="w-full">
              <DropdownMenu>
                <DropdownMenuTrigger asChild disabled>
                  <Button variant="outline" className="capitalize w-full">
                    {sectionMenu}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onSelect={() => selectSectionMenu("faculty")}
                  >
                    Faculty
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={() => selectSectionMenu("organization")}
                  >
                    Organization
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={() => selectSectionMenu("dormitory")}
                  >
                    Dormitory
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div>
            <div className="flex flex-row gap-3">
              <label className="w-fit"> Description:</label>
              <input
                type="text"
                name="description"
                value={formData.description}
                autoComplete="false"
                onChange={handleChange}
                className="outline w-full"
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
