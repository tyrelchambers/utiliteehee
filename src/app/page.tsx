import StyledIcon from "@/components/StyledIcon";
import { buttonVariants } from "@/components/ui/button";
import UtiliteeList from "@/components/UtiliteeList";
import YourFavourites from "@/components/YourFavourites";
import { faMessageDots } from "@fortawesome/pro-solid-svg-icons";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
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
          Free Range. All Natural. Vegan. Non-GMO Utilitees.
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
      <section className="h-20 max-w-screen-2xl mx-auto w-full">
        <YourFavourites />
      </section>
      <UtiliteeList searchParams={query} />
    </section>
  );
}
