import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, CreditCard, Truck, CheckCircle, ArrowRight, Play, Lock, UserCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const TradeAssurance = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 min-h-screen">
      
      {/* Hero Section */}
      <div className="bg-[#FFAA00] text-gray-900 overflow-hidden relative">
          <div className="container mx-auto px-4 py-16 md:py-24 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
             <div className="max-w-xl">
                 <div className="flex items-center gap-2 mb-4 bg-white/20 w-fit px-4 py-1 rounded-full backdrop-blur-sm">
                    <ShieldCheck size={20} className="text-gray-900" />
                    <span className="font-bold text-sm uppercase tracking-wider">FourYouM Trade Assurance</span>
                 </div>
                 <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">{t('trade.title')}</h1>
                 <p className="text-lg md:text-xl font-medium opacity-90 mb-8">{t('trade.subtitle')}</p>
                 <button className="bg-gray-900 text-white px-8 py-3 rounded-full font-bold flex items-center gap-3 hover:bg-gray-800 transition shadow-lg">
                    <Play size={18} fill="currentColor" /> {t('trade.hero_btn')}
                 </button>
             </div>
             
             <div className="relative">
                 <div className="absolute inset-0 bg-white/20 rounded-full blur-3xl transform scale-150"></div>
                 <ShieldCheck size={300} className="text-white relative z-10 opacity-90 drop-shadow-2xl" strokeWidth={0.8} />
             </div>
          </div>
          
          {/* Decorative Pattern */}
          <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
             <div className="absolute right-0 top-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl"></div>
             <div className="absolute left-0 bottom-0 w-64 h-64 bg-black rounded-full mix-blend-overlay filter blur-3xl"></div>
          </div>
      </div>

      {/* Main Benefits */}
      <div className="container mx-auto px-4 py-16 -mt-10 relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:transform hover:-translate-y-2 transition duration-300">
                  <div className="w-16 h-16 bg-yellow-50 text-yellow-600 rounded-2xl flex items-center justify-center mb-6">
                      <CreditCard size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{t('trade.benefit1')}</h3>
                  <p className="text-gray-500 leading-relaxed">{t('trade.benefit1_desc')}</p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:transform hover:-translate-y-2 transition duration-300">
                  <div className="w-16 h-16 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center mb-6">
                      <Truck size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{t('trade.benefit2')}</h3>
                  <p className="text-gray-500 leading-relaxed">{t('trade.benefit2_desc')}</p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:transform hover:-translate-y-2 transition duration-300">
                  <div className="w-16 h-16 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mb-6">
                      <CheckCircle size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{t('trade.benefit3')}</h3>
                  <p className="text-gray-500 leading-relaxed">{t('trade.benefit3_desc')}</p>
              </div>
          </div>
      </div>

      {/* Process Section */}
      <div className="py-16 bg-white border-t border-b border-gray-200">
          <div className="container mx-auto px-4">
              <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-16">{t('trade.process_title')}</h2>
              
              <div className="relative max-w-5xl mx-auto">
                  {/* Line for desktop */}
                  <div className="hidden md:block absolute top-12 left-0 w-full h-1 bg-gray-100">
                      <div className="absolute top-0 left-0 h-full bg-yellow-400 w-3/4"></div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 relative z-10">
                      <div className="flex flex-col items-center text-center">
                          <div className="w-24 h-24 bg-white border-4 border-yellow-400 rounded-full flex items-center justify-center text-gray-700 shadow-sm mb-6">
                              <UserCheck size={32} />
                          </div>
                          <h4 className="font-bold text-lg mb-2">{t('trade.step1')}</h4>
                          <p className="text-sm text-gray-500">{t('trade.step1_sub')}</p>
                      </div>

                      <div className="flex flex-col items-center text-center">
                          <div className="w-24 h-24 bg-white border-4 border-yellow-400 rounded-full flex items-center justify-center text-gray-700 shadow-sm mb-6">
                              <Lock size={32} />
                          </div>
                          <h4 className="font-bold text-lg mb-2">{t('trade.step2')}</h4>
                          <p className="text-sm text-gray-500">{t('trade.step2_sub')}</p>
                      </div>

                      <div className="flex flex-col items-center text-center">
                          <div className="w-24 h-24 bg-white border-4 border-yellow-400 rounded-full flex items-center justify-center text-gray-700 shadow-sm mb-6">
                              <Truck size={32} />
                          </div>
                          <h4 className="font-bold text-lg mb-2">{t('trade.step3')}</h4>
                          <p className="text-sm text-gray-500">{t('trade.step3_sub')}</p>
                      </div>

                      <div className="flex flex-col items-center text-center">
                          <div className="w-24 h-24 bg-white border-4 border-gray-200 rounded-full flex items-center justify-center text-gray-400 shadow-sm mb-6">
                              <ShieldCheck size={32} />
                          </div>
                          <h4 className="font-bold text-lg mb-2 text-gray-500">{t('trade.step4')}</h4>
                          <p className="text-sm text-gray-400">{t('trade.step4_sub')}</p>
                      </div>
                  </div>
              </div>
          </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-20 text-center">
          <div className="bg-gray-900 rounded-3xl p-10 md:p-16 relative overflow-hidden">
              <div className="relative z-10">
                  <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">{t('trade.cta_title')}</h2>
                  <button 
                    onClick={() => navigate('/shop')}
                    className="bg-[#FFAA00] text-gray-900 px-10 py-4 rounded-full font-bold hover:bg-[#FFD700] transition transform hover:scale-105 inline-flex items-center gap-3 shadow-xl"
                  >
                      {t('trade.cta_btn')} <ArrowRight size={20} className="rtl:rotate-180" />
                  </button>
              </div>
              {/* Background Shapes */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFAA00] opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600 opacity-20 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
          </div>
      </div>

    </div>
  );
};

export default TradeAssurance;