import Dexie, { type EntityTable } from "dexie";

export interface Favourite {
  id: number;
  name: string;
  label: string;
}

export const db = new Dexie("utiliteehee") as Dexie & {
  favourites: EntityTable<Favourite, "id">;
};
db.version(1).stores({
  favourites: "++id, &name, label",
});

export const addFavourite = async (data: Omit<Favourite, "id">) => {
  try {
    await db.favourites.add(data);
  } catch (error) {
    if (error instanceof Dexie.ConstraintError) {
      return;
    }
    console.error("Failed to add favourite:", error);
  }
};

export const removeFavourite = async (module: string) => {
  try {
    await db.favourites.where("name").equals(module).delete();
  } catch (error) {
    console.error("Failed to remove favourite:", error);
  }
};

export const getFavourites = async () => {
  return db.favourites.toArray();
};
