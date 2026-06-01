import React, { useEffect, useState } from 'react';
import { Coffee, Download } from 'lucide-react';
import { onInstallAvailabilityChange, triggerInstall } from '../installPrompt';

export function InstallCafeAppButton() {
  const [canInstall, setCanInstall] = useState(false);
  const [installing, setInstalling] = useState(false);

  useEffect(() => {
    // Only allow installation prompt on leevaakkicafe domain (or localhost for development)
    const hostname = window.location.hostname;
    const isAllowedDomain = 
      hostname.includes('leevaakkicafe') || 
      hostname.includes('localhost') || 
      hostname.includes('127.0.0.1');

    if (!isAllowedDomain) {
      setCanInstall(false);
      return;
    }

    // Register availability listener and handle cleanup
    const unsubscribe = onInstallAvailabilityChange(setCanInstall);
    return () => unsubscribe();
  }, []);

  if (!canInstall) return null;

  const handleClick = async () => {
    setInstalling(true);
    try {
      const accepted = await triggerInstall();
      console.log('[PWA] Install prompt outcome:', accepted ? 'Accepted' : 'Dismissed');
    } catch (err) {
      console.error('[PWA] Failed to trigger install:', err);
    } finally {
      setInstalling(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={installing}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-[#6F4E37] hover:bg-[#5C3E2B] active:scale-95 transition-all duration-200 px-5 py-3 text-sm font-semibold text-white shadow-xl hover:shadow-2xl cursor-pointer"
    >
      <Coffee className="w-5 h-5 animate-pulse" />
      <span>Install Cafe App</span>
      {installing ? (
        <span className="text-xs opacity-75">...</span>
      ) : (
        <Download className="w-4 h-4" />
      )}
    </button>
  );
}
