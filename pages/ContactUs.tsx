import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const ContactUs = () => {
  const { t } = useLanguage();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setTimeout(() => {
        setIsSubmitted(true);
        window.scrollTo(0, 0);
    }, 500);
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Header */}
      <div className="bg-primary-600 py-16 px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{t('contact.title')}</h1>
        <p className="text-primary-100 text-lg max-w-2xl mx-auto">{t('contact.subtitle')}</p>
      </div>

      <div className="container mx-auto px-4 -mt-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Contact Info Cards */}
            <div className="lg:col-span-1 space-y-4">
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex items-start gap-4">
                    <div className="bg-primary-50 p-3 rounded-full text-primary-600">
                        <Phone size={24} />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-800 mb-1">{t('contact.phone')}</h3>
                        <p className="text-gray-600 dir-ltr text-right rtl:text-right">+212 714 044 298</p>
                        <p className="text-gray-500 text-sm mt-1">Mon-Fri 9am-6pm</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex items-start gap-4">
                    <div className="bg-primary-50 p-3 rounded-full text-primary-600">
                        <Mail size={24} />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-800 mb-1">{t('contact.email_addr')}</h3>
                        <p className="text-gray-600">support@fouryoum.com</p>
                        <p className="text-gray-600">info@fouryoum.com</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex items-start gap-4">
                    <div className="bg-primary-50 p-3 rounded-full text-primary-600">
                        <MapPin size={24} />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-800 mb-1">{t('contact.address')}</h3>
                        <p className="text-gray-600">Casablanca, Morocco</p>
                        <p className="text-gray-500 text-sm mt-1">Global Trade Center, Floor 5</p>
                    </div>
                </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-md border border-gray-100 p-8">
                    {isSubmitted ? (
                        <div className="text-center py-16 animate-fade-in">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle className="text-green-600 w-10 h-10" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('contact.success')}</h2>
                            <button 
                                onClick={() => {setIsSubmitted(false); setFormData({name: '', email: '', subject: '', message: ''})}}
                                className="text-primary-600 font-bold hover:underline"
                            >
                                إرسال رسالة أخرى
                            </button>
                        </div>
                    ) : (
                        <>
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">{t('contact.form_title')}</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">{t('contact.name')}</label>
                                        <input 
                                            required
                                            type="text" 
                                            value={formData.name}
                                            onChange={e => setFormData({...formData, name: e.target.value})}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">{t('contact.email')}</label>
                                        <input 
                                            required
                                            type="email" 
                                            value={formData.email}
                                            onChange={e => setFormData({...formData, email: e.target.value})}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">{t('contact.subject')}</label>
                                    <input 
                                        required
                                        type="text" 
                                        value={formData.subject}
                                        onChange={e => setFormData({...formData, subject: e.target.value})}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">{t('contact.message')}</label>
                                    <textarea 
                                        required
                                        rows={5}
                                        value={formData.message}
                                        onChange={e => setFormData({...formData, message: e.target.value})}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                                    ></textarea>
                                </div>

                                <button 
                                    type="submit" 
                                    className="bg-primary-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-primary-700 transition flex items-center justify-center gap-2 shadow-lg shadow-primary-600/20 w-full md:w-auto"
                                >
                                    {t('contact.send')} <Send size={18} className="rtl:rotate-180" />
                                </button>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;