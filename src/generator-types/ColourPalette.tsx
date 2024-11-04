"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { hexToHsl } from "@/utils/convertHexToHsl";
import { hexToRgb } from "@/utils/convertHexToRgb";
import { Copy } from "lucide-react";
import React from "react";
import { toast } from "sonner";

const ColourWrapper = ({
  label,
  value,
  onClick,
}: {
  label: string;
  value: string;
  onClick: () => void;
}) => (
  <button
    className="flex bg-muted px-3 py-1 rounded-lg items-center gap-3 min-w-48"
    onClick={onClick}
    type="button"
  >
    <Copy size={16} className="text-muted-foreground" />
    <div className="flex flex-col">
      <p className="uppercase text-xxs text-muted-foreground text-left">
        {label}
      </p>
      <p className="text-foreground text-sm font-bold">{value}</p>
    </div>
  </button>
);

const copy = (text: string) => {
  navigator.clipboard.writeText(text);
  toast.success("Copied to clipboard");
};

const ColourPalette = () => {
  const [baseColour, setBaseColour] = React.useState("#000000");
  const hexConversion = hexToHsl(baseColour);
  return (
    <div>
      <h1 className="h1 mb-2">Colour Palette</h1>
      <p className="text-muted-foreground mb-6">
        Generate a new colour palette
      </p>
      <section className="p-4 rounded-xl border border-border max-w-screen-md flex flex-col">
        <div className="flex flex-col">
          <div className="flex items-center">
            <Input
              type="color"
              className="w-10 h-10 p-0 border-0"
              value={baseColour}
              onChange={(e) => setBaseColour(e.target.value)}
            />

            <div className=" py-1 rounded-lg flex px-2 gap-4">
              <ColourWrapper
                label="HEX"
                value={baseColour}
                onClick={() => copy(baseColour)}
              />
              <ColourWrapper
                label="RGB"
                value={`rgb(${hexToRgb(baseColour).join(", ")})`}
                onClick={() => copy(`rgb(${hexToRgb(baseColour).join(", ")})`)}
              />
              <ColourWrapper
                label="HSL"
                value={`hsl(${hexConversion[0]}, ${hexConversion[1]}%, ${hexConversion[2]}%)`}
                onClick={() =>
                  copy(
                    `hsl(${hexConversion[0]}, ${hexConversion[1]}%, ${hexConversion[2]}%)`
                  )
                }
              />
            </div>
          </div>
        </div>
        <footer className="mt-6 w-full flex">
          <Button>Generate random</Button>
        </footer>
      </section>
    </div>
  );
};

export default ColourPalette;
