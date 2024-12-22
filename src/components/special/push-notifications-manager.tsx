'use client';

import { Bell, BellOff } from "lucide-react";
import { usePushNotifications } from "~/providers/push-notifications-provider";
import { Button } from "../common";

export const PushNotificationsManager = () => {
  const { isSupported, isSubscribed, subscribe, unsubscribe } = usePushNotifications();

  if (!isSupported) return null;

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={isSubscribed ? unsubscribe : subscribe}
      className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      {isSubscribed ? (
        <BellOff className="size-5" />
      ) : (
        <Bell className="size-5" />
      )}
    </Button>
  );
}; 