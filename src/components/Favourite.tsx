"use client";
import { faHeart, faHeartCircleMinus } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button } from "./ui/button";
import { addFavourite, db, removeFavourite } from "@/lib/dexie";
import { useLiveQuery } from "dexie-react-hooks";

const Favourite = ({ module }: { module: string }) => {
  const isFavourite = useLiveQuery(() =>
    db.favourites.where("name").equals(module).count()
  );

  return isFavourite ? (
    <Button
      variant="destructive"
      type="button"
      onClick={() => removeFavourite(module)}
    >
      <FontAwesomeIcon icon={faHeartCircleMinus} />
    </Button>
  ) : (
    <Button
      variant="outline"
      type="button"
      onClick={() => addFavourite(module)}
    >
      <FontAwesomeIcon icon={faHeart} />
    </Button>
  );
};

export default Favourite;
