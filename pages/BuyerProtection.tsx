import React from 'react';
import { ShieldCheck, Lock, RefreshCcw, Truck, Headphones, CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const BuyerProtection = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-700 to-primary-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
             <ShieldCheck size={40} className="text-white" />
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4">{t('protection.title')}</h1>
          <p className="text-xl opacity-90">{t('protection.subtitle')}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-10 relative z-10">
        
        {/* Core Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 text-center hover:transform hover:-translate-y-1 transition duration-300">
             <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
               <Lock size={28} />
             </div>
             <h3 className="font-bold text-lg mb-2 text-gray-800">{t('protection.feature1_title')}</h3>
             <p className="text-gray-500 text-sm leading-relaxed">{t('protection.feature1_desc')}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 text-center hover:transform hover:-translate-y-1 transition duration-300">
             <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
               <RefreshCcw size={28} />
             </div>
             <h3 className="font-bold text-lg mb-2 text-gray-800">{t('protection.feature2_title')}</h3>
             <p className="text-gray-500 text-sm leading-relaxed">{t('protection.feature2_desc')}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 text-center hover:transform hover:-translate-y-1 transition duration-300">
             <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
               <Truck size={28} />
             </div>
             <h3 className="font-bold text-lg mb-2 text-gray-800">{t('protection.feature3_title')}</h3>
             <p className="text-gray-500 text-sm leading-relaxed">{t('protection.feature3_desc')}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 text-center hover:transform hover:-translate-y-1 transition duration-300">
             <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
               <Headphones size={28} />
             </div>
             <h3 className="font-bold text-lg mb-2 text-gray-800">{t('protection.feature4_title')}</h3>
             <p className="text-gray-500 text-sm leading-relaxed">{t('protection.feature4_desc')}</p>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-12 mb-12">
           <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-10">{t('protection.how_it_works')}</h2>
           
           <div className="relative">
             {/* Line Connector (Hidden on Mobile) */}
             <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-1/2 z-0"></div>

             <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
                <div className="text-center">
                    <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 border-4 border-white shadow-lg">1</div>
                    <h4 className="font-bold text-gray-800 mb-1">{t('protection.step1')}</h4>
                    <p className="text-xs text-gray-500">{t('protection.step1_desc')}</p>
                </div>
                <div className="text-center">
                    <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 border-4 border-white shadow-lg">2</div>
                    <h4 className="font-bold text-gray-800 mb-1">{t('protection.step2')}</h4>
                    <p className="text-xs text-gray-500">{t('protection.step2_desc')}</p>
                </div>
                <div className="text-center">
                    <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 border-4 border-white shadow-lg">3</div>
                    <h4 className="font-bold text-gray-800 mb-1">{t('protection.step3')}</h4>
                    <p className="text-xs text-gray-500">{t('protection.step3_desc')}</p>
                </div>
                <div className="text-center">
                    <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 border-4 border-white shadow-lg"><CheckCircle size={24}/></div>
                    <h4 className="font-bold text-gray-800 mb-1">{t('protection.step4')}</h4>
                    <p className="text-xs text-gray-500">{t('protection.step4_desc')}</p>
                </div>
             </div>
           </div>
        </div>

        {/* Coverage List */}
        <div className="bg-primary-50 rounded-2xl border border-primary-100 p-8">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">{t('protection.covered')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
                <div className="bg-white p-4 rounded-lg flex items-center gap-3 shadow-sm">
                    <CheckCircle className="text-green-500 shrink-0" />
                    <span className="font-medium text-gray-700">{t('protection.cover1')}</span>
                </div>
                <div className="bg-white p-4 rounded-lg flex items-center gap-3 shadow-sm">
                    <CheckCircle className="text-green-500 shrink-0" />
                    <span className="font-medium text-gray-700">{t('protection.cover2')}</span>
                </div>
                <div className="bg-white p-4 rounded-lg flex items-center gap-3 shadow-sm">
                    <CheckCircle className="text-green-500 shrink-0" />
                    <span className="font-medium text-gray-700">{t('protection.cover3')}</span>
                </div>
                <div className="bg-white p-4 rounded-lg flex items-center gap-3 shadow-sm">
                    <CheckCircle className="text-green-500 shrink-0" />
                    <span className="font-medium text-gray-700">{t('protection.cover4')}</span>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default BuyerProtection;