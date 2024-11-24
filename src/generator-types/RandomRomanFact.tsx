import { getRomanEmpireFacts } from "@/actions/chats";
import Heading from "@/components/Heading";
import { Badge } from "@/components/ui/badge";
import React from "react";

const fav = {
  name: "roman-fact",
  label: "Random Roman Empire Fact",
};

const RandomRomanFact = async () => {
  const fact = await getRomanEmpireFacts();

  return (
    <section className="section">
      <Badge variant="secondary" className="mb-3 rounded-full">
        AI wrapper. Inconsistancies possible.
      </Badge>
      <Heading module={fav}>
        <h1 className="h1">Random Roman Empire Fact</h1>
      </Heading>
      <p className="text-muted-foreground max-w-4xl">
        Everyone thinks about the Roman Empire. There are 2 kinds of people in
        the world: those who think about the Roman Empire and those who are
        lying.
      </p>

      <div className="bg-secondary p-4 rounded-xl mt-6 max-w-screen-md">
        <div className="text-foreground whitespace-pre-wrap">{fact}</div>
      </div>
    </section>
  );
};

export default RandomRomanFact;
