import React, { useState, useEffect } from 'react';
import { WifiOff, Download, Check } from 'lucide-react';

export const OfflineIndicator: React.FC = () => {
  const [isOnline, setIsOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    const handleBeforeInstall = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallBanner(true);
    };

    const handleAppInstalled = () => {
      setInstalled(true);
      setShowInstallBanner(false);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    if (choice.outcome === 'accepted') {
      setInstalled(true);
      setShowInstallBanner(false);
    }
  };

  return (
    <>
      {!isOnline && (
        <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2 rounded-xl bg-amber-500 text-slate-950 font-bold px-4 py-2 text-xs shadow-2xl animate-bounce">
          <WifiOff className="w-4 h-4" />
          <span>Offline Mode Active — Viewing cached menu & saved orders</span>
        </div>
      )}

      {showInstallBanner && !installed && (
        <div className="fixed bottom-20 left-4 z-40 bg-slate-900 border border-cyan-500/40 text-white p-3.5 rounded-2xl shadow-2xl flex items-center gap-3 text-xs max-w-sm backdrop-blur-md">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
            <Download className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <strong className="block text-slate-100">Install Samprix App</strong>
            <span className="text-[11px] text-slate-400">Add to home screen for offline ordering & fast booking</span>
          </div>
          <button
            onClick={handleInstallClick}
            className="px-3 py-1.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs"
          >
            Install
          </button>
        </div>
      )}
    </>
  );
};
