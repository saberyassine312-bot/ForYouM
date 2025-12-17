import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Send, CheckCircle, FileText, User, Mail, Phone } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { useLanguage } from '../context/LanguageContext';
import { Category } from '../types';

const RequestQuotation = () => {
  const { submitRFQ } = useShop();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    productName: '',
    category: Category.ELECTRONICS,
    quantity: 100,
    targetPrice: '',
    details: '',
    contactName: '',
    email: '',
    phone: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    submitRFQ({
      productName: formData.productName,
      category: formData.category,
      quantity: formData.quantity,
      targetPrice: formData.targetPrice ? Number(formData.targetPrice) : undefined,
      details: formData.details,
      contactName: formData.contactName,
      email: formData.email,
      phone: formData.phone
    });

    setIsSubmitted(true);
    window.scrollTo(0, 0);
  };

  if (isSubmitted) {
    return (
      <div className="container mx-auto px-4 py-20 min-h-[60vh] flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-lg w-full border border-gray-100 animate-fade-in-up">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="text-green-600 w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{t('rfq.success_title')}</h2>
          <p className="text-gray-600 mb-6">
            {t('rfq.success_desc')}
          </p>
          <button 
            onClick={() => navigate('/')} 
            className="w-full bg-primary-600 text-white py-3 rounded-lg font-bold hover:bg-primary-700 transition"
          >
            {t('details.back')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText size={32} />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">{t('rfq.page_title')}</h1>
          <p className="text-gray-600">{t('rfq.page_subtitle')}</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden animate-fade-in">
          
          {/* Product Details Section */}
          <div className="p-8 border-b border-gray-100">
             <div className="flex items-center gap-2 mb-6 text-primary-600">
                 <Package size={24} />
                 <h2 className="text-xl font-bold">{t('rfq.product_info')}</h2>
             </div>

             <div className="space-y-6">
                 <div>
                     <label className="block text-sm font-bold text-gray-700 mb-2">{t('rfq.product_name')} <span className="text-red-500">*</span></label>
                     <input 
                        required
                        type="text" 
                        value={formData.productName}
                        onChange={e => setFormData({...formData, productName: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                     />
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">{t('rfq.category')} <span className="text-red-500">*</span></label>
                        <select 
                            required
                            value={formData.category}
                            onChange={e => setFormData({...formData, category: e.target.value as Category})}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none bg-white"
                        >
                            {Object.values(Category).map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                     </div>
                     <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">{t('rfq.quantity')} <span className="text-red-500">*</span></label>
                        <input 
                            required
                            type="number"
                            min="1"
                            value={formData.quantity}
                            onChange={e => setFormData({...formData, quantity: Number(e.target.value)})}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                        />
                     </div>
                 </div>

                 <div>
                     <label className="block text-sm font-bold text-gray-700 mb-2">{t('rfq.target_price')}</label>
                     <input 
                        type="number" 
                        min="0"
                        value={formData.targetPrice}
                        onChange={e => setFormData({...formData, targetPrice: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                        placeholder="0.00"
                     />
                 </div>

                 <div>
                     <label className="block text-sm font-bold text-gray-700 mb-2">{t('rfq.details')} <span className="text-red-500">*</span></label>
                     <textarea 
                        required
                        rows={4}
                        value={formData.details}
                        onChange={e => setFormData({...formData, details: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                        placeholder="صف المواصفات، المواد، الألوان، وأي متطلبات أخرى..."
                     ></textarea>
                 </div>
             </div>
          </div>

          {/* Contact Information Section */}
          <div className="p-8 bg-gray-50/50">
             <div className="flex items-center gap-2 mb-6 text-primary-600">
                 <User size={24} />
                 <h2 className="text-xl font-bold">{t('rfq.contact_info')}</h2>
             </div>

             <div className="space-y-6">
                 <div>
                     <label className="block text-sm font-bold text-gray-700 mb-2">{t('rfq.name')} <span className="text-red-500">*</span></label>
                     <div className="relative">
                        <input 
                            required
                            type="text" 
                            value={formData.contactName}
                            onChange={e => setFormData({...formData, contactName: e.target.value})}
                            className="w-full pl-3 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                        />
                        <User className="absolute right-3 top-3 text-gray-400" size={18} />
                     </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">{t('rfq.email')} <span className="text-red-500">*</span></label>
                        <div className="relative">
                            <input 
                                required
                                type="email" 
                                value={formData.email}
                                onChange={e => setFormData({...formData, email: e.target.value})}
                                className="w-full pl-3 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                            />
                            <Mail className="absolute right-3 top-3 text-gray-400" size={18} />
                        </div>
                     </div>
                     <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">{t('rfq.phone')} <span className="text-red-500">*</span></label>
                        <div className="relative">
                            <input 
                                required
                                type="tel" 
                                value={formData.phone}
                                onChange={e => setFormData({...formData, phone: e.target.value})}
                                className="w-full pl-3 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none text-left"
                                dir="ltr"
                            />
                            <Phone className="absolute right-3 top-3 text-gray-400" size={18} />
                        </div>
                     </div>
                 </div>
             </div>
          </div>

          <div className="p-8 border-t border-gray-100 flex gap-4">
              <button 
                  type="button" 
                  onClick={() => navigate('/')}
                  className="flex-1 bg-white border border-gray-300 text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-50 transition"
              >
                  {t('cart.start_shopping')} {/* Using a generic "Cancel" or "Back" key might be better, reusing for now */}
              </button>
              <button 
                  type="submit" 
                  className="flex-[2] bg-primary-600 text-white py-3 rounded-lg font-bold hover:bg-primary-700 transition flex items-center justify-center gap-2 shadow-lg shadow-primary-600/20"
              >
                  {t('rfq.submit')} <Send size={18} className="rtl:rotate-180" />
              </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default RequestQuotation;