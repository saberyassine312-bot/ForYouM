import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, Users, Globe, ArrowRight, Quote, Star } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const SuccessStories = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  // Mock Stories Data
  const stories = [
    {
      id: 1,
      name: language === 'ar' ? 'أحمد التازي' : 'Ahmed Tazi',
      company: language === 'ar' ? 'تازى للإلكترونيات' : 'Tazi Electronics',
      image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
      category: language === 'ar' ? 'إلكترونيات' : 'Electronics',
      growth: '250%',
      quote: language === 'ar' 
        ? 'منذ انضمامي لـ FourYouM، ارتفعت مبيعاتي بنسبة 250%. المنصة سهلت علي الوصول لعملاء في مدن لم أكن أصل إليها من قبل.'
        : 'Since joining FourYouM, my sales have increased by 250%. The platform made it easy for me to reach customers in cities I never reached before.'
    },
    {
      id: 2,
      name: language === 'ar' ? 'ليلى العمراني' : 'Laila El Amrani',
      company: language === 'ar' ? 'أزياء ليلى' : 'Laila Fashion',
      image: 'https://images.unsplash.com/photo-1573496359-7047d23f0c96?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
      category: language === 'ar' ? 'ملابس' : 'Clothing',
      growth: '180%',
      quote: language === 'ar' 
        ? 'كنت أبيع محلياً فقط، والآن أصدر منتجاتي التقليدية للخارج بفضل الدعم اللوجستي وحماية المشتري التي توفرها المنصة.'
        : 'I used to sell locally only, and now I export my traditional products abroad thanks to the logistical support and buyer protection provided by the platform.'
    },
    {
      id: 3,
      name: language === 'ar' ? 'يوسف بنعلي' : 'Youssef Benali',
      company: language === 'ar' ? 'ديكورات بنعلي' : 'Benali Decor',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
      category: language === 'ar' ? 'أثاث ومنزل' : 'Home & Furniture',
      growth: '300%',
      quote: language === 'ar' 
        ? 'أدوات التحليل في لوحة التحكم ساعدتني على فهم السوق بشكل أفضل وتوفير المنتجات التي يبحث عنها العملاء بالضبط.'
        : 'The analytics tools in the dashboard helped me understand the market better and provide exactly the products customers are looking for.'
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="container mx-auto px-4 py-20 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">{t('stories.title')}</h1>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto mb-10 leading-relaxed">
            {t('stories.subtitle')}
          </p>
        </div>
        {/* Curved Divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
            <svg className="relative block w-full h-[50px] md:h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-gray-50"></path>
            </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-20">
        
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 -mt-20 relative z-20 mb-20">
            <div className="bg-white p-8 rounded-2xl shadow-xl text-center border-b-4 border-primary-600 transform hover:-translate-y-2 transition duration-300">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 text-primary-600">
                    <Users size={32} />
                </div>
                <h3 className="text-4xl font-extrabold text-gray-800 mb-2">5,000+</h3>
                <p className="text-gray-500 font-medium">{t('stories.stat_sellers')}</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-xl text-center border-b-4 border-green-500 transform hover:-translate-y-2 transition duration-300">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                    <TrendingUp size={32} />
                </div>
                <h3 className="text-4xl font-extrabold text-gray-800 mb-2">150%</h3>
                <p className="text-gray-500 font-medium">{t('stories.stat_growth')}</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-xl text-center border-b-4 border-blue-500 transform hover:-translate-y-2 transition duration-300">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
                    <Globe size={32} />
                </div>
                <h3 className="text-4xl font-extrabold text-gray-800 mb-2">20+</h3>
                <p className="text-gray-500 font-medium">{t('stories.stat_countries')}</p>
            </div>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stories.map(story => (
                <div key={story.id} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 border border-gray-100 flex flex-col">
                    <div className="h-48 overflow-hidden relative group">
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition z-10"></div>
                        <img src={story.image} alt={story.name} className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700" />
                        <span className="absolute bottom-3 right-3 z-20 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-800 shadow-sm">
                            {story.category}
                        </span>
                    </div>
                    
                    <div className="p-6 flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="font-bold text-lg text-gray-900">{story.name}</h3>
                                <p className="text-sm text-gray-500">{story.company}</p>
                            </div>
                            <div className="bg-green-50 text-green-700 px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
                                <TrendingUp size={12} /> {story.growth}
                            </div>
                        </div>
                        
                        <div className="relative mb-6 flex-1">
                            <Quote size={24} className="text-primary-200 absolute -top-2 -right-2 transform rotate-180" />
                            <p className="text-gray-600 italic text-sm leading-relaxed relative z-10 px-2">
                                "{story.quote}"
                            </p>
                        </div>

                        <div className="flex items-center text-yellow-400 gap-1 mb-4 text-xs">
                            <Star size={14} fill="currentColor" />
                            <Star size={14} fill="currentColor" />
                            <Star size={14} fill="currentColor" />
                            <Star size={14} fill="currentColor" />
                            <Star size={14} fill="currentColor" />
                        </div>

                        <button className="text-primary-600 text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all mt-auto self-start group">
                            {t('stories.read_more')} <ArrowRight size={16} className="rtl:rotate-180 group-hover:rtl:-translate-x-1 group-hover:ltr:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 bg-gray-900 rounded-3xl p-10 md:p-16 text-center text-white relative overflow-hidden">
            <div className="relative z-10 max-w-2xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('stories.cta_title')}</h2>
                <p className="text-gray-300 mb-8 text-lg">{t('stories.cta_desc')}</p>
                <button 
                    onClick={() => navigate('/sell')}
                    className="bg-primary-600 text-white px-10 py-4 rounded-full font-bold hover:bg-primary-700 transition transform hover:scale-105 shadow-lg shadow-primary-600/30"
                >
                    {t('stories.cta_btn')}
                </button>
            </div>
            {/* Background effects */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl"></div>
        </div>

      </div>
    </div>
  );
};

export default SuccessStories;