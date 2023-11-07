import { type Metadata } from "next";
import { Separator } from "~/components/ui/separator";

export const metadata: Metadata = {
  title: "Ustawienia",
};

const Settings = () => {
  return (
    <div className="hidden pb-16 md:block">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Ustawienia</h2>
        <p className="text-muted-foreground">
          Zarządzaj ustawieniami swojego konta.
        </p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-1 flex-col lg:max-w-2xl lg:flex-row">
        <p>ss</p>
      </div>
    </div>
  );
};
export default Settings;
