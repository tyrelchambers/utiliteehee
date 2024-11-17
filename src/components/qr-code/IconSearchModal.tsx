import React from "react";
import { icons, Search } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const IconSearchModal = ({
  iconSearchQuery,
  setIconSearchQuery,
  updateIcon,
}: {
  iconSearchQuery: string;
  setIconSearchQuery: (query: string) => void;
  updateIcon: (icon: string) => void;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex justify-between items-center w-full bg-background pl-4 rounded-lg">
          <p className="font-medium text-xs">Add an icon</p>
          <Button variant="ghost" size="sm" className="pr-4">
            <Search className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
            Search
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Search for an icon</DialogTitle>
        </DialogHeader>
        <Input
          placeholder="Icon name (lucide-icons)"
          onChange={(e) => setIconSearchQuery(e.target.value)}
        />

        <ScrollArea className="h-[300px] ">
          <div className="grid grid-cols-9 gap-3">
            {Object.keys(icons)
              .filter((i) => i.toLowerCase().includes(iconSearchQuery))
              .map((i) => {
                const LucideIcon = icons[i as keyof typeof icons];

                return (
                  <DialogClose asChild key={i}>
                    <Button
                      variant="ghost"
                      type="button"
                      className="bg-muted rounded-lg flex items-center justify-center h-10 w-10"
                      title={i}
                      onClick={() => updateIcon(i)}
                    >
                      <LucideIcon key={i} name={i} />
                    </Button>
                  </DialogClose>
                );
              })}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default IconSearchModal;
