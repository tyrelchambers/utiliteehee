import React from "react";
import Favourite from "./Favourite";
import { Favourite as IFavourite } from "@/lib/dexie";

const Heading = ({
  module,
  children,
}: {
  module: IFavourite;
  children: React.ReactNode;
}) => {
  return (
    <header className="flex items-center gap-3 mb-2">
      {children} <Favourite data={module} />
    </header>
  );
};

export default Heading;
