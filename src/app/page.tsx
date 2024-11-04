import { getDailyMotivation } from "@/actions/chats";

export default async function Home() {
  const motivation = await getDailyMotivation();

  return (
    <div>
      <h1 className="text-4xl font-bold mb-10">Welcome to Utiliteehee</h1>
      <div className="bg-muted/50 p-6 rounded-lg">
        <p className="text-xl font-medium">Motivation for the day</p>
        <p className="text-xl leading-relaxed text-muted-foreground max-w-4xl font-light">
          {motivation}
        </p>
      </div>
    </div>
  );
}
