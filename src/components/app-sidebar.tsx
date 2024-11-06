import * as React from "react";

import { SearchForm } from "@/components/search-form";
import { VersionSwitcher } from "@/components/version-switcher";
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

// This is sample data.
const data = {
  navMain: [
    {
      title: "Design & Content",
      items: [
        {
          title: "Colour Palette",
          url: "/generators/colour-palette",
          isActive: false,
        },
        {
          title: "Lorem Ipsum",
          url: "/generators/lorem-ipsum",
          isActive: false,
        },
        {
          title: "Skibidi Ipsum",
          url: "/generators/skibidi-ipsum",
          isActive: false,
        },
        {
          title: "UUID",
          url: "/generators/uuid",
          isActive: false,
        },
        {
          title: "Font Pairing",
          url: "/generators/font-pairing",
          isActive: false,
        },

        {
          title: "QR Code",
          url: "/generators/qr-code",
          isActive: false,
        },

        {
          title: "Image Resizer",
          url: "/generators/image-resizer",
          isActive: false,
        },
        {
          title: "Text Case Converter",
          url: "/generators/text-case-converter",
          isActive: false,
        },
      ],
    },
    {
      title: "Identity & Name",
      items: [
        {
          title: "Fantasy Name",
          url: "/generators/fantasy-name",
          isActive: false,
        },
        {
          title: "Business Name",
          url: "/generators/business-name",
          isActive: false,
        },
      ],
    },
    {
      title: "Writing & Creative Prompts",
      items: [
        {
          title: "Catchphrase",
          url: "/generators/catchphrase",
          isActive: false,
        },
        {
          title: "Excuse",
          url: "/generators/excuse",
          isActive: false,
        },
        {
          title: "Nickname",
          url: "/generators/nickname",
          isActive: false,
        },
        {
          title: "Writing Prompt",
          url: "/generators/writing-prompt",
          isActive: false,
        },
      ],
    },
    {
      title: "Music & Audio Generators",
      items: [
        {
          title: "Mood Playlist",
          url: "/generators/mood-playlist",
          isActive: false,
        },
        {
          title: "Chord Progression",
          url: "/generators/chord-progression",
          isActive: false,
        },
      ],
    },
    {
      title: "Random Facts & Trivia",
      items: [
        {
          title: "Daily Motivation",
          url: "/generators/daily-motivation",
          isActive: false,
        },
        {
          title: "Random Roman Empire Fact",
          url: "/generators/roman-empire-fact",
          isActive: false,
        },
      ],
    },
    {
      title: "Utility Tools",
      items: [
        {
          title: "Age Calculator",
          url: "/generators/age-calculator",
          isActive: false,
        },
        {
          title: "Random Number",
          url: "/generators/random-number",
          isActive: false,
        },
        {
          title: "Password",
          url: "/generators/password",
          isActive: false,
        },
      ],
    },
    {
      title: "Sports",
      items: [
        {
          title: "Team",
          url: "/generators/team",
          isActive: false,
        },
      ],
    },
    {
      title: "Converters",
      items: [
        {
          title: "Bits in an Integer",
          url: "/generators/bits-in-an-integer",
          isActive: false,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <VersionSwitcher />
        <SearchForm />
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <a href={item.url}>{item.title}</a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
