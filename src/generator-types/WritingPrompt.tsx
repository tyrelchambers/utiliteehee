"use client";
import { generateWritingPrompt } from "@/actions/chats";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import GeneratorWrapper from "@/layouts/GeneratorWrapper";
import { copy } from "@/utils/copy";
import { faSpinner } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from "@hookform/resolvers/zod";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const fav = {
  name: "writing-prompt",
  label: "Writing Prompt",
};

const formSchema = z.object({
  interests: z.string().optional(),
  style: z.string().optional(),
  tone: z.string().optional(),
  era: z.string().optional(),
  themes: z.string().optional(),
  writingStyle: z.string().optional(),
  constraints: z.string().optional(),
  additionalInfo: z.string().optional(),
});

const WritingPrompt = () => {
  const [loading, setLoading] = React.useState(false);
  const [prompt, setPrompt] = React.useState("");
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      interests: "",
      style: "",
      tone: "",
      era: "",
      themes: "",
      writingStyle: "",
      constraints: "",
      additionalInfo: "",
    },
  });

  const submit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);
    // @ts-expect-error idk
    const resp = await generateWritingPrompt(data);

    setPrompt(resp);
    setLoading(false);
  };

  return (
    <GeneratorWrapper
      title="Writing Prompt Generator"
      description="Use this tool to get a writing prompt. Hopefully it helps."
      favourite={fav}
      badgeLabel="AI wrapper. Yes, another one."
    >
      <section className="grid grid-cols-[760px_760px] gap-10">
        <div className="flex flex-col">
          <Alert className="mb-6">
            <QuestionMarkCircledIcon />
            <AlertTitle>Information</AlertTitle>
            <AlertDescription>
              Leave fields empty for a randomly generated prompt.
            </AlertDescription>
          </Alert>

          <Form {...form}>
            <form
              className="flex flex-col gap-4 bg-secondary p-4 rounded-xl border border-border"
              onSubmit={form.handleSubmit(submit)}
            >
              <FormField
                name="interests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Interests</FormLabel>
                    <FormDescription>
                      Comma separated list of interests to base the prompt
                      around.
                    </FormDescription>
                    <Input {...field} placeholder="ex: books, movies, music" />
                  </FormItem>
                )}
              />

              <FormField
                name="style"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Writing style</FormLabel>
                    <FormDescription>
                      Comma separated list of writing styles
                    </FormDescription>
                    <Input
                      {...field}
                      placeholder="ex: third person, serious, third person"
                    />
                  </FormItem>
                )}
              />

              <FormField
                name="tone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tone</FormLabel>
                    <FormDescription>
                      Comma separated list of tones
                    </FormDescription>
                    <Input {...field} placeholder="ex: serious, funny" />
                  </FormItem>
                )}
              />

              <FormField
                name="era"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Era</FormLabel>
                    <Input {...field} placeholder="ex: modern, medieval" />
                  </FormItem>
                )}
              />

              <FormField
                name="themes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Themes</FormLabel>
                    <FormDescription>
                      Comma separated list of themes
                    </FormDescription>
                    <Input {...field} placeholder="ex: love, friendship" />
                  </FormItem>
                )}
              />

              <FormField
                name="writingStyle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Writing style</FormLabel>
                    <FormDescription>
                      Comma separated list of writing styles
                    </FormDescription>
                    <Input
                      {...field}
                      placeholder="ex: fast-paced, atmospheric, introspective dialogue"
                    />
                  </FormItem>
                )}
              />

              <FormField
                name="constraints"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Constraints</FormLabel>
                    <FormDescription>
                      Comma separated list of constraints
                    </FormDescription>
                    <Input
                      {...field}
                      placeholder="ex: no grammatical errors, no profanity, must include a mystery"
                    />
                  </FormItem>
                )}
              />

              <FormField
                name="additionalInfo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Info</FormLabel>
                    <FormDescription>
                      Additional information to provide the prompt
                    </FormDescription>
                    <Textarea {...field} />
                  </FormItem>
                )}
              />
              <Button disabled={loading}>
                {loading && <FontAwesomeIcon icon={faSpinner} spin />} Generate
                Prompt
              </Button>
            </form>
          </Form>
        </div>

        <div className="p-4 rounded-xl bg-secondary">
          <header className="flex items-center justify-between">
            <p className="font-bold font-faculty">Your generated prompt</p>
            <Button onClick={() => copy(prompt)} size="sm">
              Copy
            </Button>
          </header>
          <Separator className="my-6" />

          <p className="whitespace-pre-wrap">{prompt}</p>
        </div>
      </section>
    </GeneratorWrapper>
  );
};

export default WritingPrompt;
