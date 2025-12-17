import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, CheckCircle, AlertCircle, Building2, User, Package, Image as ImageIcon, Send, Calculator, Info } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Category } from '../types';
import { calculateCommissionRate, calculateNetProfit } from '../utils/commission';

const SellerRegistration = () => {
  const { submitSellerRequest } = useShop();
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    companyName: '',
    category: Category.ELECTRONICS,
    applicantName: '',
    city: '',
    address: '',
    phone: '',
    productPrice: '',
    images: [] as string[]
  });

  // Commission Calculation State
  const [commissionDetails, setCommissionDetails] = useState({
    rate: 0,
    amount: 0,
    netEarnings: 0
  });

  // Recalculate commission whenever category or price changes
  useEffect(() => {
    const price = Number(formData.productPrice);
    if (price > 0) {
      const rate = calculateCommissionRate(formData.category, price);
      const { commissionAmount, netEarnings } = calculateNetProfit(price, rate);
      setCommissionDetails({
        rate,
        amount: commissionAmount,
        netEarnings
      });
    } else {
      setCommissionDetails({ rate: 0, amount: 0, netEarnings: 0 });
    }
  }, [formData.category, formData.productPrice]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      if (formData.images.length + files.length > 4) {
        alert('يمكنك رفع 4 صور فقط كحد أقصى.');
        return;
      }

      (Array.from(files) as File[]).forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData(prev => ({
            ...prev,
            images: [...prev.images, reader.result as string]
          }));
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.images.length === 0) {
        alert('يرجى رفع صورة واحدة على الأقل للمنتج');
        return;
    }

    submitSellerRequest({
      companyName: formData.companyName,
      category: formData.category,
      applicantName: formData.applicantName,
      city: formData.city,
      address: formData.address,
      phone: formData.phone,
      productPrice: Number(formData.productPrice),
      commissionRate: commissionDetails.rate,
      images: formData.images
    });

    setIsSubmitted(true);
    window.scrollTo(0, 0);
  };

  if (isSubmitted) {
    return (
      <div className="container mx-auto px-4 py-20 min-h-[60vh] flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-lg w-full border border-gray-100">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="text-green-600 w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">تم استلام طلبك بنجاح!</h2>
          <p className="text-gray-600 mb-6">
            شكراً لاهتمامك بالبيع على FourYouM. سيقوم فريقنا بمراجعة بياناتك ومنتجاتك وسنتواصل معك قريباً عبر الهاتف أو البريد الإلكتروني.
          </p>
          <div className="bg-blue-50 text-blue-800 p-4 rounded-lg text-sm mb-6">
             تم إرسال نسخة من الطلب إلى إدارة الموقع للمراجعة.
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
      <div className="container mx-auto px-4 max-w-3xl">
        
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">انضم إلينا كبائع شريك</h1>
          <p className="text-gray-600 max-w-xl mx-auto">املأ الاستمارة أدناه لعرض منتجاتك أمام آلاف المشترين. عملية التسجيل سريعة ومجانية.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          
          {/* Section 1: Company/Product Info */}
          <div className="p-8 border-b border-gray-100">
            <div className="flex items-center gap-2 mb-6 text-primary-600">
              <Building2 size={24} />
              <h2 className="text-xl font-bold">معلومات الشركة / المنتج</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2">اسم الشركة أو المنتج التجاري <span className="text-red-500">*</span></label>
                <input 
                  required
                  type="text" 
                  value={formData.companyName}
                  onChange={e => setFormData({...formData, companyName: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                  placeholder="مثال: شركة الأفق للتجارة"
                />
              </div>

              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-bold text-gray-700 mb-2">نوع المنتج <span className="text-red-500">*</span></label>
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
            </div>
          </div>

          {/* Section 2: Applicant Info */}
          <div className="p-8 border-b border-gray-100 bg-gray-50/50">
            <div className="flex items-center gap-2 mb-6 text-primary-600">
              <User size={24} />
              <h2 className="text-xl font-bold">معلومات مقدم الطلب</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2">الاسم الكامل <span className="text-red-500">*</span></label>
                <input 
                  required
                  type="text" 
                  value={formData.applicantName}
                  onChange={e => setFormData({...formData, applicantName: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                  placeholder="الاسم الشخصي والعائلي"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">المدينة <span className="text-red-500">*</span></label>
                <input 
                  required
                  type="text" 
                  value={formData.city}
                  onChange={e => setFormData({...formData, city: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">رقم الهاتف <span className="text-red-500">*</span></label>
                <input 
                  required
                  type="tel" 
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none text-left"
                  dir="ltr"
                  placeholder="0600000000"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2">العنوان الكامل</label>
                <textarea 
                  value={formData.address}
                  onChange={e => setFormData({...formData, address: e.target.value})}
                  rows={2}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                  placeholder="الحي، الشارع، رقم المكتب..."
                ></textarea>
              </div>
            </div>
          </div>

          {/* Section 3: Product & Pricing Logic */}
          <div className="p-8 border-b border-gray-100">
            <div className="flex items-center gap-2 mb-6 text-primary-600">
              <Package size={24} />
              <h2 className="text-xl font-bold">تفاصيل المنتج والتسعير</h2>
            </div>

            <div className="space-y-6">
              <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex-1">
                      <label className="block text-sm font-bold text-gray-700 mb-2">سعر المنتج المقترح (بالدرهم) <span className="text-red-500">*</span></label>
                      <input 
                        required
                        type="number" 
                        min="0"
                        value={formData.productPrice}
                        onChange={e => setFormData({...formData, productPrice: e.target.value})}
                        className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none text-lg font-bold"
                        placeholder="0.00 MAD"
                      />
                  </div>
                  
                  {/* Dynamic Commission Calculation Box */}
                  <div className="flex-1 bg-gray-50 rounded-xl p-4 border border-gray-200">
                      <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                          <Calculator size={16} /> حاسبة الأرباح التقديرية
                      </h3>
                      
                      {Number(formData.productPrice) > 0 ? (
                        <div className="space-y-3">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-600">سعر البيع:</span>
                                <span className="font-bold">{Number(formData.productPrice).toFixed(2)} د.م.</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-600">نسبة عمولة الموقع ({formData.category}):</span>
                                <span className="font-bold text-red-500">{commissionDetails.rate}%</span>
                            </div>
                            <div className="flex justify-between items-center text-sm border-b border-gray-200 pb-2">
                                <span className="text-gray-600">قيمة العمولة:</span>
                                <span className="text-red-500">-{commissionDetails.amount.toFixed(2)} د.م.</span>
                            </div>
                            <div className="flex justify-between items-center pt-1">
                                <span className="font-bold text-green-700">صافي ربحك:</span>
                                <span className="font-extrabold text-xl text-green-700">{commissionDetails.netEarnings.toFixed(2)} د.م.</span>
                            </div>
                        </div>
                      ) : (
                          <div className="text-center py-4 text-gray-400 text-sm">
                              أدخل السعر لرؤية تفاصيل العمولة وصافي الربح.
                          </div>
                      )}
                  </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg flex gap-3 text-sm text-blue-800">
                  <Info className="shrink-0 mt-0.5" size={18} />
                  <div>
                      <strong>سياسة العمولات:</strong> تختلف نسبة العمولة بناءً على القسم والسعر. 
                      مثلاً: الإلكترونيات أقل من 200 درهم (8%)، أكثر من 200 درهم (12%).
                  </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                    صور المنتج (الحد الأقصى 4 صور) <span className="text-red-500">*</span>
                    <p className="text-xs text-gray-400 font-normal mt-1">يرجى رفع صور واضحة من زوايا مختلفة للمنتج.</p>
                </label>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {/* Upload Button */}
                  {formData.images.length < 4 && (
                    <label className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 hover:border-primary-500 transition group">
                        <Upload className="text-gray-400 group-hover:text-primary-500 mb-2" />
                        <span className="text-xs text-gray-500 group-hover:text-primary-600 font-bold">رفع صورة</span>
                        <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" />
                    </label>
                  )}

                  {/* Image Previews */}
                  {formData.images.map((img, idx) => (
                    <div key={idx} className="aspect-square rounded-lg overflow-hidden relative border border-gray-200 group">
                        <img src={img} alt={`preview ${idx}`} className="w-full h-full object-cover" />
                        <button 
                            type="button"
                            onClick={() => removeImage(idx)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition shadow-sm"
                        >
                            <AlertCircle size={16} />
                        </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer & Submit */}
          <div className="p-8 bg-gray-50">
             <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800 mb-6 flex gap-3">
                 <AlertCircle className="shrink-0" />
                 <div>
                     <strong>ملاحظة قانونية:</strong> يخضع هذا الطلب للمراجعة والتدقيق من قبل فريق FourYouM. إرسال الطلب لا يعني النشر الفوري للمنتج. نحتفظ بحق قبول أو رفض أي منتج لا يتوافق مع سياساتنا.
                 </div>
             </div>

             <div className="flex flex-col md:flex-row gap-4 justify-end items-center">
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
                     إرسال الطلب <Send size={18} className="rtl:rotate-180" />
                 </button>
             </div>
          </div>

        </form>
      </div>
    </div>
  );
};

export default SellerRegistration;