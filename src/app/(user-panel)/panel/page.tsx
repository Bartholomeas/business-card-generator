import {
  Activity,
  Eye,
  Star,
  Users,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Bell
} from "lucide-react";
import { type Metadata } from "next";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/common/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/common/tabs";
import { Overview } from "~/components/panel/dashboard/overview";
import { RecentOpinions } from "~/components/panel/dashboard/recent-opinions";

export const metadata: Metadata = {
  title: "Panel główny | Kwirk",
};

const Dashboard = () => {
  return (
    <div className="flex-1 space-y-4 pt-6 md:p-8">
      <div className="flex flex-col gap-2 p-4 md:flex-row md:items-center md:justify-between">
        <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Panel główny</h2>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="size-4" />
          Ostatnia aktualizacja: 5 minut temu
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full space-y-4">
        <TabsList className="ml-4 justify-start">
          <TabsTrigger value="overview">Podgląd</TabsTrigger>
          <TabsTrigger value="analytics">Analityka</TabsTrigger>
          <TabsTrigger className="relative" value="notifications">
            <Bell className="absolute -right-1 -top-1 size-4 text-red-500" />
            Powiadomienia
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="w-full space-y-4">
          <div className="grid w-full gap-4 px-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="w-full">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Wyświetlenia</CardTitle>
                <Eye className="size-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="text-2xl font-bold">1,234</div>
                  <span className="ml-2 flex items-center text-sm text-green-600">
                    <ArrowUpRight className="size-4" />
                    +20.1%
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">vs. poprzedni miesiąc</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Unikalni użytkownicy</CardTitle>
                <Users className="size-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="text-2xl font-bold">892</div>
                  <span className="ml-2 flex items-center text-sm text-red-600">
                    <ArrowDownRight className="size-4" />
                    -5.2%
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">vs. poprzedni tydzień</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Średnia ocena</CardTitle>
                <Star className="size-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="text-2xl font-bold">4.9</div>
                  <span className="ml-2 flex items-center text-sm text-green-600">
                    <ArrowUpRight className="size-4" />
                    +0.3
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">1,500 opinii w sumie</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Zaangażowanie</CardTitle>
                <Activity className="size-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="text-2xl font-bold">02:45 min</div>
                  <span className="ml-2 flex items-center text-sm text-green-600">
                    <ArrowUpRight className="size-4" />
                    +12.3%
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">Średni czas na stronie</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Analityka odwiedzin</CardTitle>
                <CardDescription>
                  Trend odwiedzin w ostatnich 30 dniach
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <Overview />
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Ostatnia aktywność</CardTitle>
                <CardDescription>
                  18 nowych interakcji w tym tygodniu
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RecentOpinions />
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Popularne godziny</CardTitle>
                <CardDescription>Kiedy Twoja strona jest najczęściej odwiedzana</CardDescription>
              </CardHeader>
              <CardContent>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Źródła ruchu</CardTitle>
                <CardDescription>Skąd przychodzą Twoi odwiedzający</CardDescription>
              </CardHeader>
              <CardContent>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
