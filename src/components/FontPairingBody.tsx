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
import { Button } from "./ui/button";

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

const getPopularFonts = async (): Promise<Record<string, any>[]> => {
  const resp = await fetch(
    `https://www.googleapis.com/webfonts/v1/webfonts?sort=popularity&key=AIzaSyDowpwb2Kg_riAn97y7Rcg9LqmxFSEr1SI`,
    {
      method: "GET",
    }
  ).then((res) => res.json());

  return resp.items.slice(0, 10);
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
  const [popularFonts, SetPopularFonts] = useState<Record<string, any>[]>([]);

  const headingFontWeights = useMemo(() => {
    return Array.from(fontWeights(findFont(headingFont.name)?.variants).keys());
  }, [headingFont.name]);

  const paragraphFontWeights = useMemo(() => {
    return Array.from(
      fontWeights(findFont(paragraphFont.name)?.variants).keys()
    );
  }, [paragraphFont.name]);

  useEffect(() => {
    if (headingFont.name) {
      (async () => {
        // gets font byte code
        const f = await fetchFont(headingFont);

        setHeadingFont({
          ...headingFont,
          byteCode: f,
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
  }, [paragraphFont.name, paragraphFont.weight]);

  useEffect(() => {
    (async () => {
      const popularFonts = await getPopularFonts();

      SetPopularFonts(popularFonts);
    })();
  }, []);

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
          font-weight: ${paragraphFont.weight};
          font-style: ${paragraphFont.italic ? "italic" : "normal"};
        }
      `}</style>
      <div className="flex flex-col gap-8">
        <section className="border border-border p-4 rounded-xl bg-muted/30 h-fit">
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
                      value={headingFont.weight}
                      placeholder="Font weight"
                      data={headingFontWeights}
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

            <div className="flex flex-col gap-6 w-full">
              {" "}
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
              {paragraphFont.name && (
                <>
                  <div className="flex flex-col gap-2 w-full">
                    <Label>Weight</Label>
                    <FontStyle
                      value={paragraphFont.weight}
                      placeholder="Font weight"
                      data={paragraphFontWeights}
                      onChange={(e) =>
                        setParagraphFont({
                          ...paragraphFont,
                          weight: e,
                        })
                      }
                    />
                  </div>
                  <div className="flex gap-2 w-full">
                    <Switch
                      checked={paragraphFont.italic}
                      onCheckedChange={(e) =>
                        setParagraphFont({ ...paragraphFont, italic: e })
                      }
                    />{" "}
                    Italic
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

        <div>
          <h3 className="h3 mb-4">Try out some popular Google fonts</h3>

          <div className=" border border-border rounded-lg p-4 mb-6">
            <p className="font-medium mb-4">Heading</p>
            <div className="flex gap-3 flex-wrap">
              {popularFonts.map((f) => (
                <Button
                  variant="secondary"
                  onClick={() =>
                    setHeadingFont({
                      ...headingFont,
                      name: f.family,
                    })
                  }
                >
                  {f.family}
                </Button>
              ))}
            </div>
          </div>

          <div className=" border border-border rounded-lg p-4">
            <p className="font-medium mb-4">Paragraph</p>
            <div className="flex gap-3 flex-wrap">
              {popularFonts.map((f) => (
                <Button
                  variant="secondary"
                  onClick={() =>
                    setParagraphFont({
                      ...paragraphFont,
                      name: f.family,
                    })
                  }
                >
                  {f.family}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <FontPairingPreview text={skibidiIpsum} />
    </div>
  );
};

export default FontPairingBody;
