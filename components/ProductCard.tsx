import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, ShieldCheck } from 'lucide-react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { useLanguage } from '../context/LanguageContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useShop();
  const { language, t } = useLanguage();
  const navigate = useNavigate();

  // Language aware name
  const displayName = language === 'en' && product.nameEn ? product.nameEn : product.name;
  const isWishlisted = isInWishlist(product.id);
  
  const hasDiscount = product.discountPrice && product.discountPrice > 0;
  const priceToDisplay = hasDiscount ? product.discountPrice : product.price;

  const handleContactSupplier = (e: React.MouseEvent) => {
      e.preventDefault();
      navigate(`/product/${product.id}`);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 group flex flex-col h-full relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-gray-200">
        {/* Image Area */}
        <Link to={`/product/${product.id}`} className="block relative h-52 bg-white flex items-center justify-center overflow-hidden">
            <img 
            src={product.image} 
            alt={displayName} 
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
            
            {/* Wishlist Button */}
            <button 
                onClick={(e) => {
                    e.preventDefault();
                    toggleWishlist(product);
                }}
                className="absolute top-3 right-3 p-2 rounded-full bg-white shadow-sm border border-gray-100 hover:bg-gray-50 transition-colors z-20 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 duration-300"
                title={isWishlisted ? t('common.remove_from_wishlist') : t('common.add_to_wishlist')}
            >
                <Heart size={18} className={isWishlisted ? "fill-red-500 text-red-500" : "text-gray-400 hover:text-red-500"} />
            </button>
            
            {/* Discount Badge */}
            {hasDiscount && (
                <span className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded z-10">
                    SALE
                </span>
            )}
        </Link>
        
        {/* Content Area */}
        <div className="p-4 pt-3 flex flex-col flex-grow">
            
            {/* Title */}
            <Link to={`/product/${product.id}`} className="block mb-2">
                <h3 className="text-sm font-medium text-gray-700 hover:text-primary-600 line-clamp-2 leading-relaxed min-h-[2.5rem]" title={displayName}>
                    {displayName}
                </h3>
            </Link>

            {/* Price */}
            <div className="mb-2">
                <div className="flex items-baseline gap-2">
                    <span className="text-lg font-bold text-gray-900">
                        {priceToDisplay} <span className="text-xs font-normal text-gray-500">{t('common.currency')}</span>
                    </span>
                    {hasDiscount && (
                        <span className="text-xs text-gray-400 line-through decoration-gray-400">{product.price}</span>
                    )}
                </div>
            </div>

            {/* Min Order & Badge */}
            <div className="flex items-center justify-between text-xs mt-auto pt-3 border-t border-gray-50">
                <span className="text-gray-400">{t('card.min_order')}</span>
                <div className="flex items-center gap-1 text-gray-500 bg-gray-50 px-1.5 py-0.5 rounded border border-gray-100">
                    <ShieldCheck size={12} className="text-primary-500" />
                    <span className="font-bold text-[10px]">Verified</span>
                </div>
            </div>

            {/* Hover Actions Overlay (Bottom) */}
            <div className="absolute inset-x-0 bottom-0 bg-white/95 backdrop-blur-sm p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 border-t border-gray-100 flex gap-2 shadow-inner z-20">
                 <button 
                    onClick={handleContactSupplier}
                    className="flex-1 py-2 border border-primary-600 text-primary-600 rounded-lg text-xs font-bold hover:bg-primary-50 transition"
                 >
                    {t('details.send_inquiry')}
                 </button>
                 <button 
                    onClick={() => addToCart(product)}
                    className="flex-1 py-2 bg-primary-600 text-white rounded-lg text-xs font-bold hover:bg-primary-700 transition shadow-md shadow-primary-600/20"
                 >
                    {t('details.start_order')}
                 </button>
            </div>
        </div>
    </div>
  );
};

export default ProductCard;