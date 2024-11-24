/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `GeneratorStats` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "GeneratorStats_name_key" ON "GeneratorStats"("name");
