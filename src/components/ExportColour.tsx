import React, { useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { toCss, toJson, toSass } from "@/converters";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Code, Copy, FileJson } from "lucide-react";
import { ColourType } from "@/types";
import { copy } from "@/utils/copy";

interface Props {
  colours: any;
}

export const exportActions: Record<string, any> = {
  json: {
    label: "JSON",
    description: "Export your colour palette as JSON.",
    icon: <Code />,
    action: (data: any, type: ColourType) => toJson(data, type),
  },
  css: {
    label: "CSS",
    icon: <FileJson />,
    action: (data: any, type: ColourType) => toCss(data, type),
  },
  sass: {
    label: "SASS",
    icon: <FileJson />,
    action: (data: any, type: ColourType) => toSass(data, type),
  },
};

const ExportColour = ({ colours }: Props) => {
  const [exportType, setExport] = useState<ColourType | "">("");
  const [selectedExport, setSelectedExport] = useState("");

  const output = useMemo(() => {
    if (!selectedExport) {
      return;
    }

    return exportActions[selectedExport]?.action(colours, exportType);
  }, [selectedExport, exportType]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Export</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Export colour palette</DialogTitle>
          <DialogDescription>
            Choose an option to export your colour palette.
          </DialogDescription>
        </DialogHeader>
        <Select
          onValueChange={(value) => setExport(value as ColourType)}
          value={exportType}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Export as..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="hex">HEX</SelectItem>
            <SelectItem value="rgb">RGB</SelectItem>
            <SelectItem value="hsl">HSL</SelectItem>
          </SelectContent>
        </Select>

        {exportType && (
          <div className="grid grid-cols-3 gap-4">
            {Object.entries(exportActions).map(([key, action]) => (
              <button
                type="button"
                key={action.label}
                className="border border-border flex flex-col p-3 rounded-lg items-center gap-2 hover:bg-muted transition-all"
                onClick={() => setSelectedExport(key)}
              >
                <span className="text-muted-foreground">{action.icon}</span>
                <p className="font-medium">{action.label}</p>
              </button>
            ))}
          </div>
        )}

        {selectedExport && (
          <section>
            <div className="bg-muted rounded-xl p-3 relative">
              <RenderExportType type={selectedExport} output={output} />
              <button
                type="button"
                className="absolute bottom-3 right-3 flex items-center bg-foreground/10 px-2 py-1 rounded gap-2 font-mono text-sm hover:bg-foreground hover:text-background transition-all"
                onClick={() => copy(output)}
              >
                <Copy size={14} /> copy
              </button>
            </div>
          </section>
        )}
      </DialogContent>
    </Dialog>
  );
};

const RenderExportType = ({
  type,
  output,
}: {
  type: string;
  output: string;
}) => {
  if (type === "css") {
    return <pre>{output}</pre>;
  }
  if (type === "json") {
    return <pre>{JSON.stringify(output, null, 2)}</pre>;
  }
  if (type === "sass") {
    return <pre>{output}</pre>;
  }
};

export default ExportColour;
