'use client';

import { useEffect, useState } from "react";

import { Download, Share2, Plus } from "lucide-react";

import { cn } from "~/utils";

import { Button } from "../../../common";

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

interface InstallCTAProps {
  variant?: 'primary' | 'footer';
  className?: string;
}

export const InstallCTA = ({ variant = 'primary', className }: InstallCTAProps) => {
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    setIsIOS(
      /iPad|iPhone|iPod/.test(navigator.userAgent) &&
      !(window as unknown as { MSStream?: unknown; }).MSStream
    );

    setIsStandalone(window.matchMedia('(display-mode: standalone)').matches);

    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setDeferredPrompt(e);
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
        setDeferredPrompt(null);
      }
    } catch (error) {
      console.error('Error during installation:', error);
    }
  };

  if (isStandalone) return null;

  const isFooter = variant === 'footer';

  return (
    <div className={cn(
      "flex items-center gap-4",
      isFooter && "flex-col items-stretch gap-4",
      className
    )}>
      {!isIOS && deferredPrompt && (
        <Button
          onClick={handleInstallClick}
          className={cn(
            "group w-full font-semibold",
            isFooter && "bg-primary text-white hover:bg-primary/90",
            variant === 'primary' && "min-w-[200px]"
          )}
        >
          <Download className={cn(
            "mr-2 size-5 transition-transform",
            "group-hover:-translate-y-1"
          )} />
          Zainstaluj aplikację
        </Button>
      )}

      {isIOS && (
        <div className={cn(
          "rounded-lg border border-primary/10 bg-primary/5 p-6",
          "flex flex-col gap-4"
        )}>
          <p className="text-lg font-medium text-primary">
            Zainstaluj na iOS:
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-muted-foreground">
              <div className="bg-primary/10 rounded-full p-2">
                <Share2 className="size-5 text-primary" />
              </div>
              <span className="font-medium">1. Kliknij przycisk Udostępnij</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <div className="bg-primary/10 rounded-full p-2">
                <Plus className="size-5 text-primary" />
              </div>
              <span className="font-medium">2. Wybierz "Dodaj do ekranu głównego"</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 