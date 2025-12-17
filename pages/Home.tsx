import React, { useState, useMemo, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Smartphone, Watch, Shirt, Home as HomeIcon, Dumbbell, ShieldCheck, Truck, CreditCard, Headphones, Baby, Menu, ChevronRight, User, Heart, Utensils, BookOpen, Dog, Zap, ChevronDown, ChevronLeft } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { useLanguage } from '../context/LanguageContext';
import ProductCard from '../components/ProductCard';
import { Category } from '../types';
import { getCategoryTranslation } from '../utils/translations';

const Home = () => {
  const { products, userInterest } = useShop();
  const { t, language, direction } = useLanguage();
  const navigate = useNavigate();
  
  // Refs for scrolling
  const newArrivalsScrollRef = useRef<HTMLDivElement>(null);
  const recommendedScrollRef = useRef<HTMLDivElement>(null);

  // Sorting logic based on user interest
  const sortedRecommendations = useMemo(() => {
    // Clone products to avoid mutating original array
    const sorted = [...products];
    
    if (userInterest) {
        sorted.sort((a, b) => {
            if (a.category === userInterest && b.category !== userInterest) return -1;
            if (a.category !== userInterest && b.category === userInterest) return 1;
            return 0;
        });
    }
    return sorted;
  }, [products, userInterest]);

  // For recommendations, we show a larger set in the slider now
  const displayProducts = sortedRecommendations.slice(0, 18); 

  const newArrivals = products.slice(4, 12); 

  const categories = [
    { id: Category.CLOTHING_WOMEN, icon: <Watch size={20} /> }, 
    { id: Category.CLOTHING_MEN, icon: <Shirt size={20} /> },
    { id: Category.CLOTHING_KIDS, icon: <Baby size={20} /> },
    { id: Category.ELECTRONICS, icon: <Smartphone size={20} /> },
    { id: Category.SPORTS, icon: <Dumbbell size={20} /> },
    { id: Category.BEAUTY, icon: <Heart size={20} /> },
    { id: Category.HEALTH, icon: <Heart size={20} /> },
    { id: Category.HOME_APPLIANCES, icon: <Zap size={20} /> },
    { id: Category.HOME_FURNITURE, icon: <HomeIcon size={20} /> },
    { id: Category.PETS, icon: <Dog size={20} /> },
    { id: Category.FOOD, icon: <Utensils size={20} /> },
    { id: Category.BOOKS, icon: <BookOpen size={20} /> },
  ];

  const scroll = (ref: React.RefObject<HTMLDivElement>, scrollOffset: number) => {
    if (ref.current) {
        ref.current.scrollBy({
            left: direction === 'rtl' ? -scrollOffset : scrollOffset,
            behavior: 'smooth'
        });
    }
  };

  return (
    <div className="bg-gray-100 pb-12">
      
      {/* 1. Categories Horizontal Strip */}
      <div className="bg-white shadow-sm border-b border-gray-200 mb-6">
        <div className="container mx-auto px-4">
            <div className="flex items-center gap-6 overflow-x-auto no-scrollbar py-4">
               {/* 'All' Item */}
               <Link to="/shop" className="flex flex-col items-center gap-2 min-w-[80px] group cursor-pointer">
                   <div className="w-14 h-14 bg-primary-50 text-primary-600 rounded-full flex items-center justify-center group-hover:bg-primary-600 group-hover:text-white transition duration-300 shadow-sm border border-primary-100">
                       <Menu size={24} />
                   </div>
                   <span className="text-xs font-bold text-gray-700 group-hover:text-primary-600 whitespace-nowrap">{t('cat.all_categories')}</span>
               </Link>

               {/* Categories Items */}
               {categories.map(cat => (
                   <Link 
                    key={cat.id} 
                    to={`/shop?category=${cat.id}`}
                    className="flex flex-col items-center gap-2 min-w-[80px] group cursor-pointer"
                   >
                       <div className="w-14 h-14 bg-gray-50 text-gray-500 rounded-full flex items-center justify-center border border-gray-100 group-hover:border-primary-600 group-hover:text-primary-600 transition duration-300">
                           {cat.icon}
                       </div>
                       <span className="text-xs font-medium text-gray-600 group-hover:text-primary-600 whitespace-nowrap px-1 text-center">{getCategoryTranslation(cat.id, t)}</span>
                   </Link>
               ))}
            </div>
        </div>
      </div>

      {/* 2. Hero Section (Banner + User Card) */}
      <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-auto md:h-[400px]">
              
              {/* Center Banner */}
              <div className="col-span-12 lg:col-span-9 relative bg-gray-900 rounded-lg overflow-hidden shadow-sm h-[300px] md:h-full group">
                  <img 
                    src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                    alt="Industrial" 
                    className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8 text-white">
                      <span className="bg-primary-600 text-white text-xs font-bold px-2 py-1 rounded w-fit mb-2 uppercase">{t('home.hero.title')}</span>
                      <h2 className="text-2xl md:text-4xl font-bold mb-4">{t('home.hero.subtitle')}</h2>
                      <div className="flex gap-4">
                        <button onClick={() => navigate('/shop')} className="bg-white text-gray-900 px-6 py-2 rounded-full font-bold hover:bg-gray-100 transition text-sm">
                            {t('home.hero.btn')}
                        </button>
                      </div>
                  </div>
              </div>

              {/* Right User Card */}
              <div className="hidden lg:block lg:col-span-3 bg-white rounded-lg shadow-sm border border-gray-200 p-4 h-full flex flex-col">
                  {/* User Info */}
                  <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                          <User size={24} />
                      </div>
                      <div>
                          <div className="text-sm text-gray-500">{t('home.user.welcome')}</div>
                          <div className="font-bold text-gray-800 flex gap-2 mt-1">
                              <Link to="/admin" className="text-xs bg-primary-600 text-white px-3 py-1 rounded-full">{t('home.user.login')}</Link>
                              <Link to="/sell" className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full border border-gray-200">{t('footer.sell')}</Link>
                          </div>
                      </div>
                  </div>

                  {/* Actions */}
                  <div className="bg-orange-50 p-4 rounded-lg mb-4 border border-orange-100">
                      <h3 className="font-bold text-primary-800 text-sm mb-2">{t('home.user.rfq')}</h3>
                      <p className="text-xs text-gray-600 mb-3">One request, multiple quotes.</p>
                      <button onClick={() => navigate('/rfq')} className="w-full bg-primary-600 text-white py-1.5 rounded text-sm font-bold hover:bg-primary-700">
                          {t('home.user.start')}
                      </button>
                  </div>

                  <div onClick={() => navigate('/trade-assurance')} className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex-grow cursor-pointer hover:bg-blue-100 transition group">
                       <h3 className="font-bold text-blue-800 text-sm mb-2 group-hover:text-blue-900">{t('trade.title')}</h3>
                       <p className="text-xs text-gray-600 mb-2">Protect your orders from payment to delivery.</p>
                  </div>
              </div>
          </div>
      </div>

      {/* 3. New Arrivals (Horizontal Scroll / Slider) */}
      <section className="container mx-auto px-4 py-8 relative group">
          <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800 uppercase tracking-wide">{t('home.new.title')}</h2>
              <Link to="/shop" className="text-sm text-gray-500 hover:text-primary-600 flex items-center gap-1">
                  {t('home.rec.more')} <ArrowRight size={14} className="rtl:rotate-180"/>
              </Link>
          </div>
          
          <div className="relative">
             {/* Navigation Buttons (Desktop) */}
             <button 
                onClick={() => scroll(newArrivalsScrollRef, -300)}
                className="hidden md:flex absolute top-1/2 -left-4 rtl:-right-4 rtl:left-auto transform -translate-y-1/2 z-10 w-10 h-10 bg-white shadow-lg rounded-full items-center justify-center text-gray-600 hover:text-primary-600 hover:scale-110 transition opacity-0 group-hover:opacity-100"
             >
                 <ChevronRight size={24} className="rotate-180 rtl:rotate-0" />
             </button>
             <button 
                onClick={() => scroll(newArrivalsScrollRef, 300)}
                className="hidden md:flex absolute top-1/2 -right-4 rtl:-left-4 rtl:right-auto transform -translate-y-1/2 z-10 w-10 h-10 bg-white shadow-lg rounded-full items-center justify-center text-gray-600 hover:text-primary-600 hover:scale-110 transition opacity-0 group-hover:opacity-100"
             >
                 <ChevronRight size={24} className="rtl:rotate-180" />
             </button>

             {/* Horizontal Scroll Container */}
             <div 
                ref={newArrivalsScrollRef}
                className="flex gap-4 overflow-x-auto no-scrollbar pb-4 snap-x snap-mandatory scroll-smooth"
             >
                 {newArrivals.map((product) => (
                    <div key={product.id} className="min-w-[160px] md:min-w-[220px] lg:min-w-[250px] snap-start flex-shrink-0">
                        <ProductCard product={product} />
                    </div>
                 ))}
             </div>
          </div>
      </section>

      {/* 5. Request for Quotation Banner */}
      <section className="container mx-auto px-4 py-8">
          <div className="bg-[url('https://images.unsplash.com/photo-1556740758-90de2929450a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')] bg-cover bg-center rounded-lg overflow-hidden shadow-sm relative">
              <div className="absolute inset-0 bg-blue-900/80"></div>
              <div className="relative z-10 p-8 md:p-12 text-center text-white">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">{t('home.rfq.title')}</h2>
                  <p className="text-blue-100 mb-8 max-w-2xl mx-auto">{t('home.rfq.desc')}</p>
                  <button onClick={() => navigate('/rfq')} className="bg-primary-600 text-white px-8 py-3 rounded-full font-bold hover:bg-primary-700 transition">
                      {t('home.rfq.btn')}
                  </button>
              </div>
          </div>
      </section>

      {/* 6. Recommended For You (3 Rows Horizontal Slider) */}
      <section className="container mx-auto px-4 py-8 relative group">
          <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="text-primary-600" />
              <h2 className="text-xl font-bold text-gray-800 uppercase tracking-wide">
                  {t('home.rec.title')}
                  {userInterest && <span className="text-xs font-normal text-gray-500 mx-2 normal-case">({t('reviews.based_on')} {getCategoryTranslation(userInterest, t)})</span>}
              </h2>
          </div>
          
          <div className="relative">
             {/* Navigation Buttons for Recommendations */}
             <button 
                onClick={() => scroll(recommendedScrollRef, -300)}
                className="hidden md:flex absolute top-1/2 -left-4 rtl:-right-4 rtl:left-auto transform -translate-y-1/2 z-10 w-10 h-10 bg-white shadow-lg rounded-full items-center justify-center text-gray-600 hover:text-primary-600 hover:scale-110 transition opacity-0 group-hover:opacity-100"
             >
                 <ChevronRight size={24} className="rotate-180 rtl:rotate-0" />
             </button>
             <button 
                onClick={() => scroll(recommendedScrollRef, 300)}
                className="hidden md:flex absolute top-1/2 -right-4 rtl:-left-4 rtl:right-auto transform -translate-y-1/2 z-10 w-10 h-10 bg-white shadow-lg rounded-full items-center justify-center text-gray-600 hover:text-primary-600 hover:scale-110 transition opacity-0 group-hover:opacity-100"
             >
                 <ChevronRight size={24} className="rtl:rotate-180" />
             </button>

             {/* Grid Container with 3 Rows and Horizontal Flow */}
             <div 
                ref={recommendedScrollRef}
                className="grid grid-rows-3 grid-flow-col gap-4 overflow-x-auto no-scrollbar pb-4 scroll-smooth"
                style={{
                    gridTemplateRows: 'repeat(3, auto)',
                }}
             >
                 {displayProducts.map(product => (
                      <div key={product.id} className="w-[180px] md:w-[240px] flex-shrink-0">
                          <ProductCard product={product} />
                      </div>
                  ))}
             </div>
          </div>
          
          <div className="text-center mt-6">
               <button onClick={() => navigate('/shop')} className="border border-gray-300 text-gray-600 px-8 py-3 rounded-full font-bold hover:bg-gray-50 transition">
                   {t('nav.all_products')}
               </button>
          </div>
      </section>

      {/* 7. Bottom Services */}
      <section className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-4">
                  <Truck size={32} className="mx-auto text-gray-400 mb-2" />
                  <h4 className="font-bold text-gray-700 text-sm">Worldwide Shipping</h4>
              </div>
              <div className="p-4">
                  <CreditCard size={32} className="mx-auto text-gray-400 mb-2" />
                  <h4 className="font-bold text-gray-700 text-sm">Secure Payment</h4>
              </div>
              <div className="p-4">
                  <ShieldCheck size={32} className="mx-auto text-gray-400 mb-2" />
                  <h4 className="font-bold text-gray-700 text-sm">Trade Assurance</h4>
              </div>
              <div className="p-4">
                  <Headphones size={32} className="mx-auto text-gray-400 mb-2" />
                  <h4 className="font-bold text-gray-700 text-sm">24/7 Support</h4>
              </div>
          </div>
      </section>

    </div>
  );
};

export default Home;