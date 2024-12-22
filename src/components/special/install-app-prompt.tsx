'use client';

import { useEffect, useState } from "react";

import { Download, Share2, Plus } from "lucide-react";

import { PushNotificationManager } from "~/providers/push-notifications-manager";
import { cn } from "~/utils";

import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from "../common";


interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}

export const InstallAppPrompt = () => {
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  useEffect(() => {
    setIsIOS(
      /iPad|iPhone|iPod/.test(navigator.userAgent) &&
      !(window as unknown as { MSStream?: unknown; }).MSStream
    );

    setIsStandalone(window.matchMedia('(display-mode: standalone)').matches);

    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;

      if (outcome === 'accepted') {
        setShowInstallPrompt(false);
      }
    } catch (error) {
      console.error('Error during installation:', error);
    }

    setDeferredPrompt(null);
  };

  if (isStandalone) {
    return null;
  }

  return (
    <Card className={cn(
      "fixed transition-all duration-300 ease-in-out",
      "bottom-4 right-4 w-80 shadow-lg",
      "z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    )}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Download className="size-5" />
          Install App
        </CardTitle>
        <CardDescription>
          Get the best experience by installing our app
        </CardDescription>
      </CardHeader>
      <CardContent>
        {showInstallPrompt && !isIOS && (
          <Button
            onClick={handleInstallClick}
            className="w-full"
            variant="outline"
          >
            <Download className="mr-2 size-4" />
            Install Now
          </Button>
        )}

        {isIOS && (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              To install on iOS:
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Share2 className="size-4" />
                1. Tap the share button
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Plus className="size-4" />
                2. Select "Add to Home Screen"
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export const PushNotifications = () => {
  return (
    <div className="fixed bottom-4 left-4 z-50">
      <PushNotificationManager />
    </div>
  );
};