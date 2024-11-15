"use client";
import { data } from "@/index.routes";
import React, { useEffect, useState } from "react";
import StylisticWrapper from "./StylisticWrapper";
import StyledIcon from "./StyledIcon";

const UtiliteeList = ({
  searchParams,
}: {
  searchParams: { query: string };
}) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (searchParams.query) {
      setQuery(searchParams.query);
    }
  }, [searchParams.query]);

  return (
    <>
      <section className="section mx-auto max-w-screen-2xl my-20 bg-black/20 rounded-3xl p-10 border border-border shadow-xl search relative">
        <input
          type="search"
          placeholder="Search for a Utilitee"
          className="bg-transparent outline-none text-foreground placeholder:text-foreground/70 text-2xl w-full"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        />
      </section>
      <section className="flex flex-col gap-20 max-w-screen-2xl mx-auto">
        {data.navMain
          .filter((item) => {
            const parent = item.items.filter((i) =>
              i.title.toLowerCase().includes(query)
            );

            if (parent.length == 0) {
              return false;
            }
            return true;
          })
          .map((item) => (
            <div key={item.title} className="flex flex-col gap-2">
              <h2 className="text-6xl mb-4 text-foreground/50">{item.title}</h2>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-10">
                {item.items
                  .filter((i) => i.title.toLowerCase().includes(query))
                  .map((item) => (
                    <StylisticWrapper
                      key={item.title}
                      className="w-full max-w-screen-lg"
                      href={item.url}
                    >
                      {item?.icon && (
                        <StyledIcon
                          icon={item?.icon}
                          classNames={{ wrapper: "mb-6" }}
                        />
                      )}
                      <h3 className="text-muted-foreground">{item.title}</h3>
                      <p className="text-foreground/80 text-xl">
                        {item?.description}
                      </p>
                    </StylisticWrapper>
                  ))}
              </div>
            </div>
          ))}
      </section>
    </>
  );
};

export default UtiliteeList;
