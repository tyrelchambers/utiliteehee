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

const formSchema = z.object({
  text: z.string().min(1, {
    message: "Text is required",
  }),
  width: z.number().optional(),
});

const QRCodeGen = () => {
  const [generatedQrCode, setGeneratedQrCode] = React.useState("");
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
      width: 200,
    },
  });

  const makeQRCode = async (data: z.infer<typeof formSchema>) => {
    const { text, width } = data;
    const qrCode = await QRCode.toDataURL(text, {
      errorCorrectionLevel: "M",
      width: width ?? 200,
    });
    setGeneratedQrCode(qrCode);
  };

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

          <Button>Generate QR code</Button>
        </form>
      </Form>
    </div>
  );
};

export default QRCodeGen;
