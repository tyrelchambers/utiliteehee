"use client";
import dynamic from "next/dynamic";

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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import IconSearchModal from "@/components/qr-code/IconSearchModal";
import * as icons from "lucide-static";

const formSchema = z.object({
  text: z.string().min(1, {
    message: "Text is required",
  }),
  width: z.number().optional(),
});

const widths = {
  small: 200,
  medium: 300,
  large: 400,
};

const QRCodeGen = () => {
  const newQrCode = useCallback(async (text: string, width?: number) => {
    const qrCode = await QRCode.toCanvas(text, {
      errorCorrectionLevel: "M",
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

    const image = new Image();
    image.src = `data:image/svg+xml;base64,${window.btoa(lucideIcon)}`;

    const iconW = 30;
    const iconH = 30;
    const offsetX = canvas.width / 2 - iconW / 2;
    const offsetY = canvas.height / 2 - iconH / 2;
    image.onload = () => {
      ctx?.drawImage(image, offsetX, offsetY, iconW, iconH);
    };

    const iconBgScale = 25;

    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, iconBgScale, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();

    canvasRef.current = canvas;
  }, []);

  const [iconSearchQuery, setIconSearchQuery] = React.useState("");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
      width: 200,
      icon: "",
    },
  });

  const makeQRCode = async (data: z.infer<typeof formSchema>) => {
    if (typeof window === "undefined") return;

    const { text, width } = data;

    await newQrCode(text, width);
  };

  const updateWidth = (widthStr: string) => {
    form.setValue("width", widths[widthStr as keyof typeof widths]);
    newQrCode(form.getValues("text"), widths[widthStr as keyof typeof widths]);
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

  return (
    <div className="section centered">
      <h1 className="h1 mb-6">QR Code</h1>

      <Form {...form}>
        <form
          className="rounded-xl border border-border p-3 w-full flex flex-col gap-3 max-w-xl mx-auto"
          onSubmit={form.handleSubmit(makeQRCode)}
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
          />

          <IconSearchModal
            iconSearchQuery={iconSearchQuery}
            setIconSearchQuery={setIconSearchQuery}
            updateIcon={updateIcon}
          />
          <div className="mx-auto">
            <canvas id="qr-code" width={0} height={0}></canvas>
          </div>

          <footer className="flex justify-between items-center">
            {canvasRef.current && (
              <Button variant="secondary" onClick={downloadQrCode}>
                Download as PNG
              </Button>
            )}
            <Button>Generate QR code</Button>
          </footer>
        </form>
      </Form>
    </div>
  );
};

export default QRCodeGen;
