"use client";
import React from "react";
import LightRay from "./LightRay";
import { copy } from "@/utils/copy";
import { Button } from "./ui/button";
import { Copy } from "lucide-react";

const FantasyNameItem = ({ n }: { n: { name: string; backstory: string } }) => {
  return (
    <section
      className="bg-muted/30 p-4 rounded-xl mt-6 border border-border relative overflow-hidden"
      key={n.name}
    >
      <LightRay />
      <div className="flex items-center w-fit gap-4">
        <p className="font-faculty text-2xl mb-2">{n.name}</p>
        <Button
          variant="outline"
          size="icon"
          type="button"
          onClick={() => copy(n.name)}
        >
          <Copy size={16} className="text-muted-foreground" />
        </Button>
      </div>
      <p className="text-foreground/70 text-xl">{n.backstory}</p>
    </section>
  );
};

export default FantasyNameItem;
