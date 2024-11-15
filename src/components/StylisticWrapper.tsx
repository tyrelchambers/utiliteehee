import React from "react";
import FireGradient from "./FireGradient";
import LightRay from "./LightRay";
import clsx from "clsx";
import Link from "next/link";

const StylisticWrapper = ({
  children,
  className,
  showGradient = true,
  href,
}: {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
  showGradient?: boolean;
  href: string;
}) => {
  return (
    <Link
      href={href}
      className={clsx("nav-item-block relative shadow-xl", className)}
    >
      <div className="block-body">{children}</div>{" "}
      {showGradient && <FireGradient />}
      <LightRay />
    </Link>
  );
};

export default StylisticWrapper;
