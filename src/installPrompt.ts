let deferredPrompt: any = null;
const listeners: ((available: boolean) => void)[] = [];

export function initInstallPromptListener() {
  if (typeof window === 'undefined') return;

  window.addEventListener('beforeinstallprompt', (e: any) => {
    e.preventDefault(); // stop the default mini-infobar
    deferredPrompt = e;
    listeners.forEach(fn => fn(true));
  });

  window.addEventListener('appinstalled', () => {
    deferredPrompt = null;
    listeners.forEach(fn => fn(false));
  });
}

export function onInstallAvailabilityChange(cb: (available: boolean) => void) {
  listeners.push(cb);
  // Emit current state immediately
  cb(deferredPrompt !== null);
  
  return () => {
    const idx = listeners.indexOf(cb);
    if (idx !== -1) {
      listeners.splice(idx, 1);
    }
  };
}

export async function triggerInstall() {
  if (!deferredPrompt) return false;
  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;
  deferredPrompt = null;
  listeners.forEach(fn => fn(false));
  return outcome === 'accepted';
}
