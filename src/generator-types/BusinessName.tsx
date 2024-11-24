"use client";
import { generateBusinessName } from "@/actions/chats";
import LightRay from "@/components/LightRay";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import GeneratorWrapper from "@/layouts/GeneratorWrapper";
import { copy } from "@/utils/copy";
import { zodResolver } from "@hookform/resolvers/zod";
import { Copy } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const fav = {
  name: "business-name",
  label: "Business Name",
};

const formSchema = z.object({
  query: z.string().optional(),
  sector: z.string().optional(),
});

const sectors = [
  "Arts & Crafts",
  "Beauty",
  "Education",
  "Home",
  "Luxury",
  "Fashion",
  "Jewelry",
  "Design",
  "Gaming",
  "Finance",
  "Cleaning",
  "Communication",
  "Health",
  "Food",
  "Kids",
  "Candles",
  "Events",
  "Clothing",
  "Garden",
  "Fitness",
];

const BusinessName = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [names, setNames] = useState<Record<string, string>[]>([]);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: "",
      sector: "",
    },
  });

  const submit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      const resp = await generateBusinessName(data.query, data.sector);
      setNames(JSON.parse(resp));
    } catch (error) {
      throw error;
    }

    setLoading(false);
  };

  return (
    <GeneratorWrapper
      title="Business Name Generator"
      description="Maybe we can jumpstart the creative process. But we all know naming things is the most difficult thng in life."
      badgeLabel="AI wrapper. Inconsistancies possible."
      favourite={fav}
    >
      <Form {...form}>
        <form
          className=" max-w-screen-xl flex flex-col mb-6"
          onSubmit={form.handleSubmit(submit)}
        >
          <FormField
            name="query"
            render={({ field }) => (
              <FormItem>
                <Input
                  {...field}
                  className="p-8 bg-secondary rounded-full border-border border text-2xl"
                  placeholder="ex: a software company focusing on beenie baby websites"
                />
              </FormItem>
            )}
          />
          <div className="flex gap-3 flex-wrap mt-6">
            {sectors.map((s) => (
              <Button
                key={s}
                variant="secondary"
                className="rounded-full border border-border font-mono"
                onClick={() => form.setValue("sector", s)}
              >
                {s}
              </Button>
            ))}
          </div>
        </form>
      </Form>

      {loading && (
        <div className="flex flex-col gap-6">
          <Skeleton className="h-20  w-full" />
          <Skeleton className="h-20  w-full" />
          <Skeleton className="h-20  w-full" />
        </div>
      )}

      {!loading && (
        <div className="flex flex-wrap gap-4">
          {names.map((n) => (
            <section
              className="bg-muted/30 p-4 rounded-xl mt-6 border border-border relative overflow-hidden"
              key={n.name}
            >
              <LightRay />
              <div className="flex items-center w-fit gap-4">
                <p className="font-faculty text-2xl">{n.name}</p>
                <Button
                  variant="outline"
                  size="icon"
                  type="button"
                  onClick={() => copy(n.name)}
                >
                  <Copy size={16} className="text-muted-foreground" />
                </Button>
              </div>
            </section>
          ))}
        </div>
      )}
    </GeneratorWrapper>
  );
};

export default BusinessName;
