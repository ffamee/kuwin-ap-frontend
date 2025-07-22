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
import { Button } from "../ui/button";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { AddEntity } from "@/api/entity-api";
import { Section } from "@/types/section-type";
import { EntityOverview } from "@/types/entity-type";

const DEFAULT_ENTITY: EntityOverview = {
  id: 0,
  name: "",
  apAll: 0,
  apDown: 0,
  apMaintain: 0,
  user1: 0,
  user2: 0,
};

export default function EntityAdding({
  modalOpen,
  onClose,
  basicDetails,
  onEntityAdded,
}: {
  modalOpen: boolean;
  onClose: () => void;
  basicDetails: Section;
  onEntityAdded: (entity: EntityOverview) => void;
}) {
  // handler for form in Adding Modal
  const formTemplate = {
    name: "",
    sectionId: basicDetails.id,
    // description: "",
  };
  const [formData, setFormData] = useState(formTemplate);
  const [sectionMenu, selectSectionMenu] = useState(formData.sectionId);

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
    AddEntity(formData);
    const newEntity: EntityOverview = DEFAULT_ENTITY;
    newEntity.name = formData.name;
    onEntityAdded(newEntity);
    onClose();
  };

  const handleMenu = (menu: number) => {
    if (menu === 1) formData.sectionId = 1;
    else if (menu === 2) formData.sectionId = 2;
    else if (menu === 3) formData.sectionId = 3;
    else formData.sectionId = 0;

    selectSectionMenu(menu);
  };

  // check if form is validate
  const [errors, setErrors] = useState({
    name: "",
    section: "",
    // description: "",
  });
  const validate = () => {
    const newError = {
      name: "",
      section: "",
      // description: "",
    };
    let isValid = true;
    if (!formData.name.trim()) {
      newError.name = basicDetails.name + " name is required";
      isValid = false;
    }
    if (formData.sectionId === 0) {
      newError.section = "selected section required";
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
            <DialogTitle>Add New {basicDetails.name}</DialogTitle>
            <DialogDescription>
              adding new {basicDetails.name}
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4">
            <div>
              <div className="flex flex-row gap-3">
                <label className="w-fit text-nowrap capitalize">
                  {basicDetails.name}:
                </label>
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
              <label className="w-fit">Section:</label>
              <div className="w-full">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild disabled>
                    <Button variant="outline" className="capitalize w-full">
                      {sectionMenu === 1
                        ? "Faculty"
                        : sectionMenu === 2
                        ? "Organization"
                        : sectionMenu === 3
                        ? "Dormitory"
                        : "Selected"}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onSelect={() => handleMenu(1)}>
                      Faculty
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => handleMenu(2)}>
                      Organization
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => handleMenu(3)}>
                      Dormitory
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            {/* <div>
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
              <div>
                {errors.description && (
                  <p className="text-red-500 text-sm">{errors.description}</p>
                )}
              </div>
            </div> */}
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
