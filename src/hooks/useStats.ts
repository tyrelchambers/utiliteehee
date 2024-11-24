import { getGeneratorStats } from "@/actions/generators";
import { GeneratorStats } from "@prisma/client";
import { useEffect, useState } from "react";

export const useStats = (generator: string) => {
  const [stats, setStats] = useState<GeneratorStats>();

  useEffect(() => {
    const fn = async () => {
      const stats = await getGeneratorStats(generator);

      if (stats !== null) {
        setStats(stats);
      }
    };

    fn();
  }, [generator]);

  return { stats };
};
