import { Category, ListingTier, SubscriptionDuration } from '@/types';

// SOFTWARE & DEVELOPMENT
export const softwareDevelopment = [
  {
    id: 'itm_sd_001',
    name: 'Mpumalanga Digital Solutions Hub',
    category: Category.DigitalMediaAndTechnology,
    subcategory: 'Software & Development',
    tier: ListingTier.Platinum,
    location: 'Mbombela',
    rating: 4.9,
    reviewCount: 687,
    description: 'Premier software development agency specializing in enterprise applications, cloud infrastructure, and custom solutions. Award-winning team delivering mission-critical systems for Fortune 500 companies and innovative startups across SADC region.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop',
    phone: '+27 13 752 3456',
    email: 'solutions@mpdigitalhub.co.za',
    website: 'www.mpdigitalhub.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isPlatinum: true,
    tags: ['Custom Software', 'Cloud Architecture', 'Enterprise Apps', 'AI Integration', 'Full-Stack Development'],
    logo: 'https://images.unsplash.com/photo-1633356715463-c5d5d8c92c0f?w=200&h=200&fit=crop'
  },
  {
    id: 'itm_sd_002',
    name: 'White River Code Architects',
    category: Category.DigitalMediaAndTechnology,
    subcategory: 'Software & Development',
    tier: ListingTier.Elite,
    location: 'White River',
    rating: 4.8,
    reviewCount: 534,
    description: 'Innovative software development studio crafting elegant solutions for fintech, healthcare, and e-commerce sectors. Specializing in microservices architecture, real-time data processing, and scalable backend systems.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop',
    phone: '+27 13 750 8821',
    email: 'hello@wrcodearch.co.za',
    website: 'www.wrcodearch.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isElite: true,
    tags: ['Backend Development', 'Fintech Solutions', 'Microservices', 'API Design', 'DevOps'],
    logo: 'https://images.unsplash.com/photo-1633356715463-c5d5d8c92c0f?w=200&h=200&fit=crop'
  }
];

// WEB & DESIGN STUDIOS
export const webAndDesignStudios = [
  {
    id: 'itm_wd_001',
    name: 'Luxury Web Innovations Mbombela',
    category: Category.DigitalMediaAndTechnology,
    subcategory: 'Web & Design Studios',
    tier: ListingTier.Platinum,
    location: 'Mbombela',
    rating: 4.9,
    reviewCount: 612,
    description: 'Boutique web design studio creating bespoke digital experiences for luxury brands, hospitality, and premium B2B enterprises. Our award-winning team delivers pixel-perfect interfaces with seamless UX and conversion-optimized design philosophy.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop',
    phone: '+27 13 752 1189',
    email: 'studio@luxuryweb.co.za',
    website: 'www.luxuryweb.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isPlatinum: true,
    tags: ['Web Design', 'UX/UI', 'Brand Experience', 'Responsive Design', 'E-Commerce'],
    logo: 'https://images.unsplash.com/photo-1627873649417-af36141b70ce?w=200&h=200&fit=crop'
  },
  {
    id: 'itm_wd_002',
    name: 'Hazyview Creative Studios',
    category: Category.DigitalMediaAndTechnology,
    subcategory: 'Web & Design Studios',
    tier: ListingTier.Elite,
    location: 'Hazyview',
    rating: 4.8,
    reviewCount: 523,
    description: 'Creative web design collective specializing in portfolio websites, interactive experiences, and dynamic storytelling through digital mediums. Expert in modern frameworks, animation, and immersive web technologies.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop',
    phone: '+27 13 767 2340',
    email: 'creative@hazcreative.co.za',
    website: 'www.hazcreative.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isElite: true,
    tags: ['Creative Design', 'Web Development', 'Animation', 'Interactive UX', 'Branding'],
    logo: 'https://images.unsplash.com/photo-1627873649417-af36141b70ce?w=200&h=200&fit=crop'
  }
];

