'use client';

import { useEffect, useState } from "react";

import { MobileIcon } from "@radix-ui/react-icons";
import { Download, Laptop, Wifi, Clock, Share2, Plus } from "lucide-react";

import { cn } from "~/utils";

import { Button, Card, CardContent, CardHeader, CardTitle, CardDescription } from "~/components/common";

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

const BENEFITS = [
  {
    icon: Download,
    text: "Szybka instalacja bez sklepu z aplikacjami"
  },
  {
    icon: Wifi,
    text: "Działa offline"
  },
  {
    icon: Clock,
    text: "Natychmiastowy dostęp z ekranu głównego"
  }
] as const;

interface InstallAppCardProps {
  variant?: 'default' | 'hero' | 'minimal';
  className?: string;
}

export const InstallAppCard = ({ variant = 'default', className }: InstallAppCardProps) => {
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

  const isHero = variant === 'hero';
  const isMinimal = variant === 'minimal';

  return (
    <Card className={cn(
      "overflow-hidden",
      isHero ? "border-primary bg-gradient-primary" : "bg-primary",
      "text-white shadow-xl",
      isMinimal && "border-none bg-transparent shadow-none",
      className
    )}>
      <div className="relative">
        {!isMinimal && (
          <div className="absolute inset-0 bg-gradient-overlay" />
        )}

        <div className="relative">
          <CardHeader className={cn(
            "space-y-2",
            isMinimal && "px-0"
          )}>
            <div className="flex items-center gap-3">
              <div className={cn(
                "aspect-square rounded-full p-2",
                !isMinimal && "bg-white-alpha-20"
              )}>
                {isHero ? (
                  <Laptop className="size-6 text-white" />
                ) : (
                  <MobileIcon className="size-6 text-white" />
                )}
              </div>
              <div className="space-y-1">
                <CardTitle className="text-white">
                  {isMinimal ? "Zainstaluj aplikację" : "Zainstaluj Kwirk na swoim urządzeniu"}
                </CardTitle>
                <CardDescription className="text-base text-white">
                  Uzyskaj natychmiastowy dostęp do swojej wizytówki
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className={cn(
            "grid gap-6",
            isHero ? "md:grid-cols-[1.5fr,1fr]" : "md:grid-cols-1",
            isMinimal && "px-0"
          )}>
            {!isMinimal && (
              <div className="space-y-4">
                {BENEFITS.map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-3">
                    <div className="aspect-square rounded-full bg-white-alpha-20 p-2">
                      <Icon className="size-4 text-white" />
                    </div>
                    <span className="text-sm text-white">{text}</span>
                  </div>
                ))}
              </div>
            )}

            <div className={cn(
              "flex items-center",
              isHero && "justify-center"
            )}>
              <div className={cn(
                "w-full space-y-4",
                isHero && "max-w-xs"
              )}>
                {!isIOS && deferredPrompt && (
                  <Button
                    onClick={handleInstallClick}
                    variant="secondary"
                    className={cn(
                      "group w-full bg-white font-semibold text-primary hover:bg-white-alpha-90",
                      !isMinimal && "py-6 text-lg"
                    )}
                  >
                    <Download className={cn(
                      "mr-2 size-5 transition-transform",
                      "group-hover:-translate-y-1"
                    )} />
                    Zainstaluj teraz
                  </Button>
                )}

                {isIOS && (
                  <div className="rounded-lg bg-white-alpha-20 p-6">
                    <p className="mb-4 font-medium text-white">
                      Aby zainstalować na iOS:
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-white">
                        <div className="aspect-square rounded-full bg-white-alpha-20 p-2">
                          <Share2 className="size-5 text-white" />
                        </div>
                        <span className="font-medium">1. Kliknij przycisk Udostępnij</span>
                      </div>
                      <div className="flex items-center gap-3 text-white">
                        <div className="aspect-square rounded-full bg-white-alpha-20 p-2">
                          <Plus className="size-5 text-white" />
                        </div>
                        <span className="font-medium">2. Wybierz "Dodaj do ekranu głównego"</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </div>
      </div>
    </Card>
  );
}; 