import StyledIcon from "@/components/StyledIcon";
import StylisticWrapper from "@/components/StylisticWrapper";
import { buttonVariants } from "@/components/ui/button";
import UtiliteeList from "@/components/UtiliteeList";
import { data } from "@/index.routes";
import { faMessageDots } from "@fortawesome/pro-solid-svg-icons";

export default async function Home({
  searchParams,
}: {
  searchParams: { query: string };
}) {
  const query = await searchParams;
  return (
    <section className="overflow-hidden">
      <div className="orange-circle"></div>
      <header className="w-full flex items-center justify-center h-20 ">
        <p className="font-mono text-foreground">Utiliteehee</p>
      </header>
      <section className="max-w-screen-xl mx-auto w-full min-h-[700px] flex flex-col justify-center items-center">
        <h1 className="h1 text-6xl text-center mb-10">
          Here lies many a great Utilitees. Enjoy.
        </h1>
        <p className="text-foreground/70 text-2xl text-center leading-10 max-w-4xl font-light block">
          This project is a project of passion. Built on the mentality of just
          building things and releasing them to the world. Have fun with it and
          learn something along the way. I hope you enjoy your stay here.
          Godspeed, pumpkin.
        </p>
        <div className="items-center flex gap-10 mx-auto mt-20 border border-border p-4 rounded-3xl bg-black/20 shadow-xl">
          <StyledIcon
            icon={faMessageDots}
            classNames={{
              icon: "translate-y-1",
            }}
          />
          <h2 className="font-faculty text-xl ">
            Am I missing a fun Utilitee? Let me know.
          </h2>
          <a
            href="https://suggest.gg/imtyrelchambers"
            className={buttonVariants({ variant: "secondary" })}
          >
            Suggest a feature
          </a>
        </div>
      </section>
      <UtiliteeList searchParams={query} />
    </section>
  );
}
