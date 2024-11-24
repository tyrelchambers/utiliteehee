"use client";
import { incrementGeneratorStat } from "@/actions/generators";
import GenStats from "@/components/GenStats";
import Heading from "@/components/Heading";
import { Badge } from "@/components/ui/badge";
import { useStats } from "@/hooks/useStats";
import { Favourite } from "@/lib/dexie";
import React, { useEffect } from "react";

interface Props {
  children: React.ReactNode | React.ReactNode[];
  title: string;
  description: string;
  badgeLabel?: string;
  favourite: Favourite;
}

const GeneratorWrapper = ({
  children,
  title,
  description,
  favourite,
  badgeLabel,
}: Props) => {
  const { stats } = useStats(favourite.name);

  useEffect(() => {
    incrementGeneratorStat(favourite.name);
  }, []);

  return (
    <section className="section overflow-x-auto">
      <header className="mb-10">
        <GenStats stats={stats} />
        {badgeLabel && (
          <Badge variant="secondary" className="mb-3 rounded-full">
            {badgeLabel}
          </Badge>
        )}
        <Heading module={favourite}>
          <h1 className="h1">{title}</h1>
        </Heading>
        <p className="text-muted-foreground">{description}</p>
      </header>

      {children}
    </section>
  );
};

export default GeneratorWrapper;
