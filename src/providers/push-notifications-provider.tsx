'use client';

import { createContext, useContext, useEffect, useState } from 'react';

import { useToast } from "~/components/common";

// Helper function to convert VAPID key to Uint8Array
function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

interface PushNotificationsContextType {
  isSupported: boolean;
  isSubscribed: boolean;
  subscription: PushSubscription | null;
  subscribe: () => Promise<void>;
  unsubscribe: () => Promise<void>;
}

const PushNotificationsContext = createContext<PushNotificationsContextType>({
  isSupported: false,
  isSubscribed: false,
  subscription: null,
  subscribe: async () => { },
  unsubscribe: async () => { },
});

export const PushNotificationsProvider = ({ children }: { children: React.ReactNode; }) => {
  const [isSupported, setIsSupported] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscription, setSubscription] = useState<PushSubscription | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const checkSupport = async () => {
      const supported = 'Notification' in window && 'serviceWorker' in navigator;
      setIsSupported(supported);

      if (supported) {
        const registration = await navigator.serviceWorker.ready;
        const existingSubscription = await registration.pushManager.getSubscription();

        if (existingSubscription) {
          setIsSubscribed(true);
          setSubscription(existingSubscription);
        }
      }
    };

    // eslint-disable-next-line no-void
    void checkSupport();
  }, []);

  const subscribe = async () => {
    try {
      const permission = await Notification.requestPermission();

      if (permission === 'granted') {
        const registration = await navigator.serviceWorker.ready;
        const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;

        if (!vapidPublicKey) {
          throw new Error('VAPID public key not configured');
        }

        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
        });

        setIsSubscribed(true);
        setSubscription(subscription);

        // Here you would typically send the subscription to your backend
        // await fetch('/api/push-subscription', {
        //   method: 'POST',
        //   body: JSON.stringify(subscription),
        // });

        toast({
          title: "Sukces",
          description: "Powiadomienia zostały włączone!",
        });
      }
    } catch (error) {
      console.error('Failed to subscribe:', error);
      toast({
        title: "Błąd",
        description: "Nie udało się włączyć powiadomień",
        variant: "destructive",
      });
    }
  };

  const unsubscribe = async () => {
    try {
      if (subscription) {
        await subscription.unsubscribe();
        setIsSubscribed(false);
        setSubscription(null);

        // Here you would typically remove the subscription from your backend
        // await fetch('/api/push-subscription', {
        //   method: 'DELETE',
        //   body: JSON.stringify(subscription),
        // });

        toast({
          title: "Sukces",
          description: "Powiadomienia zostały wyłączone",
        });
      }
    } catch (error) {
      console.error('Failed to unsubscribe:', error);
      toast({
        title: "Błąd",
        description: "Nie udało się wyłączyć powiadomień",
        variant: "destructive",
      });
    }
  };

  return (
    <PushNotificationsContext.Provider
      value={{
        isSupported,
        isSubscribed,
        subscription,
        subscribe,
        unsubscribe,
      }}
    >
      {children}
    </PushNotificationsContext.Provider>
  );
};

export const usePushNotifications = () => useContext(PushNotificationsContext); 