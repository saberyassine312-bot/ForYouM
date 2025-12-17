import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem, Order, SellerRequest, RequestStatus, DeliveryPartnerRequest, Complaint, Review, Category, RFQ } from '../types';
import { INITIAL_PRODUCTS } from '../pages/constants';

interface ShopContextType {
  products: Product[];
  cart: CartItem[];
  wishlist: Product[];
  reviews: Review[];
  sellerRequests: SellerRequest[];
  deliveryRequests: DeliveryPartnerRequest[];
  rfqs: RFQ[];
  complaints: Complaint[];
  userInterest: Category | null;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateProductQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  updateProduct: (updatedProduct: Product) => void;
  addProduct: (newProduct: Product) => void;
  deleteProduct: (productId: string) => void;
  submitSellerRequest: (request: Omit<SellerRequest, 'id' | 'status' | 'date'>) => void;
  updateRequestStatus: (id: string, status: RequestStatus) => void;
  submitDeliveryRequest: (request: Omit<DeliveryPartnerRequest, 'id' | 'status' | 'date'>) => void;
  updateDeliveryRequestStatus: (id: string, status: RequestStatus) => void;
  submitRFQ: (request: Omit<RFQ, 'id' | 'status' | 'date'>) => void;
  submitComplaint: (complaint: Omit<Complaint, 'id' | 'status' | 'date'>) => string;
  resolveComplaint: (id: string) => void;
  addReview: (review: Omit<Review, 'id' | 'date'>) => void;
  getProductReviews: (productId: string) => Review[];
  getProductAverageRating: (productId: string) => number;
  trackUserInterest: (category: Category) => void;
  cartTotal: number;
  isCheckoutOpen: boolean;
  openCheckout: () => void;
  closeCheckout: () => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider = ({ children }: { children?: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [sellerRequests, setSellerRequests] = useState<SellerRequest[]>([]);
  const [deliveryRequests, setDeliveryRequests] = useState<DeliveryPartnerRequest[]>([]);
  const [rfqs, setRfqs] = useState<RFQ[]>([]);
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [userInterest, setUserInterest] = useState<Category | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Load data from local storage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('fouryoum_cart');
    const savedWishlist = localStorage.getItem('fouryoum_wishlist');
    const savedReviews = localStorage.getItem('fouryoum_reviews');
    const savedRequests = localStorage.getItem('fouryoum_seller_requests');
    const savedDeliveryRequests = localStorage.getItem('fouryoum_delivery_requests');
    const savedRfqs = localStorage.getItem('fouryoum_rfqs');
    const savedComplaints = localStorage.getItem('fouryoum_complaints');
    const savedInterest = localStorage.getItem('fouryoum_user_interest');
    
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    if (savedReviews) setReviews(JSON.parse(savedReviews));
    if (savedRequests) setSellerRequests(JSON.parse(savedRequests));
    if (savedDeliveryRequests) setDeliveryRequests(JSON.parse(savedDeliveryRequests));
    if (savedRfqs) setRfqs(JSON.parse(savedRfqs));
    if (savedComplaints) setComplaints(JSON.parse(savedComplaints));
    if (savedInterest) setUserInterest(savedInterest as Category);
  }, []);

