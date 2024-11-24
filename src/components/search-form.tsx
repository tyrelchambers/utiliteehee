"use client";
import { Label } from "@/components/ui/label";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarInput,
} from "@/components/ui/sidebar";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

export function SearchForm({
  query,
  setQuery,
}: {
  query: string;
  setQuery: (query: string) => void;
}) {
  return (
    <SidebarGroup className="py-0">
      <SidebarGroupContent className="relative">
        <Label htmlFor="search" className="sr-only">
          Search
        </Label>
        <SidebarInput
          id="search"
          placeholder="Search the docs..."
          className="pl-8"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <MagnifyingGlassIcon className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