// DIGITAL MARKETING AGENCIES
export const digitalMarketingAgencies = [
  {
    id: 'itm_dma_001',
    name: 'Mpumalanga Digital Marketing Excellence',
    category: Category.DigitalMediaAndTechnology,
    subcategory: 'Digital Marketing Agencies',
    tier: ListingTier.Platinum,
    location: 'Mbombela',
    rating: 4.9,
    reviewCount: 645,
    description: 'Full-service digital marketing agency delivering ROI-driven campaigns across SEO, SEM, social media, and content strategy. Proven track record scaling e-commerce businesses and building premium brand presence across digital ecosystems.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
    phone: '+27 13 752 4567',
    email: 'growth@mpdmexcellence.co.za',
    website: 'www.mpdmexcellence.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isPlatinum: true,
    tags: ['SEO', 'Content Marketing', 'Social Media', 'Paid Ads', 'Brand Growth'],
    logo: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=200&h=200&fit=crop'
  },
  {
    id: 'itm_dma_002',
    name: 'White River Marketing Collective',
    category: Category.DigitalMediaAndTechnology,
    subcategory: 'Digital Marketing Agencies',
    tier: ListingTier.Elite,
    location: 'White River',
    rating: 4.8,
    reviewCount: 567,
    description: 'Strategic digital marketing firm specializing in influencer partnerships, community building, and authentic brand storytelling. Transforming businesses through data-driven insights and creative campaign execution.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
    phone: '+27 13 750 5678',
    email: 'hello@wrmarketing.co.za',
    website: 'www.wrmarketing.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isElite: true,
    tags: ['Brand Strategy', 'Digital Campaigns', 'Community Management', 'Analytics', 'Growth Hacking'],
    logo: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=200&h=200&fit=crop'
  }
];

// PHOTOGRAPHY & VIDEOGRAPHY
export const photographyAndVideography = [
  {
    id: 'itm_pv_001',
    name: 'Luxury Moments Photography Mbombela',
    category: Category.DigitalMediaAndTechnology,
    subcategory: 'Photography & Videography',
    tier: ListingTier.Platinum,
    location: 'Mbombela',
    rating: 4.9,
    reviewCount: 678,
    description: 'Award-winning photography and cinematography studio specializing in luxury brand storytelling, events, and bespoke visual narratives. Our Platinum team delivers cinema-grade production with meticulous attention to luxury aesthetics.',
    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&h=600&fit=crop',
    phone: '+27 13 752 6789',
    email: 'luxury@luxurymoments.co.za',
    website: 'www.luxurymoments.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isPlatinum: true,
    tags: ['Luxury Photography', 'Cinematography', 'Event Coverage', 'Brand Videos', 'Post-Production'],
    logo: 'https://images.unsplash.com/photo-1606986628025-35d57e735ae0?w=200&h=200&fit=crop'
  },
  {
    id: 'itm_pv_002',
    name: 'Hazyview Creative Productions',
    category: Category.DigitalMediaAndTechnology,
    subcategory: 'Photography & Videography',
    tier: ListingTier.Elite,
    location: 'Hazyview',
    rating: 4.8,
    reviewCount: 545,
    description: 'Creative production house crafting compelling visual stories for corporate, commercial, and creative projects. Specializing in documentary-style photography, promotional videos, and immersive brand experiences.',
    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&h=600&fit=crop',
    phone: '+27 13 767 7890',
    email: 'hello@hazproductions.co.za',
    website: 'www.hazproductions.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isElite: true,
    tags: ['Video Production', 'Photography', 'Content Creation', 'Documentary', 'Brand Storytelling'],
    logo: 'https://images.unsplash.com/photo-1606986628025-35d57e735ae0?w=200&h=200&fit=crop'
  }
];

// DRONE PHOTOGRAPHY / VIDEOGRAPHY
export const dronePhotographyVideography = [
  {
    id: 'itm_dp_001',
    name: 'Mpumalanga Aerial Excellence',
    category: Category.DigitalMediaAndTechnology,
    subcategory: 'Drone Photography / Videography',
    tier: ListingTier.Platinum,
    location: 'Mbombela',
    rating: 4.9,
    reviewCount: 612,
    description: 'Premier drone photography and cinematography service capturing breathtaking aerial perspectives for luxury properties, tourism, and corporate projects. Platinum-certified pilots with state-of-the-art equipment and stunning portfolio.',
    image: 'https://images.unsplash.com/photo-1508778305541-add266cbf81e?w=800&h=600&fit=crop',
    phone: '+27 13 752 8901',
    email: 'aerial@mpaerial.co.za',
    website: 'www.mpaerial.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isPlatinum: true,
    tags: ['Drone Photography', 'Aerial Video', '4K Cinematography', 'Property Tours', 'Certified Pilots'],
    logo: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=200&h=200&fit=crop'
  },
  {
    id: 'itm_dp_002',
    name: 'White River Sky Studios',
    category: Category.DigitalMediaAndTechnology,
    subcategory: 'Drone Photography / Videography',
    tier: ListingTier.Elite,
    location: 'White River',
    rating: 4.8,
    reviewCount: 489,
    description: 'Specialized aerial imaging studio providing breathtaking drone content for real estate, tourism, and creative projects. Expert in flight planning, advanced cinematography, and post-production color grading.',
    image: 'https://images.unsplash.com/photo-1508778305541-add266cbf81e?w=800&h=600&fit=crop',
    phone: '+27 13 750 9012',
    email: 'sky@wrsky.co.za',
    website: 'www.wrsky.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isElite: true,
    tags: ['Drone Footage', 'Aerial Cinematography', 'Property Showcase', '4K Video', 'Inspection Services'],
    logo: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=200&h=200&fit=crop'
  }
];

