import { getDailyMotivation } from "@/actions/chats";
import FireGradient from "@/components/FireGradient";
import LightRay from "@/components/LightRay";
import StyledIcon from "@/components/StyledIcon";
import StylisticWrapper from "@/components/StylisticWrapper";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { data } from "@/index.routes";
import { faMessageDots } from "@fortawesome/pro-solid-svg-icons";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import { createPortal } from "react-dom";

export default async function Home() {
  const motivation = await getDailyMotivation();
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
        <p className="text-foreground/70 text-2xl text-center leading-10 max-w-4xl font-light">
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

      <section className="section mx-auto max-w-screen-2xl my-20 bg-black/20 rounded-3xl p-10 border border-border shadow-xl">
        <input
          type="search"
          placeholder="Search for a Utilitee"
          className="bg-transparent outline-none text-foreground placeholder:text-foreground/70 text-2xl w-full"
        />
      </section>
      <section className="flex flex-col gap-20 max-w-screen-2xl mx-auto">
        {data.navMain.map((item) => (
          <div key={item.title} className="flex flex-col gap-2">
            <h2 className="text-6xl mb-4 text-foreground/50">{item.title}</h2>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-10">
              {item.items.map((item) => (
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
    </section>
  );
}
