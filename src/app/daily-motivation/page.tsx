import { getDailyMotivation } from "@/actions/chats";
import React from "react";

const Page = async () => {
  const motivation = await getDailyMotivation();

  return (
    <div>
      <p className="text-lg text-muted-foreground max-w-4xl">{motivation}</p>
    </div>
  );
};

export default Page;
