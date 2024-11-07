"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Copy, Shuffle } from "lucide-react";
import React, { useMemo, useState } from "react";
import { createId } from "@paralleldrive/cuid2";
import { v4, v5, v6 } from "uuid";
import { copy } from "@/utils/copy";

type Type = "uuid-v4" | "cuid" | "time-based" | "namespaced";

const generateNamespace = () => v4();

const generateUUID = (type: Type, value?: string, namespace?: string) => {
  if (type === "uuid-v4") {
    return v4();
  }
  if (type === "namespaced") {
    if (!value || !namespace) return null;

    return v5(value, namespace);
  }

  if (type === "time-based") {
    return v6();
  }

  return createId();
};

const showRegenButton = ["uuid-v4", "cuid"];

const Create = () => {
  const [type, setType] = useState<Type>("uuid-v4");
  const [counter, setCounter] = useState(0);
  const [value, setValue] = useState("");

  const generatedNamespace = useMemo(() => generateNamespace(), []);

  const text = useMemo(() => {
    return generateUUID(type, value, generatedNamespace);
  }, [counter, type, value]);

  return (
    <section className="pt-6">
      <p className="font-medium mb-2">
        Select the type of UUID you'd like to create
      </p>
      <div className="flex flex-col gap-3">
        <Select onValueChange={(v) => setType(v as Type)} defaultValue={type}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="UUID type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="uuid-v4">UUID v4</SelectItem>
            <SelectItem value="cuid">CUID</SelectItem>
            <SelectItem value="time-based">UUID (Time based)</SelectItem>
            <SelectItem value="namespaced">UUID (Namespaced)</SelectItem>
          </SelectContent>
        </Select>

        {type === "namespaced" && (
          <div className="bg-muted p-3 rounded-lg flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <p className="text-xs font-medium">Your generated namespace</p>
              <Input value={generatedNamespace} readOnly />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-xs font-medium">Value</p>
              <Input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="(ex: example.com or 'Hello world!')"
              />
            </div>
          </div>
        )}

        <div className="flex items-center gap-3">
          <Input readOnly value={text ?? ""} />
          <Button variant="outline" onClick={() => copy(text ?? "")}>
            <Copy size="16" />
          </Button>
        </div>

        {showRegenButton.includes(type) && (
          <Button
            className="w-fill mt-4"
            onClick={() => setCounter(counter + 1)}
          >
            <Shuffle size="16" className="mr-2" />
            Regenerate
          </Button>
        )}
      </div>
    </section>
  );
};

export default Create;
