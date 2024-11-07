"use client";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { copy } from "@/utils/copy";
import { generateLoremIpsum } from "@/utils/skibidiIpsum";
import { Copy, Shuffle } from "lucide-react";
import React, { useEffect, useState } from "react";

const SkibidiIpsum = () => {
  const [counter, setCounter] = useState(0);
  const [text, setText] = useState<string[]>([]);

  useEffect(() => {
    setText(generateLoremIpsum(3));
  }, [counter]);

  return (
    <div className="section centered max-w-3xl mx-auto">
      <h1 className="h1 mb-2 text-center">Skibidi Ipsum</h1>
      <p className="text-muted-foreground mb-6 text-center">
        The dankest new ipsum generator inspired by TikTok culture. Skibidi your
        way to brand new dummy text straight from Ohio.
      </p>
      <div className="flex"></div>
      <div className="rounded-xl border border-border p-3">
        <ScrollArea className="prose flex flex-col gap-3 h-[300px]  ">
          {text.map((t, i) => (
            <p className="text-foreground" key={i}>
              {t}
            </p>
          ))}
        </ScrollArea>
      </div>
      <footer className="flex justify-between w-full">
        <Button
          variant="secondary"
          className="w-fit mt-4"
          onClick={() => copy(text.join("\n"))}
        >
          <Copy />
          Copy
        </Button>
        <Button
          className="w-fit mt-4"
          onClick={() => setCounter((prev) => prev + 1)}
        >
          <Shuffle />
          Regenerate
        </Button>
      </footer>
    </div>
  );
};

export default SkibidiIpsum;
