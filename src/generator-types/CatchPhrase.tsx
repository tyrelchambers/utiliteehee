import { generateCatchPhrase } from "@/actions/chats";
import { Badge } from "@/components/ui/badge";
import React from "react";

const CatchPhrase = async () => {
  const resp = await generateCatchPhrase();

  return (
    <section className="section">
      <Badge variant="secondary" className="mb-3 rounded-full">
        AI wrapper. Inconsistancies possible.
      </Badge>
      <h1 className="h1">Catchphrase Generator</h1>
      <p className="text-muted-foreground mb-6">
        Get a super awesome catchphrase.
      </p>

      <p className="text-foreground p-4 rounded-full bg-secondary text-2xl w-fit px-8">
        {resp}
      </p>
    </section>
  );
};

export default CatchPhrase;
