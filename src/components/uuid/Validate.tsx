"use client";
import React, { useMemo, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { validate, version } from "uuid";
import { CircleCheck, X } from "lucide-react";

const Validate = () => {
  const [value, setValue] = useState("");

  return (
    <div>
      <Label htmlFor="uuid">Validate</Label>
      <Input
        name="uuid"
        placeholder="Paste UUID here to validate"
        className="font-mono"
        onChange={(e) => setValue(e.target.value)}
      />
      <div className="mt-2">
        {value && (
          <>
            {validate(value) ? (
              <p className="text-green-500 text-xs font-medium bg-green-500/10 p-2 rounded-md flex items-center">
                <CircleCheck size="18" className="mr-2" />
                Valid
              </p>
            ) : (
              <p className="text-red-500 bg-red-500/10 p-2 rounded-md flex items-center text-xs">
                <X size="18" className="mr-2" />
                Invalid
              </p>
            )}

            {version(value) && (
              <p className="text-muted-foreground text-xs font-mono mt-2">
                Version: v{version(value)}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Validate;
