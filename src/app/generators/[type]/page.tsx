import { Generator, getGenerator } from "@/generator-types";
import React from "react";

const Page = async ({ params }: { params: { type: string } }) => {
  const type = (await params).type as Generator;
  const Gen = getGenerator(type);

  return (
    <div>
      <Gen />
    </div>
  );
};

export default Page;
