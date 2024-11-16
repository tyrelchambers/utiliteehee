"use client";
import { generateNickname } from "@/actions/chats";
import LightRay from "@/components/LightRay";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { copy } from "@/utils/copy";
import { Copy } from "lucide-react";
import React, { useEffect, useState } from "react";

const Nickname = () => {
  const [loading, setLoading] = useState(true);
  const [names, setNames] = useState<Record<string, string>[]>([]);
  useEffect(() => {
    (async () => {
      const resp = await generateNickname();

      setNames(JSON.parse(resp));
      setLoading(false);
    })();
  }, []);

  return (
    <section className="section">
      <Badge variant="secondary" className="mb-3 rounded-full">
        AI wrapper. Inconsistancies possible.
      </Badge>
      <h1 className="h1">Nickname Generator</h1>
      <p className="text-muted-foreground mb-6">
        Get a super awesome nickname.
      </p>

      {loading && (
        <div className="flex flex-col gap-6">
          <Skeleton className="h-20  w-full" />
          <Skeleton className="h-20  w-full" />
          <Skeleton className="h-20  w-full" />
        </div>
      )}
      <div className="flex gap-3 flex-wrap">
        {names.map((n, i) => (
          <section
            className="bg-muted/30 p-4 rounded-xl mt-6 border border-border relative overflow-hidden"
            key={i}
          >
            <LightRay />
            <div className="flex items-center w-fit gap-4">
              <p className="font-faculty text-2xl mb-2">{n.name}</p>
              <Button
                variant="outline"
                size="icon"
                type="button"
                onClick={() => copy(n.name)}
              >
                <Copy size={16} className="text-muted-foreground" />
              </Button>
            </div>
          </section>
        ))}
      </div>
    </section>
  );
};

export default Nickname;
