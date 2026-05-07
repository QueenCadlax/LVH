import React, { useState, useEffect } from 'react';
import { Download } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const PWAInstallButton: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showButton, setShowButton] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);

  useEffect(() => {
    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the mini-infobar from appearing
      e.preventDefault();
      // Store the event for later use
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Show the install button
      setShowButton(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Check if app is already installed
    const handleAppInstalled = () => {
      setShowButton(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    setIsInstalling(true);

    try {
      // Show the install prompt
      await deferredPrompt.prompt();

      // Wait for the user to respond to the prompt
      const { outcome } = await deferredPrompt.userChoice;

      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
        setShowButton(false);
      } else {
        console.log('User dismissed the install prompt');
      }

      // Clear the deferred prompt
      setDeferredPrompt(null);
    } catch (error) {
      console.error('Error installing app:', error);
    } finally {
      setIsInstalling(false);
    }
  };

  if (!showButton) {
    return null;
  }

  return (
    <button
      onClick={handleInstallClick}
      disabled={isInstalling}
      className="
        inline-flex items-center gap-2 px-6 py-3 
        bg-gradient-to-r from-yellow-500 to-yellow-600
        hover:from-yellow-600 hover:to-yellow-700
        disabled:from-yellow-400 disabled:to-yellow-500
        text-black font-semibold rounded-lg
        transition-all duration-300
        shadow-lg hover:shadow-xl
        border border-yellow-700/30
        transform hover:scale-105
        active:scale-95
      "
      title="Install LowveldHub app on your device"
    >
      <Download className="w-5 h-5" />
      {isInstalling ? 'Installing...' : 'Download App'}
    </button>
  );
};

export default PWAInstallButton;
