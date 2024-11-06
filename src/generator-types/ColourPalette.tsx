"use client";
import ColourWrapper from "@/components/ColourWrapper";
import ExportColour from "@/components/ExportColour";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  generateAnalogousScheme,
  generateComplimentaryScheme,
  generateMonochrome,
  generateTetradic,
  generateTriadic,
} from "@/utils/colourSchemes";
import { hexToHsl } from "@/utils/convertHexToHsl";
import { hexToRgb } from "@/utils/convertHexToRgb";
import { copy } from "@/utils/copy";
import { hslToHex } from "@/utils/hslToHex";
import React, { useMemo, useState } from "react";

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
            <p className="font-medium text-xs mb-1">
              Number of colours - {colourCount}
            </p>
            <div className="flex gap-3 items-center">
              <span className="text-muted-foreground font-mono text-sm font-bold">
                1
              </span>
              <Slider
                defaultValue={[colourCount]}
                max={10}
                step={1}
                min={1}
                onValueChange={(e) => setColourCount(e[0])}
              />
              <span className="text-muted-foreground font-mono text-sm font-bold">
                10
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <header className="flex justify-between mb-4 items-center">
            <h2 className="font-medium font-mono">Analogous</h2>
            <ExportColour colours={analagous} />
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
          <header className="flex justify-between mb-4 items-center">
            <h2 className="font-medium font-mono">Monochrome</h2>
            <ExportColour colours={monochrome} />
          </header>
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
          <header className="flex justify-between mb-4 items-center">
            <h2 className="font-medium font-mono">Complimentary</h2>
            <ExportColour colours={complimentary} />
          </header>
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
          <header className="flex justify-between mb-4 items-center">
            <h2 className="font-medium font-mono">Triadic</h2>
            <ExportColour colours={triadic} />
          </header>
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
          <header className="flex justify-between mb-4 items-center">
            <h2 className="font-medium font-mono">Tetradic</h2>
            <ExportColour colours={tetradic} />
          </header>
          <div
            className={`grid`}
            style={{
              gridTemplateColumns: `repeat(${4}, 1fr)`,
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
