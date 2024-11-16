import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const loading = () => {
  return (
    <div className="section">
      <div className="flex flex-col gap-6">
        <Skeleton className="h-20 max-w-screen-lg w-full" />
        <Skeleton className="h-20 max-w-screen-lg w-full" />
        <Skeleton className="h-20 max-w-screen-lg w-full" />
      </div>
    </div>
  );
};

export default loading;
