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
import { BuildingOverview } from "@/types/building-type";
import { AddBuilding } from "@/api/building-api";

// const DEFAULT_BUILDING: BuildingOverview = {
//   id: 0,
//   name: "",
//   apAll: 0,
//   apMaintain: 0,
//   apDown: 0,
//   user1: 0,
//   user2: 0,
// };

export default function BuildingAdding({
  modalOpen,
  onClose,
  basicDetails,
  onBuildingAdded,
}: {
  modalOpen: boolean;
  onClose: () => void;
  basicDetails: { section: string; entityName: string; entityId: number };
  onBuildingAdded: (building: BuildingOverview) => void;
}) {
  // handler for form in Adding Modal
  const formTemplate = {
    name: "",
    entityId: basicDetails.entityId,
    entityName: basicDetails.entityName,
    description: "",
  };
  const [formData, setFormData] = useState(formTemplate);

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
    const data = await AddBuilding(formData);
    const newBuilding = data;
    //newBuilding.name = formData.name;
    console.log(newBuilding);
    onBuildingAdded(newBuilding);
    onClose();
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
            <DialogTitle>Add New Building</DialogTitle>
            <DialogDescription>adding new building</DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4">
            <div className="flex flex-row gap-3">
              <label className="w-fit text-nowrap">Faculty:</label>
              <input
                type="text"
                name="entityName"
                value={formData.entityName}
                autoComplete="false"
                onChange={handleChange}
                className="outline w-full placeholder-muted"
                readOnly
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
    </Dialog>
  );
}
