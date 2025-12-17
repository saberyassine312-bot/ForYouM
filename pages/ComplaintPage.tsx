import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, Upload, Send, CheckCircle, Image as ImageIcon, X } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { useLanguage } from '../context/LanguageContext';
import { ComplaintType } from '../types';

const ComplaintPage = () => {
  const { submitComplaint } = useShop();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    type: 'delay' as ComplaintType,
    description: '',
    contactInfo: '',
    image: '',
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
      setFormData(prev => ({ ...prev, image: '' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = submitComplaint(formData);
    setSubmittedId(id);
    window.scrollTo(0, 0);
  };

  if (submittedId) {
    return (
      <div className="container mx-auto px-4 py-20 min-h-[60vh] flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-lg w-full border border-gray-100 animate-fade-in-up">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="text-green-600 w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{t('complaint.success')}</h2>
          <div className="bg-gray-100 py-2 px-4 rounded-lg inline-block mb-6 font-mono font-bold text-lg text-gray-700">
              #{submittedId}
          </div>
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
      <div className="container mx-auto px-4 max-w-2xl">
        
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle size={32} />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">{t('complaint.title')}</h1>
          <p className="text-gray-600">{t('complaint.desc')}</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden animate-fade-in p-8">
            
            <div className="space-y-6">
                {/* Type Selection */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">{t('complaint.type')} <span className="text-red-500">*</span></label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <label className={`border-2 rounded-xl p-3 cursor-pointer text-center transition ${formData.type === 'delay' ? 'border-primary-600 bg-primary-50 text-primary-700' : 'border-gray-200 hover:border-gray-300'}`}>
                            <input type="radio" name="type" value="delay" checked={formData.type === 'delay'} onChange={() => setFormData({...formData, type: 'delay'})} className="hidden" />
                            <span className="font-bold text-sm">{t('complaint.type_delay')}</span>
                        </label>
                        <label className={`border-2 rounded-xl p-3 cursor-pointer text-center transition ${formData.type === 'broken' ? 'border-primary-600 bg-primary-50 text-primary-700' : 'border-gray-200 hover:border-gray-300'}`}>
                            <input type="radio" name="type" value="broken" checked={formData.type === 'broken'} onChange={() => setFormData({...formData, type: 'broken'})} className="hidden" />
                            <span className="font-bold text-sm">{t('complaint.type_broken')}</span>
                        </label>
                        <label className={`border-2 rounded-xl p-3 cursor-pointer text-center transition ${formData.type === 'other' ? 'border-primary-600 bg-primary-50 text-primary-700' : 'border-gray-200 hover:border-gray-300'}`}>
                            <input type="radio" name="type" value="other" checked={formData.type === 'other'} onChange={() => setFormData({...formData, type: 'other'})} className="hidden" />
                            <span className="font-bold text-sm">{t('complaint.type_other')}</span>
                        </label>
                    </div>
                </div>

                {/* Contact Info */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">{t('complaint.contact')} <span className="text-red-500">*</span></label>
                    <input 
                        required
                        type="text" 
                        value={formData.contactInfo}
                        onChange={(e) => setFormData({...formData, contactInfo: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">{t('complaint.details')} <span className="text-red-500">*</span></label>
                    <textarea 
                        required
                        rows={4}
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                    ></textarea>
                </div>

                {/* Image Upload */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">{t('complaint.image')}</label>
                    
                    {!formData.image ? (
                        <label className="border-2 border-dashed border-gray-300 rounded-lg h-32 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 hover:border-primary-500 transition group">
                            <Upload className="text-gray-400 group-hover:text-primary-500 mb-2" />
                            <span className="text-sm text-gray-500 group-hover:text-primary-600 font-medium">{t('complaint.upload')}</span>
                            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                        </label>
                    ) : (
                        <div className="relative rounded-lg overflow-hidden border border-gray-200 inline-block">
                            <img src={formData.image} alt="Evidence" className="h-48 object-contain bg-black/5" />
                            <button 
                                type="button" 
                                onClick={removeImage}
                                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    )}
                </div>

                <div className="pt-4 flex gap-4">
                    <button 
                        type="button" 
                        onClick={() => navigate('/')}
                        className="flex-1 bg-white border border-gray-300 text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-50 transition"
                    >
                        إلغاء
                    </button>
                    <button 
                        type="submit" 
                        className="flex-[2] bg-primary-600 text-white py-3 rounded-lg font-bold hover:bg-primary-700 transition flex items-center justify-center gap-2 shadow-lg shadow-primary-600/20"
                    >
                        {t('complaint.submit')} <Send size={18} className="rtl:rotate-180" />
                    </button>
                </div>
            </div>
        </form>
      </div>
    </div>
  );
};

export default ComplaintPage;