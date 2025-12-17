import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { useLanguage } from '../context/LanguageContext';
import { getCategoryTranslation } from '../utils/translations';

const Cart = () => {
  const { cart, removeFromCart, updateProductQuantity, cartTotal, openCheckout } = useShop();
  const { language, t } = useLanguage();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <Trash2 size={40} className="text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">{t('cart.empty')}</h2>
        <p className="text-gray-500 mb-8">{t('cart.empty_desc')}</p>
        <Link to="/shop" className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-primary-700 transition">
          {t('cart.start_shopping')}
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">{t('cart.title')}</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="w-full lg:w-2/3">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {cart.map((item) => {
                const hasDiscount = item.discountPrice && item.discountPrice > 0;
                const price = hasDiscount ? item.discountPrice : item.price;
                const displayName = language === 'en' && item.nameEn ? item.nameEn : item.name;

                return (
                  <div key={item.id} className="p-6 border-b border-gray-100 last:border-0 flex flex-col sm:flex-row items-center gap-6">
                    <img src={item.image} alt={displayName} className="w-24 h-24 object-cover rounded-lg bg-gray-50" />
                    
                    <div className="flex-grow text-center sm:text-right rtl:sm:text-right ltr:sm:text-left">
                      <h3 className="font-bold text-gray-900 mb-1">{displayName}</h3>
                      <p className="text-gray-500 text-sm mb-2">{getCategoryTranslation(item.category, t)}</p>
                      
                      <div className="flex items-center gap-2 justify-center sm:justify-start rtl:sm:justify-start ltr:sm:justify-start">
                         <p className={`font-bold ${hasDiscount ? 'text-red-600' : 'text-primary-600'}`}>{price} {t('common.currency')}</p>
                         {hasDiscount && (
                             <span className="text-xs text-gray-400 line-through">{item.price}</span>
                         )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => updateProductQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center font-bold">{item.quantity}</span>
                      <button 
                        onClick={() => updateProductQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 p-2"
                      title="Delete"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                );
            })}
          </div>
        </div>

        {/* Summary */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
            <h2 className="text-xl font-bold mb-6 border-b pb-4">{t('cart.summary')}</h2>
            
            <div className="flex justify-between mb-4">
              <span className="text-gray-600">{t('cart.subtotal')}</span>
              <span className="font-bold">{cartTotal} {t('common.currency')}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="text-gray-600">{t('cart.shipping')}</span>
              <span className="text-green-600 font-medium">{t('cart.free')}</span>
            </div>
            
            <div className="border-t pt-4 mt-4 mb-8">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-800">{t('cart.total')}</span>
                <span className="text-2xl font-bold text-primary-600">{cartTotal} {t('common.currency')}</span>
              </div>
            </div>

            <button 
              onClick={openCheckout}
              className="w-full bg-primary-600 text-white py-4 rounded-xl font-bold hover:bg-primary-700 transition flex items-center justify-center gap-2"
            >
              {t('cart.checkout')} <ArrowRight size={20} className="rtl:rotate-180" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;