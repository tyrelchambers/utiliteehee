"use client";
import { Button } from "@/components/ui/button";
import { copy } from "@/utils/copy";
import { generateSkibidiIpsum } from "@/utils/skibidiIpsum";
import { Copy, Shuffle } from "lucide-react";
import React, { useEffect, useState } from "react";

const SkibidiIpsum = () => {
  const [counter, setCounter] = useState(0);
  const [text, setText] = useState<string[]>([]);

  useEffect(() => {
    setText(generateSkibidiIpsum(3));
  }, [counter]);

  return (
    <div className="section max-w-screen-xl">
      <h1 className="h1 mb-2">Skibidi Ipsum</h1>
      <p className="text-muted-foreground mb-6">
        The dankest new ipsum generator inspired by TikTok culture. Skibidi your
        way to brand new dummy text straight from Ohio.
      </p>

      <section className="section-body">
        <div className="rounded-xl border border-border p-3 w-full bg-background ">
          {text.map((t, i) => (
            <p className="text-foreground" key={i}>
              {t}
            </p>
          ))}
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
      </section>
    </div>
  );
};

export default SkibidiIpsum;
