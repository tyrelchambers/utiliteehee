import React from "react";
import Favourite from "./Favourite";
import { Favourite as IFavourite } from "@/lib/dexie";

const Heading = ({
  module,
  children,
}: {
  module: Omit<IFavourite, "id">;
  children: React.ReactNode;
}) => {
  return (
    <header className="flex items-center gap-3">
      {children} <Favourite data={module} />
    </header>
  );
};

export default Heading;
