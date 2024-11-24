import { generateExcuse } from "@/actions/chats";
import Heading from "@/components/Heading";
import { Badge } from "@/components/ui/badge";
import React from "react";

const Excuse = async () => {
  const resp = await generateExcuse();
  return (
    <section className="section">
      <Badge variant="secondary" className="mb-3 rounded-full">
        AI wrapper. Inconsistancies possible.
      </Badge>
      <Heading module="excuse">
        <h1 className="h1">Excuse Generator</h1>
      </Heading>
      <p className="text-muted-foreground mb-6">
        Need to get out of something? Let us generate a totally beliavable
        excude. Infallible. No refunds.
      </p>

      <p className="text-foreground p-4 rounded-2xl bg-secondary  max-w-4xl ">
        {resp}
      </p>
    </section>
  );
};

export default Excuse;
