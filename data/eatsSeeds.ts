import { Eatery } from '../types';

export const eateries: Eatery[] = [
  {
    id: 'e1',
    name: "Mbombela Shisa",
    category: 'Shisanyama',
    cuisine: ['African', 'Grill'],
    location: { area: 'Mbombela', city: 'Mbombela' },
    images: [
      'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?auto=format&fit=crop&q=80&w=1400',
      'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=80&w=1400'
    ],
    description: 'From smoky grills to signature sauces, this Shisanyama has become a weekend ritual for locals.',
    menu: [
      { id: 'm1', itemName: 'Grilled Lamb Chops', description: 'Marinated and flame-grilled chops.', price: 'R120', category: 'Mains' },
      { id: 'm2', itemName: 'Pap & Chakalaka', description: 'Traditional sides.', price: 'R35', category: 'Starters' }
    ],
    priceRange: '$$',
    rating: 4.7,
    contactOptions: { call: '+27 13 740 2201', whatsapp: '+27137402201', directions: '' },
    dineIn: true,
    takeaway: true,
    delivery: false,
    verified: true,
    premiumTier: 'Standard'
  },
  {
    id: 'e2',
    name: 'Veranda Fine Dining',
    category: 'Fine Dining',
    cuisine: ['Contemporary', 'European'],
    location: { area: 'Mbombela', city: 'Mbombela' },
    images: ['https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1400'],
    description: 'Sublime modern gastronomy with Lowveld ingredients, impeccable service and a thoughtfully curated wine list.',
    menu: [
      { id: 'm3', itemName: 'Tasting Menu (6-course)', description: 'Chef curated seasonal tasting.', price: 'R650', category: 'Specials' },
      { id: 'm4', itemName: 'Seared Line Fish', description: 'Served with beurre blanc.', price: 'R220', category: 'Mains' }
    ],
    priceRange: '$$$$',
    rating: 4.9,
    contactOptions: { call: '+27 13 740 2202', whatsapp: '+27137402202' },
    dineIn: true,
    takeaway: false,
    delivery: false,
    verified: true,
    premiumTier: 'Elite',
    isElite: true
  },
  {
    id: 'e3',
    name: 'Corner Café',
    category: 'Café',
    cuisine: ['Coffee', 'Bakery'],
    location: { area: 'Nelspruit', city: 'Mbombela' },
    images: ['https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1400'],
    description: 'Cozy café serving single origin coffee and freshly baked goods.',
    menu: [
      { id: 'm5', itemName: 'Flat White', description: 'Single origin espresso.', price: 'R28', category: 'Drinks' },
      { id: 'm6', itemName: 'Sourdough Toast', description: 'Avocado or preserves.', price: 'R45', category: 'Starters' }
    ],
    priceRange: '$',
    rating: 4.4,
    contactOptions: { call: '+27 13 744 1100' },
    dineIn: true,
    takeaway: true,
    delivery: false,
    verified: false,
    premiumTier: 'Standard'
  },
  {
    id: 'e4_royalpalate',
    name: 'Royal Palate',
    category: 'Fine Dining',
    cuisine: ['Contemporary', 'Luxury', 'South African'],
    location: { area: 'Sabie', city: 'Sabie' },
    images: [
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1400',
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=1400',
      'https://images.unsplash.com/photo-1551632786-e91160432b54?auto=format&fit=crop&q=80&w=1400',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1400'
    ],
    description: 'Regal interiors and an exquisite menu suited for the most discerning palates. Royal Palate brings fine dining excellence to Sabie with impeccable service and a carefully curated wine selection.',
    menu: [
      { id: 'rp_m1', itemName: 'Pan-Seared Kingklip', description: 'Line-caught kingklip with champagne beurre blanc and seasonal vegetables', price: 'R385', category: 'Mains' },
      { id: 'rp_m2', itemName: 'Beef Wellington', description: 'Premium beef tenderloin wrapped in pastry with mushroom duxelles', price: 'R425', category: 'Mains' },
      { id: 'rp_m3', itemName: 'Seared Duck Breast', description: 'Local duck with cherry gastrique and potato fondant', price: 'R395', category: 'Mains' },
      { id: 'rp_s1', itemName: 'Oysters Rockefeller', description: 'Fresh oysters with herb butter and parmesan crust', price: 'R145', category: 'Starters' },
      { id: 'rp_s2', itemName: 'Foie Gras Terrine', description: 'House-made terrine with brioche toast and fig preserve', price: 'R165', category: 'Starters' },
      { id: 'rp_d1', itemName: 'Chocolate Soufflé', description: 'Dark chocolate soufflé with grand marnier sauce', price: 'R95', category: 'Desserts' },
      { id: 'rp_d2', itemName: 'Crème Brûlée', description: 'Vanilla bean custard with caramelized sugar crust', price: 'R85', category: 'Desserts' },
      { id: 'rp_w1', itemName: 'Premium Wine Pairing (5-course)', description: 'Curated wines by our sommelier', price: 'R450', category: 'Beverages' }
    ],
    priceRange: '$$$$',
    rating: 5.0,
    reviewCount: 96,
    contactOptions: { call: '+27 13 764 1000', whatsapp: '+27 82 764 1000', email: 'info@royalpalate.co.za' },
    dineIn: true,
    takeaway: false,
    delivery: false,
    verified: true,
    premiumTier: 'Platinum',
    isPlatinum: true,
    reviews: [
      { id: 'rev1', name: 'Thabo M.', rating: 5, text: 'Exceptional culinary experience. The beef wellington was perfectly executed, and the wine pairing suggestions were impeccable. Staff professionalism is unmatched.' },
      { id: 'rev2', name: 'Sarah L.', rating: 5, text: 'Took my husband here for our anniversary. The atmosphere was romantic, the food phenomenal, and every detail was carefully considered. Highly recommend!' },
      { id: 'rev3', name: 'Johan P.', rating: 5, text: 'Best fine dining experience in Mpumalanga. The chef clearly has world-class training. Looking forward to the next visit!' }
    ]
  },
  {
    id: 'e5_thevelvetlounge',
    name: 'The Velvet Lounge',
    category: 'Fine Dining',
    cuisine: ['Contemporary', 'Luxury', 'French'],
    location: { area: 'Nelspruit', city: 'Mbombela' },
    images: [
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=1400',
      'https://images.unsplash.com/photo-1551632786-e91160432b54?auto=format&fit=crop&q=80&w=1400'
    ],
    description: 'Elegant fine dining experience featuring French gastronomy and South African influences. Intimate ambiance with impeccable service and an award-winning wine cellar.',
    menu: [
      { id: 'vl_m1', itemName: 'Coq au Vin', description: 'Braised chicken in burgundy wine with mushrooms', price: 'R340', category: 'Mains' },
      { id: 'vl_m2', itemName: 'Duck Confit', description: 'Crispy duck leg with seasonal vegetables', price: 'R365', category: 'Mains' },
      { id: 'vl_s1', itemName: 'Escargot Bourguignonne', description: 'Classic French escargots in garlic butter', price: 'R155', category: 'Starters' },
      { id: 'vl_d1', itemName: 'Grand Marnier Soufflé', description: 'Light and airy Grand Marnier soufflé', price: 'R105', category: 'Desserts' }
    ],
    priceRange: '$$$$',
    rating: 4.9,
    reviewCount: 42,
    contactOptions: { call: '+27 13 755 2500', whatsapp: '+27 82 755 2500', email: 'reservations@velvetlounge.co.za' },
    dineIn: true,
    takeaway: false,
    delivery: false,
    verified: true,
    premiumTier: 'Elite',
    isElite: true
  },
  {
    id: 'e6_savorirestaurant',
    name: 'Savori Restaurant',
    category: 'Fine Dining',
    cuisine: ['Contemporary', 'Fusion', 'Gourmet'],
    location: { area: 'Hazyview', city: 'Hazyview' },
    images: [
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1400'
    ],
    description: 'Innovative fusion cuisine celebrating Lowveld produce. Chef-driven menu with artistic presentation and exceptional wine pairings.',
    menu: [
      { id: 'sv_m1', itemName: 'Seared Yellowtail', description: 'With citrus cello and crispy shallots', price: 'R380', category: 'Mains' },
      { id: 'sv_m2', itemName: 'Venison Wellington', description: 'Local venison with truffle sauce', price: 'R420', category: 'Mains' },
      { id: 'sv_d1', itemName: 'Dark Chocolate Torte', description: 'With passion fruit coulis', price: 'R95', category: 'Desserts' }
    ],
    priceRange: '$$$$',
    rating: 4.8,
    reviewCount: 38,
    contactOptions: { call: '+27 13 737 6000', whatsapp: '+27 82 737 6000', email: 'hello@savori.co.za' },
    dineIn: true,
    takeaway: false,
    delivery: false,
    verified: true,
    premiumTier: 'Platinum',
    isPlatinum: true
  },
  {
    id: 'e7_classique',
    name: 'Classique at The Gardens',
    category: 'Fine Dining',
    cuisine: ['European', 'Contemporary', 'Luxury'],
    location: { area: 'Mbombela', city: 'Mbombela' },
    images: [
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=1400'
    ],
    description: 'Timeless elegance meets contemporary cuisine in an enchanting garden setting. Signature dishes crafted by award-winning chefs.',
    menu: [
      { id: 'cg_m1', itemName: 'Filet Mignon', description: 'Prime beef with béarnaise and truffle jus', price: 'R445', category: 'Mains' },
      { id: 'cg_m2', itemName: 'Sea Bass en Papillote', description: 'Baked in parchment with seasonal herbs', price: 'R395', category: 'Mains' },
      { id: 'cg_s1', itemName: 'Lobster Bisque', description: 'Creamy bisque with lobster medallions', price: 'R125', category: 'Starters' }
    ],
    priceRange: '$$$$',
    rating: 4.7,
    reviewCount: 52,
    contactOptions: { call: '+27 13 760 7000', whatsapp: '+27 82 760 7000', email: 'info@classique.co.za' },
    dineIn: true,
    takeaway: false,
    delivery: false,
    verified: true,
    premiumTier: 'Elite',
    isElite: true
  }
];

