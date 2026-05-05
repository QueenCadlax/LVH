import { Business, ListingTier, Category, SubscriptionDuration } from '../types';

// BARS & COCKTAIL LOUNGES
export const barsAndCocktailLounges: Business[] = [
  {
    id: 'nlent_bar_001',
    name: 'Ember Craft Cocktail Lounge',
    category: Category.NightlifeAndEntertainment,
    subcategory: 'BARS & COCKTAIL LOUNGES',
    tier: ListingTier.Platinum,
    location: 'Mbombela',
    rating: 4.9,
    reviewCount: 589,
    description: 'Award-winning craft cocktail bar featuring master mixologists, rare spirits collection, and signature creations. Elegant ambiance with live jazz performances.',
    image: 'https://images.unsplash.com/photo-1574783320219-553eb213f72d?w=800&h=600&fit=crop',
    phone: '+27 13 752 8900',
    email: 'info@emberlounge.co.za',
    website: 'www.emberlounge.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isPlatinum: true,
    tags: ['Craft Cocktails', 'Premium Bar', 'Live Jazz', 'Mixology', 'Luxury']
  },
  {
    id: 'nlent_bar_002',
    name: 'The Velvet Mix Cocktail Bar',
    category: Category.NightlifeAndEntertainment,
    subcategory: 'BARS & COCKTAIL LOUNGES',
    tier: ListingTier.Elite,
    location: 'White River',
    rating: 4.8,
    reviewCount: 456,
    description: 'Sophisticated cocktail bar with curated spirit selection, molecular mixology, and private tasting rooms. Urban-chic design with expert bartenders.',
    image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&h=600&fit=crop',
    phone: '+27 13 774 7300',
    email: 'bookings@velvetmix.co.za',
    website: 'www.velvetmix.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isElite: true,
    tags: ['Cocktails', 'Molecular Mixology', 'Premium Spirits', 'Elegant', 'Tasting Room']
  }
];

// CLUBS & LOUNGES
export const clubsAndLounges: Business[] = [
  {
    id: 'nlent_club_001',
    name: 'Pulse Nightclub & VIP Lounge',
    category: Category.NightlifeAndEntertainment,
    subcategory: 'CLUBS & LOUNGES',
    tier: ListingTier.Platinum,
    location: 'Mbombela',
    rating: 4.9,
    reviewCount: 687,
    description: 'Premier nightclub with state-of-the-art sound system, world-class DJs, premium bottle service, and exclusive VIP suites. Dynamic dance floor and lounge areas.',
    image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&h=600&fit=crop',
    phone: '+27 13 752 9400',
    email: 'vip@pulsembombela.co.za',
    website: 'www.pulsembombela.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isPlatinum: true,
    tags: ['Nightclub', 'DJ Performances', 'VIP Service', 'Premium', 'Dance Club']
  },
  {
    id: 'nlent_club_002',
    name: 'The Lounge Collective',
    category: Category.NightlifeAndEntertainment,
    subcategory: 'CLUBS & LOUNGES',
    tier: ListingTier.Elite,
    location: 'Hazyview',
    rating: 4.8,
    reviewCount: 523,
    description: 'Multi-level nightlife venue featuring lounge areas, dance floor, private booths, and premium table service. International DJs and live entertainment.',
    image: 'https://images.unsplash.com/photo-1514432324607-2e467f4af445?w=800&h=600&fit=crop',
    phone: '+27 13 737 8500',
    email: 'bookings@loungecolhazy.co.za',
    website: 'www.loungecolhazy.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isElite: true,
    tags: ['Lounge Club', 'VIP Tables', 'DJ Entertainment', 'Multi-venue', 'Premium Drinks']
  }
];

