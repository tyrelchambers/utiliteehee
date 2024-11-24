import Heading from "@/components/Heading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Create from "@/components/uuid/Create";
import Validate from "@/components/uuid/Validate";

const fav = {
  name: "uuid",
  label: "UUID Generator",
};

const UUID = () => {
  return (
    <div className="section centered">
      <Heading module={fav}>
        <h1 className="h1 ">UUID Generator</h1>
      </Heading>

      <section className="section-body max-w-2xl">
        <Tabs className="w-full" defaultValue="create">
          <TabsList className="w-full">
            <TabsTrigger value="create" className="w-full">
              Generate
            </TabsTrigger>
            <TabsTrigger value="validate" className="w-full">
              Validate
            </TabsTrigger>
          </TabsList>
          <TabsContent value="create">
            <Create />
          </TabsContent>
          <TabsContent value="validate">
            <Validate />
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
};

export default UUID;
