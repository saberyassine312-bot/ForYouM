import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Package, Truck, RefreshCcw, CreditCard, ShieldCheck, User, ChevronDown, ChevronUp, MessageCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const HelpCenter = () => {
  const { t, language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Helper to get translated category name (simulated for internal logic)
  const categories = [
    { id: 'orders', icon: <Package size={24} />, title: t('help.cat_orders') },
    { id: 'shipping', icon: <Truck size={24} />, title: t('help.cat_shipping') },
    { id: 'returns', icon: <RefreshCcw size={24} />, title: t('help.cat_returns') },
    { id: 'payment', icon: <CreditCard size={24} />, title: t('help.cat_payment') },
    { id: 'account', icon: <User size={24} />, title: t('help.cat_account') },
    { id: 'safety', icon: <ShieldCheck size={24} />, title: t('help.cat_safety') },
  ];

  // Mock FAQ Data (Multilingual simulation)
  const faqs = [
    {
      question: language === 'ar' ? 'كيف يمكنني تتبع طلبي؟' : 'How can I track my order?',
      answer: language === 'ar' ? 'يمكنك تتبع طلبك من خلال الذهاب إلى "حسابي" ثم "الطلبات". ستجد رقم التتبع وحالة الشحنة هناك.' : 'You can track your order by going to "My Account" then "Orders". You will find the tracking number and shipment status there.',
      category: 'orders'
    },
    {
      question: language === 'ar' ? 'ما هي طرق الدفع المتاحة؟' : 'What payment methods are available?',
      answer: language === 'ar' ? 'نقبل الدفع عند الاستلام، البطاقات البنكية، و PayPal.' : 'We accept Cash on Delivery, Credit Cards, and PayPal.',
      category: 'payment'
    },
    {
      question: language === 'ar' ? 'كيف يمكنني إرجاع منتج؟' : 'How can I return an item?',
      answer: language === 'ar' ? 'لديك 14 يوماً من تاريخ الاستلام لطلب الإرجاع. يرجى التواصل معنا عبر صفحة "اتصل بنا" أو تقديم شكوى لبدء الإجراءات.' : 'You have 14 days from receipt to request a return. Please contact us via the "Contact Us" page or submit a complaint to start the process.',
      category: 'returns'
    },
    {
      question: language === 'ar' ? 'هل الشحن متاح لجميع المدن؟' : 'Is shipping available to all cities?',
      answer: language === 'ar' ? 'نعم، نقوم بالشحن إلى كافة المدن والمناطق الرئيسية في الدولة.' : 'Yes, we ship to all major cities and regions in the country.',
      category: 'shipping'
    },
    {
      question: language === 'ar' ? 'كيف أغير كلمة المرور؟' : 'How do I change my password?',
      answer: language === 'ar' ? 'يمكنك تغيير كلمة المرور من إعدادات الحساب الشخصي.' : 'You can change your password from your personal account settings.',
      category: 'account'
    }
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory ? faq.category === activeCategory : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      
      {/* Hero Search Section */}
      <div className="bg-primary-600 py-16 px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{t('help.title')}</h1>
        <p className="text-primary-100 text-lg mb-8">{t('help.subtitle')}</p>
        
        <div className="max-w-2xl mx-auto relative">
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t('help.search_placeholder')}
            className="w-full py-4 px-6 pr-12 rounded-full shadow-lg outline-none text-gray-800 focus:ring-4 focus:ring-primary-400/50"
          />
          <Search className="absolute top-4 right-4 rtl:right-auto rtl:left-4 text-gray-400" />
        </div>
      </div>

      {/* Categories Grid */}
      <div className="container mx-auto px-4 -mt-10 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <button 
              key={cat.id}
              onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
              className={`bg-white p-6 rounded-xl shadow-md border flex flex-col items-center gap-3 transition hover:-translate-y-1 hover:shadow-lg ${activeCategory === cat.id ? 'border-primary-500 ring-2 ring-primary-200' : 'border-gray-100'}`}
            >
              <div className={`${activeCategory === cat.id ? 'text-primary-600' : 'text-gray-500'}`}>
                {cat.icon}
              </div>
              <span className={`font-bold text-sm text-center ${activeCategory === cat.id ? 'text-primary-800' : 'text-gray-700'}`}>{cat.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="container mx-auto px-4 mt-16 max-w-3xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <span className="w-1 h-8 bg-primary-600 rounded-full block"></span>
            {t('help.faq_title')}
        </h2>

        <div className="space-y-4">
          {filteredFaqs.length > 0 ? filteredFaqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
              <button 
                onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                className="w-full text-right rtl:text-right ltr:text-left p-5 flex justify-between items-center bg-white hover:bg-gray-50 transition"
              >
                <span className="font-bold text-gray-800">{faq.question}</span>
                {openFaqIndex === index ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
              </button>
              
              {openFaqIndex === index && (
                <div className="p-5 pt-0 text-gray-600 bg-gray-50/50 border-t border-gray-100 animate-fade-in">
                  {faq.answer}
                </div>
              )}
            </div>
          )) : (
            <div className="text-center py-10 text-gray-500">
                لا توجد نتائج تطابق بحثك.
            </div>
          )}
        </div>
      </div>

      {/* Contact Banner */}
      <div className="container mx-auto px-4 mt-16">
        <div className="bg-white border border-gray-200 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="text-center md:text-right rtl:md:text-right ltr:md:text-left">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{t('help.still_need_help')}</h3>
                <p className="text-gray-500">فريق الدعم لدينا متاح لمساعدتك في أي وقت.</p>
            </div>
            <Link to="/complaint" className="bg-primary-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-primary-700 transition flex items-center gap-2 shadow-lg shadow-primary-600/20">
                <MessageCircle size={20} />
                {t('help.contact_us')}
            </Link>
        </div>
      </div>

    </div>
  );
};

export default HelpCenter;