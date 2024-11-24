import { generateExcuse } from "@/actions/chats";
import GeneratorWrapper from "@/layouts/GeneratorWrapper";
import React from "react";

const fav = {
  name: "excuse",
  label: "Excuse Generator",
};

const Excuse = async () => {
  const resp = await generateExcuse();
  return (
    <GeneratorWrapper
      title="Excuse Generator"
      description="Need to get out of something? Let us generate a totally beliavable excude. Infallible. No refunds."
      badgeLabel="AI wrapper. Inconsistancies possible."
      favourite={fav}
    >
      <p className="text-foreground p-4 rounded-2xl bg-secondary  max-w-4xl ">
        {resp}
      </p>
    </GeneratorWrapper>
  );
};

export default Excuse;
