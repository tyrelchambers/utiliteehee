"use client";
import { getFantasyName } from "@/actions/chats";
import FantasyNameItem from "@/components/FantasyNameItem";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
interface FantasyNameResponse {
  name: string;
  backstory: string;
}
const FantasyName = () => {
  const [names, setNames] = React.useState<FantasyNameResponse[]>([]);
  const [universe, setUniverse] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);

  const generate = async () => {
    setLoading(true);
    try {
      const name = await getFantasyName(universe);
      const parsed = JSON.parse(name) as FantasyNameResponse[];
      setNames(parsed);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  return (
    <div className="section max-w-screen-xl ">
      <Badge variant="secondary" className="mb-3 rounded-full">
        AI wrapper. Refresh might be necessary.
      </Badge>
      <h1 className="h1">Fantasy Name Generator</h1>
      <p>
        Use this tool to get a super awesome name for your next D&amp;D
        campaign.
      </p>

      <div className="p-4 rounded-xl border border-border bg-muted/30 my-10">
        <Label>Universe</Label>
        <p className="text-sm text-muted-foreground mb-2">
          Generate a name in a specific universe. Leave blank for a random name.
        </p>
        <div className="flex items-center gap-2">
          <Input
            value={universe}
            onChange={(e) => setUniverse(e.target.value)}
            placeholder="Dungeons &amp; Dragons, LOTR, Star Wars..."
          />
          <Button type="button" onClick={generate}>
            Generate
          </Button>
        </div>
      </div>

      {loading && (
        <div className="flex flex-col gap-6">
          <Skeleton className="h-20  w-full" />
          <Skeleton className="h-20  w-full" />
          <Skeleton className="h-20  w-full" />
        </div>
      )}

      {!loading && (
        <>
          {names.map((n) => (
            <FantasyNameItem key={n.name} n={n} />
          ))}
        </>
      )}
    </div>
  );
};

export default FantasyName;
