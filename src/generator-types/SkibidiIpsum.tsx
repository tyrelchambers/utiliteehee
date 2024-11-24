"use client";
import { Button } from "@/components/ui/button";
import GeneratorWrapper from "@/layouts/GeneratorWrapper";
import { copy } from "@/utils/copy";
import { generateSkibidiIpsum } from "@/utils/skibidiIpsum";
import { Copy, Shuffle } from "lucide-react";
import React, { useEffect, useState } from "react";

const fav = {
  name: "skibidi-ipsum",
  label: "Skibidi Ipsum",
};

const SkibidiIpsum = () => {
  const [counter, setCounter] = useState(0);
  const [text, setText] = useState<string[]>([]);

  useEffect(() => {
    setText(generateSkibidiIpsum(3));
  }, [counter]);

  return (
    <GeneratorWrapper
      title="Skibidi Ipsum"
      description="Generate some Skibidi Ipsum text for your next big project."
      favourite={fav}
    >
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
    </GeneratorWrapper>
  );
};

export default SkibidiIpsum;
