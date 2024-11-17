"use client";
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  interests: z.string().optional(),
  style: z.string().optional(),
  tone: z.string().optional(),
  era: z.string().optional(),
  themes: z.string().optional(),
  writingStyle: z.string().optional(),
});

const WritingPrompt = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      interests: [],
      style: "",
      tone: "",
      era: "",
      themes: "",
      writingStyle: "",
    },
  });

  return (
    <section className="section">
      <h1 className="h1">Writing Prompt</h1>
      <p className="text-muted-foreground mb-6">
        Use this tool to get a writing prompt. Hopefully it helps.
      </p>

      <Form {...form}>
        <form className="flex flex-col gap-4 bg-secondary p-4 rounded-xl max-w-screen-md border border-border">
          <FormField
            name="interests"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Interests</FormLabel>
                <FormDescription>
                  Comma separated list of interests to base the prompt around.
                </FormDescription>
                <Input {...field} placeholder="ex: books, movies, music" />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </section>
  );
};

export default WritingPrompt;
