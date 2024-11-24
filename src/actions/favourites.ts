"use server";

import { Favourite } from "@/lib/dexie";
import cuid2 from "@paralleldrive/cuid2";
import { rmSync, writeFileSync } from "fs";
import path from "path";

export const exportFavourites = async (data: Favourite[]) => {
  const randomUUID = cuid2.createId();
  const fileName = `${randomUUID}-favourites.json`;
  const tempPath = path.resolve(process.cwd(), "exports", fileName);
  console.log(process.cwd());
  await writeFileSync(tempPath, JSON.stringify(data));

  return fileName;
};

export const deleteFavourites = async (fileName: string) => {
  const tempPath = path.resolve(process.cwd(), "exports", fileName);
  await rmSync(tempPath);
};
