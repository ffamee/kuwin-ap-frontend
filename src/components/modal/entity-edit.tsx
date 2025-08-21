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

import { EditEntity } from "@/api/entity-api";
import { EntityOverview } from "@/types/entity-type";
import { useRouter } from "next/navigation";
import Confirmation from "./confirmation";

export default function EntityEdit({
  modalOpen,
  onClose,
  basicDetails,
  onEntityEdited,
}: {
  modalOpen: boolean;
  onClose: () => void;
  basicDetails: {
    section: string;
    sectionId: number;
    entityName: string;
    entityId: number;
  };
  onEntityEdited: (entity: EntityOverview) => void;
}) {
  // handler for form in Adding Modal
  const router = useRouter();
  const formTemplate = {
    name: basicDetails.entityName,
    section: basicDetails.sectionId,
    description: "",
  };
  const [formData, setFormData] = useState(formTemplate);
  const [sectionMenu, selectSectionMenu] = useState(formData.section);
  const [openConfirmation, setOpenConfirmation] = useState(false);

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
      modalOpen = true;
      return;
    }
    const editedEntity = await EditEntity(
      basicDetails.entityId,
      {
        name: formData.name,
        sectionId: formData.section,
        description:
          formData.description === "" ? undefined : formData.description,
      },
      ""
    );
    if ("statusCode" in editedEntity) {
      if (editedEntity.statusCode === 409) {
        setOpenConfirmation(true);
      }
      console.log(editedEntity);
      onEntityEdited(editedEntity);
    } else
      router.push(`/monitor/${editedEntity.section.id}/${editedEntity.id}`);
    onClose();
  };

  const handleConfirm = async () => {
    const editedEntity = await EditEntity(
      basicDetails.entityId,
      {
        name: formData.name,
        sectionId: formData.section,
        description:
          formData.description === "" ? undefined : formData.description,
      },
      "?confirm=true"
    );
    if (!("statusCode" in editedEntity))
      router.push(`/monitor/${editedEntity.section.id}/${editedEntity.id}`);
    console.log(editedEntity);
  };

  // check if form is validate
  const [errors, setErrors] = useState({
    name: "",
    section: "",
    description: "",
  });
  const validate = () => {
    const newError = {
      name: "",
      section: "",
      description: "",
    };
    let isValid = true;
    if (!formData.name.trim()) {
      newError.name = basicDetails.section + " name is required";
      isValid = false;
    }

    setErrors(newError);
    return isValid;
  };

  const handleMenu = (menu: number) => {
    if (menu === 1) formData.section = 1;
    else if (menu === 2) formData.section = 2;
    else if (menu === 3) formData.section = 3;
    else formData.section = 0;

    selectSectionMenu(menu);
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
            <DialogTitle className="capitalize">
              Edit {basicDetails.section}
            </DialogTitle>
            <DialogDescription>
              editing {basicDetails.entityName} informations
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-row gap-3">
            <label className="w-fit">Section:</label>
            <div className="w-full">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
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

          <div className="flex flex-col gap-4">
            <div>
              <div className="flex flex-row gap-3">
                <label className="w-fit text-nowrap capitalize">
                  {basicDetails.section} name:
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

            <div>
              <div className="flex flex-row gap-3">
                <label className="w-fit text-nowrap">Upload Picture</label>
                <input type="file" name="picture" className="p-1 w-full" />
              </div>
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
      <Confirmation
        open={openConfirmation}
        onOpenChange={setOpenConfirmation}
        onConfirm={handleConfirm}
        title="Are you sure to move"
        message="This Entity already has Building"
      />
    </Dialog>
  );
}
