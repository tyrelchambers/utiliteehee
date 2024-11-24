"use client";
import { faHeart, faHeartCircleMinus } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button } from "./ui/button";
import {
  addFavourite,
  db,
  Favourite as IFavourite,
  removeFavourite,
} from "@/lib/dexie";
import { useLiveQuery } from "dexie-react-hooks";

const Favourite = ({ data }: { data: IFavourite }) => {
  const isFavourite = useLiveQuery(() =>
    db.favourites.where("name").equals(data.name).count()
  );

  return isFavourite ? (
    <Button
      variant="destructive"
      type="button"
      onClick={() => removeFavourite(data.name)}
    >
      <FontAwesomeIcon icon={faHeartCircleMinus} />
    </Button>
  ) : (
    <Button variant="outline" type="button" onClick={() => addFavourite(data)}>
      <FontAwesomeIcon icon={faHeart} />
    </Button>
  );
};

export default Favourite;
