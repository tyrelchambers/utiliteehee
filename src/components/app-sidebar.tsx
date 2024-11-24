"use client";
import * as React from "react";
import { SearchForm } from "@/components/search-form";
import { VersionSwitcher } from "@/components/version-switcher";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { data } from "@/index.routes";
import LightRay from "./LightRay";
import { usePathname } from "next/navigation";
import { useLiveQuery } from "dexie-react-hooks";
import { getFavourites } from "@/lib/dexie";
import Link from "next/link";
import ExportDialog from "./ExportDialog";
import ImportDialog from "./ImportDialog";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [query, setQuery] = React.useState("");

  const favourites = useLiveQuery(() => getFavourites());
  const pathname = usePathname();
  const isActive = (url: string) => {
    return pathname === url;
  };

  return (
    <Sidebar {...props}>
      <LightRay />
      <SidebarHeader>
        <VersionSwitcher />
        <SearchForm query={query} setQuery={setQuery} />
      </SidebarHeader>
      <SidebarContent className="gap-0">
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm text-sidebar-foreground">
            Favourites
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {favourites?.map((favourite) => (
                <SidebarMenuItem key={favourite.name}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(favourite.name)}
                  >
                    <Link href={favourite.name}>{favourite.label}</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {/* We create a collapsible SidebarGroup for each parent. */}
        {data.navMain
          .filter((d) => {
            return (
              d.items.filter((i) => i.title.toLowerCase().includes(query))
                .length > 0
            );
          })
          .map((item) => (
            <Collapsible
              key={item.title}
              title={item.title}
              className="group/collapsible"
              defaultOpen={!!query}
            >
              <SidebarGroup>
                <SidebarGroupLabel
                  asChild
                  className="group/label text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                >
                  <CollapsibleTrigger>
                    {item.title}{" "}
                    <ChevronRightIcon className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                  </CollapsibleTrigger>
                </SidebarGroupLabel>
                <CollapsibleContent>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {item.items
                        .filter((i) => i.title.toLowerCase().includes(query))
                        .map((item) => (
                          <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                              asChild
                              isActive={isActive(item.url)}
                            >
                              <a href={item.url}>{item.title}</a>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </CollapsibleContent>
              </SidebarGroup>
            </Collapsible>
          ))}
        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem key="export">
                <ExportDialog />
              </SidebarMenuItem>

              <SidebarMenuItem key="import">
                <ImportDialog />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
