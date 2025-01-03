"use client";
import ColourWrapper from "@/components/ColourWrapper";
import ExportColour from "@/components/ExportColour";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import GeneratorWrapper from "@/layouts/GeneratorWrapper";
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

const favourite = {
  name: "colour-palette",
  label: "Colour Palette",
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
    <GeneratorWrapper
      title="Colour Palette"
      description="Generate a new colour palette"
      favourite={favourite}
    >
      <section className="flex flex-col">
        <div className="flex gap-3 bg-secondary p-4 rounded-xl border border-border items-center">
          <Input
            type="color"
            className="w-10 h-10 p-0 border-0 block"
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
          <div className="w-44 mr-auto">
            <p className="font-medium text-xs mb-1 text-foreground">
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
          <Button onClick={generateRandomColour}>Generate random</Button>
        </div>

        <div className="mt-6 bg-secondary p-4 rounded-xl  border border-border">
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
                <p className="text-foreground mix-blend-difference font-mono absolute bottom-2 left-4 transition-all">
                  {hslToHex(shade[0], shade[1], shade[2])}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 bg-secondary p-4 rounded-xl  border border-border">
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
                <p className="text-foreground mix-blend-difference font-mono absolute bottom-2 left-4 transition-all">
                  {hslToHex(mono[0], mono[1], mono[2])}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 bg-secondary p-4 rounded-xl  border border-border">
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
                <p className="text-foreground mix-blend-difference font-mono absolute bottom-2 left-4 transition-all">
                  {hslToHex(mono[0], mono[1], mono[2])}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 bg-secondary p-4 rounded-xl  border border-border">
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
                <p className="text-foreground mix-blend-difference font-mono absolute bottom-2 left-4 transition-all">
                  {hslToHex(mono[0], mono[1], mono[2])}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 bg-secondary p-4 rounded-xl  border border-border">
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
                <p className="text-foreground mix-blend-difference font-mono absolute bottom-2 left-4 transition-all">
                  {hslToHex(mono[0], mono[1], mono[2])}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </GeneratorWrapper>
  );
};

export default ColourPalette;
