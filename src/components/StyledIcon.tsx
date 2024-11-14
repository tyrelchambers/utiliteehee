import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import React from "react";

interface Props {
  icon: FontAwesomeIconProps["icon"];
  classNames?: {
    wrapper?: string;
    icon?: string;
  };
}

const StyledIcon = ({ icon, classNames }: Props) => {
  return (
    <div
      className={clsx(
        "icon-background flex items-center justify-center relative z-10",
        classNames?.wrapper
      )}
    >
      <div className="icon-overlay-2"></div>
      <div className="icon-wrapper relative">
        <FontAwesomeIcon
          icon={icon}
          className={clsx("styled-icon", classNames?.icon)}
        />
      </div>
      <div className="icon-overlay-1"></div>
    </div>
  );
};

export default StyledIcon;
