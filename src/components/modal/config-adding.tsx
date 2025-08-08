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
import { AddConfig } from "@/api/config-api";
import { ConfigOverview } from "@/types/config-type";

export default function ConfigAdding({
  modalOpen,
  onClose,
  basicDetails,
  onConfigAdded,
}: {
  modalOpen: boolean;
  onClose: () => void;
  basicDetails: { entity: string; building: string; buildingId: number };
  onConfigAdded: (config: ConfigOverview) => void;
}) {
  // handler for form in Adding Modal
  const formTemplate = {
    buildingId: basicDetails.buildingId,
    ip: "",
    name: "",
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
    if (!validate()) {
      modalOpen = true;
      return;
    }
    const newConfig = await AddConfig({
      name: formData.name,
      ip: formData.ip,
      buildingId: formData.buildingId,
    });
    console.log(newConfig);
    if (newConfig !== null) {
      newConfig.location.name = formData.name;
      newConfig.ip.ip = formData.ip;
      onConfigAdded(newConfig);
    }
    onClose();
  };

  // check if form is validate
  const [errors, setErrors] = useState({
    ip: "",
    name: "",
  });
  const validate = () => {
    const newError = {
      ip: "",
      name: "",
    };
    let isValid = true;
    if (!formData.ip.trim()) {
      newError.ip = "ip address is required";
      isValid = false;
    }
    if (!formData.name.trim()) {
      newError.name = "location is required";
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
            <DialogTitle>Add New Configuration</DialogTitle>
            <DialogDescription>adding new configurations</DialogDescription>
          </DialogHeader>

          <div className="flex flex-row gap-3">
            <label className="w-fit text-nowrap">Building:</label>
            <input
              type="text"
              name="buildingId"
              value={formData.buildingId}
              autoComplete="false"
              onChange={handleChange}
              className="outline w-full"
            />
          </div>

          <div>
            <div className="flex flex-row gap-3">
              <label className="w-fit text-nowrap">IP Address:</label>
              <input
                type="text"
                name="ip"
                value={formData.ip}
                autoComplete="false"
                onChange={handleChange}
                className="outline w-full"
              />
            </div>
            <div>
              {errors.ip && <p className="text-red-500 text-sm">{errors.ip}</p>}
            </div>
          </div>

          <div>
            <div className="flex flex-row gap-3">
              <label className="w-fit"> Name:</label>
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
