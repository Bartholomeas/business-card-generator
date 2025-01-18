import React from "react";

import { Bell, MessageSquare, Store, Users } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/common/card";
import { Separator } from "~/components/common/separator";
import { Switch } from "~/components/common/switch";
import { Label } from "~/components/form";

const SettingsNotificationsPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Ustawienia powiadomień</h3>
        <p className="text-sm text-muted-foreground">
          Dostosuj sposób otrzymywania powiadomień o aktywnościach w serwisie.
        </p>
      </div>
      <Separator />

      <div className="grid gap-6">
        {/* Email Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="size-5" />
              Powiadomienia email
            </CardTitle>
            <CardDescription>
              Zarządzaj powiadomieniami wysyłanymi na Twój adres email.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center justify-between space-x-4">
              <Label htmlFor="comments" className="flex flex-col space-y-1">
                <span>Komentarze</span>
                <span className="text-sm font-normal text-muted-foreground">
                  Otrzymuj powiadomienia o nowych komentarzach.
                </span>
              </Label>
              <Switch id="comments" defaultChecked />
            </div>
            <div className="flex items-center justify-between space-x-4">
              <Label htmlFor="mentions" className="flex flex-col space-y-1">
                <span>Wzmianki</span>
                <span className="text-sm font-normal text-muted-foreground">
                  Powiadomienia gdy ktoś Cię oznaczy (@wzmianka).
                </span>
              </Label>
              <Switch id="mentions" defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Company Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Store className="size-5" />
              Powiadomienia o firmie
            </CardTitle>
            <CardDescription>
              Powiadomienia związane z Twoją firmą.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center justify-between space-x-4">
              <Label htmlFor="reviews" className="flex flex-col space-y-1">
                <span>Nowe opinie</span>
                <span className="text-sm font-normal text-muted-foreground">
                  Powiadomienia o nowych opiniach.
                </span>
              </Label>
              <Switch id="reviews" defaultChecked />
            </div>
            <div className="flex items-center justify-between space-x-4">
              <Label htmlFor="messages" className="flex flex-col space-y-1">
                <span>Wiadomości</span>
                <span className="text-sm font-normal text-muted-foreground">
                  Powiadomienia o nowych wiadomościach.
                </span>
              </Label>
              <Switch id="messages" />
            </div>
          </CardContent>
        </Card>

        {/* Social Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="size-5" />
              Powiadomienia społecznościowe
            </CardTitle>
            <CardDescription>
              Powiadomienia o interakcjach społecznościowych.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center justify-between space-x-4">
              <Label htmlFor="followers" className="flex flex-col space-y-1">
                <span>Nowi obserwujący</span>
                <span className="text-sm font-normal text-muted-foreground">
                  Powiadomienia gdy ktoś zacznie Cię obserwować.
                </span>
              </Label>
              <Switch id="followers" />
            </div>
            <div className="flex items-center justify-between space-x-4">
              <Label htmlFor="likes" className="flex flex-col space-y-1">
                <span>Polubienia</span>
                <span className="text-sm font-normal text-muted-foreground">
                  Powiadomienia o polubieniach Twoich treści.
                </span>
              </Label>
              <Switch id="likes" defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Marketing Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="size-5" />
              Powiadomienia marketingowe
            </CardTitle>
            <CardDescription>
              Zarządzaj powiadomieniami marketingowymi i newsletterem.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center justify-between space-x-4">
              <Label htmlFor="newsletter" className="flex flex-col space-y-1">
                <span>Newsletter</span>
                <span className="text-sm font-normal text-muted-foreground">
                  Otrzymuj newsletter z nowościami i poradami.
                </span>
              </Label>
              <Switch id="newsletter" defaultChecked />
            </div>
            <div className="flex items-center justify-between space-x-4">
              <Label htmlFor="promotions" className="flex flex-col space-y-1">
                <span>Promocje</span>
                <span className="text-sm font-normal text-muted-foreground">
                  Informacje o promocjach i specjalnych ofertach.
                </span>
              </Label>
              <Switch id="promotions" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SettingsNotificationsPage;
