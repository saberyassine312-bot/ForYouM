import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, Store, Facebook, Twitter, Instagram, Search, Heart, User, ChevronDown, HelpCircle, Smartphone, Mail, Globe, MapPin, Phone, ShieldCheck } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { useLanguage } from '../context/LanguageContext';
import { SOCIAL_LINKS } from '../pages/constants';
import CheckoutModal from './CheckoutModal';
import InstallAppBanner from './InstallAppBanner';
import { Category } from '../types';

const Layout = ({ children }: { children?: React.ReactNode }) => {
  const { cart, wishlist } = useShop();
  const { t, toggleLanguage, language, direction } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistItemCount = wishlist.length;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
      setIsMenuOpen(false);
    }
  };

  const navCategories = [
    { name: t('nav.home'), link: '/' },
    { name: t('cat.clothing_women'), link: `/shop?category=${Category.CLOTHING_WOMEN}` },
    { name: t('cat.clothing_men'), link: `/shop?category=${Category.CLOTHING_MEN}` },
    { name: t('cat.clothing_kids'), link: `/shop?category=${Category.CLOTHING_KIDS}` },
    { name: t('cat.electronics'), link: `/shop?category=${Category.ELECTRONICS}` },
    { name: t('cat.sports'), link: `/shop?category=${Category.SPORTS}` },
    { name: t('cat.beauty'), link: `/shop?category=${Category.BEAUTY}` },
    { name: t('cat.health'), link: `/shop?category=${Category.HEALTH}` },
    { name: t('cat.home_appliances'), link: `/shop?category=${Category.HOME_APPLIANCES}` },
    { name: t('cat.pets'), link: `/shop?category=${Category.PETS}` },
    { name: t('cat.food'), link: `/shop?category=${Category.FOOD}` },
    { name: t('cat.books'), link: `/shop?category=${Category.BOOKS}` },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50 text-gray-900" dir={direction}>
      
      {/* 1. Top Bar (Dark & Professional) */}
      <div className="bg-slate-900 text-slate-300 text-[11px] py-2 hidden md:block border-b border-slate-800">
        <div className="container mx-auto px-4 flex justify-between items-center">
            <div className="flex gap-6">
                <span className="hover:text-white cursor-pointer transition flex items-center gap-1"><MapPin size={12}/> Global Delivery</span>
                <Link to="/buyer-protection" className="hover:text-white cursor-pointer transition">{t('nav.buyer_protection')}</Link>
                <Link to="/app" className="hover:text-white cursor-pointer flex items-center gap-1 transition"><Smartphone size={12}/> {t('nav.app')}</Link>
                <Link to="/help" className="hover:text-white flex items-center gap-1 transition"><HelpCircle size={12}/> {t('nav.help')}</Link>
            </div>
            <div className="flex gap-6 items-center">
                 <Link to="/sell" className="hover:text-primary-400 font-medium transition text-white">{t('footer.sell')}</Link>
                 <span className="bg-slate-700 w-px h-3 self-center"></span>
                 <button onClick={toggleLanguage} className="hover:text-white flex items-center gap-1 transition font-medium uppercase">
                    <Globe size={12} />
                    {language === 'ar' ? 'English' : 'العربية'}
                 </button>
            </div>
        </div>
      </div>

      {/* 2. Navigation Bar (Moved Above Header) */}
      <nav className="bg-white border-b border-gray-200 block">
         <div className="container mx-auto px-4">
            <div className="flex items-center gap-1 text-sm font-medium text-gray-600 overflow-x-auto no-scrollbar whitespace-nowrap py-1">
               <div className="flex items-center gap-3 py-3 pr-0 pl-6 border-e border-gray-100 font-bold text-gray-800 cursor-default">
                   <Menu size={18} /> {t('cat.all_categories')}
               </div>

               {navCategories.map((cat, idx) => (
                   <Link 
                    key={idx} 
                    to={cat.link} 
                    className={`py-3 px-4 hover:text-primary-600 transition border-b-2 border-transparent hover:border-primary-600 ${idx === 0 ? 'font-bold text-primary-700' : ''}`}
                   >
                       {cat.name}
                   </Link>
               ))}
               
               <div className="flex-grow"></div>
               
               <Link to="/sell" className="py-3 px-4 hover:text-primary-600 flex items-center gap-1 text-primary-600 font-bold">
                   {t('footer.sell')}
               </Link>
            </div>
         </div>
      </nav>

      {/* 3. Main Header (Logo & Search - Now Below Nav) */}
      <header className="bg-white sticky top-0 z-40 shadow-sm border-b border-gray-100">
        <div className="container mx-auto px-4 py-4 md:py-5">
          <div className="flex items-center justify-between gap-6">
            
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 shrink-0 group">
              <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary-600/30 group-hover:scale-105 transition duration-300">
                <Store size={24} />
              </div>
              <div className="flex flex-col">
                  <span className="text-2xl font-extrabold text-slate-800 tracking-tight leading-none">FourYouM</span>
                  <span className="text-[10px] text-primary-600 font-bold tracking-[0.2em] uppercase mt-0.5">Global Store</span>
              </div>
            </Link>

            {/* Search Bar (Modern & Integrated) */}
            <div className="hidden md:flex flex-1 max-w-2xl relative mx-8">
              <form onSubmit={handleSearch} className="flex w-full bg-gray-100 border border-transparent focus-within:border-primary-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-primary-500/10 rounded-full transition-all duration-300 overflow-hidden">
                 <div className="pl-4 pr-3 flex items-center justify-center border-e border-gray-200 cursor-pointer hover:bg-gray-200 transition bg-gray-50 text-gray-600 text-sm font-medium whitespace-nowrap">
                     <span className="mx-1">{t('search.category')}</span>
                     <ChevronDown size={14} className="opacity-50" />
                 </div>
                 <input 
                   type="text" 
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   placeholder={t('search.placeholder')}
                   className="w-full px-4 py-2.5 bg-transparent focus:outline-none text-sm text-gray-700 placeholder-gray-400"
                 />
                 <button type="submit" className="bg-primary-600 text-white px-6 font-bold flex items-center gap-2 hover:bg-primary-700 transition">
                   <Search size={18} />
                 </button>
              </form>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2 md:gap-4 text-gray-600">
               
               {/* Sign In / Account */}
               <Link to="/admin" className="flex items-center gap-2 hover:text-primary-600 group p-2 rounded-lg hover:bg-gray-50 transition">
                 <User size={22} className="text-gray-500 group-hover:text-primary-600" />
                 <div className="hidden lg:flex flex-col text-xs items-start">
                     <span className="text-gray-400 font-medium whitespace-nowrap">{t('common.welcome')}</span>
                     <span className="font-bold text-gray-700 group-hover:text-primary-600 whitespace-nowrap">{t('common.login')}</span>
                 </div>
               </Link>

               {/* Messages */}
               <Link to="/contact" className="hidden lg:flex flex-col items-center hover:text-primary-600 p-2 rounded-lg hover:bg-gray-50 transition group">
                    <Mail size={22} className="text-gray-500 group-hover:text-primary-600" />
                    <span className="text-[10px] font-bold mt-1 text-gray-500 group-hover:text-primary-600">{t('nav.messages')}</span>
               </Link>

               {/* Wishlist */}
               <Link to="/wishlist" className="hidden lg:flex flex-col items-center hover:text-primary-600 p-2 rounded-lg hover:bg-gray-50 transition group relative">
                    <div className="relative">
                        <Heart size={22} className="text-gray-500 group-hover:text-primary-600" />
                        {wishlistItemCount > 0 && <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>}
                    </div>
                    <span className="text-[10px] font-bold mt-1 text-gray-500 group-hover:text-primary-600">{t('nav.wishlist')}</span>
               </Link>

               {/* Cart */}
               <Link to="/cart" className="flex items-center gap-2 hover:text-primary-600 p-2 rounded-lg hover:bg-gray-50 transition group">
                    <div className="relative">
                        <ShoppingCart size={24} className="text-gray-700 group-hover:text-primary-600" />
                        {cartItemCount > 0 && (
                        <span className="absolute -top-1.5 -right-1.5 bg-primary-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-sm border-2 border-white">
                            {cartItemCount}
                        </span>
                        )}
                    </div>
                    <div className="hidden lg:flex flex-col text-xs items-start">
                        <span className="text-gray-400 font-medium whitespace-nowrap">{t('nav.cart')}</span>
                        <span className="font-bold text-gray-800 dir-ltr">{cart.reduce((t, i) => t + (i.discountPrice || i.price) * i.quantity, 0)} {t('common.currency')}</span>
                    </div>
               </Link>

               {/* Mobile Hamburger */}
               <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-gray-800 hover:bg-gray-100 rounded-lg"
               >
                 {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
               </button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden mt-4">
             <form onSubmit={handleSearch} className="relative">
                 <input 
                   type="text" 
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   placeholder={t('search.placeholder')}
                   className="w-full border border-gray-300 rounded-lg py-2.5 px-4 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 bg-gray-50"
                 />
                 <button type="submit" className="absolute left-2 top-2 text-gray-400 rtl:left-2 rtl:right-auto ltr:right-2 ltr:left-auto">
                   <Search size={20} />
                 </button>
             </form>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm md:hidden" onClick={() => setIsMenuOpen(false)}>
          <div className="bg-white w-[85%] max-w-sm h-full p-6 overflow-y-auto shadow-2xl animate-slide-in-right" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
               <div className="flex items-center gap-2">
                 <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white">
                    <Store size={18} />
                 </div>
                 <span className="text-xl font-bold text-gray-800">FourYouM</span>
               </div>
               <button onClick={() => setIsMenuOpen(false)} className="bg-gray-100 p-2 rounded-full hover:bg-gray-200"><X size={20} /></button>
            </div>
            
            <div className="flex flex-col gap-1 text-base">
              {navCategories.map((cat, idx) => (
                  <Link 
                    key={idx} 
                    to={cat.link} 
                    onClick={() => setIsMenuOpen(false)} 
                    className="py-3 px-2 hover:bg-gray-50 rounded-lg font-medium text-gray-800 border-b border-gray-50 last:border-0"
                  >
                      {cat.name}
                  </Link>
              ))}

              <div className="border-t border-gray-100 my-4 pt-4 space-y-2">
                <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="py-2 px-2 flex items-center gap-3 text-sm font-medium hover:bg-gray-50 rounded-lg"><User size={18}/> {t('common.login')}</Link>
                <Link to="/wishlist" onClick={() => setIsMenuOpen(false)} className="py-2 px-2 flex items-center gap-3 text-sm font-medium hover:bg-gray-50 rounded-lg"><Heart size={18}/> {t('nav.wishlist')}</Link>
                <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="py-2 px-2 flex items-center gap-3 text-sm font-medium hover:bg-gray-50 rounded-lg"><Mail size={18}/> {t('footer.contact')}</Link>
                <Link to="/help" onClick={() => setIsMenuOpen(false)} className="py-2 px-2 flex items-center gap-3 text-sm font-medium hover:bg-gray-50 rounded-lg"><HelpCircle size={18}/> {t('nav.help')}</Link>
                <Link to="/buyer-protection" onClick={() => setIsMenuOpen(false)} className="py-2 px-2 flex items-center gap-3 text-sm font-medium hover:bg-gray-50 rounded-lg text-primary-600"><ShieldCheck size={18}/> {t('nav.buyer_protection')}</Link>
                <Link to="/trade-assurance" onClick={() => setIsMenuOpen(false)} className="py-2 px-2 flex items-center gap-3 text-sm font-medium hover:bg-gray-50 rounded-lg text-[#FFAA00]"><ShieldCheck size={18}/> {t('trade.title')}</Link>
              </div>

              <div className="mt-auto pt-4 flex gap-2">
                  <button onClick={toggleLanguage} className="flex-1 bg-gray-100 py-2 rounded-lg text-sm font-bold text-gray-700">
                      {language === 'ar' ? 'English' : 'العربية'}
                  </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Global Checkout Modal */}
      <CheckoutModal />
      
      {/* App Install Banner */}
      <InstallAppBanner />

      {/* Footer (Detailed & Professional) */}
      <footer className="bg-white border-t border-gray-200 pt-16 pb-8 mt-12 text-sm text-gray-600">
        <div className="container mx-auto px-4">
          
          {/* Newsletter Section */}
          <div className="flex flex-col lg:flex-row justify-between items-center bg-gray-50 p-8 rounded-2xl mb-12 gap-6 border border-gray-100">
             <div className="text-center lg:text-right rtl:lg:text-right ltr:lg:text-left">
                 <h3 className="font-bold text-gray-900 text-xl mb-2">{t('footer.subscribe')}</h3>
                 <p className="text-gray-500">احصل على أحدث العروض وأخبار المنتجات مباشرة في بريدك الوارد.</p>
             </div>
             <div className="flex w-full max-w-md">
                <input 
                  type="email" 
                  placeholder={t('footer.email_placeholder')}
                  className="w-full px-5 py-3 border border-gray-300 rounded-l-xl outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 rtl:rounded-r-xl rtl:rounded-l-none ltr:rounded-l-xl ltr:rounded-r-none transition"
                />
                <button className="bg-primary-600 text-white px-8 py-3 rounded-r-xl font-bold hover:bg-primary-700 shadow-lg shadow-primary-600/20 rtl:rounded-l-xl rtl:rounded-r-none ltr:rounded-r-xl ltr:rounded-l-none transition">
                  {t('footer.subscribe_btn')}
                </button>
             </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
            <div className="col-span-2 lg:col-span-2">
               <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white">
                     <Store size={18} />
                  </div>
                  <span className="text-xl font-extrabold text-gray-800">FourYouM</span>
               </div>
               <p className="text-gray-500 mb-6 leading-relaxed max-w-xs">
                 منصة التجارة العالمية الرائدة. نربط ملايين المشترين والبائعين حول العالم لتمكين الفرص الاقتصادية للجميع.
               </p>
               <div className="flex gap-4">
                  <a href={SOCIAL_LINKS.facebook} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-blue-600 hover:text-white transition"><Facebook size={18} /></a>
                  <a href={SOCIAL_LINKS.twitter} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-sky-500 hover:text-white transition"><Twitter size={18} /></a>
                  <a href={SOCIAL_LINKS.instagram} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-pink-600 hover:text-white transition"><Instagram size={18} /></a>
               </div>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-5">{t('footer.customer_service')}</h4>
              <ul className="space-y-3">
                <li><Link to="/help" className="hover:text-primary-600 transition">{t('nav.help')}</Link></li>
                <li><Link to="/contact" className="hover:text-primary-600 transition">{t('footer.contact')}</Link></li>
                <li><Link to="/complaint" className="hover:text-primary-600 transition">{t('footer.complaint')}</Link></li>
                <li><Link to="/app" className="hover:text-primary-600 transition">{t('nav.app')}</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-5">{t('footer.sell')}</h4>
              <ul className="space-y-3">
                <li><Link to="/sell" className="hover:text-primary-600 transition">{t('footer.sell')}</Link></li>
                <li><Link to="/admin" className="hover:text-primary-600 transition">{t('footer.partner_login')}</Link></li>
                <li><Link to="/success-stories" className="hover:text-primary-600 transition">{t('footer.success_stories')}</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-5">{t('footer.trade_services')}</h4>
              <ul className="space-y-3">
                <li><Link to="/delivery-partner" className="hover:text-primary-600 transition">{t('footer.delivery_partner')}</Link></li>
                <li><Link to="/trade-assurance" className="hover:text-primary-600 transition">{t('trade.title')}</Link></li>
                <li><Link to="/buyer-protection" className="hover:text-primary-600 transition">{t('nav.buyer_protection')}</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
             <p>&copy; {new Date().getFullYear()} FourYouM Global Trade. {t('footer.rights')}</p>
             <div className="flex gap-6">
                 <Link to="/help" className="hover:text-gray-600 transition">Privacy Policy</Link>
                 <Link to="/help" className="hover:text-gray-600 transition">Terms of Use</Link>
                 <Link to="/help" className="hover:text-gray-600 transition">Cookie Preferences</Link>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;