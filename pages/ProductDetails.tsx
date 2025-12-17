import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, Share2, Check, Shield, MessageSquare, Building2, Crown, PlayCircle, Facebook, Twitter, Link as LinkIcon, Phone, Heart, Star, Send, ChevronRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { useLanguage } from '../context/LanguageContext';
import { MediaItem } from '../types';
import { getCategoryTranslation } from '../utils/translations';

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, addToCart, openCheckout, toggleWishlist, isInWishlist, addReview, getProductReviews, getProductAverageRating, trackUserInterest } = useShop();
  const { language, t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeMedia, setActiveMedia] = useState<MediaItem | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'reviews'>('overview');
  
  // Review Form State
  const [reviewForm, setReviewForm] = useState({ userName: '', rating: 6 });
  const [isReviewSubmitted, setIsReviewSubmitted] = useState(false);

  const product = products.find(p => p.id === id);
  const reviews = product ? getProductReviews(product.id) : [];
  const avgRating = product ? getProductAverageRating(product.id) : 0;

  useEffect(() => {
    if (product) {
        setActiveMedia({ type: 'image', url: product.image });
        // Track user interest
        trackUserInterest(product.category);
    }
  }, [product, trackUserInterest]);

  if (!product) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">{t('details.not_found')}</h2>
        <button onClick={() => navigate('/shop')} className="text-primary-600 hover:underline">{t('details.back')}</button>
      </div>
    );
  }

  const displayName = language === 'en' && product.nameEn ? product.nameEn : product.name;
  const displayDesc = language === 'en' && product.descriptionEn ? product.descriptionEn : product.description;
  const isWishlisted = isInWishlist(product.id);

  const allMedia: MediaItem[] = [{ type: 'image', url: product.image }, ...product.gallery];
  const hasDiscount = product.discountPrice && product.discountPrice > 0;
  const priceToDisplay = hasDiscount ? product.discountPrice : product.price;

  const handleCopyAffiliate = () => {
    const affiliateLink = `${window.location.origin}/#/product/${product.id}?ref=PARTNER_${Math.floor(Math.random() * 10000)}`;
    navigator.clipboard.writeText(affiliateLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleShare = (platform: 'facebook' | 'twitter' | 'whatsapp') => {
    const shareUrl = window.location.href;
    const shareText = `Check out ${displayName} on FourYouM!`;
    let url = '';

    switch (platform) {
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
        break;
      case 'whatsapp':
        url = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
        break;
    }
    window.open(url, '_blank', 'width=600,height=400');
  };

  const handleStartOrder = () => {
    addToCart(product);
    openCheckout();
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!product) return;
      addReview({
          productId: product.id,
          userName: reviewForm.userName,
          rating: reviewForm.rating,
          comment: ''
      });
      setIsReviewSubmitted(true);
      setReviewForm({ userName: '', rating: 6 });
      setTimeout(() => setIsReviewSubmitted(false), 3000);
  };

  return (
    <div className="bg-gray-100 min-h-screen py-6">
      <div className="container mx-auto px-4">
        
        {/* Breadcrumb */}
        <div className="text-xs text-gray-500 mb-4 flex gap-1 items-center">
            <span onClick={() => navigate('/')} className="cursor-pointer hover:text-primary-600">{t('nav.home')}</span>
            <ChevronRight size={12} className="rtl:rotate-180" />
            <span onClick={() => navigate(`/shop?category=${product.category}`)} className="cursor-pointer hover:text-primary-600">{getCategoryTranslation(product.category, t)}</span>
            <ChevronRight size={12} className="rtl:rotate-180" />
            <span className="text-gray-800 truncate max-w-xs">{displayName}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
          {/* Main Content */}
          <div className="lg:col-span-9 space-y-4">
              
              {/* Product Top Section */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                  <div className="flex flex-col md:flex-row gap-8">
                      {/* Gallery */}
                      <div className="w-full md:w-[40%]">
                          <div className="aspect-square bg-white rounded border border-gray-200 mb-3 flex items-center justify-center relative overflow-hidden">
                              {activeMedia?.type === 'video' ? (
                                  <video src={activeMedia.url} controls className="w-full h-full object-contain" />
                              ) : (
                                  <img src={activeMedia?.url || product.image} alt={displayName} className="w-full h-full object-contain" />
                              )}
                          </div>
                          <div className="flex gap-2 overflow-x-auto pb-1">
                              {allMedia.map((item, idx) => (
                                  <div 
                                    key={idx} 
                                    onClick={() => setActiveMedia(item)}
                                    className={`w-14 h-14 rounded border cursor-pointer shrink-0 ${activeMedia?.url === item.url ? 'border-primary-600 ring-1 ring-primary-600' : 'border-gray-200'}`}
                                  >
                                      {item.type === 'video' ? <div className="bg-black w-full h-full"><PlayCircle className="text-white m-auto mt-4" size={20}/></div> : <img src={item.url} className="w-full h-full object-cover" alt="" />}
                                  </div>
                              ))}
                          </div>
                      </div>

                      {/* Info */}
                      <div className="flex-1">
                          <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{displayName}</h1>
                          
                          <div className="bg-gray-50 p-4 rounded border border-gray-200 mb-6">
                              <div className="flex items-baseline gap-2 mb-1">
                                  <span className="text-3xl font-bold text-primary-600">{priceToDisplay}</span>
                                  <span className="text-gray-600 text-sm">{t('common.currency')} / {t('card.piece')}</span>
                              </div>
                              {hasDiscount && (
                                <div className="text-xs text-gray-400 line-through">{product.price} {t('common.currency')}</div>
                              )}
                              <div className="text-xs font-bold text-gray-500 mt-2">{t('card.min_order')}</div>
                          </div>

                          {/* Key Attributes */}
                          <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-600 mb-6">
                              <div className="flex gap-2"><span className="text-gray-400 w-24">{t('details.warranty')}</span> <span className="font-medium">{t('details.warranty_val')}</span></div>
                              <div className="flex gap-2"><span className="text-gray-400 w-24">After-sales:</span> <span className="font-medium">Online Support</span></div>
                              <div className="flex gap-2"><span className="text-gray-400 w-24">Location:</span> <span className="font-medium">Morocco</span></div>
                              <div className="flex gap-2"><span className="text-gray-400 w-24">Payment:</span> <span className="font-medium">Cash, Card, PayPal</span></div>
                          </div>

                          {/* Social Share */}
                          <div className="flex items-center gap-4 border-t border-gray-100 pt-4">
                              <span className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                  <Share2 size={16} /> {t('details.share')}
                              </span>
                              <div className="flex gap-2">
                                  <button onClick={() => handleShare('facebook')} className="w-9 h-9 rounded-full bg-[#1877F2]/10 text-[#1877F2] flex items-center justify-center hover:bg-[#1877F2] hover:text-white transition" title="Facebook">
                                      <Facebook size={18} />
                                  </button>
                                  <button onClick={() => handleShare('twitter')} className="w-9 h-9 rounded-full bg-[#1DA1F2]/10 text-[#1DA1F2] flex items-center justify-center hover:bg-[#1DA1F2] hover:text-white transition" title="Twitter">
                                      <Twitter size={18} />
                                  </button>
                                  <button onClick={() => handleShare('whatsapp')} className="w-9 h-9 rounded-full bg-[#25D366]/10 text-[#25D366] flex items-center justify-center hover:bg-[#25D366] hover:text-white transition" title="WhatsApp">
                                      <MessageSquare size={18} />
                                  </button>
                                  <button onClick={handleCopyLink} className="w-9 h-9 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-gray-600 hover:text-white transition" title={t('details.copy')}>
                                      {copiedLink ? <Check size={18} /> : <LinkIcon size={18} />}
                                  </button>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>

              {/* Tabs Section */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm min-h-[400px]">
                   <div className="border-b border-gray-200 mb-6 flex gap-8">
                      <button onClick={() => setActiveTab('overview')} className={`pb-3 border-b-2 font-bold ${activeTab === 'overview' ? 'border-primary-600 text-primary-600' : 'border-transparent text-gray-500'}`}>{t('details.overview')}</button>
                      <button onClick={() => setActiveTab('reviews')} className={`pb-3 border-b-2 font-bold ${activeTab === 'reviews' ? 'border-primary-600 text-primary-600' : 'border-transparent text-gray-500'}`}>{t('reviews.title')}</button>
                  </div>
                  
                  {activeTab === 'overview' && (
                      <div className="text-gray-800 leading-relaxed">
                          <h3 className="font-bold text-lg mb-4">Product Description</h3>
                          <p>{displayDesc}</p>
                          <div className="mt-8 border-t pt-4">
                              <h4 className="font-bold mb-2">Detailed Images</h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  {product.gallery.map((media, i) => (
                                      media.type === 'image' && <img key={i} src={media.url} alt="" className="w-full rounded border border-gray-100" />
                                  ))}
                              </div>
                          </div>
                      </div>
                  )}

                  {activeTab === 'reviews' && (
                      <div className="text-gray-600">
                          {/* Rating Form & List (Same as before but cleaner) */}
                          <div className="flex items-center gap-4 mb-6 bg-gray-50 p-4 rounded">
                              <div className="text-4xl font-bold text-gray-900">{avgRating}</div>
                              <div>
                                  <div className="flex text-yellow-400 text-sm">{[...Array(6)].map((_, i) => <Star key={i} size={14} fill={i < Math.round(avgRating) ? "currentColor" : "none"} className={i < Math.round(avgRating) ? "text-yellow-400" : "text-gray-300"} />)}</div>
                                  <div className="text-xs text-gray-500">{reviews.length} Ratings</div>
                              </div>
                          </div>
                          
                          <div className="mb-8">
                             <h4 className="font-bold text-sm mb-2">{t('reviews.write')}</h4>
                             <form onSubmit={handleReviewSubmit} className="flex gap-2">
                                <input required type="text" placeholder={t('reviews.name')} value={reviewForm.userName} onChange={e => setReviewForm({...reviewForm, userName: e.target.value})} className="border p-2 rounded text-sm flex-1" />
                                <button type="submit" className="bg-primary-600 text-white px-4 py-2 rounded text-sm font-bold">{t('reviews.submit')}</button>
                             </form>
                             {isReviewSubmitted && <div className="text-green-600 text-sm mt-2">{t('reviews.success')}</div>}
                          </div>

                          <div className="space-y-4">
                              {reviews.map(review => (
                                  <div key={review.id} className="border-b pb-4">
                                      <div className="flex justify-between mb-1">
                                          <span className="font-bold text-gray-800 text-sm">{review.userName}</span>
                                          <div className="flex text-yellow-400 text-xs">{[...Array(6)].map((_, i) => <Star key={i} size={10} fill={i < review.rating ? "currentColor" : "none"} className={i < review.rating ? "text-yellow-400" : "text-gray-300"} />)}</div>
                                      </div>
                                      <div className="text-xs text-gray-400">{new Date(review.date).toLocaleDateString()}</div>
                                  </div>
                              ))}
                          </div>
                      </div>
                  )}
              </div>
          </div>

          {/* Sidebar (Supplier & Actions) */}
          <div className="lg:col-span-3 space-y-4">
              
              {/* Supplier Card */}
              <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                  <h3 className="font-bold text-gray-700 text-xs uppercase mb-3 text-center">Sold By</h3>
                  <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center font-bold text-gray-400">
                          <Building2 size={20} />
                      </div>
                      <div>
                          <div className="font-bold text-sm text-primary-700">FourYouM Global</div>
                          <div className="text-[10px] text-gray-500 font-bold bg-gray-100 px-1 rounded w-fit">CN | 3 YRS</div>
                      </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[10px] text-gray-600 bg-gray-50 p-2 rounded mb-4">
                       <div className="flex flex-col items-center border-r border-gray-200">
                           <span className="font-bold text-gray-800">4.8/5</span>
                           <span>Rating</span>
                       </div>
                       <div className="flex flex-col items-center">
                           <span className="font-bold text-gray-800">98%</span>
                           <span>Response</span>
                       </div>
                  </div>
                  <div className="flex gap-2">
                      <button className="flex-1 border border-gray-300 rounded py-1 text-xs hover:bg-gray-50 font-bold">Follow</button>
                      <button className="flex-1 border border-gray-300 rounded py-1 text-xs hover:bg-gray-50 font-bold">Visit Store</button>
                  </div>
              </div>

              {/* Action Card (Sticky) */}
              <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm sticky top-24">
                  <h3 className="font-bold text-gray-800 mb-4 text-sm">{t('details.send_inquiry')}</h3>
                  
                  <div className="space-y-3">
                       <button 
                        onClick={() => navigate('/contact')}
                        className="w-full bg-white text-primary-600 border border-primary-600 py-2.5 rounded font-bold hover:bg-primary-50 transition flex items-center justify-center gap-2 text-sm"
                      >
                          <MessageSquare size={16} /> {t('details.message_supplier')}
                      </button>
                      
                       <button 
                        onClick={handleStartOrder}
                        className="w-full bg-primary-600 text-white py-2.5 rounded font-bold hover:bg-primary-700 shadow-md transition text-sm"
                      >
                        {t('details.start_order')}
                      </button>
                      
                      <button 
                        onClick={() => addToCart(product)}
                        className="w-full bg-white text-gray-700 border border-gray-300 py-2.5 rounded font-bold hover:bg-gray-50 transition flex items-center justify-center gap-2 text-sm"
                      >
                          <ShoppingCart size={16} /> {t('common.add_to_cart')}
                      </button>
                  </div>

                  {product.isAffiliateAvailable && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                         <button 
                            onClick={handleCopyAffiliate}
                            className={`w-full py-2 rounded text-xs flex items-center justify-center gap-2 transition font-bold ${
                                copied ? 'text-green-600 bg-green-50' : 'text-gray-500 hover:text-gray-800'
                            }`}
                        >
                            {copied ? t('details.code_copied') : t('details.affiliate')}
                        </button>
                    </div>
                  )}
              </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetails;