import React, { useState, useEffect } from 'react';
import { Download, Smartphone, Share, PlusSquare, CheckCircle, Zap, Bell, Shield } from 'lucide-react';

const MobileApp = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if device is iOS
    const isIosDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(isIosDevice);

    // Capture install prompt for Android/Desktop
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
        alert("التطبيق مثبت بالفعل أو أن جهازك لا يدعم التثبيت المباشر. يرجى اتباع التعليمات اليدوية.");
        return;
    }
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-primary-600 text-white overflow-hidden relative">
        <div className="container mx-auto px-4 pt-12 pb-24 md:pt-20 md:pb-32 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/2 text-center md:text-right">
              <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 inline-block">
                متاح الآن
              </span>
              <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
                تجربة تسوق أسرع<br />مع تطبيق FourYouM
              </h1>
              <p className="text-lg text-primary-100 mb-8 max-w-lg mx-auto md:mx-0">
                حمل التطبيق الآن واحصل على تجربة تصفح سلسة، إشعارات بالعروض الحصرية، وإمكانية تتبع طلباتك لحظة بلحظة.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                {!isIOS && (
                    <button 
                        onClick={handleInstallClick}
                        className="bg-white text-primary-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition flex items-center justify-center gap-3 shadow-lg"
                    >
                        <Download size={24} />
                        <div className="text-right">
                            <div className="text-xs font-normal">تثبيت مباشر</div>
                            <div className="text-lg leading-none">Android App</div>
                        </div>
                    </button>
                )}
                <button className="bg-gray-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-gray-800 transition flex items-center justify-center gap-3 shadow-lg">
                    <Smartphone size={24} />
                    <div className="text-right">
                        <div className="text-xs font-normal">متوفر أيضاً كـ</div>
                        <div className="text-lg leading-none">Web App</div>
                    </div>
                </button>
              </div>
            </div>
            
            <div className="w-full md:w-1/2 flex justify-center">
                <div className="relative w-64 h-[500px] bg-gray-900 rounded-[3rem] border-8 border-gray-800 shadow-2xl overflow-hidden">
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-2xl"></div>
                    <div className="w-full h-full bg-white flex flex-col items-center justify-center text-gray-800">
                        <img src="https://cdn-icons-png.flaticon.com/512/3081/3081559.png" alt="Logo" className="w-24 h-24 mb-4" />
                        <h3 className="font-bold text-xl">FourYouM</h3>
                        <p className="text-sm text-gray-500">Global Trade</p>
                        <button className="mt-8 bg-primary-600 text-white px-6 py-2 rounded-full text-sm font-bold">تسوق الآن</button>
                    </div>
                </div>
            </div>
          </div>
        </div>
        
        {/* Background Decorative Circles */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-900/20 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
      </div>

      {/* Features */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center hover:-translate-y-1 transition duration-300">
                <div className="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap size={32} />
                </div>
                <h3 className="font-bold text-xl mb-2">أسرع بـ 3 مرات</h3>
                <p className="text-gray-500">تصفح المنتجات بسرعة فائقة دون انتظار تحميل الصفحات.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center hover:-translate-y-1 transition duration-300">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Bell size={32} />
                </div>
                <h3 className="font-bold text-xl mb-2">تنبيهات فورية</h3>
                <p className="text-gray-500">كن أول من يعلم عن العروض والتخفيضات وحالة طلبك.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center hover:-translate-y-1 transition duration-300">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield size={32} />
                </div>
                <h3 className="font-bold text-xl mb-2">آمن ومحمي</h3>
                <p className="text-gray-500">بياناتك محمية وتجربة الدفع آمنة تماماً عبر التطبيق.</p>
            </div>
        </div>
      </div>

      {/* Installation Instructions */}
      <div className="bg-white py-16 border-t border-gray-100">
          <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">كيفية تثبيت التطبيق يدوياً</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
                  {/* Android / Chrome */}
                  <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
                      <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
                          <span className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm">1</span>
                          أندرويد (Chrome)
                      </h3>
                      <ul className="space-y-4">
                          <li className="flex items-start gap-3">
                              <CheckCircle className="text-green-500 shrink-0 mt-1" size={20} />
                              <span>افتح القائمة الجانبية (الثلاث نقاط) في المتصفح.</span>
                          </li>
                          <li className="flex items-start gap-3">
                              <CheckCircle className="text-green-500 shrink-0 mt-1" size={20} />
                              <span>اضغط على <strong>"تثبيت التطبيق"</strong> أو <strong>"الإضافة إلى الشاشة الرئيسية"</strong>.</span>
                          </li>
                          <li className="flex items-start gap-3">
                              <CheckCircle className="text-green-500 shrink-0 mt-1" size={20} />
                              <span>اضغط "تثبيت" في النافذة المنبثقة.</span>
                          </li>
                      </ul>
                  </div>

                  {/* iOS / Safari */}
                  <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
                      <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
                          <span className="w-8 h-8 bg-gray-800 text-white rounded-full flex items-center justify-center text-sm">2</span>
                          آيفون (Safari)
                      </h3>
                      <ul className="space-y-4">
                          <li className="flex items-start gap-3">
                              <Share className="text-blue-500 shrink-0 mt-1" size={20} />
                              <span>اضغط على زر <strong>"مشاركة"</strong> في أسفل المتصفح.</span>
                          </li>
                          <li className="flex items-start gap-3">
                              <PlusSquare className="text-gray-700 shrink-0 mt-1" size={20} />
                              <span>اختر <strong>"إضافة إلى الصفحة الرئيسية"</strong> (Add to Home Screen).</span>
                          </li>
                          <li className="flex items-start gap-3">
                              <span className="font-bold text-primary-600 shrink-0 mt-1">Add</span>
                              <span>اضغط على "إضافة" في الزاوية العلوية.</span>
                          </li>
                      </ul>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};

export default MobileApp;
