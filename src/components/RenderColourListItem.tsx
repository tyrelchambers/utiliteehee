import { ColourType } from "@/types";
import { copy } from "@/utils/copy";
import { hslToHex } from "@/utils/hslToHex";
import { hslToRgb } from "@/utils/hslToRgb";
import { Copy } from "lucide-react";
import React from "react";

const Wrapper = ({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode | React.ReactNode[];
}) => (
  <button
    type="button"
    className="bg-muted rounded-sm px-3 py-1 w-full flex justify-between items-center hover:bg-primary hover:text-background transition-all"
    onClick={onClick}
  >
    {children}
  </button>
);

const RenderColourListItem = ({
  colour,
  type,
}: {
  colour: number[];
  type: ColourType;
}) => {
  if (type === "hex") {
    return (
      <Wrapper onClick={() => copy(hslToHex(colour[0], colour[1], colour[2]))}>
        <p className="font-mono text-sm">
          {hslToHex(colour[0], colour[1], colour[2])}
        </p>
        <Copy size={14} />
      </Wrapper>
    );
  }

  if (type === "rgb") {
    return (
      <Wrapper onClick={() => copy(hslToRgb(colour[0], colour[1], colour[2]))}>
        <p className="font-mono text-sm">{`rgb(${colour[0]}, ${colour[1]}, ${colour[2]})`}</p>

        <Copy size={14} />
      </Wrapper>
    );
  }

  if (type === "hsl") {
    return (
      <Wrapper
        onClick={() => copy(`hsl(${colour[0]}, ${colour[1]}%, ${colour[2]}%)`)}
      >
        <p className="font-mono text-sm">{`hsl(${colour[0]}, ${colour[1]}%, ${colour[2]}%)`}</p>

        <Copy size={14} />
      </Wrapper>
    );
  }
  return null;
};

export default RenderColourListItem;
