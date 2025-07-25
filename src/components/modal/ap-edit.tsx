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

type basicDetails = {
  entity: string;
  building: string;
  model: string;
  serialNumber: string;
  ethMac: string;
  ip: string;
  location: string;
};

// const formField = [
//   { name: "entity", label: "entity", type: "text" },
//   { name: "building", label: "building", type: "text" },
//   { name: "model", label: "model", type: "text" },
//   { name: "wlc", label: "wlc", type: "text" },
//   { name: "ethMac", label: "ethMac", type: "text" },
//   { name: "ip", label: "ip", type: "text" },
//   { name: "location", label: "location", type: "text" },
// ];

// param section - entity - building
// then save state when adding access point
export default function ApEdit({
  modalOpen,
  onClose,
  basicDetails,
}: {
  modalOpen: boolean;
  onClose: () => void;
  basicDetails: basicDetails;
}) {
  // handler for form in Adding Modal
  const formTemplate = {
    entity: basicDetails.entity,
    building: basicDetails.building,
    model: basicDetails.model,
    serialNumber: basicDetails.serialNumber,
    ethMac: basicDetails.ethMac,
    ip: basicDetails.ip,
    location: basicDetails.location,
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
    onClose();
  };

  // check if form is validate
  const [errors, setErrors] = useState({
    entity: "",
    building: "",
    model: "",
    serialNumber: "",
    ethMac: "",
    ip: "",
    location: "",
    description: "",
  });
  const validate = () => {
    const newError = {
      entity: "",
      building: "",
      model: "",
      serialNumber: "",
      ethMac: "",
      ip: "",
      location: "",
      description: "",
    };
    let isValid = true;
    if (!formData.model.trim()) {
      newError.model = "model is required";
      isValid = false;
    }
    if (!formData.serialNumber.trim()) {
      newError.serialNumber = "serial number is required";
      isValid = false;
    }
    if (!formData.ethMac.trim()) {
      newError.ethMac = "ethernet mac address is required";
      isValid = false;
    }
    if (!formData.ip.trim()) {
      newError.ip = "ip address is required";
      isValid = false;
    }
    if (!formData.location.trim()) {
      newError.location = "location is required";
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
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>adding new user</DialogDescription>
          </DialogHeader>

          {/* {formField.map((field)=>(
            <div key={field.name}>
              <label>{field.label}</label>
              <input type={field.type} name={field.name} onChange={handleChange} value={formData.[field.name]}/>
            </div>
            
          ))} */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-row gap-3">
              <label className="w-fit">Faculty:</label>
              <input
                type="text"
                name="entity"
                value={formData.entity}
                autoComplete="false"
                onChange={handleChange}
                className="outline w-full"
              />
            </div>

            <div className="flex flex-row gap-3">
              <label className="w-fit">Building:</label>
              <input
                type="text"
                name="building"
                value={formData.building}
                autoComplete="false"
                onChange={handleChange}
                className="outline w-full"
                readOnly
              />
            </div>

            <div>
              <div className="flex flex-row gap-3">
                <label className="w-fit">Model:</label>
                <input
                  type="text"
                  name="model"
                  value={formData.model}
                  autoComplete="false"
                  onChange={handleChange}
                  className="outline w-full"
                />
              </div>
              <div>
                {errors.model && (
                  <p className="text-red-500 text-sm">{errors.model}</p>
                )}
              </div>
            </div>

            <div>
              <div className="flex flex-row gap-3">
                <label className="w-fit text-nowrap">Serial Number:</label>
                <input
                  type="text"
                  name="serialNumber"
                  value={formData.serialNumber}
                  autoComplete="false"
                  onChange={handleChange}
                  className="outline w-full"
                />
              </div>
              <div>
                {errors.serialNumber && (
                  <p className="text-red-500 text-sm">{errors.serialNumber}</p>
                )}
              </div>
            </div>

            <div>
              <div className="flex flex-row gap-3">
                <label className="w-fit text-nowrap"> Eth. Mac Address:</label>
                <input
                  type="text"
                  name="ethMac"
                  value={formData.ethMac}
                  autoComplete="false"
                  onChange={handleChange}
                  className="outline w-full"
                />
              </div>
              <div>
                {errors.ethMac && (
                  <p className="text-red-500 text-sm">{errors.ethMac}</p>
                )}
              </div>
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
                {errors.ip && (
                  <p className="text-red-500 text-sm">{errors.ip}</p>
                )}
              </div>
            </div>

            <div>
              <div className="flex flex-row gap-3">
                <label className="w-fit"> Location:</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  autoComplete="false"
                  onChange={handleChange}
                  className="outline w-full"
                />
              </div>
              <div>
                {errors.location && (
                  <p className="text-red-500 text-sm">{errors.location}</p>
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
