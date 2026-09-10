import { Product } from '../types';

export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: 'google-logo-hoodie',
    name: 'Google Logo Hoodie',
    category: 'Hoodies',
    subCategory: 'Apparel',
    price: 3999,
    originalPrice: 4999,
    rating: 4.8,
    reviewCount: 124,
    badge: 'Best Seller',
    isBestSeller: true,
    isNewArrival: false,
    inStock: true,
    stockCount: 42,
    material: '80% Organic Combed Cotton, 20% Recycled Polyester Fleece',
    dimensions: 'Standard unisex fit (Pre-shrunk)',
    description: 'The iconic Google Logo Hoodie crafted from ultra-soft heavy fleece. Features subtle embroidered Google 4-color crest on chest, ribbed cuffs, and a kangaroo front pouch.',
    features: [
      'Heavyweight 360 GSM ultra-soft brushed fleece',
      'Embroidered multi-color Google chest insignia',
      'Reinforced double-stitched kangaroo pocket with hidden earbud cable port',
      'Ethically crafted with organic sustainable cotton'
    ],
    colors: [
      { name: 'Charcoal Black', hex: '#202124' },
      { name: 'Heather Grey', hex: '#80868b' },
      { name: 'Google Blue', hex: '#1a73e8' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: {
      front: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80',
      back: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=800&auto=format&fit=crop&q=80',
      detail: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=800&auto=format&fit=crop&q=80',
      lifestyle: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=80'
    }
  },
  {
    id: 'google-classic-tshirt',
    name: 'Google Spectrum Classic T-Shirt',
    category: 'T-Shirts',
    subCategory: 'Apparel',
    price: 1499,
    originalPrice: 1999,
    rating: 4.9,
    reviewCount: 289,
    badge: 'Popular',
    isBestSeller: true,
    isNewArrival: false,
    inStock: true,
    stockCount: 85,
    material: '100% Ring-Spun Pima Cotton (180 GSM)',
    dimensions: 'Regular fit crew neck',
    description: 'A timeless staple featuring the Google wordmark across the chest in vibrant pigment ink that will not crack or fade after repeated washes.',
    features: [
      'Silky smooth breathable 100% Pima cotton',
      'Shoulder-to-shoulder taping for shape retention',
      'Tagless comfort label at neck',
      'Eco-friendly water-based discharge inks'
    ],
    colors: [
      { name: 'Pure White', hex: '#f8f9fa' },
      { name: 'Slate Black', hex: '#1f1f1f' },
      { name: 'Navy Blue', hex: '#174ea6' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: {
      front: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80',
      back: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&auto=format&fit=crop&q=80',
      detail: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&auto=format&fit=crop&q=80',
      lifestyle: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=800&auto=format&fit=crop&q=80'
    }
  },
  {
    id: 'google-dino-sweatshirt',
    name: 'Chrome Dino 404 Sweatshirt',
    category: 'Hoodies',
    subCategory: 'Apparel',
    price: 3299,
    originalPrice: 3899,
    rating: 4.7,
    reviewCount: 98,
    badge: 'Trending',
    isBestSeller: false,
    isNewArrival: true,
    inStock: true,
    stockCount: 30,
    material: '85% Organic Cotton, 15% Recycled Polyester',
    dimensions: 'Relaxed fit with ribbed hem and collar',
    description: 'Pay homage to the beloved offline Chrome Dinosaur game with this minimalist embroidered pixel dino sweater.',
    features: [
      'Detailed 8-bit pixel embroidery of Chrome T-Rex & cactus',
      'Ultra soft brushed fleece interior',
      'Ribbed knit cuffs and collar',
      'Official Chrome offline easter egg graphic inside collar'
    ],
    colors: [
      { name: 'Heather Grey', hex: '#9aa0a6' },
      { name: 'Charcoal Black', hex: '#202124' },
      { name: 'Pine Green', hex: '#137333' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: {
      front: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&auto=format&fit=crop&q=80',
      back: 'https://images.unsplash.com/photo-1544441893-675973e31985?w=800&auto=format&fit=crop&q=80',
      detail: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&auto=format&fit=crop&q=80',
      lifestyle: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&auto=format&fit=crop&q=80'
    }
  },
  {
    id: 'google-thermal-water-bottle',
    name: 'Google Vacuum Insulated Thermal Bottle (750ml)',
    category: 'Drinkware',
    subCategory: 'Accessories',
    price: 1899,
    originalPrice: 2299,
    rating: 4.9,
    reviewCount: 310,
    badge: 'Eco-Friendly',
    isBestSeller: true,
    isNewArrival: false,
    inStock: true,
    stockCount: 110,
    material: '18/8 Pro-Grade Stainless Steel with Powder Coat',
    dimensions: '27.5 cm × 7.5 cm (Fits car cup holders)',
    description: 'Double-walled vacuum insulation keeps your drinks cold for 24 hours or piping hot for 12 hours. Laser engraved Google logo with leak-proof loop cap.',
    features: [
      'Keeps cold for 24 hrs, hot for 12 hrs',
      'Sweat-proof powder coated matte finish',
      'BPA-free & food grade 304 stainless steel',
      'Flexible carry handle cap for easy travel'
    ],
    colors: [
      { name: 'Matte Obsidian', hex: '#202124' },
      { name: 'Chalk White', hex: '#f1f3f4' },
      { name: 'Mint Green', hex: '#ceead6' },
      { name: 'Coral Red', hex: '#f28b82' }
    ],
    sizes: ['750ml'],
    images: {
      front: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&auto=format&fit=crop&q=80',
      back: 'https://images.unsplash.com/photo-1589365278144-c9e705f843ba?w=800&auto=format&fit=crop&q=80',
      detail: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80',
      lifestyle: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=800&auto=format&fit=crop&q=80'
    }
  },
  {
    id: 'google-campus-backpack',
    name: 'Google Commuter Daypack & Tech Backpack (22L)',
    category: 'Bags',
    subCategory: 'Accessories',
    price: 4499,
    originalPrice: 5499,
    rating: 4.9,
    reviewCount: 178,
    badge: 'Staff Pick',
    isBestSeller: true,
    isNewArrival: false,
    inStock: true,
    stockCount: 25,
    material: 'Water-resistant Recycled Cordura® 600D Ballistic Nylon',
    dimensions: '46 cm × 31 cm × 16 cm (16" Laptop Compatible)',
    description: 'Designed in Mountain View for tech enthusiasts on the move. Features a suspended padded compartment for laptops up to 16", luggage trolley sleeve, and hidden passport security pocket.',
    features: [
      'Padded 16" laptop sleeve with faux-fur scratch-free lining',
      'Water-repellent YKK coated weather zippers',
      'Ergonomic airflow breathable back cushion system',
      'Quick-access magnetic key leash & sunglasses compartment'
    ],
    colors: [
      { name: 'Charcoal Grey', hex: '#3c4043' },
      { name: 'Midnight Blue', hex: '#1a237e' }
    ],
    sizes: ['22 Liters'],
    images: {
      front: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80',
      back: 'https://images.unsplash.com/photo-1546938576-6e6a64f317cc?w=800&auto=format&fit=crop&q=80',
      detail: 'https://images.unsplash.com/photo-1577733966973-d680bffd2e80?w=800&auto=format&fit=crop&q=80',
      lifestyle: 'https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=800&auto=format&fit=crop&q=80'
    }
  },
  {
    id: 'google-ceramic-mug',
    name: 'Google 4-Color Accent Ceramic Mug (400ml)',
    category: 'Drinkware',
    subCategory: 'Office',
    price: 899,
    originalPrice: 1199,
    rating: 4.7,
    reviewCount: 215,
    badge: 'Essential',
    isBestSeller: true,
    isNewArrival: false,
    inStock: true,
    stockCount: 65,
    material: 'High-density Vitrified Ceramic with Glazed Interior',
    dimensions: '10 cm H × 8.5 cm Dia',
    description: 'Start your coding sessions with the classic Google Ceramic Mug. Microwave and dishwasher safe with comfortable ergonomic D-handle and colored rim accent.',
    features: [
      'Microwave and commercial dishwasher safe',
      'Generous 400ml / 14oz capacity for coffee or tea',
      'Non-toxic lead-free food-safe gloss ceramic',
      'Embossed tactile Google "G" logo'
    ],
    colors: [
      { name: 'Stark White', hex: '#ffffff' },
      { name: 'Matte Grey', hex: '#5f6368' }
    ],
    sizes: ['400ml'],
    images: {
      front: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80',
      back: 'https://images.unsplash.com/photo-1577937927133-66ef06acdf18?w=800&auto=format&fit=crop&q=80',
      detail: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=800&auto=format&fit=crop&q=80',
      lifestyle: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&auto=format&fit=crop&q=80'
    }
  },
  {
    id: 'google-embroidered-cap',
    name: 'Google Chrome Dino Baseball Dad Cap',
    category: 'Accessories',
    subCategory: 'Apparel',
    price: 1199,
    originalPrice: 1499,
    rating: 4.8,
    reviewCount: 142,
    badge: 'New',
    isBestSeller: false,
    isNewArrival: true,
    inStock: true,
    stockCount: 48,
    material: '100% Washed Chino Cotton Twill',
    dimensions: 'Adjustable brass buckle strap (One Size Fits All)',
    description: 'Unstructured low-profile 6-panel cap featuring high-density embroidery of the Chrome Dinosaur. Pre-curved visor with matching undervisor.',
    features: [
      'Antique brass tri-glide buckle slider',
      'Embroidered ventilation eyelets',
      'Soft interior sweatband for all-day comfort',
      'Pre-curved bill with reinforced stitching'
    ],
    colors: [
      { name: 'Washed Black', hex: '#202124' },
      { name: 'Khaki Sand', hex: '#d7ccc8' },
      { name: 'Forest Green', hex: '#1b5e20' }
    ],
    sizes: ['One Size'],
    images: {
      front: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&auto=format&fit=crop&q=80',
      back: 'https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?w=800&auto=format&fit=crop&q=80',
      detail: 'https://images.unsplash.com/photo-1534215754734-18e55d13e346?w=800&auto=format&fit=crop&q=80',
      lifestyle: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=800&auto=format&fit=crop&q=80'
    }
  },
  {
    id: 'android-bugdroid-tshirt',
    name: 'Android Bugdroid Geometric Tee',
    category: 'T-Shirts',
    subCategory: 'Apparel',
    price: 1599,
    originalPrice: 1999,
    rating: 4.8,
    reviewCount: 167,
    badge: 'Popular',
    isBestSeller: true,
    isNewArrival: false,
    inStock: true,
    stockCount: 52,
    material: '100% Organic Super-combed Cotton',
    dimensions: 'Athletic cut crewneck',
    description: 'Celebrate the modern 3D Android mascot with this vibrant print t-shirt. Soft, breathable, and pre-shrunk for an enduring fit.',
    features: [
      'Official 3D Android Bugdroid chest graphic',
      'Bio-washed for zero shrinkage and ultra softness',
      'Reinforced neckband',
      'Certified OEKO-TEX standard fabric'
    ],
    colors: [
      { name: 'Android Green', hex: '#3ddc84' },
      { name: 'Obsidian Black', hex: '#1f1f1f' },
      { name: 'Heather Grey', hex: '#9aa0a6' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: {
      front: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop&q=80',
      back: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80',
      detail: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&auto=format&fit=crop&q=80',
      lifestyle: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=800&auto=format&fit=crop&q=80'
    }
  },
  {
    id: 'google-tech-socks-pack',
    name: 'Google Spectrum Crew Socks (3-Pack)',
    category: 'Accessories',
    subCategory: 'Apparel',
    price: 799,
    originalPrice: 999,
    rating: 4.9,
    reviewCount: 340,
    badge: 'Best Seller',
    isBestSeller: true,
    isNewArrival: false,
    inStock: true,
    stockCount: 140,
    material: '78% Combed Cotton, 20% Polyamide, 2% Elastane',
    dimensions: 'Unisex Crew Length (UK 6-11 / EU 39-46)',
    description: 'Cushioned crew socks featuring Google’s iconic primary colors along the ribbing. Features arch support compression and seamless hand-linked toe.',
    features: [
      'Targeted arch support compression band',
      'Reinforced cushioned heel and toe',
      'Seamless toe closure prevents friction blisters',
      '3 distinct colorway designs in each box'
    ],
    colors: [
      { name: 'Multi Trio', hex: '#4285f4' },
      { name: 'Monochrome Trio', hex: '#3c4043' }
    ],
    sizes: ['One Size (6-11)'],
    images: {
      front: 'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=800&auto=format&fit=crop&q=80',
      back: 'https://images.unsplash.com/photo-1582966770380-496c006c9b3d?w=800&auto=format&fit=crop&q=80',
      detail: 'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=800&auto=format&fit=crop&q=80',
      lifestyle: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&auto=format&fit=crop&q=80'
    }
  },
  {
    id: 'google-io-notebook-pen',
    name: 'Google I/O Hardcover Journal & Rollerball Pen Set',
    category: 'Office',
    subCategory: 'Accessories',
    price: 1499,
    originalPrice: 1899,
    rating: 4.8,
    reviewCount: 112,
    badge: 'New',
    isBestSeller: false,
    isNewArrival: true,
    inStock: true,
    stockCount: 45,
    material: 'FSC Certified 100 GSM Acid-Free Dotted Paper, Vegan Leather',
    dimensions: 'A5 (14.8 cm × 21 cm) - 192 Pages',
    description: 'Designed for engineers and designers. Features dot-grid pages, ribbon bookmark, expanding back pocket, and a precision weighted aluminum Google ballpoint pen.',
    features: [
      '192 bleed-resistant 100 GSM dotted numbered pages',
      'Lay-flat 180° binding for comfortable desk drafting',
      'Includes refillable anodized matte aluminum rollerball pen (0.5mm)',
      'Rear document accordion pocket and elastic closure band'
    ],
    colors: [
      { name: 'Matte Obsidian', hex: '#202124' },
      { name: 'Google Blue', hex: '#1a73e8' }
    ],
    sizes: ['A5 Size'],
    images: {
      front: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80',
      back: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=800&auto=format&fit=crop&q=80',
      detail: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&auto=format&fit=crop&q=80',
      lifestyle: 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?w=800&auto=format&fit=crop&q=80'
    }
  },
  {
    id: 'google-laptop-sleeve',
    name: 'Google Cloud Tech Laptop Sleeve (14–16")',
    category: 'Office',
    subCategory: 'Bags',
    price: 1999,
    originalPrice: 2499,
    rating: 4.8,
    reviewCount: 94,
    badge: 'Staff Pick',
    isBestSeller: false,
    isNewArrival: false,
    inStock: true,
    stockCount: 38,
    material: 'Weather-Resistant Neoprene with 360° Shock Absorption Edge',
    dimensions: '37 cm × 26 cm × 2.5 cm',
    description: 'Form-fitting protection for your Chromebook, Pixelbook, or MacBook. Thick bubble-foam interior padding guards against bumps, drops, and scratches.',
    features: [
      '360° reinforced corner guard protective bumpers',
      'Front zippered organizer pocket for charger, mouse, and cables',
      'Plush faux-fur scratch-resistant interior',
      'Waterproof nylon exterior coating'
    ],
    colors: [
      { name: 'Slate Grey', hex: '#5f6368' },
      { name: 'Navy Blue', hex: '#174ea6' }
    ],
    sizes: ['14-inch', '16-inch'],
    images: {
      front: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80',
      back: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&auto=format&fit=crop&q=80',
      detail: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop&q=80',
      lifestyle: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80'
    }
  },
  {
    id: 'google-canvas-tote',
    name: 'Google Pixel Heritage Heavyweight Canvas Tote',
    category: 'Bags',
    subCategory: 'Accessories',
    price: 1299,
    originalPrice: 1599,
    rating: 4.7,
    reviewCount: 88,
    badge: 'Eco-Friendly',
    isBestSeller: false,
    isNewArrival: true,
    inStock: true,
    stockCount: 60,
    material: '100% Unbleached 16oz Heavy Organic Cotton Canvas',
    dimensions: '42 cm × 38 cm with 28 cm Handle Drop',
    description: 'A rugged daily carryall for work, market, or campus. Built with reinforced handles, interior zipper pocket for smartphone, and clean Google typography.',
    features: [
      'Heavy-duty 16oz organic canvas withstands up to 20kg',
      'Internal zippered valuables pouch and key ring clip',
      'Long shoulder straps for easy hands-free carrying',
      'Screen printed with non-toxic soy inks'
    ],
    colors: [
      { name: 'Natural Ecru', hex: '#f1efe7' },
      { name: 'Coal Black', hex: '#202124' }
    ],
    sizes: ['One Size'],
    images: {
      front: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80',
      back: 'https://images.unsplash.com/photo-1597484661643-2f5fef640dd1?w=800&auto=format&fit=crop&q=80',
      detail: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&auto=format&fit=crop&q=80',
      lifestyle: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80'
    }
  }
];

export const CATEGORIES = [
  { id: 'all', name: 'All Products', icon: 'Sparkles', image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400&auto=format&fit=crop&q=80' },
  { id: 'Apparel', name: 'Apparel', icon: 'Shirt', image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=400&auto=format&fit=crop&q=80' },
  { id: 'Hoodies', name: 'Hoodies', icon: 'Layers', image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400&auto=format&fit=crop&q=80' },
  { id: 'T-Shirts', name: 'T-Shirts', icon: 'Scissors', image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&auto=format&fit=crop&q=80' },
  { id: 'Accessories', name: 'Accessories', icon: 'Watch', image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&auto=format&fit=crop&q=80' },
  { id: 'Drinkware', name: 'Drinkware', icon: 'Coffee', image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&auto=format&fit=crop&q=80' },
  { id: 'Bags', name: 'Bags', icon: 'ShoppingBag', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&auto=format&fit=crop&q=80' },
  { id: 'Office', name: 'Office', icon: 'Briefcase', image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&auto=format&fit=crop&q=80' },
  { id: 'Best Sellers', name: 'Best Sellers', icon: 'Flame', image: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=400&auto=format&fit=crop&q=80' },
  { id: 'New Arrivals', name: 'New Arrivals', icon: 'Zap', image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&auto=format&fit=crop&q=80' },
];

export const SEARCH_AUTOCOMPLETE_MAP: Record<string, string[]> = {
  'hoodie': ['Hoodies', 'Google Hoodies', 'Sweatshirts', 'Best-selling Hoodies', 'Chrome Dino 404 Sweatshirt'],
  'tshirt': ['Google T-Shirt', 'Android Bugdroid Tee', 'Organic Cotton T-Shirts', 'Spectrum Classic T-Shirt'],
  'shirt': ['Google T-Shirt', 'Android Bugdroid Tee', 'Classic Crewneck', 'Hoodies'],
  'mug': ['Google Ceramic Mug (400ml)', 'Drinkware', 'Coffee Mugs', 'Thermal Bottle'],
  'cap': ['Chrome Dino Baseball Cap', 'Dad Hats', 'Google Caps', 'Accessories'],
  'bottle': ['Google Vacuum Insulated Thermal Bottle', 'Stainless Steel Bottles', 'Drinkware'],
  'bag': ['Google Commuter Backpack', 'Canvas Tote Bag', 'Laptop Sleeves', 'Bags'],
  'backpack': ['Google Commuter Tech Backpack 22L', 'School & Work Bags', 'Laptop Daypack'],
  'sock': ['Google Spectrum Crew Socks 3-Pack', 'Tech Socks', 'Cotton Socks'],
  'office': ['Notebook & Rollerball Pen Set', 'Laptop Sleeve', 'Desk Accessories'],
  'google': ['Google Logo Hoodie', 'Google Classic T-Shirt', 'Google Thermal Bottle', 'Google Mug', 'Google Backpack'],
  'android': ['Android Bugdroid Geometric Tee', 'Android Accessories'],
  'dino': ['Chrome Dino 404 Sweatshirt', 'Chrome Dino Baseball Cap', 'Chrome Dinosaur Merchandise'],
};
