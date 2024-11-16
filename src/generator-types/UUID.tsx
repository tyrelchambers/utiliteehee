import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Create from "@/components/uuid/Create";
import Validate from "@/components/uuid/Validate";

const UUID = () => {
  return (
    <div className="section centered">
      <h1 className="h1">UUID Generator</h1>

      <section className="border-border border w-full p-4 rounded-xl max-w-lg mt-6 bg-muted/30">
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
