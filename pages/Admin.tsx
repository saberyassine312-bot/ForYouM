import React, { useState } from 'react';
import { Plus, Edit, Trash, Sparkles, X, Save, Upload, Image as ImageIcon, Video, Film, Store, FileText, Check, Ban, Clock, TrendingUp, Truck, AlertTriangle, User, CheckCircle, Percent, FileQuestion } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Product, Category, MediaItem, RequestStatus } from '../types';
import { generateProductDescription } from '../services/geminiService';
import { calculateNetProfit } from '../utils/commission';

const Admin = () => {
  const { products, updateProduct, addProduct, deleteProduct, sellerRequests, updateRequestStatus, deliveryRequests, updateDeliveryRequestStatus, complaints, rfqs } = useShop();
  const [activeTab, setActiveTab] = useState<'products' | 'requests' | 'delivery' | 'complaints' | 'rfqs'>('products');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const initialProductState: Product = {
    id: '',
    name: '',
    price: 0,
    discountPrice: 0,
    category: Category.ELECTRONICS,
    image: '',
    gallery: [],
    description: '',
    isAffiliateAvailable: true,
    affiliateCommission: 15
  };

  const handleEdit = (product: Product) => {
    setEditingProduct({ ...product });
    setIsNew(false);
  };

  const handleCreate = () => {
    setEditingProduct({ ...initialProductState, id: Date.now().toString() });
    setIsNew(true);
  };

  const handleSave = () => {
    if (editingProduct) {
      const productToSave = {
        ...editingProduct,
        image: editingProduct.image || 'https://via.placeholder.com/400?text=No+Image'
      };

      if (isNew) {
        addProduct(productToSave);
      } else {
        updateProduct(productToSave);
      }
      setEditingProduct(null);
    }
  };

  const handleGenerateAI = async () => {
    if (!editingProduct?.name) return;
    setIsGenerating(true);
    const description = await generateProductDescription(editingProduct.name, editingProduct.category);
    setEditingProduct({ ...editingProduct, description });
    setIsGenerating(false);
  };

  const handleMainImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editingProduct) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditingProduct({ ...editingProduct, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && editingProduct) {
      (Array.from(files) as File[]).forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const type = file.type.startsWith('video') ? 'video' : 'image';
          const newMedia: MediaItem = { type, url: reader.result as string };
          setEditingProduct(prev => {
              if(!prev) return null;
              return { ...prev, gallery: [...prev.gallery, newMedia] }
          });
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeGalleryItem = (index: number) => {
      if(editingProduct) {
          const newGallery = [...editingProduct.gallery];
          newGallery.splice(index, 1);
          setEditingProduct({...editingProduct, gallery: newGallery});
      }
  };

  // Helper for status badge
  const getStatusBadge = (status: RequestStatus | 'pending' | 'resolved') => {
      switch(status) {
          case 'pending': return <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-bold flex items-center gap-1 w-fit"><Clock size={12}/> قيد المراجعة</span>;
          case 'approved': 
          case 'resolved': return <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-bold flex items-center gap-1 w-fit"><Check size={12}/> مكتمل</span>;
          case 'rejected': return <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-bold flex items-center gap-1 w-fit"><Ban size={12}/> مرفوض</span>;
      }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header & Stats */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                <Store className="text-primary-600" />
                لوحة التحكم المركزية
            </h1>
        </div>
        
        {/* Tab Switcher */}
        <div className="bg-white p-1 rounded-lg border border-gray-200 flex flex-wrap shadow-sm">
            <button 
                onClick={() => setActiveTab('products')}
                className={`px-4 py-2 rounded-md font-bold text-sm transition flex items-center gap-2 ${activeTab === 'products' ? 'bg-primary-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'}`}
            >
                <Store size={16} /> المنتجات
            </button>
            <button 
                onClick={() => setActiveTab('requests')}
                className={`px-4 py-2 rounded-md font-bold text-sm transition flex items-center gap-2 relative ${activeTab === 'requests' ? 'bg-primary-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'}`}
            >
                <FileText size={16} /> البائعين
                {sellerRequests.filter(r => r.status === 'pending').length > 0 && (
                    <span className="absolute -top-1 -left-1 bg-red-500 text-white w-4 h-4 rounded-full text-[10px] flex items-center justify-center">
                        {sellerRequests.filter(r => r.status === 'pending').length}
                    </span>
                )}
            </button>
            <button 
                onClick={() => setActiveTab('rfqs')}
                className={`px-4 py-2 rounded-md font-bold text-sm transition flex items-center gap-2 relative ${activeTab === 'rfqs' ? 'bg-primary-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'}`}
            >
                <FileQuestion size={16} /> طلبات الأسعار
                {rfqs.filter(r => r.status === 'pending').length > 0 && (
                    <span className="absolute -top-1 -left-1 bg-red-500 text-white w-4 h-4 rounded-full text-[10px] flex items-center justify-center">
                        {rfqs.filter(r => r.status === 'pending').length}
                    </span>
                )}
            </button>
            <button 
                onClick={() => setActiveTab('delivery')}
                className={`px-4 py-2 rounded-md font-bold text-sm transition flex items-center gap-2 relative ${activeTab === 'delivery' ? 'bg-primary-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'}`}
            >
                <Truck size={16} /> التوصيل
                {deliveryRequests.filter(r => r.status === 'pending').length > 0 && (
                    <span className="absolute -top-1 -left-1 bg-red-500 text-white w-4 h-4 rounded-full text-[10px] flex items-center justify-center">
                        {deliveryRequests.filter(r => r.status === 'pending').length}
                    </span>
                )}
            </button>
            <button 
                onClick={() => setActiveTab('complaints')}
                className={`px-4 py-2 rounded-md font-bold text-sm transition flex items-center gap-2 relative ${activeTab === 'complaints' ? 'bg-primary-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'}`}
            >
                <AlertTriangle size={16} /> الشكاوى
                {complaints.filter(c => c.status === 'pending').length > 0 && (
                    <span className="absolute -top-1 -left-1 bg-red-500 text-white w-4 h-4 rounded-full text-[10px] flex items-center justify-center">
                        {complaints.filter(c => c.status === 'pending').length}
                    </span>
                )}
            </button>
        </div>
      </div>

      {activeTab === 'products' && (
        <>
            <div className="flex justify-end mb-4">
                <button 
                    onClick={handleCreate}
                    className="bg-primary-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-primary-700 shadow font-bold"
                >
                    <Plus size={20} /> إضافة منتج جديد
                </button>
            </div>
            
            {/* Product List Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-right">
                <thead className="bg-gray-50 text-gray-600 font-medium text-sm">
                    <tr>
                    <th className="p-4">المنتج</th>
                    <th className="p-4">القسم</th>
                    <th className="p-4">السعر</th>
                    <th className="p-4 text-center">عمولة التسويق</th>
                    <th className="p-4 text-center">إجراءات</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                    <tr key={product.id} className="border-t border-gray-100 hover:bg-gray-50">
                        <td className="p-4 flex items-center gap-3">
                        <img src={product.image} alt="" className="w-12 h-12 rounded-lg object-cover border border-gray-200" />
                        <span className="font-bold text-gray-800">{product.name}</span>
                        </td>
                        <td className="p-4 text-gray-600">{product.category}</td>
                        <td className="p-4 font-bold">
                            {product.discountPrice && product.discountPrice > 0 ? (
                                <div>
                                    <span className="text-red-600">{product.discountPrice} د.م.</span>
                                    <span className="text-gray-400 line-through text-xs mr-2">{product.price}</span>
                                </div>
                            ) : (
                                <span>{product.price} د.م.</span>
                            )}
                        </td>
                         <td className="p-4 text-center">
                            {product.isAffiliateAvailable ? (
                                <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">{product.affiliateCommission}%</span>
                            ) : (
                                <span className="bg-gray-100 text-gray-500 px-2 py-1 rounded text-xs">غير مفعل</span>
                            )}
                        </td>
                        <td className="p-4">
                        <div className="flex justify-center gap-2">
                            <button onClick={() => handleEdit(product)} className="p-2 text-blue-600 hover:bg-blue-50 rounded" title="تعديل">
                            <Edit size={18} />
                            </button>
                            <button onClick={() => deleteProduct(product.id)} className="p-2 text-red-600 hover:bg-red-50 rounded" title="حذف">
                            <Trash size={18} />
                            </button>
                        </div>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
                {products.length === 0 && <div className="p-8 text-center text-gray-400">لا توجد منتجات</div>}
            </div>
        </>
      )}

      {activeTab === 'requests' && (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sellerRequests.length === 0 && (
                    <div className="col-span-3 text-center py-20 bg-white rounded-xl text-gray-400 border border-dashed border-gray-300">
                        <FileText size={48} className="mx-auto mb-4 opacity-50" />
                        <p>لا توجد طلبات تسجيل بائعين جديدة حالياً.</p>
                    </div>
                )}
                
                {sellerRequests.map(request => {
                    const profit = calculateNetProfit(request.productPrice, request.commissionRate);
                    return (
                        <div key={request.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
                            <div className="h-40 bg-gray-100 relative">
                                {request.images[0] ? (
                                    <img src={request.images[0]} alt="Product" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400"><ImageIcon /></div>
                                )}
                                <div className="absolute top-2 left-2">
                                    {getStatusBadge(request.status)}
                                </div>
                            </div>
                            
                            <div className="p-5 flex-grow">
                                <h3 className="font-bold text-lg text-gray-800 mb-1">{request.companyName}</h3>
                                <p className="text-sm text-gray-500 mb-4">{request.category}</p>
                                
                                <div className="space-y-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-100 mb-4">
                                    <div className="flex justify-between">
                                        <span>مقدم الطلب:</span>
                                        <span className="font-bold">{request.applicantName}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>الهاتف:</span>
                                        <span className="font-bold dir-ltr">{request.phone}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>المدينة:</span>
                                        <span className="font-bold">{request.city}</span>
                                    </div>
                                    <div className="flex justify-between border-t border-gray-200 pt-2 mt-2">
                                        <span>السعر المقترح:</span>
                                        <span className="font-bold text-gray-800">{request.productPrice} د.م.</span>
                                    </div>
                                    <div className="flex justify-between bg-green-50 p-1 rounded mt-1">
                                        <span className="text-green-800 flex items-center gap-1"><TrendingUp size={12} /> عمولة الموقع ({request.commissionRate}%):</span>
                                        <span className="font-bold text-green-800">+{profit.commissionAmount.toFixed(2)} د.م.</span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 border-t border-gray-100 bg-gray-50 flex gap-2">
                                {request.status === 'pending' ? (
                                    <>
                                        <button 
                                            onClick={() => updateRequestStatus(request.id, 'approved')}
                                            className="flex-1 bg-green-600 text-white py-2 rounded font-bold hover:bg-green-700 transition flex items-center justify-center gap-1 text-sm"
                                        >
                                            <Check size={16} /> قبول ونشر
                                        </button>
                                        <button 
                                            onClick={() => updateRequestStatus(request.id, 'rejected')}
                                            className="flex-1 bg-white border border-red-200 text-red-600 py-2 rounded font-bold hover:bg-red-50 transition flex items-center justify-center gap-1 text-sm"
                                        >
                                            <Ban size={16} /> رفض
                                        </button>
                                    </>
                                ) : (
                                    <button className="w-full text-center text-gray-400 text-sm cursor-default">
                                        تمت معالجة الطلب
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
      )}

      {activeTab === 'rfqs' && (
        <div className="space-y-6">
            {rfqs.length === 0 && (
                 <div className="text-center py-20 bg-white rounded-xl text-gray-400 border border-dashed border-gray-300">
                    <FileQuestion size={48} className="mx-auto mb-4 opacity-50" />
                    <p>لا توجد طلبات عروض أسعار جديدة.</p>
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rfqs.map(rfq => (
                    <div key={rfq.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="font-bold text-lg text-gray-800">{rfq.productName}</h3>
                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded font-bold">{rfq.category}</span>
                        </div>
                        <div className="space-y-2 text-sm text-gray-600">
                             <div className="flex justify-between"><span>الكمية:</span> <span className="font-bold">{rfq.quantity}</span></div>
                             <div className="flex justify-between"><span>السعر المستهدف:</span> <span className="font-bold">{rfq.targetPrice ? `${rfq.targetPrice} د.م.` : 'غير محدد'}</span></div>
                             <div className="border-t pt-2 mt-2">
                                 <p className="font-bold text-gray-700 mb-1">معلومات التواصل:</p>
                                 <p className="flex items-center gap-1"><User size={12} /> {rfq.contactName}</p>
                                 <p className="dir-ltr text-right flex items-center justify-end gap-1"><Percent size={12} /> {rfq.phone}</p>
                                 <p>{rfq.email}</p>
                             </div>
                             <div className="border-t pt-2 mt-2 bg-gray-50 p-2 rounded">
                                 <p className="font-bold text-gray-700 mb-1 text-xs">التفاصيل:</p>
                                 <p className="text-gray-500 text-xs">{rfq.details}</p>
                             </div>
                        </div>
                        <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
                             <span className="text-xs text-gray-400">{new Date(rfq.date).toLocaleDateString()}</span>
                             {getStatusBadge(rfq.status)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
      )}

      {activeTab === 'delivery' && (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {deliveryRequests.length === 0 && (
                    <div className="col-span-3 text-center py-20 bg-white rounded-xl text-gray-400 border border-dashed border-gray-300">
                        <Truck size={48} className="mx-auto mb-4 opacity-50" />
                        <p>لا توجد طلبات شركات توصيل جديدة حالياً.</p>
                    </div>
                )}
                
                {deliveryRequests.map(request => (
                    <div key={request.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
                        <div className="p-5 flex-grow">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="font-bold text-lg text-gray-800 mb-1">{request.companyName}</h3>
                                    <div className="flex items-center gap-1 text-xs text-gray-500">
                                        <Clock size={12} /> {new Date(request.date).toLocaleDateString('ar-EG')}
                                    </div>
                                </div>
                                {getStatusBadge(request.status)}
                            </div>
                            
                            <div className="space-y-3 text-sm text-gray-600 bg-gray-50 p-4 rounded-lg border border-gray-100">
                                <div className="flex justify-between border-b border-gray-200 pb-2">
                                    <span className="text-gray-500">المسؤول:</span>
                                    <span className="font-bold text-gray-800">{request.contactPerson}</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-200 pb-2">
                                    <span className="text-gray-500">الهاتف:</span>
                                    <span className="font-bold text-gray-800 dir-ltr">{request.phone}</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-200 pb-2">
                                    <span className="text-gray-500">المدينة:</span>
                                    <span className="font-bold text-gray-800">{request.city}</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-200 pb-2">
                                    <span className="text-gray-500">المركبة:</span>
                                    <span className="font-bold text-primary-600">{request.vehicleType}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">التغطية:</span>
                                    <span className="font-bold text-primary-600">{request.coverageArea}</span>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 border-t border-gray-100 bg-gray-50 flex gap-2">
                            {request.status === 'pending' ? (
                                <>
                                    <button 
                                        onClick={() => updateDeliveryRequestStatus(request.id, 'approved')}
                                        className="flex-1 bg-green-600 text-white py-2 rounded font-bold hover:bg-green-700 transition flex items-center justify-center gap-1 text-sm"
                                    >
                                        <Check size={16} /> قبول
                                    </button>
                                    <button 
                                        onClick={() => updateDeliveryRequestStatus(request.id, 'rejected')}
                                        className="flex-1 bg-white border border-red-200 text-red-600 py-2 rounded font-bold hover:bg-red-50 transition flex items-center justify-center gap-1 text-sm"
                                    >
                                        <Ban size={16} /> رفض
                                    </button>
                                </>
                            ) : (
                                <button className="w-full text-center text-gray-400 text-sm cursor-default">
                                    تمت معالجة الطلب
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
      )}

      {/* Edit Modal (Reused for Products) */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
             <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold">{isNew ? 'إضافة منتج جديد' : 'تعديل المنتج'}</h2>
              <button onClick={() => setEditingProduct(null)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-4">
               <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">اسم المنتج</label>
                  <input type="text" value={editingProduct.name} onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})} className="w-full p-2 border rounded outline-none" />
                </div>
                 <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">القسم</label>
                  <select value={editingProduct.category} onChange={(e) => setEditingProduct({...editingProduct, category: e.target.value as Category})} className="w-full p-2 border rounded outline-none">
                    {Object.values(Category).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
               </div>
               
               <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">السعر</label>
                  <input type="number" value={editingProduct.price} onChange={(e) => setEditingProduct({...editingProduct, price: Number(e.target.value)})} className="w-full p-2 border rounded outline-none" />
               </div>

                {/* Affiliate Settings */}
               <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                   <div className="flex items-center gap-2 mb-2">
                       <input 
                        type="checkbox" 
                        id="affiliate"
                        checked={editingProduct.isAffiliateAvailable} 
                        onChange={(e) => setEditingProduct({...editingProduct, isAffiliateAvailable: e.target.checked})}
                        className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                       />
                       <label htmlFor="affiliate" className="text-sm font-bold text-gray-700 cursor-pointer">تفعيل نظام التسويق بالعمولة (Affiliate)</label>
                   </div>
                   
                   {editingProduct.isAffiliateAvailable && (
                       <div>
                           <label className="block text-sm font-bold text-gray-700 mb-1">نسبة العمولة (%)</label>
                           <div className="relative">
                               <input 
                                type="number" 
                                min="0"
                                max="100"
                                value={editingProduct.affiliateCommission} 
                                onChange={(e) => setEditingProduct({...editingProduct, affiliateCommission: Number(e.target.value)})} 
                                className="w-full p-2 pl-8 border rounded outline-none" 
                                placeholder="مثال: 15"
                               />
                               <Percent size={14} className="absolute left-2 top-3 text-gray-400" />
                           </div>
                           <p className="text-xs text-gray-500 mt-1">سيحصل المسوق على هذه النسبة من سعر المنتج عند البيع.</p>
                       </div>
                   )}
               </div>
               
               <div className="flex justify-between items-center mb-1">
                   <label className="block text-sm font-bold text-gray-700">الوصف</label>
                   <button onClick={handleGenerateAI} disabled={!editingProduct.name || isGenerating} className="text-xs text-purple-600 flex items-center gap-1"><Sparkles size={14}/> {isGenerating ? '...' : 'AI'}</button>
               </div>
               <textarea rows={3} value={editingProduct.description} onChange={e => setEditingProduct({...editingProduct, description: e.target.value})} className="w-full p-2 border rounded outline-none"></textarea>

               <div>
                   <label className="block text-sm font-bold mb-1">الصورة الرئيسية</label>
                   <input type="file" onChange={handleMainImageUpload} className="block w-full text-sm text-gray-500" />
               </div>
            </div>

            <div className="p-6 border-t bg-gray-50 flex justify-end gap-3 rounded-b-2xl">
              <button onClick={() => setEditingProduct(null)} className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg">إلغاء</button>
              <button onClick={handleSave} className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center gap-2">
                <Save size={18} /> حفظ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;