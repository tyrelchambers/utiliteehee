import React from "react";
import FireGradient from "./FireGradient";
import LightRay from "./LightRay";
import clsx from "clsx";

const StylisticWrapper = ({
  children,
  className,
  showGradient = true,
}: {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
  showGradient?: boolean;
}) => {
  return (
    <div className={clsx("nav-item-block relative shadow-xl", className)}>
      <div className="block-body">{children}</div>{" "}
      {showGradient && <FireGradient />}
      <LightRay />
    </div>
  );
};

export default StylisticWrapper;
