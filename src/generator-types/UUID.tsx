import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Create from "@/components/uuid/Create";
import Validate from "@/components/uuid/Validate";
import GeneratorWrapper from "@/layouts/GeneratorWrapper";

const fav = {
  name: "uuid",
  label: "UUID Generator",
};

const UUID = () => {
  return (
    <GeneratorWrapper
      title="UUID Generator"
      description="Generate and validate UUIDs"
      favourite={fav}
    >
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
    </GeneratorWrapper>
  );
};

export default UUID;
