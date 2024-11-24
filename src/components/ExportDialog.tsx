"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { SidebarMenuButton } from "./ui/sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExport } from "@fortawesome/pro-solid-svg-icons";
import { Button } from "./ui/button";
import { db } from "@/lib/dexie";
import { deleteFavourites, exportFavourites } from "@/actions/favourites";

const ExportDialog = () => {
  const exportFavs = async () => {
    const favs = await db.favourites.toArray();
    const fileName = await exportFavourites(favs);
    const file = await fetch(`/exports/${fileName}`);
    const blob = await file.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();
    link.remove();
    await deleteFavourites(fileName);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <SidebarMenuButton>
          <FontAwesomeIcon icon={faFileExport} /> Export favourites
        </SidebarMenuButton>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Export</DialogTitle>
          <DialogDescription>Export your favourites to JSON.</DialogDescription>
        </DialogHeader>
        <Button type="button" onClick={exportFavs}>
          Export
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ExportDialog;
