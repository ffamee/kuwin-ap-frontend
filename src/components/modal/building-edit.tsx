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
import { EditBuilding } from "@/api/building-api";
import Confirmation from "./confirmation";
import { useRouter } from "next/navigation";

export default function BuildingEdit({
  modalOpen,
  onClose,
  basicDetails,
}: {
  modalOpen: boolean;
  onClose: () => void;
  basicDetails: {
    buildingName: string;
    buildingId: number;
    entityId: number;
    sectionId: number;
  };
}) {
  // handler for form in Edit Modal
  const formTemplate = {
    name: basicDetails.buildingName,
    entityId: basicDetails.entityId,
    //description: "",
  };
  const router = useRouter();
  const [formData, setFormData] = useState(formTemplate);
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
    const editedBuilding = await EditBuilding(
      basicDetails.buildingId,
      formData,
      ""
    );
    if ("statusCode" in editedBuilding) {
      if (editedBuilding.statusCode === 409) {
        setOpenConfirmation(true);
      }
      console.log(editedBuilding);
    } else {
      router.push(
        `/monitor/${basicDetails.sectionId}/${formData.entityId}/${editedBuilding.id}`
      );
    }
    onClose();
  };

  const handleConfirm = async () => {
    const editedBuilding = await EditBuilding(
      basicDetails.buildingId,
      formData,
      "?confirm=true"
    );
    if (!("statusCode" in editedBuilding)) {
      router.push(
        `/monitor/${basicDetails.sectionId}/${editedBuilding.entityId}/${editedBuilding.id}`
      );
    }
    console.log(editedBuilding);
  };

  // check if form is validate
  const [errors, setErrors] = useState({
    name: "",
    entityName: "",
    description: "",
  });
  const validate = () => {
    const newError = {
      name: "",
      entityName: "",
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
            <DialogTitle>Edit Building</DialogTitle>
            <DialogDescription>edit this building</DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4">
            <div className="flex flex-row gap-3">
              <label className="w-fit text-nowrap">Entity:</label>
              <input
                type="text"
                name="entityId"
                value={formData.entityId}
                autoComplete="false"
                onChange={handleChange}
                className="outline w-full placeholder-muted"
              />
              {errors.entityName && (
                <p className="text-red-500 text-sm">{errors.entityName}</p>
              )}
            </div>
          </div>

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
          </div> */}

          <div>
            <div className="flex flex-row gap-3">
              <label className="w-fit text-nowrap">Upload Picture</label>
              <input type="file" name="picture" className="p-1 w-full" />
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
        title="Are you sure to move?"
        message="This Building already have configuration or location"
      />
    </Dialog>
  );
}
