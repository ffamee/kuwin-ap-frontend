import { AccessPointOverview } from "@/types/ap-type";
import { Tabs, TabsList, TabsTrigger } from "@radix-ui/react-tabs";

export default function apTab(data: AccessPointOverview) {
  const [tab, setTab] = React.useState<string>("overview");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const handleChange = (value: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setTab(value);
    }, 1000);
  };
  return (
    <Tabs value={tab} onValueChange={handleChange}>
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="detail">Details</TabsTrigger>
      </TabsList>
      <div>{isL}</div>
    </Tabs>
  );
}
