"use server";

import { prisma } from "../../prisma/client";

export const incrementGeneratorStat = async (generator: string) => {
  const exists = await prisma.generatorStats.findFirst({
    where: {
      name: generator,
    },
  });

  if (!exists) {
    await prisma.generatorStats.create({
      data: {
        name: generator,
        runs: 1,
      },
    });

    return;
  } else {
    await prisma.generatorStats.updateMany({
      where: {
        name: generator,
      },
      data: {
        runs: {
          increment: 1,
        },
      },
    });
  }
};

export const getGeneratorStats = async (generator: string) => {
  return await prisma.generatorStats.findFirst({
    where: {
      name: generator,
    },
  });
};
