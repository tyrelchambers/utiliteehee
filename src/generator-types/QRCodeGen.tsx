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
import React from "react";
import QRCode from "qrcode";
import Image from "next/image";

const QRCodeGen = () => {
  const [generatedQrCode, setGeneratedQrCode] = React.useState("");
  const [qrText, setQrText] = React.useState("");
  const makeQRCode = async (text: string, width?: number) => {
    const qrCode = await QRCode.toDataURL(text, {
      errorCorrectionLevel: "M",
      width: width ?? 200,
    });
    setGeneratedQrCode(qrCode);
  };
  return (
    <div className="section centered">
      <h1 className="h1 mb-6">QR Code</h1>

      <div className="rounded-xl border border-border p-3 w-full flex flex-col gap-3 max-w-xl mx-auto">
        <div className="flex flex-col gap-3">
          <Label>Text</Label>
          <Input
            type="text"
            className="font-mono"
            placeholder="https://example.com or text"
            value={qrText}
            onChange={(e) => setQrText(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-3">
          <Label>Size</Label>
          <Select defaultValue="small">
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

        {generatedQrCode && (
          <div className="mx-auto">
            <Image src={generatedQrCode} alt="" width={200} height={200} />
          </div>
        )}

        <Button onClick={() => makeQRCode(qrText)}>Generate QR code</Button>
      </div>
    </div>
  );
};

export default QRCodeGen;
