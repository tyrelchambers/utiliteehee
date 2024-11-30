"use client";
import { incrementGeneratorStat } from "@/actions/generators";
import GenStats from "@/components/GenStats";
import Heading from "@/components/Heading";
import { Badge } from "@/components/ui/badge";
import { useStats } from "@/hooks/useStats";
import { Favourite } from "@/lib/dexie";
import clsx from "clsx";
import React, { useEffect } from "react";

interface Props {
  children: React.ReactNode | React.ReactNode[];
  title: string;
  description?: string;
  badgeLabel?: string;
  favourite: Favourite;
  classes?: string;
}

const GeneratorWrapper = ({
  children,
  title,
  description,
  favourite,
  badgeLabel,
  classes,
}: Props) => {
  const { stats } = useStats(favourite.name);

  useEffect(() => {
    incrementGeneratorStat(favourite.name);
  }, []);

  return (
    <section className={clsx("section overflow-x-auto", classes)}>
      <div className="relative z-10">
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
          {description && (
            <p className="text-muted-foreground">{description}</p>
          )}
        </header>

        {children}
      </div>
    </section>
  );
};

export default GeneratorWrapper;
