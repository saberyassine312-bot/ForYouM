import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Truck, User, MapPin, Phone, Building2, Send, Bike, Car } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { useLanguage } from '../context/LanguageContext';

const DeliveryPartnerRegistration = () => {
  const { submitDeliveryRequest } = useShop();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    phone: '',
    city: '',
    vehicleType: 'motorcycle',
    coverageArea: 'local'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    submitDeliveryRequest({
      companyName: formData.companyName,
      contactPerson: formData.contactPerson,
      phone: formData.phone,
      city: formData.city,
      vehicleType: formData.vehicleType,
      coverageArea: formData.coverageArea
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
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{t('delivery.success')}</h2>
          <p className="text-gray-600 mb-6">
            شكراً لاهتمامك بالانضمام إلى شبكة التوصيل الخاصة بنا. سيقوم فريقنا بمراجعة طلبك والتواصل معك قريباً.
          </p>
          <button 
            onClick={() => navigate('/')} 
            className="w-full bg-primary-600 text-white py-3 rounded-lg font-bold hover:bg-primary-700 transition"
          >
            العودة للصفحة الرئيسية
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">{t('delivery.title')}</h1>
          <p className="text-gray-600 max-w-xl mx-auto">{t('delivery.desc')}</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden animate-fade-in">
          
          {/* Section 1: Company/Driver Info */}
          <div className="p-8 border-b border-gray-100">
            <div className="flex items-center gap-2 mb-6 text-primary-600">
              <Building2 size={24} />
              <h2 className="text-xl font-bold">{t('delivery.company_info')}</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2">{t('delivery.company_name')} <span className="text-red-500">*</span></label>
                <input 
                  required
                  type="text" 
                  value={formData.companyName}
                  onChange={e => setFormData({...formData, companyName: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                  placeholder="شركة توصيل أو سائق حر"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">{t('delivery.contact_person')} <span className="text-red-500">*</span></label>
                <div className="relative">
                    <input 
                      required
                      type="text" 
                      value={formData.contactPerson}
                      onChange={e => setFormData({...formData, contactPerson: e.target.value})}
                      className="w-full pl-3 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                    />
                    <User className="absolute right-3 top-3 text-gray-400" size={18} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">{t('delivery.phone')} <span className="text-red-500">*</span></label>
                <div className="relative">
                    <input 
                      required
                      type="tel" 
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                      className="w-full pl-3 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none text-left"
                      dir="ltr"
                      placeholder="0600000000"
                    />
                    <Phone className="absolute right-3 top-3 text-gray-400" size={18} />
                </div>
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2">{t('delivery.city')} <span className="text-red-500">*</span></label>
                <div className="relative">
                    <input 
                      required
                      type="text" 
                      value={formData.city}
                      onChange={e => setFormData({...formData, city: e.target.value})}
                      className="w-full pl-3 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                    />
                    <MapPin className="absolute right-3 top-3 text-gray-400" size={18} />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Vehicle & Coverage */}
          <div className="p-8 border-b border-gray-100 bg-gray-50/50">
            <div className="flex items-center gap-2 mb-6 text-primary-600">
              <Truck size={24} />
              <h2 className="text-xl font-bold">{t('delivery.vehicle_info')}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">{t('delivery.vehicle_type')} <span className="text-red-500">*</span></label>
                <select 
                  required
                  value={formData.vehicleType}
                  onChange={e => setFormData({...formData, vehicleType: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none bg-white"
                >
                  <option value="motorcycle">{t('delivery.vehicle_motorcycle')}</option>
                  <option value="car">{t('delivery.vehicle_car')}</option>
                  <option value="van">{t('delivery.vehicle_van')}</option>
                  <option value="truck">{t('delivery.vehicle_truck')}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">{t('delivery.coverage')} <span className="text-red-500">*</span></label>
                <select 
                  required
                  value={formData.coverageArea}
                  onChange={e => setFormData({...formData, coverageArea: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none bg-white"
                >
                  <option value="local">{t('delivery.coverage_local')}</option>
                  <option value="national">{t('delivery.coverage_national')}</option>
                </select>
              </div>
            </div>
          </div>

          {/* Footer & Submit */}
          <div className="p-8 bg-gray-50 flex flex-col md:flex-row gap-4 justify-end items-center">
             <button 
                type="button" 
                onClick={() => navigate('/')}
                className="text-gray-500 font-bold hover:text-gray-700"
             >
                 إلغاء
             </button>
             <button 
                type="submit"
                className="w-full md:w-auto bg-primary-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-primary-700 transition flex items-center justify-center gap-2 shadow-lg shadow-primary-600/20"
             >
                 {t('delivery.submit')} <Send size={18} className="rtl:rotate-180" />
             </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default DeliveryPartnerRegistration;