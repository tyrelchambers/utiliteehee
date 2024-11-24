"use client";
import { getFavourites, removeFavourite } from "@/lib/dexie";
import {
  faExternalLink,
  faHeartCircleMinus,
} from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLiveQuery } from "dexie-react-hooks";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

const YourFavourites = () => {
  const favourites = useLiveQuery(() => getFavourites());

  const remove = async (e: any, name: string) => {
    e.preventDefault();
    e.stopPropagation();
    await removeFavourite(name);
  };

  return (
    <div>
      <h2 className="h2">Your favourites</h2>

      {favourites && favourites.length > 0 ? (
        <div className="grid grid-cols-3 gap-6">
          {favourites?.map((favourite) => (
            <Link
              key={favourite.name}
              className="border-border border bg-black/30 p-4 rounded-xl shadow-xl hover:text-primary hover:border-primary transition-all flex items-center"
              href={"/generators/" + favourite.name}
            >
              <FontAwesomeIcon icon={faExternalLink} className="mr-2" />{" "}
              <p className="flex flex-1">{favourite.label}</p>
              <Button
                variant="secondary"
                onClick={(e) => remove(e, favourite.name)}
              >
                <FontAwesomeIcon icon={faHeartCircleMinus} /> Remove
              </Button>
            </Link>
          ))}
        </div>
      ) : (
        <div className="border-border border bg-black/30 p-4 rounded-xl shadow-xl">
          You have no favourites saved! That&apos;s a bummer
        </div>
      )}
    </div>
  );
};

export default YourFavourites;
