import React, { useEffect, useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Star,
  Heart,
  Share2,
  X,
  ChevronLeft,
  ChevronRight,
  Check,
  AlertCircle,
  Users,
  Award,
  Calendar,
  DollarSign,
  MessageCircle,
  Stethoscope
} from 'lucide-react';

interface HealthProvider {
  id: string;
  name: string;
  specialty: string;
  qualifications: string[];
  rating: number;
  reviews: number;
  location: string;
  address: string;
  verified: boolean;
  image: string;
  phone: string;
  email: string;
  website?: string;
  hours: Record<string, { open: string; close: string }>;
  consultationFee: number;
  languages: string[];
  about: string;
  services: string[];
  insuranceAccepted: string[];
  experience: number;
  badges: string[];
}

const HealthBusinessDetail: React.FC<{
  providerId: string | null;
  navigate: (view: string) => void;
  onClose?: () => void;
}> = ({ providerId, navigate, onClose }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'services' | 'reviews' | 'booking'>('overview');
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [bookingReason, setBookingReason] = useState('');
  const [showBookingForm, setShowBookingForm] = useState(false);

  // Get provider ID from localStorage or prop
  const activeProviderId = localStorage.getItem('selectedProviderId') || providerId;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeProviderId]);

  // Mock provider data mapping
  const providerDatabase: Record<string, HealthProvider> = {
    'p1': {
      id: 'p1',
      name: 'Dr. John Smith',
      specialty: 'General Practitioner',
      qualifications: ['MBChB', 'FRCP', 'Dip. Family Medicine'],
      rating: 4.9,
      reviews: 124,
      location: 'Mbombela',
      address: '123 Medical Plaza, Mbombela, 1200',
      verified: true,
      image: 'https://images.unsplash.com/photo-1612349317150-e323692df62a?auto=format&fit=crop&q=80&w=800',
      phone: '+27 13 000 1111',
      email: 'dr.smith@healthcenter.co.za',
      website: 'www.drsmith.co.za',
      hours: {
        Mon: { open: '08:00', close: '17:00' },
        Tue: { open: '08:00', close: '17:00' },
        Wed: { open: '08:00', close: '17:00' },
        Thu: { open: '08:00', close: '17:00' },
        Fri: { open: '08:00', close: '16:00' },
        Sat: { open: '09:00', close: '12:00' },
        Sun: { open: 'Closed', close: 'Closed' },
      },
      consultationFee: 420,
      languages: ['English', 'Afrikaans'],
      about: 'Dr. John Smith is an accomplished General Practitioner with 14 years of clinical experience. He specializes in comprehensive family healthcare, preventive medicine, and chronic disease management. Known for his thorough approach and compassionate patient care.',
      services: ['General Consultation', 'Preventive Care', 'Chronic Disease Management', 'Minor Procedures', 'Health Screening', 'Vaccinations', 'Blood Pressure Monitoring'],
      insuranceAccepted: ['Medshield', 'Discovery Health', 'Momentum Health'],
      experience: 14,
      badges: ['Verified Provider', 'Top Rated', 'Responsive'],
    },
    'p2': {
      id: 'p2',
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      qualifications: ['MBChB', 'MMed Cardiology', 'FRCP (Cardiology)'],
      rating: 4.8,
      reviews: 89,
      location: 'Nelspruit',
      address: '456 Cardiac Center, Nelspruit, 1200',
      verified: true,
      image: 'https://images.unsplash.com/photo-1644714505311-a3fb305d0d5f?auto=format&fit=crop&q=80&w=800',
      phone: '+27 13 000 2222',
      email: 'dr.johnson@cardiac.co.za',
      website: 'www.sarrah-cardio.co.za',
      hours: {
        Mon: { open: '09:00', close: '16:00' },
        Tue: { open: '09:00', close: '16:00' },
        Wed: { open: '09:00', close: '16:00' },
        Thu: { open: '09:00', close: '16:00' },
        Fri: { open: '09:00', close: '15:00' },
        Sat: { open: '10:00', close: '13:00' },
        Sun: { open: 'Closed', close: 'Closed' },
      },
      consultationFee: 550,
      languages: ['English', 'Afrikaans', 'French'],
      about: 'Dr. Sarah Johnson is a specialist cardiologist with 11 years of experience treating heart and cardiovascular diseases. She completed her fellowship in cardiology and is known for her expertise in preventive cardiology and advanced diagnostic techniques.',
      services: ['Cardiac Consultation', 'ECG & Holter Monitoring', 'Echocardiography', 'Stress Testing', 'Blood Pressure Management', 'Lipid Management', 'Arrhythmia Management'],
      insuranceAccepted: ['Medshield', 'Discovery Health', 'Alexander Forbes', 'Momentum Health'],
      experience: 11,
      badges: ['Verified Provider', 'Top Rated', 'Specialist'],
    },
    'p3': {
      id: 'p3',
      name: 'Dr. Michael Chen',
      specialty: 'Dermatologist',
      qualifications: ['MBChB', 'Dip. Dermatology', 'FRCP (Dermatology)'],
      rating: 4.7,
      reviews: 67,
      location: 'Hazyview',
      address: '789 Skin Clinic, Hazyview, 1242',
      verified: true,
      image: 'https://images.unsplash.com/photo-1612619142632-faf5ff2cb4b7?auto=format&fit=crop&q=80&w=800',
      phone: '+27 13 000 3333',
      email: 'dr.chen@dermatology.co.za',
      website: 'www.michael-derma.co.za',
      hours: {
        Mon: { open: '10:00', close: '18:00' },
        Tue: { open: '10:00', close: '18:00' },
        Wed: { open: '10:00', close: '18:00' },
        Thu: { open: '10:00', close: '18:00' },
        Fri: { open: '10:00', close: '17:00' },
        Sat: { open: '10:00', close: '14:00' },
        Sun: { open: 'Closed', close: 'Closed' },
      },
      consultationFee: 480,
      languages: ['English', 'Mandarin', 'Afrikaans'],
      about: 'Dr. Michael Chen is an experienced dermatologist specializing in both medical and cosmetic dermatology. With 9 years of practice, he treats a wide range of skin conditions and is known for his meticulous approach and patient satisfaction.',
      services: ['Skin Examination', 'Acne Treatment', 'Psoriasis Management', 'Eczema Treatment', 'Mole Removal', 'Laser Therapy', 'Cosmetic Procedures'],
      insuranceAccepted: ['Discovery Health', 'Momentum Health', 'Medshield'],
      experience: 9,
      badges: ['Verified Provider', 'Specialist', 'Cosmetic Certified'],
    },
    'p4': {
      id: 'p4',
      name: 'Dr. Emily Williams',
      specialty: 'Pediatrician',
      qualifications: ['MBChB', 'MMed Pediatrics', 'FRCP (Pediatrics)'],
      rating: 4.9,
      reviews: 156,
      location: 'White River',
      address: '321 Kids Health, White River, 1240',
      verified: true,
      image: 'https://images.unsplash.com/photo-1619883514856-fcf2315c3e90?auto=format&fit=crop&q=80&w=800',
      phone: '+27 13 000 4444',
      email: 'dr.williams@pediatrics.co.za',
      website: 'www.emily-peds.co.za',
      hours: {
        Mon: { open: '08:00', close: '17:00' },
        Tue: { open: '08:00', close: '17:00' },
        Wed: { open: '08:00', close: '17:00' },
        Thu: { open: '08:00', close: '17:00' },
        Fri: { open: '08:00', close: '16:00' },
        Sat: { open: '09:00', close: '12:00' },
        Sun: { open: 'Closed', close: 'Closed' },
      },
      consultationFee: 380,
      languages: ['English', 'Afrikaans', 'Zulu'],
      about: 'Dr. Emily Williams is a highly experienced pediatrician with 10 years of dedicated service to children\'s health. She specializes in newborn care, vaccinations, and childhood development. Parents trust her for her gentle approach and thorough care.',
      services: ['Child Consultation', 'Newborn Screening', 'Vaccinations', 'Growth Monitoring', 'Developmental Assessment', 'Allergy Management', 'Asthma Management'],
      insuranceAccepted: ['Medshield', 'Discovery Health', 'Momentum Health', 'Alexander Forbes'],
      experience: 10,
      badges: ['Verified Provider', 'Highly Rated', 'Child Specialist'],
    },
    'p5': {
      id: 'p5',
      name: 'Dr. David Martinez',
      specialty: 'Orthopedic Surgeon',
      qualifications: ['MBChB', 'MMed Orthopedics', 'FRCS (Orthopedics)'],
      rating: 4.8,
      reviews: 102,
      location: 'Sabie',
      address: '654 Bone & Joint, Sabie, 1260',
      verified: true,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800',
      phone: '+27 13 000 5555',
      email: 'dr.martinez@ortho.co.za',
      website: 'www.david-ortho.co.za',
      hours: {
        Mon: { open: '09:00', close: '16:00' },
        Tue: { open: '09:00', close: '16:00' },
        Wed: { open: '09:00', close: '16:00' },
        Thu: { open: '09:00', close: '16:00' },
        Fri: { open: '09:00', close: '15:00' },
        Sat: { open: 'Closed', close: 'Closed' },
        Sun: { open: 'Closed', close: 'Closed' },
      },
      consultationFee: 520,
      languages: ['English', 'Spanish', 'Afrikaans'],
      about: 'Dr. David Martinez is a skilled orthopedic surgeon with 12 years of experience in joint and bone surgery. He specializes in sports injuries, arthroscopy, and joint replacement procedures. Known for his precision and excellent surgical outcomes.',
      services: ['Orthopedic Consultation', 'Joint Replacement', 'Arthroscopy', 'Sports Injury Treatment', 'Fracture Management', 'Physical Therapy', 'Surgical Repair'],
      insuranceAccepted: ['Discovery Health', 'Momentum Health', 'Alexander Forbes'],
      experience: 12,
      badges: ['Verified Provider', 'Surgical Specialist', 'Sports Medicine'],
    },
    'p6': {
      id: 'p6',
      name: 'Dr. Lisa Anderson',
      specialty: 'Gynecologist',
      qualifications: ['MBChB', 'MMed Obstetrics & Gynecology', 'FRCO'],
      rating: 4.9,
      reviews: 134,
      location: 'Mbombela',
      address: '987 Women\'s Health, Mbombela, 1200',
      verified: true,
      image: 'https://images.unsplash.com/photo-1604480557596-6e4ee4b94a91?auto=format&fit=crop&q=80&w=800',
      phone: '+27 13 000 6666',
      email: 'dr.anderson@womenshealth.co.za',
      website: 'www.lisa-gyn.co.za',
      hours: {
        Mon: { open: '08:30', close: '16:30' },
        Tue: { open: '08:30', close: '16:30' },
        Wed: { open: '08:30', close: '16:30' },
        Thu: { open: '08:30', close: '16:30' },
        Fri: { open: '08:30', close: '15:30' },
        Sat: { open: '09:00', close: '12:00' },
        Sun: { open: 'Closed', close: 'Closed' },
      },
      consultationFee: 500,
      languages: ['English', 'Afrikaans', 'German'],
      about: 'Dr. Lisa Anderson is an accomplished gynecologist and obstetrician with 13 years of experience in women\'s healthcare. She provides comprehensive care from adolescence through menopause and is known for her compassionate, patient-centered approach.',
      services: ['Gynecological Consultation', 'Prenatal Care', 'Delivery & Obstetrics', 'Contraception Management', 'Menopause Counseling', 'Pap Smear', 'Ultrasound'],
      insuranceAccepted: ['Medshield', 'Discovery Health', 'Momentum Health', 'Alexander Forbes'],
      experience: 13,
      badges: ['Verified Provider', 'Top Rated', 'OB/GYN Specialist'],
    },
  };

  // Get the current provider or default
  const provider: HealthProvider = activeProviderId && providerDatabase[activeProviderId] 
    ? providerDatabase[activeProviderId]
    : providerDatabase['p1'];

  const gallery = [provider.image, provider.image, provider.image, provider.image];

  const nextImage = () => setGalleryIndex((prev) => (prev + 1) % gallery.length);
  const prevImage = () => setGalleryIndex((prev) => (prev - 1 + gallery.length) % gallery.length);

  const getDayHours = () => {
    const now = new Date();
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const day = dayNames[now.getDay()];
    const hours = provider.hours[day as keyof typeof provider.hours];
    return hours || { open: 'Closed', close: 'Closed' };
  };

  const isOpenNow = () => {
    const now = new Date();
    const hours = getDayHours();
    if (hours.open === 'Closed') return false;
    const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    return currentTime >= hours.open && currentTime <= hours.close;
  };

  return (
    <div style={{ background: '#000', color: '#fff', position: 'relative' }}>
      {/* ===== HERO: IMAGE + GRADIENT OVERLAY ===== */}
      <section style={{ position: 'relative', height: '60vh', overflow: 'hidden' }}>
        <img
          src={gallery[galleryIndex]}
          alt={provider.name}
          className="w-full h-full object-cover"
        />

        {/* Dark Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(0,0,0,0.2), rgba(0,0,0,0.8))',
          }}
        />

        {/* Close Button */}
        {onClose && (
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: 20,
              right: 20,
              zIndex: 20,
              background: 'rgba(0,0,0,0.6)',
              border: 'none',
              color: '#fff',
              borderRadius: '50%',
              width: 44,
              height: 44,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(0,0,0,0.8)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(0,0,0,0.6)';
            }}
          >
            <X size={20} />
          </button>
        )}

        {/* Gallery Navigation */}
        {gallery.length > 1 && (
          <>
            <button
              onClick={prevImage}
              style={{
                position: 'absolute',
                left: 16,
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 15,
                background: 'rgba(201, 162, 77, 0.8)',
                border: 'none',
                color: '#000',
                borderRadius: '50%',
                width: 40,
                height: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#C9A24D';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(201, 162, 77, 0.8)';
              }}
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={nextImage}
              style={{
                position: 'absolute',
                right: 16,
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 15,
                background: 'rgba(201, 162, 77, 0.8)',
                border: 'none',
                color: '#000',
                borderRadius: '50%',
                width: 40,
                height: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#C9A24D';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(201, 162, 77, 0.8)';
              }}
            >
              <ChevronRight size={20} />
            </button>

            {/* Gallery Dots */}
            <div
              style={{
                position: 'absolute',
                bottom: 16,
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: 8,
                zIndex: 15,
              }}
            >
              {gallery.map((_, idx) => (
                <div
                  key={idx}
                  onClick={() => setGalleryIndex(idx)}
                  style={{
                    width: idx === galleryIndex ? 24 : 8,
                    height: 8,
                    background: idx === galleryIndex ? '#C9A24D' : 'rgba(255,255,255,0.4)',
                    borderRadius: 4,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                />
              ))}
            </div>
          </>
        )}

        {/* Header Content: Bottom Overlay */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '40px 24px',
            background: 'linear-gradient(180deg, transparent, rgba(0,0,0,0.95))',
            zIndex: 10,
          }}
        >
          <div className="max-w-6xl mx-auto">
            {/* Name + Badges */}
            <div className="flex items-start justify-between flex-wrap gap-4 mb-4">
              <div>
                <h1
                  style={{
                    fontSize: 'clamp(32px, 7vw, 52px)',
                    fontWeight: 700,
                    color: '#fff',
                    marginBottom: 8,
                    fontFamily: '"Playfair Display", "Georgia", serif',
                    letterSpacing: '-0.5px',
                  }}
                >
                  {provider.name}
                </h1>
                <p style={{ fontSize: 15, color: '#C9A24D', fontWeight: 600, marginBottom: 8 }}>
                  {provider.specialty}
                </p>
                <div className="flex gap-2 flex-wrap">
                  {provider.badges.map((badge, idx) => (
                    <span
                      key={idx}
                      style={{
                        fontSize: 12,
                        padding: '4px 10px',
                        background: 'rgba(201, 162, 77, 0.2)',
                        color: '#C9A24D',
                        borderRadius: 3,
                        fontWeight: 600,
                      }}
                    >
                      ✓ {badge}
                    </span>
                  ))}
                </div>
              </div>

              {/* Favorite + Share */}
              <div className="flex gap-3">
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  style={{
                    padding: 12,
                    background: 'rgba(201, 162, 77, 0.1)',
                    border: '1.5px solid rgba(201, 162, 77, 0.3)',
                    color: isFavorite ? '#C9A24D' : '#fff',
                    borderRadius: 6,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(201, 162, 77, 0.2)';
                    e.currentTarget.style.borderColor = '#C9A24D';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(201, 162, 77, 0.1)';
                    e.currentTarget.style.borderColor = 'rgba(201, 162, 77, 0.3)';
                  }}
                >
                  <Heart size={20} fill={isFavorite ? '#C9A24D' : 'none'} />
                </button>

                <button
                  style={{
                    padding: 12,
                    background: 'rgba(201, 162, 77, 0.1)',
                    border: '1.5px solid rgba(201, 162, 77, 0.3)',
                    color: '#fff',
                    borderRadius: 6,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(201, 162, 77, 0.2)';
                    e.currentTarget.style.borderColor = '#C9A24D';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(201, 162, 77, 0.1)';
                    e.currentTarget.style.borderColor = 'rgba(201, 162, 77, 0.3)';
                  }}
                >
                  <Share2 size={20} />
                </button>
              </div>
            </div>

            {/* Info Row: Location + Rating + Hours */}
            <div className="flex gap-8 flex-wrap" style={{ marginBottom: 20 }}>
              <div className="flex items-center gap-2" style={{ color: '#C9A24D', fontSize: 14 }}>
                <MapPin size={16} />
                <span>{provider.location}</span>
              </div>

              <div className="flex items-center gap-2" style={{ color: '#C9A24D', fontSize: 14 }}>
                <Star size={16} fill="#C9A24D" />
                <span>
                  {provider.rating} ({provider.reviews} reviews)
                </span>
              </div>

              <div
                className="flex items-center gap-2"
                style={{
                  fontSize: 14,
                  color: isOpenNow() ? '#4ade80' : '#ef4444',
                }}
              >
                <Clock size={16} />
                <span>{isOpenNow() ? 'Open now' : 'Closed'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== MAIN CONTENT TABS ===== */}
      <div style={{ maxWidth: 1200, margin: '0 auto', paddingTop: 60, paddingBottom: 80 }} className="px-4">
        {/* Tab Navigation */}
        <div
          style={{
            display: 'flex',
            gap: 2,
            marginBottom: 60,
            borderBottom: '1px solid rgba(201, 162, 77, 0.2)',
            paddingBottom: 0,
          }}
        >
          {['overview', 'services', 'reviews', 'booking'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              style={{
                padding: '16px 24px',
                fontSize: 14,
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                background: 'transparent',
                color: activeTab === tab ? '#C9A24D' : '#666',
                border: 'none',
                cursor: 'pointer',
                borderBottom: activeTab === tab ? '2px solid #C9A24D' : 'none',
                transition: 'all 0.3s ease',
              }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div>
            <div style={{ marginBottom: 60 }}>
              <h2
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                  marginBottom: 24,
                  fontFamily: '"Playfair Display", "Georgia", serif',
                  letterSpacing: '-0.5px',
                }}
              >
                About
              </h2>
              <p style={{ fontSize: 15, lineHeight: 1.8, color: '#ccc', marginBottom: 24 }}>
                {provider.about}
              </p>

              {/* Key Stats Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                  gap: 16,
                  marginTop: 32,
                }}
              >
                <div
                  style={{
                    padding: 20,
                    background: 'rgba(201, 162, 77, 0.05)',
                    border: '1px solid rgba(201, 162, 77, 0.1)',
                    borderRadius: 6,
                  }}
                >
                  <div style={{ fontSize: 12, color: '#888', marginBottom: 8, fontWeight: 600 }}>
                    EXPERIENCE
                  </div>
                  <div style={{ fontSize: 28, fontWeight: 700, color: '#C9A24D' }}>
                    {provider.experience}+
                  </div>
                  <div style={{ fontSize: 12, color: '#999' }}>Years</div>
                </div>

                <div
                  style={{
                    padding: 20,
                    background: 'rgba(201, 162, 77, 0.05)',
                    border: '1px solid rgba(201, 162, 77, 0.1)',
                    borderRadius: 6,
                  }}
                >
                  <div style={{ fontSize: 12, color: '#888', marginBottom: 8, fontWeight: 600 }}>
                    CONSULTATION
                  </div>
                  <div style={{ fontSize: 28, fontWeight: 700, color: '#C9A24D' }}>
                    R{provider.consultationFee}
                  </div>
                  <div style={{ fontSize: 12, color: '#999' }}>Per Session</div>
                </div>

                <div
                  style={{
                    padding: 20,
                    background: 'rgba(201, 162, 77, 0.05)',
                    border: '1px solid rgba(201, 162, 77, 0.1)',
                    borderRadius: 6,
                  }}
                >
                  <div style={{ fontSize: 12, color: '#888', marginBottom: 8, fontWeight: 600 }}>
                    RATING
                  </div>
                  <div style={{ fontSize: 28, fontWeight: 700, color: '#C9A24D' }}>
                    {provider.rating}⭐
                  </div>
                  <div style={{ fontSize: 12, color: '#999' }}>Highly Rated</div>
                </div>

                <div
                  style={{
                    padding: 20,
                    background: 'rgba(201, 162, 77, 0.05)',
                    border: '1px solid rgba(201, 162, 77, 0.1)',
                    borderRadius: 6,
                  }}
                >
                  <div style={{ fontSize: 12, color: '#888', marginBottom: 8, fontWeight: 600 }}>
                    LANGUAGES
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#C9A24D' }}>
                    {provider.languages.length}
                  </div>
                  <div style={{ fontSize: 12, color: '#999' }}>Fluent</div>
                </div>
              </div>
            </div>

            {/* Qualifications */}
            <div style={{ marginBottom: 60 }}>
              <h2
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                  marginBottom: 24,
                  fontFamily: '"Playfair Display", "Georgia", serif',
                  letterSpacing: '-0.5px',
                }}
              >
                Qualifications
              </h2>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                {provider.qualifications.map((qual, idx) => (
                  <span
                    key={idx}
                    style={{
                      padding: '8px 16px',
                      background: 'rgba(201, 162, 77, 0.1)',
                      color: '#C9A24D',
                      borderRadius: 4,
                      fontSize: 13,
                      fontWeight: 600,
                      border: '1px solid rgba(201, 162, 77, 0.2)',
                    }}
                  >
                    {qual}
                  </span>
                ))}
              </div>
            </div>

            {/* Contact Information */}
            <div style={{ marginBottom: 60 }}>
              <h2
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                  marginBottom: 24,
                  fontFamily: '"Playfair Display", "Georgia", serif',
                  letterSpacing: '-0.5px',
                }}
              >
                Contact
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
                <div>
                  <div style={{ fontSize: 12, color: '#888', marginBottom: 8, fontWeight: 600 }}>
                    PHONE
                  </div>
                  <a
                    href={`tel:${provider.phone}`}
                    style={{
                      fontSize: 15,
                      color: '#C9A24D',
                      textDecoration: 'none',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                    }}
                  >
                    <Phone size={16} />
                    {provider.phone}
                  </a>
                </div>

                <div>
                  <div style={{ fontSize: 12, color: '#888', marginBottom: 8, fontWeight: 600 }}>
                    EMAIL
                  </div>
                  <a
                    href={`mailto:${provider.email}`}
                    style={{
                      fontSize: 15,
                      color: '#C9A24D',
                      textDecoration: 'none',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                    }}
                  >
                    <Mail size={16} />
                    {provider.email}
                  </a>
                </div>

                <div>
                  <div style={{ fontSize: 12, color: '#888', marginBottom: 8, fontWeight: 600 }}>
                    LOCATION
                  </div>
                  <p style={{ fontSize: 15, color: '#ccc', fontWeight: 500, display: 'flex', gap: 8 }}>
                    <MapPin size={16} style={{ color: '#C9A24D', flexShrink: 0 }} />
                    {provider.address}
                  </p>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div>
              <h2
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                  marginBottom: 24,
                  fontFamily: '"Playfair Display", "Georgia", serif',
                  letterSpacing: '-0.5px',
                }}
              >
                Hours
              </h2>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: 16,
                }}
              >
                {Object.entries(provider.hours).map(([day, times]) => (
                  <div
                    key={day}
                    style={{
                      padding: 16,
                      background: 'rgba(201, 162, 77, 0.05)',
                      border: '1px solid rgba(201, 162, 77, 0.1)',
                      borderRadius: 6,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <span style={{ fontWeight: 600, fontSize: 14 }}>{day}</span>
                    <span style={{ fontSize: 13, color: '#999' }}>
                      {times.open === 'Closed' ? 'Closed' : `${times.open} - ${times.close}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SERVICES TAB */}
        {activeTab === 'services' && (
          <div>
            <h2
              style={{
                fontSize: 24,
                fontWeight: 700,
                marginBottom: 32,
                fontFamily: '"Playfair Display", "Georgia", serif',
                letterSpacing: '-0.5px',
              }}
            >
              Services Offered
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginBottom: 60 }}>
              {provider.services.map((service, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: 20,
                    background: 'rgba(201, 162, 77, 0.05)',
                    border: '1px solid rgba(201, 162, 77, 0.15)',
                    borderRadius: 6,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                  }}
                >
                  <Check size={20} style={{ color: '#C9A24D', flexShrink: 0 }} />
                  <span style={{ fontSize: 15, fontWeight: 500 }}>{service}</span>
                </div>
              ))}
            </div>

            {/* Insurance */}
            <h2
              style={{
                fontSize: 24,
                fontWeight: 700,
                marginBottom: 32,
                fontFamily: '"Playfair Display", "Georgia", serif',
                letterSpacing: '-0.5px',
              }}
            >
              Insurance Accepted
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
              {provider.insuranceAccepted.map((insurance, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: 16,
                    background: 'rgba(201, 162, 77, 0.08)',
                    border: '1.5px solid rgba(201, 162, 77, 0.2)',
                    borderRadius: 4,
                    textAlign: 'center',
                    fontWeight: 600,
                    fontSize: 14,
                  }}
                >
                  {insurance}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* REVIEWS TAB */}
        {activeTab === 'reviews' && (
          <div>
            <h2
              style={{
                fontSize: 24,
                fontWeight: 700,
                marginBottom: 32,
                fontFamily: '"Playfair Display", "Georgia", serif',
                letterSpacing: '-0.5px',
              }}
            >
              Patient Reviews
            </h2>

            <div style={{ marginBottom: 40 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 48, fontWeight: 700, color: '#C9A24D' }}>
                    {provider.rating}
                  </div>
                  <div style={{ fontSize: 12, color: '#888' }}>out of 5.0</div>
                </div>
                <div>
                  {[5, 4, 3, 2, 1].map((stars) => (
                    <div key={stars} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                      <span style={{ fontSize: 12, color: '#888', width: 30 }}>{stars}⭐</span>
                      <div
                        style={{
                          height: 6,
                          background: 'rgba(201, 162, 77, 0.1)',
                          borderRadius: 3,
                          width: 100,
                          overflow: 'hidden',
                        }}
                      >
                        <div
                          style={{
                            height: '100%',
                            background: '#C9A24D',
                            width: `${(6 - stars) * 15}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <p style={{ fontSize: 13, color: '#999' }}>
                Based on {provider.reviews} verified reviews
              </p>
            </div>

            {/* Sample Reviews */}
            <div style={{ display: 'grid', gap: 20 }}>
              {[1, 2, 3].map((review) => (
                <div
                  key={review}
                  style={{
                    padding: 20,
                    background: 'rgba(201, 162, 77, 0.05)',
                    border: '1px solid rgba(201, 162, 77, 0.1)',
                    borderRadius: 6,
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                    <div>
                      <p style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>
                        Patient {review}
                      </p>
                      <div style={{ fontSize: 12, color: '#888' }}>
                        {'⭐'.repeat(5)} • 2 weeks ago
                      </div>
                    </div>
                  </div>
                  <p style={{ fontSize: 14, color: '#ccc', lineHeight: 1.6 }}>
                    "Dr. Johnson is professional, caring, and thorough. The consultation was comprehensive and she addressed all my concerns. Highly recommended!"
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* BOOKING TAB */}
        {activeTab === 'booking' && (
          <div>
            <h2
              style={{
                fontSize: 24,
                fontWeight: 700,
                marginBottom: 32,
                fontFamily: '"Playfair Display", "Georgia", serif',
                letterSpacing: '-0.5px',
              }}
            >
              Book an Appointment
            </h2>

            <div
              style={{
                maxWidth: 600,
                padding: 32,
                background: 'rgba(201, 162, 77, 0.05)',
                border: '1px solid rgba(201, 162, 77, 0.15)',
                borderRadius: 8,
              }}
            >
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#C9A24D', marginBottom: 8 }}>
                  DATE
                </label>
                <input
                  type="date"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: 'rgba(0, 0, 0, 0.3)',
                    border: '1.5px solid rgba(201, 162, 77, 0.2)',
                    borderRadius: 4,
                    color: '#fff',
                    fontSize: 14,
                    boxSizing: 'border-box',
                    transition: 'all 0.3s ease',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#C9A24D';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(201, 162, 77, 0.15)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(201, 162, 77, 0.2)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>

              <div style={{ marginBottom: 24 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#C9A24D', marginBottom: 8 }}>
                  TIME
                </label>
                <select
                  value={bookingTime}
                  onChange={(e) => setBookingTime(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: 'rgba(0, 0, 0, 0.3)',
                    border: '1.5px solid rgba(201, 162, 77, 0.2)',
                    borderRadius: 4,
                    color: '#fff',
                    fontSize: 14,
                    boxSizing: 'border-box',
                    transition: 'all 0.3s ease',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#C9A24D';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(201, 162, 77, 0.15)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(201, 162, 77, 0.2)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <option value="">Select a time</option>
                  {['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00'].map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: 24 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#C9A24D', marginBottom: 8 }}>
                  REASON FOR VISIT
                </label>
                <textarea
                  value={bookingReason}
                  onChange={(e) => setBookingReason(e.target.value)}
                  placeholder="Briefly describe your concern..."
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: 'rgba(0, 0, 0, 0.3)',
                    border: '1.5px solid rgba(201, 162, 77, 0.2)',
                    borderRadius: 4,
                    color: '#fff',
                    fontSize: 14,
                    boxSizing: 'border-box',
                    minHeight: 80,
                    resize: 'vertical',
                    transition: 'all 0.3s ease',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#C9A24D';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(201, 162, 77, 0.15)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(201, 162, 77, 0.2)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>

              <button
                style={{
                  width: '100%',
                  padding: '14px 24px',
                  background: 'linear-gradient(135deg, #C9A24D, #dbb85a)',
                  border: 'none',
                  color: '#000',
                  fontWeight: 700,
                  fontSize: 14,
                  borderRadius: 4,
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 8px 24px rgba(201, 162, 77, 0.3)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(201, 162, 77, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(201, 162, 77, 0.3)';
                }}
              >
                Request Appointment
              </button>

              <p style={{ fontSize: 12, color: '#888', marginTop: 16, textAlign: 'center' }}>
                You will receive confirmation within 24 hours
              </p>
            </div>
          </div>
        )}
      </div>

      {/* ===== CTA FOOTER ===== */}
      <div
        style={{
          background: 'rgba(201, 162, 77, 0.08)',
          borderTop: '1px solid rgba(201, 162, 77, 0.2)',
          padding: '60px 24px',
          marginTop: 80,
        }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  marginBottom: 16,
                  fontFamily: '"Playfair Display", "Georgia", serif',
                  letterSpacing: '-0.5px',
                }}
              >
                Ready to Book?
              </h3>
              <p style={{ fontSize: 14, color: '#ccc', marginBottom: 24, lineHeight: 1.6 }}>
                Secure your appointment with {provider.name} today. Consultation fee: R{provider.consultationFee}
              </p>
              <button
                onClick={() => setActiveTab('booking')}
                style={{
                  padding: '13px 32px',
                  background: 'linear-gradient(135deg, #C9A24D, #dbb85a)',
                  border: 'none',
                  color: '#000',
                  fontWeight: 700,
                  fontSize: 13,
                  borderRadius: 4,
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                Book Appointment
              </button>
            </div>

            <div>
              <h3
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  marginBottom: 16,
                  fontFamily: '"Playfair Display", "Georgia", serif',
                  letterSpacing: '-0.5px',
                }}
              >
                Need Help?
              </h3>
              <p style={{ fontSize: 14, color: '#ccc', marginBottom: 16 }}>
                Contact us directly for any questions or special requests.
              </p>
              <div className="flex gap-4">
                <a
                  href={`tel:${provider.phone}`}
                  style={{
                    padding: '10px 20px',
                    background: 'rgba(201, 162, 77, 0.15)',
                    border: '1.5px solid rgba(201, 162, 77, 0.3)',
                    color: '#C9A24D',
                    fontWeight: 700,
                    fontSize: 12,
                    borderRadius: 4,
                    cursor: 'pointer',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(201, 162, 77, 0.25)';
                    e.currentTarget.style.borderColor = '#C9A24D';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(201, 162, 77, 0.15)';
                    e.currentTarget.style.borderColor = 'rgba(201, 162, 77, 0.3)';
                  }}
                >
                  Call
                </a>
                <a
                  href={`mailto:${provider.email}`}
                  style={{
                    padding: '10px 20px',
                    background: 'rgba(201, 162, 77, 0.15)',
                    border: '1.5px solid rgba(201, 162, 77, 0.3)',
                    color: '#C9A24D',
                    fontWeight: 700,
                    fontSize: 12,
                    borderRadius: 4,
                    cursor: 'pointer',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(201, 162, 77, 0.25)';
                    e.currentTarget.style.borderColor = '#C9A24D';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(201, 162, 77, 0.15)';
                    e.currentTarget.style.borderColor = 'rgba(201, 162, 77, 0.3)';
                  }}
                >
                  Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthBusinessDetail;
