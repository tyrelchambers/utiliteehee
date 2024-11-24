import React from "react";
import Favourite from "./Favourite";

const Heading = ({
  module,
  children,
}: {
  module: string;
  children: React.ReactNode;
}) => {
  return (
    <header className="flex items-center gap-3">
      {children} <Favourite module={module} />
    </header>
  );
};

export default Heading;
