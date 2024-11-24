import { generateCatchPhrase } from "@/actions/chats";
import Heading from "@/components/Heading";
import { Badge } from "@/components/ui/badge";
import GeneratorWrapper from "@/layouts/GeneratorWrapper";
import React from "react";

const fav = {
  name: "catchphrase",
  label: "Catchphrase",
};

const CatchPhrase = async () => {
  const resp = await generateCatchPhrase();

  return (
    <GeneratorWrapper
      title="Catchphrase Generator"
      description="Get a super awesome catchphrase."
      badgeLabel="AI wrapper. Inconsistancies possible."
      favourite={fav}
    >
      <p className="text-foreground p-4 rounded-full bg-secondary text-2xl w-fit px-8">
        {resp}
      </p>
    </GeneratorWrapper>
  );
};

export default CatchPhrase;
