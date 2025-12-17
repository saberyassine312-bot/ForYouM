import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Filter, Search, ChevronRight, LayoutGrid, Home } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { useLanguage } from '../context/LanguageContext';
import ProductCard from '../components/ProductCard';
import { Category } from '../types';
import { getCategoryTranslation } from '../utils/translations';

const Shop = () => {
  const { products } = useShop();
  const { t, language } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const initialCategory = searchParams.get('category');

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'all');
  const [searchTerm, setSearchTerm] = useState('');

  // Update selected category if URL parameter changes
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) {
        setSelectedCategory(cat);
    } else {
        setSelectedCategory('all');
    }
  }, [location.search]);

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (product.nameEn && product.nameEn.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const isSpecificCategory = selectedCategory !== 'all';

  const handleCategoryChange = (cat: string) => {
      setSelectedCategory(cat);
      if (cat === 'all') {
          navigate('/'); // Redirect to Home when exiting a category
      } else {
          navigate(`/shop?category=${cat}`);
      }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      
      {/* Breadcrumb for specific category */}
      {isSpecificCategory && (
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <span onClick={() => handleCategoryChange('all')} className="cursor-pointer hover:text-primary-600 font-bold flex items-center gap-1">
                <Home size={14} /> {t('nav.home')}
            </span>
            <ChevronRight size={14} className="rtl:rotate-180" />
            <span className="text-gray-900 font-bold">{getCategoryTranslation(selectedCategory, t)}</span>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Filters - ONLY Show when 'All' is selected */}
        {!isSpecificCategory && (
            <div className="w-full md:w-1/4">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
                <div className="flex items-center gap-2 mb-6 text-gray-800 font-bold text-lg border-b pb-4">
                <Filter size={20} />
                {t('shop.filter')}
                </div>

                <div>
                <h3 className="font-semibold mb-3">{t('shop.sections')}</h3>
                <div className="space-y-2">
                    <label className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded transition">
                    <input 
                        type="radio" 
                        name="category" 
                        checked={selectedCategory === 'all'}
                        onChange={() => handleCategoryChange('all')}
                        className="mx-2 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-primary-700 font-bold">{t('shop.all')}</span>
                    </label>
                    {Object.values(Category).map(cat => (
                    <label key={cat} className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded transition">
                        <input 
                        type="radio" 
                        name="category" 
                        checked={selectedCategory === cat}
                        onChange={() => handleCategoryChange(cat)}
                        className="mx-2 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="text-gray-600">
                            {getCategoryTranslation(cat, t)}
                        </span>
                    </label>
                    ))}
                </div>
                </div>
            </div>
            </div>
        )}

        {/* Product Grid Area */}
        <div className={`w-full ${isSpecificCategory ? 'w-full' : 'md:w-3/4'}`}>
            
            {/* Header Area: Search & Title */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                            {isSpecificCategory && <LayoutGrid size={24} className="text-primary-600" />}
                            {selectedCategory === 'all' ? t('shop.all') : getCategoryTranslation(selectedCategory, t)}
                        </h1>
                        <p className="text-gray-500 text-sm mt-1">{t('shop.found')} {filteredProducts.length} {t('shop.product')}</p>
                    </div>

                    {isSpecificCategory && (
                        <button 
                            onClick={() => handleCategoryChange('all')}
                            className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-bold transition flex items-center gap-2"
                        >
                            <Home size={16} />
                            {t('nav.home')}
                        </button>
                    )}
                </div>

                {/* Search Bar - Always Visible Here */}
                <div className="relative">
                    <input 
                        type="text" 
                        placeholder={t('shop.search_placeholder')}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-3 pl-10 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none bg-gray-50"
                    />
                    <div className="absolute top-3 left-3 text-gray-400 rtl:right-3 rtl:left-auto">
                        <Search size={20} />
                    </div>
                </div>
            </div>

            {filteredProducts.length > 0 ? (
                <div className={`grid grid-cols-1 sm:grid-cols-2 gap-6 ${isSpecificCategory ? 'lg:grid-cols-4' : 'lg:grid-cols-3'}`}>
                    {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                        <Search size={32} />
                    </div>
                    <p className="text-gray-500 text-lg mb-4">{t('shop.no_results')}</p>
                    <button 
                        onClick={() => {handleCategoryChange('all'); setSearchTerm('');}}
                        className="text-primary-600 hover:underline font-bold"
                    >
                        {t('shop.reset')}
                    </button>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Shop;