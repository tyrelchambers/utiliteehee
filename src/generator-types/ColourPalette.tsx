"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { hexToHsl } from "@/utils/convertHexToHsl";
import { hexToRgb } from "@/utils/convertHexToRgb";
import { hslToHex } from "@/utils/hslToHex";
import { Copy } from "lucide-react";
import React, { useMemo, useState } from "react";
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
    className="flex bg-muted px-3 py-1 rounded-lg items-center gap-3 min-w-48 font-mono"
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

const generateAnalogousScheme = (hex: string, colourCount: number) => {
  const n = colourCount;
  const degree = 15;
  const [h, s, l] = hexToHsl(hex);

  const shades = [];

  const startingHue = h - (degree * n) / 2;
  for (let index = 0; index < n; index++) {
    shades.push([startingHue + degree * index, s, l]);
  }

  return shades;
};

const generateComplimentaryScheme = (hex: string) => {
  const [h, s, l] = hexToHsl(hex);
  return [
    [h, s, l],
    [h + 180, s, l],
  ];
};

const generateMonochrome = (hex: string, colourCount: number) => {
  const numOfColours = colourCount;
  const [h, s, l] = hexToHsl(hex);
  const colours = [];

  for (let i = 0; i < numOfColours; i++) {
    let newL;

    if (i === 0) {
      newL = (1 / numOfColours) * (i + 0.35) * 100;
    } else {
      newL = (1 / numOfColours) * i * 100;
    }

    colours.push([h, s, newL]);
  }

  return colours;
};

const generateTriadic = (hex: string) => {
  const [h, s, l] = hexToHsl(hex);

  const shades = [];

  for (let index = 1; index <= 3; index++) {
    const hue = h + 120 * index;
    shades.push([hue, s, l]);
  }

  return shades;
};

const generateTetradic = (hex: string) => {
  const [h, s, l] = hexToHsl(hex);

  const shades = [];

  for (let index = 1; index <= 4; index++) {
    const hue = h + 90 * index;
    shades.push([hue, s, l]);
  }

  return shades;
};

const ColourPalette = () => {
  const [baseColour, setBaseColour] = React.useState("#000000");
  const [colourCount, setColourCount] = useState<number>(6);
  const analagous = useMemo(() => {
    return generateAnalogousScheme(baseColour, colourCount);
  }, [baseColour, colourCount]);
  const monochrome = useMemo(
    () => generateMonochrome(baseColour, colourCount),
    [baseColour, colourCount]
  );
  const complimentary = useMemo(
    () => generateComplimentaryScheme(baseColour),
    [baseColour]
  );
  const triadic = useMemo(() => generateTriadic(baseColour), [baseColour]);
  const tetradic = useMemo(() => generateTetradic(baseColour), [baseColour]);

  const hexConversion = hexToHsl(baseColour);

  const generateRandomColour = () => {
    setBaseColour(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
  };

  return (
    <div>
      <h1 className="h1 mb-2">Colour Palette</h1>
      <p className="text-muted-foreground mb-6">
        Generate a new colour palette
      </p>
      <section className="p-4 rounded-xl border border-border flex flex-col">
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
          <div className="mt-4 w-full max-w-44">
            <p className="font-medium text-xs mb-1">Number of colours</p>
            <Input
              placeholder="Colours to generate"
              value={colourCount}
              type="number"
              className="bg-muted"
              onChange={(e) => setColourCount(parseInt(e.target.value))}
            />
          </div>
        </div>

        <div className="mt-6">
          <header className="flex justify-between mb-4 items-center">
            <h2 className="font-medium font-mono">Analogous</h2>
            <Button>Export</Button>
          </header>
          <div
            className={`grid`}
            style={{
              gridTemplateColumns: `repeat(${colourCount}, 1fr)`,
            }}
          >
            {analagous.map((shade, idx) => (
              <div
                key={hslToHex(shade[0], shade[1], shade[2]) + idx}
                className="color-swatch"
                style={{
                  backgroundColor: hslToHex(shade[0], shade[1], shade[2]),
                }}
              >
                {" "}
                <p className="text-background mix-blend-difference font-mono absolute bottom-2 left-4 transition-all">
                  {hslToHex(shade[0], shade[1], shade[2])}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <h2 className="font-medium mb-2 font-mono">Monochrome</h2>
          <div
            className={`grid`}
            style={{
              gridTemplateColumns: `repeat(${colourCount}, 1fr)`,
            }}
          >
            {monochrome.map((mono, idx) => (
              <div
                key={hslToHex(mono[0], mono[1], mono[2]) + idx}
                className="color-swatch"
                style={{
                  backgroundColor: `${hslToHex(mono[0], mono[1], mono[2])}`,
                }}
              >
                <p className="text-background mix-blend-difference font-mono absolute bottom-2 left-4 transition-all">
                  {hslToHex(mono[0], mono[1], mono[2])}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <h2 className="font-medium mb-2 font-mono">Complimentary</h2>
          <div
            className={`grid`}
            style={{
              gridTemplateColumns: `repeat(${colourCount}, 1fr)`,
            }}
          >
            {complimentary.map((mono, idx) => (
              <div
                key={hslToHex(mono[0], mono[1], mono[2]) + idx}
                className="color-swatch"
                style={{
                  backgroundColor: `${hslToHex(mono[0], mono[1], mono[2])}`,
                }}
              >
                <p className="text-background mix-blend-difference font-mono absolute bottom-2 left-4 transition-all">
                  {hslToHex(mono[0], mono[1], mono[2])}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <h2 className="font-medium mb-2 font-mono">Triadic</h2>
          <div
            className={`grid`}
            style={{
              gridTemplateColumns: `repeat(${3}, 1fr)`,
            }}
          >
            {triadic.map((mono, idx) => (
              <div
                key={hslToHex(mono[0], mono[1], mono[2]) + idx}
                className="color-swatch"
                style={{
                  backgroundColor: `${hslToHex(mono[0], mono[1], mono[2])}`,
                }}
              >
                <p className="text-background mix-blend-difference font-mono absolute bottom-2 left-4 transition-all">
                  {hslToHex(mono[0], mono[1], mono[2])}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <h2 className="font-medium mb-2 font-mono">Tetradic</h2>
          <div
            className={`grid`}
            style={{
              gridTemplateColumns: `repeat(${3}, 1fr)`,
            }}
          >
            {tetradic.map((mono, idx) => (
              <div
                key={hslToHex(mono[0], mono[1], mono[2]) + idx}
                className="color-swatch"
                style={{
                  backgroundColor: `${hslToHex(mono[0], mono[1], mono[2])}`,
                }}
              >
                <p className="text-background mix-blend-difference font-mono absolute bottom-2 left-4 transition-all">
                  {hslToHex(mono[0], mono[1], mono[2])}
                </p>
              </div>
            ))}
          </div>
        </div>

        <footer className="mt-6 w-full flex">
          <Button onClick={generateRandomColour}>Generate random</Button>
        </footer>
      </section>
    </div>
  );
};

export default ColourPalette;
