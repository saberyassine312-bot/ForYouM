import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, CheckCircle, Phone, Banknote, ArrowRight, Wallet } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { UserInfo } from '../types';

const Checkout = () => {
  const { cart, cartTotal, clearCart } = useShop();
  const navigate = useNavigate();
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
        // In a real app, this would redirect to PayPal or open the PayPal button window
        setTimeout(() => {
            setStep('success');
            clearCart();
        }, 2000);
    } else {
        // Credit Card Logic
        setTimeout(() => {
            setStep('success');
            clearCart();
        }, 1500);
    }
  };

  if (cart.length === 0 && step !== 'success') {
    navigate('/shop');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        
        {/* Progress Header */}
        <div className="bg-gray-50 p-6 border-b border-gray-100 flex justify-between items-center">
           <div className={`flex items-center gap-2 ${step === 'info' ? 'text-primary-600 font-bold' : 'text-gray-400'}`}>
              <span className="w-8 h-8 rounded-full border-2 flex items-center justify-center border-current">1</span>
              <span>البيانات</span>
           </div>
           <div className="h-0.5 w-16 bg-gray-300"></div>
           <div className={`flex items-center gap-2 ${step === 'payment' ? 'text-primary-600 font-bold' : 'text-gray-400'}`}>
              <span className="w-8 h-8 rounded-full border-2 flex items-center justify-center border-current">2</span>
              <span>الدفع</span>
           </div>
        </div>

        <div className="p-8">
          {step === 'info' && (
            <form onSubmit={handleInfoSubmit}>
              <h2 className="text-2xl font-bold mb-6 text-gray-800">بيانات التوصيل</h2>
              
              <div className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">الاسم الكامل</label>
                  <input 
                    required
                    type="text" 
                    value={userInfo.fullName}
                    onChange={(e) => setUserInfo({...userInfo, fullName: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                    placeholder="الاسم الثلاثي"
                  />
                </div>

                {/* City */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">المدينة</label>
                    <input 
                        required
                        type="text" 
                        value={userInfo.city}
                        onChange={(e) => setUserInfo({...userInfo, city: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                        placeholder="مدينتك"
                    />
                </div>

                {/* Phone Number - New Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">رقم الهاتف</label>
                  <div className="relative">
                    <input 
                      required
                      type="tel" 
                      value={userInfo.phone}
                      onChange={(e) => setUserInfo({...userInfo, phone: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none text-left"
                      placeholder="0600000000"
                      dir="ltr"
                    />
                    <Phone className="absolute right-3 top-3 text-gray-400" size={18} />
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">العنوان</label>
                  <textarea 
                    required
                    value={userInfo.address}
                    onChange={(e) => setUserInfo({...userInfo, address: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                    rows={3}
                    placeholder="تفاصيل العنوان (الحي، الشارع، رقم المنزل...)"
                  ></textarea>
                </div>
              </div>

              <button type="submit" className="w-full mt-8 bg-primary-600 text-white py-3 rounded-lg font-bold hover:bg-primary-700 transition">
                متابعة للدفع
              </button>
            </form>
          )}

          {step === 'payment' && (
            <form onSubmit={handlePaymentSubmit}>
              <h2 className="text-2xl font-bold mb-6 text-gray-800">بيانات الدفع</h2>
              
              <div className="bg-blue-50 p-4 rounded-lg mb-6 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                    <span className="text-blue-800 font-medium">المستلم</span>
                    <span className="text-blue-800 font-bold">{userInfo.fullName}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-blue-800 font-medium">الهاتف</span>
                    <span className="text-blue-800 font-bold dir-ltr">{userInfo.phone}</span>
                </div>
                <div className="border-t border-blue-200 my-2"></div>
                <div className="flex items-center justify-between">
                    <span className="text-blue-800 font-medium">المبلغ الإجمالي</span>
                    <span className="text-blue-800 font-bold text-xl">{cartTotal} د.م.</span>
                </div>
              </div>

               {/* Payment Method Selection */}
               <div className="mb-8">
                <label className="block text-sm font-bold text-gray-700 mb-3">اختر طريقة الدفع</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div 
                        onClick={() => setPaymentMethod('cash')}
                        className={`relative cursor-pointer border-2 rounded-xl p-4 flex flex-col items-center justify-center gap-2 transition-all ${paymentMethod === 'cash' ? 'border-primary-600 bg-primary-50 text-primary-700' : 'border-gray-200 hover:border-gray-300 text-gray-600'}`}
                    >
                        <Banknote size={32} />
                        <span className="font-bold text-sm">الدفع عند الاستلام</span>
                        {paymentMethod === 'cash' && <div className="absolute top-2 right-2 text-primary-600"><CheckCircle size={16} /></div>}
                    </div>

                    <div 
                        onClick={() => setPaymentMethod('card')}
                        className={`relative cursor-pointer border-2 rounded-xl p-4 flex flex-col items-center justify-center gap-2 transition-all ${paymentMethod === 'card' ? 'border-primary-600 bg-primary-50 text-primary-700' : 'border-gray-200 hover:border-gray-300 text-gray-600'}`}
                    >
                        <CreditCard size={32} />
                        <span className="font-bold text-sm">بطاقة بنكية</span>
                        {paymentMethod === 'card' && <div className="absolute top-2 right-2 text-primary-600"><CheckCircle size={16} /></div>}
                    </div>

                    <div 
                        onClick={() => setPaymentMethod('paypal')}
                        className={`relative cursor-pointer border-2 rounded-xl p-4 flex flex-col items-center justify-center gap-2 transition-all ${paymentMethod === 'paypal' ? 'border-[#0070ba] bg-[#0070ba]/5 text-[#0070ba]' : 'border-gray-200 hover:border-gray-300 text-gray-600'}`}
                    >
                        <Wallet size={32} />
                        <span className="font-bold text-sm">PayPal</span>
                        {paymentMethod === 'paypal' && <div className="absolute top-2 right-2 text-[#0070ba]"><CheckCircle size={16} /></div>}
                    </div>
                </div>
              </div>

              {/* Card Inputs */}
              {paymentMethod === 'card' && (
                <div className="space-y-4 animate-fade-in">
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
                  <div className="bg-[#f2f9fe] border border-[#d6ebfa] text-[#0c2e55] p-6 rounded-lg text-center animate-fade-in mb-4">
                    <p className="font-medium mb-1">سيتم تحويلك إلى موقع PayPal لإتمام عملية الدفع بشكل آمن.</p>
                    <p className="text-xs opacity-75">You will be redirected to PayPal to securely complete your payment.</p>
                  </div>
              )}

               {/* Conditional Info for Cash */}
               {paymentMethod === 'cash' && (
                  <div className="bg-green-50 text-green-800 p-4 rounded-lg text-sm flex gap-3 animate-fade-in mt-4">
                      <Phone className="shrink-0" size={20} />
                      <p>عند الضغط على "تأكيد الطلب"، سيتم نقلك إلى واتساب لإرسال تفاصيل طلبك وعنوانك إلينا مباشرة.</p>
                  </div>
              )}

              <div className="flex gap-4 mt-8">
                  <button type="button" onClick={() => setStep('info')} className="w-1/3 bg-gray-100 text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-200 transition">
                      رجوع
                  </button>
                  <button 
                    type="submit" 
                    className={`w-2/3 text-white py-3 rounded-lg font-bold transition flex items-center justify-center gap-2 ${paymentMethod === 'paypal' ? 'bg-[#0070ba] hover:bg-[#003087]' : 'bg-primary-600 hover:bg-primary-700'}`}
                  >
                       {paymentMethod === 'cash' ? 'تأكيد عبر واتساب' : paymentMethod === 'paypal' ? 'متابعة إلى PayPal' : `تأكيد الدفع (${cartTotal} د.م.)`} 
                       {(paymentMethod === 'cash' || paymentMethod === 'paypal') && <ArrowRight size={18} className="rtl:rotate-180" />}
                  </button>
              </div>
            </form>
          )}

          {step === 'success' && (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="text-green-600 w-12 h-12" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">شكراً لطلبك!</h2>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-8 inline-block w-full text-sm text-gray-500">
                  {paymentMethod === 'cash' ? (
                      <p>يرجى إرسال الرسالة في واتساب لتأكيد الحجز.</p>
                  ) : paymentMethod === 'paypal' ? (
                      <p>تم استلام دفعتك بنجاح عبر PayPal. سيتم تجهيز طلبك فوراً.</p>
                  ) : (
                    <>
                        سيتم التواصل معك قريباً على الرقم: <br/>
                        <strong className="text-gray-900 text-lg dir-ltr block mt-1">{userInfo.phone}</strong>
                    </>
                  )}
              </div>
              
              <button onClick={() => navigate('/')} className="bg-primary-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-primary-700 transition">
                العودة للرئيسية
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;