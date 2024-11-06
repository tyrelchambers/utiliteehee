import { Generator, getGenerator } from "@/generator-types";
import React from "react";
import { PageProps } from "../../../../.next/types/app/page";

const Page = async ({ params }: PageProps) => {
  const type = (await params).type as Generator;
  const Gen = getGenerator(type);

  return (
    <div>
      <Gen />
    </div>
  );
};

export default Page;
