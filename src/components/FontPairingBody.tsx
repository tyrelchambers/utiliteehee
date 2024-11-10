"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Label } from "./ui/label";
import { Font } from "@/generator-types/FontPairing";
import FontSelector from "./FontSelector";
import localFont from "next/font/local";
import { generateSkibidiIpsum } from "@/utils/skibidiIpsum";
import Link from "next/link";
import FontStyle from "./FontStyle";
import { fontWeights } from "@/utils/fontWeights";
import { Switch } from "./ui/switch";
import FontPairingPreview from "./FontPairingPreview";

interface FetchFont {
  name: string;
  weight: string;
}

const fetchFont = async (font: FetchFont) => {
  const formattedName = font.name.replace(" ", "+");
  const resp = await fetch(
    `http://localhost:8080/?fontName=${formattedName}&weight=${
      font.weight || "regular"
    }`,
    {
      method: "GET",
    }
  )
    .then((res) => res.blob())
    .then((blob) => blob.arrayBuffer())
    .then((buffer) => Buffer.from(buffer).toString("base64"));
  return resp;
};

const skibidiIpsum = generateSkibidiIpsum(4);

const FontPairingBody = ({ fonts }: { fonts: Font["items"] }) => {
  const findFont = (name: string) => fonts.find((f) => f.family === name);

  const [headingFont, setHeadingFont] = useState({
    name: "",
    byteCode: "",
    weight: "",
    italic: false,
  });
  const [paragraphFont, setParagraphFont] = useState({
    name: "",
    byteCode: "",
    weight: "",
    italic: false,
  });

  const headingFontWeight = useMemo(() => {
    return Array.from(fontWeights(findFont(headingFont.name)?.variants).keys());
  }, [headingFont.name]);

  useEffect(() => {
    if (headingFont.name) {
      (async () => {
        // gets font byte code
        const f = await fetchFont(headingFont);
        console.log(
          Array.from(
            fontWeights(findFont(headingFont.name)?.variants).keys()
          )[0]
        );

        setHeadingFont({
          ...headingFont,
          byteCode: f,
          weight: Array.from(
            fontWeights(findFont(headingFont.name)?.variants).keys()
          )[0],
        });
      })();
    }
  }, [headingFont.name, headingFont.weight]);

  useEffect(() => {
    if (paragraphFont.name) {
      (async () => {
        const f = await fetchFont(paragraphFont);
        setParagraphFont({
          ...paragraphFont,
          byteCode: f,
        });
      })();
    }
  }, [paragraphFont.name]);

  return (
    <div className="grid-cols-[700px_1fr] grid gap-20">
      <style jsx global>{`
        @font-face {
          font-family: "HeadingFont";
          src: url("data:application/x-ttf;base64,${headingFont.byteCode}");
          font-variant-synthesis: individual, legacy;
        }

        @font-face {
          font-family: "ParagraphFont";
          src: url("data:application/x-ttf;base64,${paragraphFont.byteCode}");
          font-variant-synthesis: individual, legacy;
        }
        .preview-heading {
          font-family: "HeadingFont", "geistSans";
          font-weight: ${headingFont.weight};
          font-style: ${headingFont.italic ? "italic" : "normal"};
        }
        .preview-paragraph {
          font-family: "ParagraphFont", "geistSans";
        }
      `}</style>
      <section className="border border-border p-4 rounded-xl bg-muted/30">
        <header className="mb-6">
          <h2 className="h2 ">Fonts</h2>
          <p className="text-muted-foreground">
            This font pairing utiliteehee uses Google fonts to deliver you the
            best fonts in the universe.
          </p>
        </header>
        <div className="flex gap-4">
          <div className="flex flex-col w-full gap-6">
            <div className="flex flex-col gap-2 ">
              <Label>Heading font</Label>
              <FontSelector
                fonts={fonts}
                value={headingFont.name}
                setValue={(e) =>
                  setHeadingFont({
                    ...headingFont,
                    name: e,
                  })
                }
              />
            </div>
            {headingFont.name && (
              <>
                <div className="flex flex-col gap-2 w-full">
                  <Label>Weight</Label>
                  <FontStyle
                    value={headingFontWeight[0]}
                    placeholder="Font weight"
                    data={headingFontWeight}
                    onChange={(e) =>
                      setHeadingFont({
                        ...headingFont,
                        weight: e,
                      })
                    }
                  />
                </div>
                <div className="flex gap-2 w-full">
                  <Switch
                    checked={headingFont.italic}
                    onCheckedChange={(e) =>
                      setHeadingFont({ ...headingFont, italic: e })
                    }
                  />{" "}
                  Italic
                </div>
              </>
            )}
          </div>

          <div className="flex flex-col gap-2 w-full">
            <Label>Paragraph font</Label>
            <FontSelector
              fonts={fonts}
              value={paragraphFont.name}
              setValue={(e) =>
                setParagraphFont({
                  ...paragraphFont,
                  name: e,
                })
              }
            />
          </div>
        </div>
      </section>

      <FontPairingPreview text={skibidiIpsum} />
    </div>
  );
};

export default FontPairingBody;
