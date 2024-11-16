"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useCallback, useEffect, useRef } from "react";
import QRCode from "qrcode";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import IconSearchModal from "@/components/qr-code/IconSearchModal";
import * as icons from "lucide-static";
import { default as NextImage } from "next/image";

const formSchema = z.object({
  text: z.string().min(1, {
    message: "Text is required",
  }),
  width: z.number(),
  errorLevel: z.any(),
});

const widths = {
  small: 200,
  medium: 300,
  large: 400,
};
const errorLevels = {
  L: "L",
  M: "M",
  Q: "Q",
  H: "H",
};

const QRCodeGen = () => {
  const newQrCode = useCallback(
    async (
      text: string,
      errorLevel: keyof typeof errorLevels,
      width: number
    ) => {
      const qrCode = await QRCode.toCanvas(text, {
        errorCorrectionLevel: errorLevel ?? "M",
        width: width ?? 200,
      });

      const canvas = document.querySelector(
        "#qr-code"
      ) as HTMLCanvasElement | null;

      if (!canvas) return;
      const ctx = canvas.getContext("2d");

      if (!ctx) return;

      canvas.width = qrCode.width;
      canvas.height = qrCode.height;
      ctx?.drawImage(qrCode, 0, 0);
      const lucideIcon = icons[form.getValues("icon") as keyof typeof icons];

      if (lucideIcon) {
        const image = new Image();
        image.src = `data:image/svg+xml;base64,${window.btoa(lucideIcon)}`;

        const iconW = (30 * width) / widths.small;
        const iconH = (30 * width) / widths.small;
        const offsetX = canvas.width / 2 - iconW / 2;
        const offsetY = canvas.height / 2 - iconH / 2;
        image.onload = () => {
          ctx?.drawImage(image, offsetX, offsetY, iconW, iconH);
        };

        const iconBgScale = (25 * width) / widths.small;

        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(
          canvas.width / 2,
          canvas.height / 2,
          iconBgScale,
          0,
          2 * Math.PI
        );
        ctx.fillStyle = "white";
        ctx.fill();
      }

      canvasRef.current = canvas;
    },
    []
  );

  const [iconSearchQuery, setIconSearchQuery] = React.useState("");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
      width: 200,
      icon: "",
      errorLevel: errorLevels.M,
    },
  });

  useEffect(() => {
    return () => {
      if (canvasRef.current) {
        URL.revokeObjectURL(canvasRef.current.toDataURL());
      }
    };
  }, []);

  const makeQRCode = async (data: z.infer<typeof formSchema>) => {
    if (typeof window === "undefined") return;

    const { text, width, errorLevel } = data;

    await newQrCode(text, errorLevel, width);
  };

  const updateWidth = (widthStr: string) => {
    form.setValue("width", widths[widthStr as keyof typeof widths]);
  };

  const updateIcon = (iconName: string) => {
    form.setValue("icon", iconName);
  };

  function downloadQrCode() {
    if (canvasRef.current) {
      const link = document.createElement("a");
      link.download = "qrcode.png";
      link.href = canvasRef.current.toDataURL();
      link.click();
      link.remove();
    }
  }

  function updateErrorCorrection(e: string) {
    form.setValue("errorLevel", e as keyof typeof errorLevels);
  }

  return (
    <div className="section">
      <h1 className="h1 mb-6">QR Code</h1>
      <Form {...form}>
        <form
          className="rounded-xl border border-border p-3 w-full flex flex-col gap-3 max-w-xl bg-muted/20"
          onSubmit={form.handleSubmit(makeQRCode, console.log)}
        >
          <FormField
            name="text"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Text</FormLabel>
                <Input
                  className="font-mono"
                  placeholder="https://example.com or text"
                  {...field}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col gap-3">
            <Label>Size</Label>
            <Select defaultValue="small" onValueChange={updateWidth}>
              <SelectTrigger>
                <SelectValue placeholder="Select a size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Small</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="large">Large</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <FormField
            name="errorLevel"
            render={() => (
              <FormItem>
                <FormLabel>Error Correction Level</FormLabel>
                <Select
                  defaultValue={errorLevels.M}
                  onValueChange={updateErrorCorrection}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select an error correction level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={errorLevels.L}>Low (~7%)</SelectItem>
                    <SelectItem value={errorLevels.M}>Medium (~15%)</SelectItem>
                    <SelectItem value={errorLevels.Q}>
                      Quartile (~25%)
                    </SelectItem>
                    <SelectItem value={errorLevels.H}>High (~30%)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* TODO: maybe implement custom SVGs */}
          {/* <FormField
            name="file"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Icon</FormLabel>
                <FormDescription>
                  Max width of {form.watch("width") / 5}px
                </FormDescription>
                <Input {...field} type="file" />
              </FormItem>
            )}
          /> */}

          <IconSearchModal
            iconSearchQuery={iconSearchQuery}
            setIconSearchQuery={setIconSearchQuery}
            updateIcon={updateIcon}
          />

          {form.watch("icon") && (
            <div className="flex border border-border px-3 py-1 items-center justify-between rounded-lg">
              <p className="text-xs font-medium">Selected icon</p>
              <div className="flex gap-2">
                <NextImage
                  src={`data:image/svg+xml;base64,${window.btoa(
                    icons[form.watch("icon") as keyof typeof icons]
                  )}`}
                  alt=""
                  width={30}
                  height={30}
                />
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => form.setValue("icon", "")}
                >
                  Remove
                </Button>
              </div>
            </div>
          )}

          <div className="mx-auto">
            <canvas id="qr-code" width={0} height={0}></canvas>
          </div>

          {form.watch("icon") && (
            <div className="bg-slate-500/10 p-2 rounded-md">
              <p className="text-slate-500 text-sm">
                Make sure to check your QR code before downloading to make sure
                it works. The text size, size, error correction level all play a
                part in readability when an icon is present.
              </p>
            </div>
          )}
          <footer className="flex justify-between items-center">
            {canvasRef.current && (
              <Button variant="secondary" onClick={downloadQrCode}>
                Download as PNG
              </Button>
            )}
            <Button>
              {canvasRef.current ? "Regenerate" : "Generate"} QR code
            </Button>
          </footer>
        </form>
      </Form>
    </div>
  );
};

export default QRCodeGen;
