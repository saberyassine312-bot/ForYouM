import React, { useState, useEffect } from 'react';
import { Download, X, Smartphone } from 'lucide-react';

const InstallAppBanner = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e);
      // Update UI notify the user they can install the PWA
      setIsVisible(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
      setIsVisible(false);
    } else {
      console.log('User dismissed the install prompt');
    }
    
    setDeferredPrompt(null);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] p-4 animate-fade-in-up">
      <div className="bg-gray-900 text-white rounded-xl shadow-2xl p-4 flex items-center justify-between max-w-md mx-auto border border-gray-700">
        <div className="flex items-center gap-3">
            <div className="bg-primary-600 p-2 rounded-lg">
                <Smartphone size={24} className="text-white" />
            </div>
            <div>
                <h3 className="font-bold text-sm">تطبيق FourYouM</h3>
                <p className="text-xs text-gray-400">تصفح أسرع وتجربة أفضل</p>
            </div>
        </div>
        <div className="flex items-center gap-3">
            <button 
                onClick={handleInstallClick}
                className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-bold text-sm transition flex items-center gap-2"
            >
                <Download size={16} /> تثبيت
            </button>
            <button 
                onClick={() => setIsVisible(false)}
                className="text-gray-400 hover:text-white transition"
            >
                <X size={20} />
            </button>
        </div>
      </div>
    </div>
  );
};

export default InstallAppBanner;