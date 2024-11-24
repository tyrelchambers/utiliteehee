import { getRomanEmpireFacts } from "@/actions/chats";
import GeneratorWrapper from "@/layouts/GeneratorWrapper";
import React from "react";

const fav = {
  name: "roman-fact",
  label: "Random Roman Empire Fact",
};

const RandomRomanFact = async () => {
  const fact = await getRomanEmpireFacts();

  return (
    <GeneratorWrapper
      title="Random Roman Empire Fact"
      description=" Everyone thinks about the Roman Empire. There are 2 kinds of people in the world: those who think about the Roman Empire and those who are lying."
      favourite={fav}
    >
      <div className="bg-secondary p-4 rounded-xl mt-6 max-w-screen-md">
        <div className="text-foreground whitespace-pre-wrap">{fact}</div>
      </div>
    </GeneratorWrapper>
  );
};

export default RandomRomanFact;
