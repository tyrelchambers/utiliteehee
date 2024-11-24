"use client";
import Heading from "@/components/Heading";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useMemo, useState } from "react";

const getLocations = (bits: string[]) => {
  const locations: number[] = [];

  for (let i = 0; i < bits.length; i++) {
    let bitLocation = Math.pow(2, i);
    locations.push(bitLocation);
  }

  return locations;
};

const BitVisualizer = () => {
  const [integer, setInteger] = useState(0);

  const bitsArray = useMemo(() => {
    const bits = integer.toString(2);
    const bitArray = bits.split("").reverse();
    return bitArray;
  }, [integer]);

  const bitMarkers = useMemo(() => {
    const locations = getLocations(bitsArray);

    return bitsArray.map((bit, index) => {
      return (
        <div className="flex flex-col items-center gap-2">
          <span
            key={index}
            className="text-foreground bg-background border border-border p-2 rounded-md w-full h-10 flex items-center justify-center"
          >
            {bit}
          </span>
          <span className="font-mono text-xs">{locations[index]}</span>
        </div>
      );
    });
  }, [integer]);

  const calculateBytes = (int: number) => {
    if (!int) return 0;
    return int / 8;
  };

  return (
    <section className="section">
      <Heading module="bit-visualizer">
        <h1 className="h1">Bit Visualizer</h1>
      </Heading>
      <p className="text-muted-foreground">
        This type of tool helped me (the creator of Utiliteehee) visualize
        numbers as bits.
      </p>
      <div className="bg-secondary p-4 rounded-xl mt-6 w-full max-w-screen-md ">
        <div className="flex flex-col gap-2">
          <Label>Integer</Label>
          <Input
            name="integer"
            type="number"
            placeholder="Enter an integer"
            min="0"
            onChange={(e) => setInteger(parseInt(e.target.value))}
          />
        </div>

        <div className="flex flex-col gap-2 mt-4"></div>
        <Label>Bits</Label>
        <div className="flex flex-row gap-2 mt-3 w-full overflow-y-auto">
          {integer > 0 && bitMarkers}
        </div>
      </div>
      <div className="flex gap-3 mt-2">
        <p className="font-mono text-sm">Bytes: {calculateBytes(integer)}</p>
      </div>
    </section>
  );
};

export default BitVisualizer;
