import BitVisualizer from "./BitVisualizer";
import BusinessName from "./BusinessName";
import CatchPhrase from "./CatchPhrase";
import ColourPalette from "./ColourPalette";
import Excuse from "./Excuse";
import FantasyName from "./FantasyName";
import FontPairing from "./FontPairing";
import GithubBattler from "./GithubBattler";
import LoremIpsom from "./LoremIpsom";
import MoodPlaylist from "./MoodPlaylist";
import Nickname from "./Nickname";
import QRCodeGen from "./QRCodeGen";
import RandomRomanFact from "./RandomRomanFact";
import SkibidiIpsum from "./SkibidiIpsum";
import TextCaseConverter from "./TextCaseConverter";
import UUID from "./UUID";
import WritingPrompt from "./WritingPrompt";

export type Generator =
  | "colour-palette"
  | "lorem-ipsum"
  | "skibidi-ipsum"
  | "uuid"
  | "font-pairing"
  | "qr-code"
  | "text-case-converter"
  | "fantasy-name"
  | "business-name"
  | "catchphrase"
  | "excuse"
  | "nickname"
  | "writing-prompt"
  | "mood-playlist"
  | "roman-empire-fact"
  | "bit-visualizer"
  | "github-battler";
export const getGenerator = (type: Generator) => {
  switch (type) {
    case "colour-palette":
      return ColourPalette;
    case "lorem-ipsum":
      return LoremIpsom;
    case "skibidi-ipsum":
      return SkibidiIpsum;
    case "uuid":
      return UUID;
    case "font-pairing":
      return FontPairing;
    case "qr-code":
      return QRCodeGen;
    case "text-case-converter":
      return TextCaseConverter;
    case "fantasy-name":
      return FantasyName;
    case "business-name":
      return BusinessName;
    case "catchphrase":
      return CatchPhrase;
    case "excuse":
      return Excuse;
    case "nickname":
      return Nickname;
    case "writing-prompt":
      return WritingPrompt;
    case "mood-playlist":
      return MoodPlaylist;
    case "roman-empire-fact":
      return RandomRomanFact;
    case "bit-visualizer":
      return BitVisualizer;
    case "github-battler":
      return GithubBattler;
    default:
      return () => null;
  }
};