// LIVE MUSIC & VENUES
export const liveMusicAndVenues: Business[] = [
  {
    id: 'nlent_livemusic_001',
    name: 'The Resonance Live Music Hall',
    category: Category.NightlifeAndEntertainment,
    subcategory: 'LIVE MUSIC & VENUES',
    tier: ListingTier.Platinum,
    location: 'Mbombela',
    rating: 4.9,
    reviewCount: 612,
    description: 'Premier live music venue featuring international and local artists, state-of-the-art acoustics, seated and standing areas, full bar service. World-class productions.',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop',
    phone: '+27 13 752 4100',
    email: 'events@resonancelive.co.za',
    website: 'www.resonancelive.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isPlatinum: true,
    tags: ['Live Music', 'Concert Venue', 'International Artists', 'Premium Sound', 'Events']
  },
  {
    id: 'nlent_livemusic_002',
    name: 'Harmony Stage & Lounge',
    category: Category.NightlifeAndEntertainment,
    subcategory: 'LIVE MUSIC & VENUES',
    tier: ListingTier.Elite,
    location: 'White River',
    rating: 4.8,
    reviewCount: 478,
    description: 'Intimate live music venue with resident bands, acoustic performances, and featured artists. Cozy lounge setting with premium food and beverage options.',
    image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&h=600&fit=crop',
    phone: '+27 13 774 5600',
    email: 'bookings@harmonystage.co.za',
    website: 'www.harmonystage.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isElite: true,
    tags: ['Live Bands', 'Acoustic Music', 'Intimate Venue', 'Local Artists', 'Entertainment']
  }
];

// THEATERS & CINEMAS
export const theatersAndCinemas: Business[] = [
  {
    id: 'nlent_theater_001',
    name: 'Premier Cinema & Theater Complex',
    category: Category.NightlifeAndEntertainment,
    subcategory: 'THEATERS & CINEMAS',
    tier: ListingTier.Platinum,
    location: 'Mbombela',
    rating: 4.9,
    reviewCount: 734,
    description: 'State-of-the-art cinema complex with IMAX screens, luxury recliners, gourmet concessions, and premium theater facilities. Professional productions and screenings.',
    image: 'https://images.unsplash.com/photo-1489599849228-ed4dc9ee47c3?w=800&h=600&fit=crop',
    phone: '+27 13 752 1200',
    email: 'info@premiercinema.co.za',
    website: 'www.premiercinema.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isPlatinum: true,
    tags: ['Cinema', 'IMAX Theater', 'Luxury Seating', 'Entertainment', 'Premium']
  },
  {
    id: 'nlent_theater_002',
    name: 'The Civic Theater & Arts Venue',
    category: Category.NightlifeAndEntertainment,
    subcategory: 'THEATERS & CINEMAS',
    tier: ListingTier.Elite,
    location: 'Mbombela',
    rating: 4.8,
    reviewCount: 567,
    description: 'Historic theater hosting theatrical productions, comedy shows, cultural performances, and community events. Restored auditorium with excellent acoustics.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
    phone: '+27 13 752 2300',
    email: 'bookings@civictheater.co.za',
    website: 'www.civictheater.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isElite: true,
    tags: ['Theater', 'Performances', 'Comedy Shows', 'Arts Venue', 'Cultural Events']
  }
];

// GAMING & VR CENTERS
export const gamingAndVRCenters: Business[] = [
  {
    id: 'nlent_gaming_001',
    name: 'Nexus VR & Gaming Hub',
    category: Category.NightlifeAndEntertainment,
    subcategory: 'GAMING & VR CENTERS',
    tier: ListingTier.Platinum,
    location: 'Mbombela',
    rating: 4.9,
    reviewCount: 654,
    description: 'Cutting-edge VR center featuring latest gaming technology, immersive experiences, competitive tournaments, and premium gaming stations. Professional-grade equipment.',
    image: 'https://images.unsplash.com/photo-1538481143235-e390bae4d330?w=800&h=600&fit=crop',
    phone: '+27 13 752 6700',
    email: 'bookings@nexusvr.co.za',
    website: 'www.nexusvr.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isPlatinum: true,
    tags: ['VR Gaming', 'Immersive Experience', 'Tournaments', 'Premium Gaming', 'Technology']
  },
  {
    id: 'nlent_gaming_002',
    name: 'Arena Gaming Lounge & Competition Center',
    category: Category.NightlifeAndEntertainment,
    subcategory: 'GAMING & VR CENTERS',
    tier: ListingTier.Elite,
    location: 'White River',
    rating: 4.8,
    reviewCount: 521,
    description: 'Gaming lounge with competitive esports stations, arcade games, group experiences, and tournament hosting. Food and beverage service with gaming peripherals.',
    image: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=800&h=600&fit=crop',
    phone: '+27 13 774 3300',
    email: 'info@arenagaming.co.za',
    website: 'www.arenagaming.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isElite: true,
    tags: ['Esports', 'Gaming Lounge', 'Arcade Games', 'Tournaments', 'Entertainment']
  }
];

