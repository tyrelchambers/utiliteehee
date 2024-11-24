"use client";
import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { SidebarMenuButton } from "./ui/sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileImport } from "@fortawesome/pro-solid-svg-icons";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { db } from "@/lib/dexie";
import { toast } from "sonner";

const ImportDialog = () => {
  const importFile = () => {
    if (!window) return;

    const file = document.querySelector("#file") as HTMLInputElement;
    const reader = new FileReader();
    reader.onload = () => {
      const json = JSON.parse(reader.result as string);
      db.favourites.bulkAdd(json);
      toast.success("Favourites imported!");
    };
    reader.readAsText(file.files![0]);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <SidebarMenuButton>
          <FontAwesomeIcon icon={faFileImport} /> Import favourites
        </SidebarMenuButton>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Import favourites</DialogTitle>
          <DialogDescription>
            Import your JSON file of favourites.
          </DialogDescription>
        </DialogHeader>
        <Input type="file" accept="application/json" name="file" id="file" />
        <DialogClose asChild>
          <Button type="button" onClick={importFile}>
            Import
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default ImportDialog;
