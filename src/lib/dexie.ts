import Dexie, { type EntityTable } from "dexie";

export interface Favourite {
  name: string;
  label: string;
}

export const db = new Dexie("utiliteehee") as Dexie & {
  favourites: EntityTable<Favourite>;
};
db.version(1).stores({
  favourites: "++id, &name",
});

export const addFavourite = async (data: Favourite) => {
  try {
    await db.favourites.add({ label: data.label, name: data.name });
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
