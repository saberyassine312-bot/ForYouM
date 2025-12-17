import React, { useState } from 'react';
import { X, CheckCircle, CreditCard, Phone, MapPin, User, Building, Banknote, ArrowRight, Wallet } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { UserInfo } from '../types';

const CheckoutModal = () => {
  const { isCheckoutOpen, closeCheckout, cartTotal, clearCart, cart } = useShop();
  const [step, setStep] = useState<'info' | 'payment' | 'success'>('info');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card' | 'paypal'>('cash');
  
  const [userInfo, setUserInfo] = useState<UserInfo>({
    fullName: '',
    city: '',
    address: '',
    phone: ''
  });

  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiry: '',
    cvc: ''
  });

  if (!isCheckoutOpen) return null;

  const handleInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (paymentMethod === 'cash') {
        // WhatsApp Logic
        const phoneNumber = "212714044298";
        
        // Build items list string
        const itemsList = cart.map(item => `- ${item.name} (عدد: ${item.quantity})`).join('\n');

        const message = `مرحباً، أريد تأكيد طلبي من متجر FourYouM:
        
👤 *معلومات العميل:*
الاسم: ${userInfo.fullName}
المدينة: ${userInfo.city}
العنوان: ${userInfo.address}
الهاتف: ${userInfo.phone}

🛒 *المنتجات المطلوبة:*
${itemsList}

💰 *تفاصيل الفاتورة:*
المجموع الكلي: ${cartTotal} د.م.
        
يرجى تأكيد الطلب والدفع عند الاستلام.`;

        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
        
        setStep('success');
        clearCart();
    } else if (paymentMethod === 'paypal') {
        // PayPal Logic (Simulation)
        setTimeout(() => {
            setStep('success');
            clearCart();
        }, 2000);
    } else {
        // Credit Card Logic (Simulation)
        setTimeout(() => {
            setStep('success');
            clearCart();
        }, 1500);
    }
  };

  const handleClose = () => {
    closeCheckout();
    setTimeout(() => {
        setStep('info');
        setUserInfo({ fullName: '', city: '', address: '', phone: '' });
        setPaymentMethod('cash');
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden transform transition-all scale-100 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-gray-50 p-4 border-b border-gray-100 flex justify-between items-center shrink-0">
          <h3 className="font-bold text-gray-800 text-lg">إتمام الطلب</h3>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 transition">
            <X size={24} />
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="overflow-y-auto p-6 md:p-8">
            
          {/* Progress Indicator */}
          {step !== 'success' && (
             <div className="flex items-center justify-center mb-8 px-4">
                <div className={`flex flex-col items-center gap-1 ${step === 'info' ? 'text-primary-600 font-bold' : 'text-green-600'}`}>
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors ${step === 'info' ? 'border-primary-600 bg-primary-50' : 'border-green-600 bg-green-50'}`}>
                        {step === 'payment' ? <CheckCircle size={16} /> : '1'}
                    </div>
                    <span className="text-xs">المعلومات</span>
                </div>
                <div className={`h-0.5 w-16 mx-2 transition-colors ${step === 'payment' ? 'bg-primary-600' : 'bg-gray-200'}`}></div>
                <div className={`flex flex-col items-center gap-1 ${step === 'payment' ? 'text-primary-600 font-bold' : 'text-gray-400'}`}>
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors ${step === 'payment' ? 'border-primary-600 bg-primary-50' : 'border-gray-200'}`}>
                        2
                    </div>
                    <span className="text-xs">الدفع</span>
                </div>
            </div>
          )}

          {step === 'info' && (
            <form onSubmit={handleInfoSubmit} className="space-y-4">
              <div className="bg-blue-50 p-3 rounded-lg text-blue-800 text-sm mb-4 flex justify-between items-center">
                  <span>عدد المنتجات: {cart.length}</span>
                  <span className="font-bold">الإجمالي: {cartTotal} د.م.</span>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">الاسم الكامل</label>
                <div className="relative">
                    <input 
                        required
                        type="text" 
                        value={userInfo.fullName}
                        onChange={(e) => setUserInfo({...userInfo, fullName: e.target.value})}
                        className="w-full pl-3 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none transition"
                        placeholder="الاسم الثلاثي"
                    />
                    <User className="absolute right-3 top-3 text-gray-400" size={18} />
                </div>
              </div>

              {/* City */}
              <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">المدينة</label>
                  <div className="relative">
                      <input 
                            required
                            type="text" 
                            value={userInfo.city}
                            onChange={(e) => setUserInfo({...userInfo, city: e.target.value})}
                            className="w-full pl-3 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none transition"
                            placeholder="مدينتك"
                        />
                      <Building className="absolute right-3 top-3 text-gray-400" size={18} />
                  </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">العنوان</label>
                <div className="relative">
                    <textarea 
                        required
                        value={userInfo.address}
                        onChange={(e) => setUserInfo({...userInfo, address: e.target.value})}
                        className="w-full pl-3 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none transition"
                        rows={2}
                        placeholder="الحي، الشارع، رقم المنزل..."
                    ></textarea>
                    <MapPin className="absolute right-3 top-3 text-gray-400" size={18} />
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">رقم الهاتف</label>
                <div className="relative">
                  <input 
                    required
                    type="tel" 
                    value={userInfo.phone}
                    onChange={(e) => setUserInfo({...userInfo, phone: e.target.value})}
                    className="w-full pl-3 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none text-left transition"
                    placeholder="0600000000"
                    dir="ltr"
                  />
                  <Phone className="absolute right-3 top-3 text-gray-400" size={18} />
                </div>
              </div>

              <button type="submit" className="w-full mt-6 bg-primary-600 text-white py-3 rounded-lg font-bold hover:bg-primary-700 shadow-lg shadow-primary-600/20 transition">
                متابعة للدفع
              </button>
            </form>
          )}

          {step === 'payment' && (
            <form onSubmit={handlePaymentSubmit} className="space-y-5">
              
              <div className="bg-gray-50 p-4 rounded-lg space-y-2 border border-gray-200">
                <div className="flex justify-between text-sm">
                    <span className="text-gray-600">المستلم:</span>
                    <span className="font-bold text-gray-800">{userInfo.fullName}</span>
                </div>
                <div className="border-t pt-2 mt-2 flex justify-between items-center">
                    <span className="font-bold text-gray-800">المبلغ المستحق:</span>
                    <span className="text-xl font-bold text-primary-600">{cartTotal} د.م.</span>
                </div>
              </div>

              {/* Payment Method Selection */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">اختر طريقة الدفع</label>
                <div className="grid grid-cols-3 gap-3">
                    <div 
                        onClick={() => setPaymentMethod('cash')}
                        className={`cursor-pointer border-2 rounded-xl p-2 md:p-4 flex flex-col items-center justify-center gap-2 transition-all ${paymentMethod === 'cash' ? 'border-primary-600 bg-primary-50 text-primary-700' : 'border-gray-200 hover:border-gray-300 text-gray-600'}`}
                    >
                        <Banknote size={24} className="md:w-8 md:h-8" />
                        <span className="font-bold text-xs md:text-sm text-center">كاش</span>
                        {paymentMethod === 'cash' && <div className="absolute top-2 right-2 text-primary-600 hidden md:block"><CheckCircle size={16} /></div>}
                    </div>

                    <div 
                        onClick={() => setPaymentMethod('card')}
                        className={`cursor-pointer border-2 rounded-xl p-2 md:p-4 flex flex-col items-center justify-center gap-2 transition-all ${paymentMethod === 'card' ? 'border-primary-600 bg-primary-50 text-primary-700' : 'border-gray-200 hover:border-gray-300 text-gray-600'}`}
                    >
                        <CreditCard size={24} className="md:w-8 md:h-8" />
                        <span className="font-bold text-xs md:text-sm text-center">بطاقة</span>
                    </div>

                    <div 
                        onClick={() => setPaymentMethod('paypal')}
                        className={`cursor-pointer border-2 rounded-xl p-2 md:p-4 flex flex-col items-center justify-center gap-2 transition-all ${paymentMethod === 'paypal' ? 'border-[#0070ba] bg-[#0070ba]/5 text-[#0070ba]' : 'border-gray-200 hover:border-gray-300 text-gray-600'}`}
                    >
                        <Wallet size={24} className="md:w-8 md:h-8" />
                        <span className="font-bold text-xs md:text-sm text-center">PayPal</span>
                    </div>
                </div>
              </div>

              {/* Conditional Card Inputs */}
              {paymentMethod === 'card' && (
                <div className="space-y-4 animate-fade-in border-t pt-4">
                    <h4 className="font-bold text-gray-800 text-sm">بيانات البطاقة</h4>
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">رقم البطاقة</label>
                    <div className="relative">
                        <input 
                            required
                            type="text" 
                            maxLength={19}
                            value={paymentDetails.cardNumber}
                            onChange={(e) => setPaymentDetails({...paymentDetails, cardNumber: e.target.value})}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none ltr:text-left text-left"
                            placeholder="0000 0000 0000 0000"
                            dir="ltr"
                        />
                        <CreditCard className="absolute right-3 top-3 text-gray-400" />
                    </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">تاريخ الانتهاء</label>
                        <input 
                            required
                            type="text" 
                            placeholder="MM/YY"
                            value={paymentDetails.expiry}
                            onChange={(e) => setPaymentDetails({...paymentDetails, expiry: e.target.value})}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none text-left"
                            dir="ltr"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                        <input 
                            required
                            type="password" 
                            maxLength={3}
                            value={paymentDetails.cvc}
                            onChange={(e) => setPaymentDetails({...paymentDetails, cvc: e.target.value})}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none text-center"
                            dir="ltr"
                            placeholder="123"
                        />
                    </div>
                    </div>
                </div>
              )}

              {/* PayPal Info */}
              {paymentMethod === 'paypal' && (
                  <div className="bg-[#f2f9fe] border border-[#d6ebfa] text-[#0c2e55] p-4 rounded-lg text-center animate-fade-in text-sm">
                    <p>سيتم تحويلك إلى موقع PayPal لإتمام عملية الدفع بشكل آمن.</p>
                  </div>
              )}

              {/* Conditional Info for Cash */}
              {paymentMethod === 'cash' && (
                  <div className="bg-green-50 text-green-800 p-4 rounded-lg text-sm flex gap-3 animate-fade-in">
                      <Phone className="shrink-0" size={20} />
                      <p>عند الضغط على "تأكيد الطلب"، سيتم نقلك إلى واتساب لإرسال تفاصيل طلبك وعنوانك إلينا مباشرة.</p>
                  </div>
              )}

              <div className="flex gap-3 mt-8">
                  <button type="button" onClick={() => setStep('info')} className="flex-1 bg-white border border-gray-300 text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-50 transition">
                      رجوع
                  </button>
                  <button 
                    type="submit" 
                    className={`flex-[2] text-white py-3 rounded-lg font-bold shadow-lg shadow-primary-600/20 transition flex items-center justify-center gap-2 ${paymentMethod === 'paypal' ? 'bg-[#0070ba] hover:bg-[#003087]' : 'bg-primary-600 hover:bg-primary-700'}`}
                  >
                      {paymentMethod === 'cash' ? 'تأكيد عبر واتساب' : paymentMethod === 'paypal' ? 'متابعة إلى PayPal' : 'إتمام الدفع'} 
                      {(paymentMethod === 'cash' || paymentMethod === 'paypal') && <ArrowRight size={18} className="rtl:rotate-180" />}
                  </button>
              </div>
            </form>
          )}

          {step === 'success' && (
            <div className="text-center py-6">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-short">
                <CheckCircle className="text-green-600 w-12 h-12" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">تم استلام طلبك بنجاح!</h2>
              <p className="text-gray-600 mb-6">شكراً لثقتك بنا، {userInfo.fullName}.</p>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-8 inline-block w-full text-sm text-gray-500">
                  {paymentMethod === 'cash' ? (
                      <p>يرجى إرسال الرسالة في واتساب لتأكيد الحجز.</p>
                  ) : paymentMethod === 'paypal' ? (
                      <p>تم استلام دفعتك بنجاح عبر PayPal.</p>
                  ) : (
                    <>
                        سيتم التواصل معك قريباً على الرقم: <br/>
                        <strong className="text-gray-900 text-lg dir-ltr block mt-1">{userInfo.phone}</strong>
                    </>
                  )}
              </div>
              
              <button onClick={handleClose} className="w-full bg-primary-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-primary-700 transition shadow-lg">
                متابعة التسوق
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;