// APP DEVELOPMENT / SOFTWARE HOUSES
export const appDevelopmentSoftwareHouses = [
  {
    id: 'itm_ad_001',
    name: 'Mpumalanga App Innovations',
    category: Category.DigitalMediaAndTechnology,
    subcategory: 'App Development / Software Houses',
    tier: ListingTier.Platinum,
    location: 'Mbombela',
    rating: 4.9,
    reviewCount: 634,
    description: 'Leading app development house creating innovative mobile and web applications for startups and enterprises. Specializing in iOS, Android, React Native, and cross-platform solutions with exceptional UX design.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop',
    phone: '+27 13 752 0123',
    email: 'apps@mpappinnovations.co.za',
    website: 'www.mpappinnovations.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isPlatinum: true,
    tags: ['Mobile App Development', 'iOS', 'Android', 'React Native', 'Cross-Platform'],
    logo: 'https://images.unsplash.com/photo-1633356715463-c5d5d8c92c0f?w=200&h=200&fit=crop'
  },
  {
    id: 'itm_ad_002',
    name: 'Hazyview App Studios',
    category: Category.DigitalMediaAndTechnology,
    subcategory: 'App Development / Software Houses',
    tier: ListingTier.Elite,
    location: 'Hazyview',
    rating: 4.8,
    reviewCount: 512,
    description: 'Creative app development studio building premium applications for lifestyle, fintech, and entertainment sectors. Focused on elegant code architecture, intuitive design, and seamless user experiences.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop',
    phone: '+27 13 767 1234',
    email: 'studio@hazapps.co.za',
    website: 'www.hazapps.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isElite: true,
    tags: ['App Development', 'UI/UX Design', 'Fintech Apps', 'Backend Development', 'App Store Deployment'],
    logo: 'https://images.unsplash.com/photo-1633356715463-c5d5d8c92c0f?w=200&h=200&fit=crop'
  }
];

// AI & DATA SCIENCE SERVICES
export const aiAndDataScienceServices = [
  {
    id: 'itm_ai_001',
    name: 'Mpumalanga AI & Data Intelligence',
    category: Category.DigitalMediaAndTechnology,
    subcategory: 'AI & Data Science Services',
    tier: ListingTier.Platinum,
    location: 'Mbombela',
    rating: 4.9,
    reviewCount: 598,
    description: 'Advanced AI and machine learning consultancy delivering predictive analytics, NLP solutions, and intelligent automation. Pioneering data-driven transformation for enterprise clients across fintech, healthcare, and retail.',
    image: 'https://images.unsplash.com/photo-1488229297570-58520e90b580?w=800&h=600&fit=crop',
    phone: '+27 13 752 2345',
    email: 'ai@mpaiandintel.co.za',
    website: 'www.mpaiandintel.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isPlatinum: true,
    tags: ['Machine Learning', 'Data Science', 'AI Consulting', 'Predictive Analytics', 'NLP'],
    logo: 'https://images.unsplash.com/photo-1677442d019cecf8949ae0e5b22e2ad0c0d96e79?w=200&h=200&fit=crop'
  },
  {
    id: 'itm_ai_002',
    name: 'White River Data Science Hub',
    category: Category.DigitalMediaAndTechnology,
    subcategory: 'AI & Data Science Services',
    tier: ListingTier.Elite,
    location: 'White River',
    rating: 4.8,
    reviewCount: 476,
    description: 'Innovative data science team specializing in machine learning model development, data infrastructure, and business intelligence. Transforming raw data into actionable insights for strategic decision-making.',
    image: 'https://images.unsplash.com/photo-1488229297570-58520e90b580?w=800&h=600&fit=crop',
    phone: '+27 13 750 3456',
    email: 'data@wrdatahub.co.za',
    website: 'www.wrdatahub.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isElite: true,
    tags: ['Data Analytics', 'Machine Learning', 'Data Visualization', 'Business Intelligence', 'Python/R'],
    logo: 'https://images.unsplash.com/photo-1677442d019cecf8949ae0e5b22e2ad0c0d96e79?w=200&h=200&fit=crop'
  }
];