// DANCE STUDIOS & PERFORMANCES
export const danceStudiosAndPerformances: Business[] = [
  {
    id: 'nlent_dance_001',
    name: 'Momentum Dance Studio & Performance Theater',
    category: Category.NightlifeAndEntertainment,
    subcategory: 'DANCE STUDIOS & PERFORMANCES',
    tier: ListingTier.Platinum,
    location: 'Mbombela',
    rating: 4.9,
    reviewCount: 598,
    description: 'Professional dance studio offering contemporary, ballet, hip-hop, and ballroom classes. Hosting regular performances, recitals, and entertainment events with trained instructors.',
    image: 'https://images.unsplash.com/photo-1540391556891-4b433ef7aeb5?w=800&h=600&fit=crop',
    phone: '+27 13 752 3400',
    email: 'info@momentumdance.co.za',
    website: 'www.momentumdance.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isPlatinum: true,
    tags: ['Dance Studio', 'Performances', 'Dance Classes', 'Ballet', 'Contemporary']
  },
  {
    id: 'nlent_dance_002',
    name: 'The Groove Dance Academy & Event Space',
    category: Category.NightlifeAndEntertainment,
    subcategory: 'DANCE STUDIOS & PERFORMANCES',
    tier: ListingTier.Elite,
    location: 'Hazyview',
    rating: 4.8,
    reviewCount: 445,
    description: 'Dance academy with professional instruction in various styles, performance space for shows, and community events. Experienced instructors and modern facilities.',
    image: 'https://images.unsplash.com/photo-1535439338909-e6d339eeb933?w=800&h=600&fit=crop',
    phone: '+27 13 737 6400',
    email: 'bookings@grooveacademy.co.za',
    website: 'www.grooveacademy.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isElite: true,
    tags: ['Dance Academy', 'Dance Classes', 'Performances', 'Event Space', 'Professional']
  }
];

// MUSIC LESSONS & TEACHERS
export const musicLessonsAndTeachers: Business[] = [
  {
    id: 'nlent_music_001',
    name: 'Harmony Music Academy & Studios',
    category: Category.NightlifeAndEntertainment,
    subcategory: 'MUSIC LESSONS & TEACHERS',
    tier: ListingTier.Platinum,
    location: 'Mbombela',
    rating: 4.9,
    reviewCount: 531,
    description: 'Comprehensive music academy offering lessons in piano, guitar, vocals, drums, and orchestral instruments. Professional instructors, recording studio, and performance opportunities.',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop',
    phone: '+27 13 752 4500',
    email: 'lessons@harmonyacademy.co.za',
    website: 'www.harmonyacademy.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isPlatinum: true,
    tags: ['Music Lessons', 'Piano', 'Guitar', 'Vocals', 'Professional Instructors']
  },
  {
    id: 'nlent_music_002',
    name: 'Crescendo Music Studio & Instruction Center',
    category: Category.NightlifeAndEntertainment,
    subcategory: 'MUSIC LESSONS & TEACHERS',
    tier: ListingTier.Elite,
    location: 'White River',
    rating: 4.8,
    reviewCount: 412,
    description: 'Music instruction center with certified teachers for all ages and skill levels. Specializing in classical, contemporary, and popular music with flexible scheduling.',
    image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800&h=600&fit=crop',
    phone: '+27 13 774 8800',
    email: 'info@crescendostudio.co.za',
    website: 'www.crescendostudio.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isElite: true,
    tags: ['Music Lessons', 'Certified Teachers', 'All Ages', 'Flexible Scheduling', 'Professional']
  }
];
