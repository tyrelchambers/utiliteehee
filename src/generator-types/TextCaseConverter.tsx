"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toSarcasticCase, toTitleCase } from "@/utils/caseConverter";
import { copy } from "@/utils/copy";
import { generateSkibidiIpsum } from "@/utils/skibidiIpsum";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  text: z.string().min(1, {
    message: "Text is required",
  }),
  case: z.any(),
});

const CASE = {
  LOWERCASE: "lowercase",
  UPPERCASE: "UPPERCASE",
  SARCASTIC: "sArCaStIc",
  TITLECASE: "Title Case",
};

const TextCaseConverter = () => {
  const [output, setOutput] = useState("");
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: generateSkibidiIpsum(1)[0],
      case: CASE.LOWERCASE,
    },
  });

  const convert = (data: z.infer<typeof formSchema>) => {
    switch (data.case) {
      case CASE.LOWERCASE:
        setOutput(data.text.toLowerCase());
        break;
      case CASE.UPPERCASE:
        setOutput(data.text.toUpperCase());
        break;
      case CASE.SARCASTIC:
        setOutput(toSarcasticCase(data.text));
        break;
      case CASE.TITLECASE:
        setOutput(toTitleCase(data.text));
        break;
    }
  };

  function resetForm() {
    form.reset({
      text: "",
      case: CASE.LOWERCASE,
    });
    setOutput("");
  }

  return (
    <section className="section max-w-screen-lg">
      <h1 className="h1 mb-10">Text Case Converter</h1>
      <Form {...form}>
        <form
          className="w-full flex flex-col gap-6 border border-border p-6 rounded-xl"
          onSubmit={form.handleSubmit(convert)}
        >
          <FormField
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Input text</FormLabel>
                <Textarea rows={7} {...field} />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="case"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Case</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a case" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.entries(CASE).map(([key, value]) => (
                      <SelectItem key={key} value={value}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <div className="flex flex-col">
            <p className="font-medium text-sm mb-3">Output</p>
            <p className="whitespace-pre-wrap text-sm p-4 bg-muted/50 rounded-xl">
              {output}
            </p>
          </div>

          <footer className="flex justify-between">
            <Button variant="outline" type="button" onClick={resetForm}>
              Clear
            </Button>
            <div className="flex gap-3">
              <Button
                variant="secondary"
                type="button"
                onClick={() => copy(output)}
              >
                Copy
              </Button>
              <Button>Convert</Button>
            </div>
          </footer>
        </form>
      </Form>
    </section>
  );
};

export default TextCaseConverter;
