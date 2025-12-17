
export enum Category {
  ELECTRONICS = 'إلكترونيات',
  CLOTHING_MEN = 'ملابس رجالية',
  CLOTHING_WOMEN = 'ملابس نسائية',
  CLOTHING_KIDS = 'ملابس أطفال',
  HOME_FURNITURE = 'أثاث ومنزل',
  SPORTS = 'معدات رياضية',
  BEAUTY = 'منتجات التجميل',
  HEALTH = 'منتجات الصحة',
  HOME_APPLIANCES = 'الأجهزة المنزلية',
  PETS = 'منتجات الحيونات الأليفة',
  FOOD = 'الطعام',
  BOOKS = 'الكتب',
  OTHER = 'أخرى'
}

export type MediaType = 'image' | 'video';

export interface MediaItem {
  type: MediaType;
  url: string;
}

export interface Product {
  id: string;
  name: string;
  nameEn?: string; // English Name
  price: number;
  discountPrice?: number; // New field for sale price
  category: Category;
  image: string; // Main Thumbnail
  gallery: MediaItem[]; // Additional images and videos
  description: string;
  descriptionEn?: string; // English Description
  isAffiliateAvailable: boolean;
  affiliateCommission: number; // Percentage
}

export interface CartItem extends Product {
  quantity: number;
}

export interface UserInfo {
  fullName: string;
  city: string;
  address: string;
  phone: string;
}

export interface Order {
  id: string;
  userInfo: UserInfo;
  items: CartItem[];
  total: number;
  date: string;
}

export type RequestStatus = 'pending' | 'approved' | 'rejected';

export interface SellerRequest {
  id: string;
  companyName: string;
  category: Category;
  applicantName: string;
  city: string;
  address: string;
  phone: string; // Added phone for contact
  productPrice: number;
  commissionRate: number; // Added calculated commission rate
  images: string[]; // Up to 4 images
  status: RequestStatus;
  date: string;
}

export interface DeliveryPartnerRequest {
  id: string;
  companyName: string;
  contactPerson: string;
  phone: string;
  city: string;
  vehicleType: string; // e.g., 'Motorcycle', 'Van', 'Truck'
  coverageArea: string; // e.g., 'Local', 'National'
  status: RequestStatus;
  date: string;
}

export interface RFQ {
  id: string;
  productName: string;
  category: Category;
  quantity: number;
  targetPrice?: number;
  details: string;
  contactName: string;
  email: string;
  phone: string;
  status: RequestStatus;
  date: string;
}

export type ComplaintType = 'delay' | 'broken' | 'other';

export interface Complaint {
  id: string;
  type: ComplaintType;
  description: string;
  contactInfo: string; // Phone or Email
  image?: string; // Base64 image
  status: 'pending' | 'resolved';
  date: string;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  rating: number; // 1-6
  comment?: string; // Optional
  date: string;
}