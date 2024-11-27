import {
  faGhost,
  faSwatchbook,
  faFaceSunglasses,
  faBarcodeRead,
  faFontCase,
  faQrcode,
  faInputText,
  faSwords,
  faBriefcase,
  faHandHorns,
  faFaceShush,
  faSignature,
  faPenNib,
  faCloudMusic,
  faMusicNote,
  faBolt,
  faSword,
  faInputNumeric,
  fa7,
  faKey,
  faBinary,
} from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";

interface Data {
  navMain: {
    title: string;
    items: {
      title: string;
      description?: string;
      icon?: FontAwesomeIconProps["icon"];
      url: string;
      isActive: boolean;
    }[];
  }[];
}

export const data: Data = {
  navMain: [
    {
      title: "Battlers",
      items: [
        {
          title: "Github Battler",
          description: "Generate a Github Battler",
          url: "/generators/github-battler",
          icon: faSword,
          isActive: false,
        },
      ],
    },
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
          description: "Generate a catchy catchphrase",
          icon: faHandHorns,
          url: "/generators/catchphrase",
          isActive: false,
        },
        {
          title: "Excuse",
          description: "Generate an excuse for your next big day off work",
          icon: faFaceShush,
          url: "/generators/excuse",
          isActive: false,
        },
        {
          title: "Nickname",
          description: "Need a nickname? Try this.",
          icon: faSignature,
          url: "/generators/nickname",
          isActive: false,
        },
        {
          title: "Writing Prompt",
          description: "Write your next big hit with this cool AI wrapper.",
          icon: faPenNib,
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
          description: "Generate a playlist based on your mood",
          icon: faCloudMusic,
          url: "/generators/mood-playlist",
          isActive: false,
        },
        {
          title: "Chord Progression",
          description: "Generate a chord progression from a key",
          icon: faMusicNote,
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
          description: "Get some motivation to start your day",
          icon: faBolt,
          url: "/generators/daily-motivation",
          isActive: false,
        },
        {
          title: "Random Roman Empire Fact",
          description: "Get a random fact about the Roman Empire!",
          icon: faSword,
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
          description: "Calculate an age from DOB",
          icon: faInputNumeric,
          url: "/generators/age-calculator",
          isActive: false,
        },
        {
          title: "Random Number",
          description: "Generate a random number",
          icon: fa7,
          url: "/generators/random-number",
          isActive: false,
        },
        {
          title: "Password",
          icon: faKey,
          description: "Generate a password (random string let's be real.",
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
          title: "Bit visualizer",
          url: "/generators/bit-visualizer",
          isActive: false,
          icon: faBinary,
        },
      ],
    },
  ],
};
