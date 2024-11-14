import {
  faGhost,
  faPalette,
  faSwatchbook,
  faFaceSunglasses,
  faBarcodeRead,
  faFontCase,
  faQrcode,
  faInputText,
  faSwords,
  faBriefcase,
} from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const data = {
  navMain: [
    {
      title: "Design & Content",
      items: [
        {
          title: "Colour Palette",
          description:
            "Generate a colour palette and switch between colour spaces",
          url: "/generators/colour-palette",
          isActive: false,
          icon: faSwatchbook,
        },
        {
          title: "Lorem Ipsum",
          description:
            "Generate some Lorem Ipsum text for your next big project.",
          icon: faGhost,
          url: "/generators/lorem-ipsum",
          isActive: false,
        },
        {
          title: "Skibidi Ipsum",
          description:
            "Skibidi your way to brand new dummy text straight from Ohio.",
          icon: faFaceSunglasses,
          url: "/generators/skibidi-ipsum",
          isActive: false,
        },
        {
          title: "UUID",
          description: "Generate and validate UUIDs",
          icon: faBarcodeRead,
          url: "/generators/uuid",
          isActive: false,
        },
        {
          title: "Font Pairing",
          description:
            "Find the best font pairings in the universe with this handy font pairing tool.",
          url: "/generators/font-pairing",
          icon: faFontCase,
          isActive: false,
        },

        {
          title: "QR Code",
          description: "Generate a QR Code",
          icon: faQrcode,
          url: "/generators/qr-code",
          isActive: false,
        },
        {
          title: "Text Case Converter",
          description: "Convert text between different cases",
          icon: faInputText,
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
          description: "Generate a fantasy name",
          icon: faSwords,
          url: "/generators/fantasy-name",
          isActive: false,
        },
        {
          title: "Business Name",
          description: "Generate a business name",
          icon: faBriefcase,
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