  // Save to local storage on change
  useEffect(() => {
    localStorage.setItem('fouryoum_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('fouryoum_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('fouryoum_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('fouryoum_seller_requests', JSON.stringify(sellerRequests));
  }, [sellerRequests]);

  useEffect(() => {
    localStorage.setItem('fouryoum_delivery_requests', JSON.stringify(deliveryRequests));
  }, [deliveryRequests]);

  useEffect(() => {
    localStorage.setItem('fouryoum_rfqs', JSON.stringify(rfqs));
  }, [rfqs]);

  useEffect(() => {
    localStorage.setItem('fouryoum_complaints', JSON.stringify(complaints));
  }, [complaints]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateProductQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    setCart(prev => prev.map(item => 
      item.id === productId ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => setCart([]);

  // Wishlist Logic
  const toggleWishlist = (product: Product) => {
    setWishlist(prev => {
      const exists = prev.some(item => item.id === product.id);
      if (exists) {
        return prev.filter(item => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some(item => item.id === productId);
  };

  // Review Logic
  const addReview = (reviewData: Omit<Review, 'id' | 'date'>) => {
    const newReview: Review = {
      ...reviewData,
      id: Date.now().toString(),
      date: new Date().toISOString()
    };
    setReviews(prev => [newReview, ...prev]);
  };

  const getProductReviews = (productId: string) => {
    return reviews.filter(r => r.productId === productId);
  };

  const getProductAverageRating = (productId: string) => {
    const productReviews = getProductReviews(productId);
    if (productReviews.length === 0) return 0;
    const sum = productReviews.reduce((acc, r) => acc + r.rating, 0);
    return Number((sum / productReviews.length).toFixed(1));
  };

  // User Interest Tracking
  const trackUserInterest = (category: Category) => {
    setUserInterest(category);
    localStorage.setItem('fouryoum_user_interest', category);
  };

  // Product Management
  const updateProduct = (updatedProduct: Product) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const addProduct = (newProduct: Product) => {
    setProducts(prev => [...prev, newProduct]);
  };
  
  const deleteProduct = (productId: string) => {
      setProducts(prev => prev.filter(p => p.id !== productId));
  };

  // Seller Requests Management
  const submitSellerRequest = (requestData: Omit<SellerRequest, 'id' | 'status' | 'date'>) => {
    const newRequest: SellerRequest = {
      ...requestData,
      id: Date.now().toString(),
      status: 'pending',
      date: new Date().toISOString()
    };
    setSellerRequests(prev => [newRequest, ...prev]);
  };

  const updateRequestStatus = (id: string, status: RequestStatus) => {
    setSellerRequests(prev => prev.map(req => {
      if (req.id === id) {
        // If approved, create a product from the request automatically
        if (status === 'approved' && req.status !== 'approved') {
           const newProduct: Product = {
             id: `prod_${req.id}`,
             name: req.companyName, // Or product name if we split it
             price: req.productPrice,
             category: req.category,
             image: req.images[0] || 'https://via.placeholder.com/400',
             gallery: req.images.map(img => ({ type: 'image', url: img })),
             description: `منتج مقدم من البائع: ${req.applicantName} - ${req.companyName}. \nالعنوان: ${req.city}, ${req.address}`,
             isAffiliateAvailable: false,
             affiliateCommission: 0
           };
           addProduct(newProduct);
        }
        return { ...req, status };
      }
      return req;
    }));
  };

  // Delivery Requests Management
  const submitDeliveryRequest = (requestData: Omit<DeliveryPartnerRequest, 'id' | 'status' | 'date'>) => {
    const newRequest: DeliveryPartnerRequest = {
      ...requestData,
      id: Date.now().toString(),
      status: 'pending',
      date: new Date().toISOString()
    };
    setDeliveryRequests(prev => [newRequest, ...prev]);
  };

  const updateDeliveryRequestStatus = (id: string, status: RequestStatus) => {
      setDeliveryRequests(prev => prev.map(req => 
          req.id === id ? { ...req, status } : req
      ));
  };

  // RFQ Management
  const submitRFQ = (requestData: Omit<RFQ, 'id' | 'status' | 'date'>) => {
    const newRFQ: RFQ = {
      ...requestData,
      id: Date.now().toString(),
      status: 'pending',
      date: new Date().toISOString()
    };
    setRfqs(prev => [newRFQ, ...prev]);
  };

  // Complaint Management
  const submitComplaint = (complaintData: Omit<Complaint, 'id' | 'status' | 'date'>) => {
      const id = Date.now().toString();
      const newComplaint: Complaint = {
          ...complaintData,
          id,
          status: 'pending',
          date: new Date().toISOString()
      };
      setComplaints(prev => [newComplaint, ...prev]);
      return id;
  };

  const resolveComplaint = (id: string) => {
      setComplaints(prev => prev.map(c => c.id === id ? { ...c, status: 'resolved' } : c));
  };

  const openCheckout = () => setIsCheckoutOpen(true);
  const closeCheckout = () => setIsCheckoutOpen(false);

  const cartTotal = cart.reduce((total, item) => {
    const priceToUse = item.discountPrice && item.discountPrice > 0 ? item.discountPrice : item.price;
    return total + (priceToUse * item.quantity);
  }, 0);

  return (
    <ShopContext.Provider value={{ 
      products, 
      cart, 
      wishlist,
      reviews,
      sellerRequests,
      deliveryRequests,
      rfqs,
      complaints,
      userInterest,
      addToCart, 
      removeFromCart, 
      updateProductQuantity, 
      clearCart,
      toggleWishlist,
      isInWishlist,
      updateProduct,
      addProduct,
      deleteProduct,
      submitSellerRequest,
      updateRequestStatus,
      submitDeliveryRequest,
      updateDeliveryRequestStatus,
      submitRFQ,
      submitComplaint,
      resolveComplaint,
      addReview,
      getProductReviews,
      getProductAverageRating,
      trackUserInterest,
      cartTotal,
      isCheckoutOpen,
      openCheckout,
      closeCheckout
    }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) throw new Error("useShop must be used within ShopProvider");
  return context;
};