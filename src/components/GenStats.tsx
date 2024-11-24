import { GeneratorStats } from "@prisma/client";
import React from "react";

const GenStats = ({ stats }: { stats: GeneratorStats | undefined }) => {
  if (!stats) return null;

  return (
    <div className="mb-2">
      <p className="font-mono text-xs text-muted-foreground">
        Generator uses: {stats.runs}
      </p>
    </div>
  );
};

export default GenStats;
