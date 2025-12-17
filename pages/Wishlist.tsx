import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { useLanguage } from '../context/LanguageContext';
import ProductCard from '../components/ProductCard';

const Wishlist = () => {
  const { wishlist } = useShop();
  const { t } = useLanguage();

  if (wishlist.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart size={40} className="text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">{t('wishlist.empty')}</h2>
        <p className="text-gray-500 mb-8">{t('wishlist.empty_desc')}</p>
        <Link to="/shop" className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-primary-700 transition">
          {t('wishlist.explore')}
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 flex items-center gap-2">
          <Heart className="fill-red-500 text-red-500" />
          {t('wishlist.title')}
      </h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default Wishlist;