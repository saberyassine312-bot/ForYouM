import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ShopProvider } from './context/ShopContext';
import { LanguageProvider } from './context/LanguageContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Admin from './pages/Admin';
import SellerRegistration from './pages/SellerRegistration';
import DeliveryPartnerRegistration from './pages/DeliveryPartnerRegistration';
import ComplaintPage from './pages/ComplaintPage';
import HelpCenter from './pages/HelpCenter';
import ContactUs from './pages/ContactUs';
import MobileApp from './pages/MobileApp';
import Wishlist from './pages/Wishlist';
import RequestQuotation from './pages/RequestQuotation';
import BuyerProtection from './pages/BuyerProtection';
import TradeAssurance from './pages/TradeAssurance';
import SuccessStories from './pages/SuccessStories';

// Component to handle scrolling to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Simple Seo component simulation
const SeoHead = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    let title = "FourYouM | Global Trade";
    if (pathname.includes('/shop')) title = "Shop | FourYouM";
    if (pathname.includes('/cart')) title = "Cart | FourYouM";
    if (pathname.includes('/checkout')) title = "Checkout | FourYouM";
    if (pathname.includes('/admin')) title = "Admin | FourYouM";
    if (pathname.includes('/sell')) title = "Sell with Us | FourYouM";
    if (pathname.includes('/delivery-partner')) title = "Delivery Partner | FourYouM";
    if (pathname.includes('/complaint')) title = "Submit Complaint | FourYouM";
    if (pathname.includes('/help')) title = "Help Center | FourYouM";
    if (pathname.includes('/contact')) title = "Contact Us | FourYouM";
    if (pathname.includes('/app')) title = "Get App | FourYouM";
    if (pathname.includes('/wishlist')) title = "Wishlist | FourYouM";
    if (pathname.includes('/rfq')) title = "Request Quotation | FourYouM";
    if (pathname.includes('/buyer-protection')) title = "Buyer Protection | FourYouM";
    if (pathname.includes('/trade-assurance')) title = "Trade Assurance | FourYouM";
    if (pathname.includes('/success-stories')) title = "Success Stories | FourYouM";
    document.title = title;
  }, [pathname]);
  return null;
};

function App() {
  return (
    <LanguageProvider>
      <ShopProvider>
        <Router>
          <ScrollToTop />
          <SeoHead />
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/sell" element={<SellerRegistration />} />
              <Route path="/delivery-partner" element={<DeliveryPartnerRegistration />} />
              <Route path="/complaint" element={<ComplaintPage />} />
              <Route path="/help" element={<HelpCenter />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/app" element={<MobileApp />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/rfq" element={<RequestQuotation />} />
              <Route path="/buyer-protection" element={<BuyerProtection />} />
              <Route path="/trade-assurance" element={<TradeAssurance />} />
              <Route path="/success-stories" element={<SuccessStories />} />
            </Routes>
          </Layout>
        </Router>
      </ShopProvider>
    </LanguageProvider>
  );
}

export default App;