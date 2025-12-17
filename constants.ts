import { Category, Product } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'سماعات رأس لاسلكية احترافية',
    nameEn: 'Professional Wireless Headphones',
    price: 350,
    discountPrice: 299,
    category: Category.ELECTRONICS,
    image: 'https://picsum.photos/400/400?random=1',
    gallery: [
       { type: 'image', url: 'https://picsum.photos/400/400?random=1' },
       { type: 'image', url: 'https://picsum.photos/400/400?random=10' }
    ],
    description: 'سماعات عالية الجودة مع عزل ضوضاء وبطارية تدوم طويلاً.',
    descriptionEn: 'High-quality headphones with noise cancellation and long-lasting battery.',
    isAffiliateAvailable: true,
    affiliateCommission: 10
  },
  {
    id: '2',
    name: 'ساعة ذكية رياضية',
    nameEn: 'Sports Smart Watch',
    price: 200,
    category: Category.ELECTRONICS,
    image: 'https://picsum.photos/400/400?random=2',
    gallery: [],
    description: 'تتبع نبضات القلب والنشاط الرياضي بدقة عالية.',
    descriptionEn: 'Accurately track heart rate and sports activity.',
    isAffiliateAvailable: true,
    affiliateCommission: 8
  },
  {
    id: '3',
    name: 'قميص رجالي قطني',
    nameEn: 'Men\'s Cotton Shirt',
    price: 80,
    discountPrice: 65,
    category: Category.CLOTHING_MEN,
    image: 'https://picsum.photos/400/400?random=3',
    gallery: [],
    description: 'قميص أنيق مناسب للعمل والمناسبات الرسمية.',
    descriptionEn: 'Elegant shirt suitable for work and formal occasions.',
    isAffiliateAvailable: false,
    affiliateCommission: 0
  },
  {
    id: '4',
    name: 'فستان صيفي نسائي',
    nameEn: 'Women\'s Summer Dress',
    price: 150,
    category: Category.CLOTHING_WOMEN,
    image: 'https://picsum.photos/400/400?random=4',
    gallery: [],
    description: 'تصميم عصري ومريح بألوان زاهية.',
    descriptionEn: 'Modern and comfortable design with bright colors.',
    isAffiliateAvailable: true,
    affiliateCommission: 15
  },
  {
    id: '5',
    name: 'طقم ملابس أطفال',
    nameEn: 'Kids Clothing Set',
    price: 120,
    discountPrice: 99,
    category: Category.CLOTHING_KIDS,
    image: 'https://picsum.photos/400/400?random=5',
    gallery: [],
    description: 'خامات ناعمة ومريحة لبشرة الأطفال.',
    descriptionEn: 'Soft and comfortable materials for children\'s skin.',
    isAffiliateAvailable: false,
    affiliateCommission: 0
  },
  {
    id: '6',
    name: 'كنبة مودرن مريحة',
    nameEn: 'Modern Comfortable Sofa',
    price: 1200,
    category: Category.HOME_FURNITURE,
    image: 'https://picsum.photos/400/400?random=6',
    gallery: [],
    description: 'تصميم إسكندنافي يناسب جميع الديكورات.',
    descriptionEn: 'Scandinavian design fits all decors.',
    isAffiliateAvailable: true,
    affiliateCommission: 5
  },
  {
    id: '7',
    name: 'مصباح طاولة ذكي',
    nameEn: 'Smart Table Lamp',
    price: 90,
    category: Category.HOME_FURNITURE,
    image: 'https://picsum.photos/400/400?random=7',
    gallery: [],
    description: 'تحكم في الإضاءة عبر الهاتف.',
    descriptionEn: 'Control lighting via phone.',
    isAffiliateAvailable: true,
    affiliateCommission: 10
  },
  {
    id: '8',
    name: 'مجموعة أثقال رياضية',
    nameEn: 'Dumbbells Set',
    price: 300,
    category: Category.SPORTS,
    image: 'https://picsum.photos/400/400?random=8',
    gallery: [],
    description: 'مثالية للتمارين المنزلية وبناء العضلات.',
    descriptionEn: 'Perfect for home workouts and muscle building.',
    isAffiliateAvailable: true,
    affiliateCommission: 12
  }
];

export const SOCIAL_LINKS = {
  facebook: 'https://www.facebook.com/profile.php?id=61577708520745',
  twitter: 'https://twitter.com',
  instagram: 'https://instagram.com'
};