// GAMING & ESPORTS
export const gamingAndEsports = [
  {
    id: 'itm_ge_001',
    name: 'Mpumalanga Gaming Studios',
    category: Category.DigitalMediaAndTechnology,
    subcategory: 'Gaming & Esports',
    tier: ListingTier.Platinum,
    location: 'Mbombela',
    rating: 4.9,
    reviewCount: 567,
    description: 'Premier game development studio creating immersive AAA-quality games and esports titles. Specializing in Unreal Engine, Unity, and cross-platform gaming with competitive multiplayer infrastructure.',
    image: 'https://images.unsplash.com/photo-1538481143235-f7d4970795b7?w=800&h=600&fit=crop',
    phone: '+27 13 752 4567',
    email: 'studio@mpgaming.co.za',
    website: 'www.mpgaming.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isPlatinum: true,
    tags: ['Game Development', 'Unreal Engine', 'Unity', 'Esports', 'Multiplayer Games'],
    logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&h=200&fit=crop'
  },
  {
    id: 'itm_ge_002',
    name: 'Hazyview Esports Arena & Development',
    category: Category.DigitalMediaAndTechnology,
    subcategory: 'Gaming & Esports',
    tier: ListingTier.Elite,
    location: 'Hazyview',
    rating: 4.8,
    reviewCount: 445,
    description: 'Gaming hub and indie game studio fostering esports talent and developing innovative game titles. Community-focused with high-performance tournament infrastructure and game development mentorship.',
    image: 'https://images.unsplash.com/photo-1538481143235-f7d4970795b7?w=800&h=600&fit=crop',
    phone: '+27 13 767 5678',
    email: 'info@hazesgaming.co.za',
    website: 'www.hazesgaming.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isElite: true,
    tags: ['Game Development', 'Esports Tournament', 'Gaming Community', 'Indie Games', 'Competitive Gaming'],
    logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&h=200&fit=crop'
  }
];

// VIRTUAL & AUGMENTED REALITY SERVICES
export const virtualAugmentedRealityServices = [
  {
    id: 'itm_vr_001',
    name: 'Mpumalanga XR Innovations',
    category: Category.DigitalMediaAndTechnology,
    subcategory: 'Virtual & Augmented Reality Services',
    tier: ListingTier.Platinum,
    location: 'Mbombela',
    rating: 4.9,
    reviewCount: 589,
    description: 'Cutting-edge XR development studio creating immersive virtual and augmented reality experiences for enterprise, retail, and entertainment. Specializing in metaverse platforms, VR training, and AR commerce solutions.',
    image: 'https://images.unsplash.com/photo-1593642532400-2682a8a6b9f8?w=800&h=600&fit=crop',
    phone: '+27 13 752 6789',
    email: 'xr@mpxrinnovations.co.za',
    website: 'www.mpxrinnovations.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isPlatinum: true,
    tags: ['Virtual Reality', 'Augmented Reality', 'Metaverse', 'VR Training', 'AR Commerce'],
    logo: 'https://images.unsplash.com/photo-1633356715463-c5d5d8c92c0f?w=200&h=200&fit=crop'
  },
  {
    id: 'itm_vr_002',
    name: 'White River Reality Studios',
    category: Category.DigitalMediaAndTechnology,
    subcategory: 'Virtual & Augmented Reality Services',
    tier: ListingTier.Elite,
    location: 'White River',
    rating: 4.8,
    reviewCount: 523,
    description: 'Innovative XR studio delivering immersive experiences through VR simulations and AR visualizations. Expert in spatial computing, interactive design, and next-generation user interfaces.',
    image: 'https://images.unsplash.com/photo-1593642532400-2682a8a6b9f8?w=800&h=600&fit=crop',
    phone: '+27 13 750 7890',
    email: 'hello@wrxr.co.za',
    website: 'www.wrxr.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isElite: true,
    tags: ['VR Development', 'AR Applications', 'Spatial Computing', 'Interactive Experience', 'XR Consulting'],
    logo: 'https://images.unsplash.com/photo-1633356715463-c5d5d8c92c0f?w=200&h=200&fit=crop'
  }
];
