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
  Users,
  Award,
  Calendar,
  DollarSign,
  MessageCircle,
  Briefcase
} from 'lucide-react';

interface LegalFinanceProfessional {
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
  paymentMethods: string[];
  associations: string[];
  experience: number;
  badges: string[];
}

const LegalFinanceProfessionalDetail: React.FC<{
  professionalId: string | null;
  navigate: (view: string) => void;
  onClose?: () => void;
}> = ({ professionalId, navigate, onClose }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'services' | 'reviews' | 'booking'>('overview');
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [bookingReason, setBookingReason] = useState('');

  // Get professional ID from localStorage or prop
  const activeProfessionalId = localStorage.getItem('selectedProfessionalId') || professionalId;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeProfessionalId]);

  // Mock professional data mapping
  const professionalDatabase: Record<string, LegalFinanceProfessional> = {
    'l1': {
      id: 'l1',
      name: 'Adv. Thabo Mokoena',
      specialty: 'Attorney',
      qualifications: ['LLB', 'LLM', 'Admitted Advocate'],
      rating: 4.9,
      reviews: 98,
      location: 'Mbombela',
      address: '101 Justice Ave, Mbombela, 1200',
      verified: true,
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
      phone: '+27 13 555 1234',
      email: 'thabo@moklaw.co.za',
      website: 'www.moklaw.co.za',
      hours: {
        Mon: { open: '08:00', close: '17:00' },
        Tue: { open: '08:00', close: '17:00' },
        Wed: { open: '08:00', close: '17:00' },
        Thu: { open: '08:00', close: '17:00' },
        Fri: { open: '08:00', close: '16:00' },
        Sat: { open: 'Closed', close: 'Closed' },
        Sun: { open: 'Closed', close: 'Closed' },
      },
      consultationFee: 950,
      languages: ['English', 'Zulu', 'Afrikaans'],
      about: 'Advocate Thabo Mokoena is a highly respected attorney with 15 years of experience in civil and commercial law. He is dedicated to providing strategic legal solutions and upholding the highest standards of professional ethics.',
      services: ['Civil Litigation', 'Commercial Law', 'Contract Drafting', 'Labour Law', 'Family Law', 'Legal Consultation', 'Dispute Resolution'],
      paymentMethods: ['Card', 'EFT', 'Cash'],
      associations: ['Mpumalanga Law Society', 'South African Bar Association'],
      experience: 15,
      badges: ['Verified', 'Top Rated', '15 Years Experience'],
    },
    'f1': {
      id: 'f1',
      name: 'Ms. Lerato Dlamini',
      specialty: 'Chartered Accountant',
      qualifications: ['BCompt', 'CA(SA)', 'Registered Tax Practitioner'],
      rating: 4.8,
      reviews: 76,
      location: 'Nelspruit',
      address: '202 Finance Park, Nelspruit, 1201',
      verified: true,
      image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80',
      phone: '+27 13 555 5678',
      email: 'lerato@dlaminica.co.za',
      website: 'www.dlaminica.co.za',
      hours: {
        Mon: { open: '08:30', close: '16:30' },
        Tue: { open: '08:30', close: '16:30' },
        Wed: { open: '08:30', close: '16:30' },
        Thu: { open: '08:30', close: '16:30' },
        Fri: { open: '08:30', close: '15:00' },
        Sat: { open: 'Closed', close: 'Closed' },
        Sun: { open: 'Closed', close: 'Closed' },
      },
      consultationFee: 800,
      languages: ['English', 'Zulu', 'Swati'],
      about: 'Ms. Lerato Dlamini is a Chartered Accountant and Registered Tax Practitioner with 12 years of experience. She specializes in tax planning, auditing, and financial consulting for businesses and individuals.',
      services: ['Tax Consulting', 'Financial Auditing', 'Business Advisory', 'Payroll Services', 'Annual Returns', 'Personal Tax', 'Company Registrations'],
      paymentMethods: ['Card', 'EFT'],
      associations: ['SAICA', 'SAIT'],
      experience: 12,
      badges: ['Verified', 'Top Rated', 'Tax Specialist'],
    },
  };

  // Get the current professional or default
  const professional: LegalFinanceProfessional = activeProfessionalId && professionalDatabase[activeProfessionalId]
    ? professionalDatabase[activeProfessionalId]
    : professionalDatabase['l1'];

  const gallery = [professional.image, professional.image, professional.image];

  const nextImage = () => setGalleryIndex((prev) => (prev + 1) % gallery.length);
  const prevImage = () => setGalleryIndex((prev) => (prev - 1 + gallery.length) % gallery.length);

  const getDayHours = () => {
    const now = new Date();
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const day = dayNames[now.getDay()];
    const hours = professional.hours[day as keyof typeof professional.hours];
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
          alt={professional.name}
          className="w-full h-full object-cover"
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(0,0,0,0.2), rgba(0,0,0,0.8))',
          }}
        />
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
            <div className="flex items-start justify-between flex-wrap gap-4 mb-4">
              <div>
                <h1
                  style={{
                    fontSize: 'clamp(32px, 7vw, 52px)',
                    fontWeight: 700,
                    color: '#fff',
                    marginBottom: 8,
                    fontFamily: 'Playfair Display, Georgia, serif',
                    letterSpacing: '-0.5px',
                  }}
                >
                  {professional.name}
                </h1>
                <p style={{ fontSize: 15, color: '#C9A24D', fontWeight: 600, marginBottom: 8 }}>
                  {professional.specialty}
                </p>
                <div className="flex gap-2 flex-wrap">
                  {professional.badges.map((badge, idx) => (
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
            <div className="flex gap-8 flex-wrap" style={{ marginBottom: 20 }}>
              <div className="flex items-center gap-2" style={{ color: '#C9A24D', fontSize: 14 }}>
                <MapPin size={16} />
                <span>{professional.location}</span>
              </div>
              <div className="flex items-center gap-2" style={{ color: '#C9A24D', fontSize: 14 }}>
                <Star size={16} fill="#C9A24D" />
                <span>
                  {professional.rating} ({professional.reviews} reviews)
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
      <div style={{ maxWidth: 1200, margin: '0 auto', paddingTop: 60, paddingBottom: 80 }} className="px-4">
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
        {activeTab === 'overview' && (
          <div>
            <div style={{ marginBottom: 60 }}>
              <h2
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                  marginBottom: 24,
                  fontFamily: 'Playfair Display, Georgia, serif',
                  letterSpacing: '-0.5px',
                }}
              >
                About
              </h2>
              <p style={{ fontSize: 15, lineHeight: 1.8, color: '#ccc', marginBottom: 24 }}>
                {professional.about}
              </p>
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
                    {professional.experience}+
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
                    R{professional.consultationFee}
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
                    {professional.rating}⭐
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
                    {professional.languages.length}
                  </div>
                  <div style={{ fontSize: 12, color: '#999' }}>Fluent</div>
                </div>
              </div>
            </div>
            <div style={{ marginBottom: 60 }}>
              <h2
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                  marginBottom: 24,
                  fontFamily: 'Playfair Display, Georgia, serif',
                  letterSpacing: '-0.5px',
                }}
              >
                Qualifications
              </h2>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                {professional.qualifications.map((qual, idx) => (
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
            <div style={{ marginBottom: 60 }}>
              <h2
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                  marginBottom: 24,
                  fontFamily: 'Playfair Display, Georgia, serif',
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
                    href={`tel:${professional.phone}`}
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
                    {professional.phone}
                  </a>
                </div>
                <div>
                  <div style={{ fontSize: 12, color: '#888', marginBottom: 8, fontWeight: 600 }}>
                    EMAIL
                  </div>
                  <a
                    href={`mailto:${professional.email}`}
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
                    {professional.email}
                  </a>
                </div>
                <div>
                  <div style={{ fontSize: 12, color: '#888', marginBottom: 8, fontWeight: 600 }}>
                    LOCATION
                  </div>
                  <p style={{ fontSize: 15, color: '#ccc', fontWeight: 500, display: 'flex', gap: 8 }}>
                    <MapPin size={16} style={{ color: '#C9A24D', flexShrink: 0 }} />
                    {professional.address}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h2
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                  marginBottom: 24,
                  fontFamily: 'Playfair Display, Georgia, serif',
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
                {Object.entries(professional.hours).map(([day, times]) => (
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
        {activeTab === 'services' && (
          <div>
            <h2
              style={{
                fontSize: 24,
                fontWeight: 700,
                marginBottom: 32,
                fontFamily: 'Playfair Display, Georgia, serif',
                letterSpacing: '-0.5px',
              }}
            >
              Services Offered
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginBottom: 40 }}>
              {professional.services.map((service, idx) => (
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
            <h2
              style={{
                fontSize: 24,
                fontWeight: 700,
                marginBottom: 24,
                fontFamily: 'Playfair Display, Georgia, serif',
                letterSpacing: '-0.5px',
              }}
            >
              Payment Methods
            </h2>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 40 }}>
              {professional.paymentMethods.map((method, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '12px 24px',
                    background: 'rgba(201, 162, 77, 0.08)',
                    border: '1.5px solid rgba(201, 162, 77, 0.2)',
                    borderRadius: 4,
                    textAlign: 'center',
                    fontWeight: 600,
                    fontSize: 14,
                  }}
                >
                  {method}
                </div>
              ))}
            </div>
            <h2
              style={{
                fontSize: 24,
                fontWeight: 700,
                marginBottom: 24,
                fontFamily: 'Playfair Display, Georgia, serif',
                letterSpacing: '-0.5px',
              }}
            >
              Professional Associations
            </h2>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              {professional.associations.map((assoc, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '12px 24px',
                    background: 'rgba(201, 162, 77, 0.08)',
                    border: '1.5px solid rgba(201, 162, 77, 0.2)',
                    borderRadius: 4,
                    textAlign: 'center',
                    fontWeight: 600,
                    fontSize: 14,
                  }}
                >
                  {assoc}
                </div>
              ))}
            </div>
          </div>
        )}
        {activeTab === 'reviews' && (
          <div>
            <h2
              style={{
                fontSize: 24,
                fontWeight: 700,
                marginBottom: 32,
                fontFamily: 'Playfair Display, Georgia, serif',
                letterSpacing: '-0.5px',
              }}
            >
              Client Reviews
            </h2>
            <div style={{ marginBottom: 40 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 48, fontWeight: 700, color: '#C9A24D' }}>
                    {professional.rating}
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
                Based on {professional.reviews} verified reviews
              </p>
            </div>
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
                        Client {review}
                      </p>
                      <div style={{ fontSize: 12, color: '#888' }}>
                        {'⭐'.repeat(5)} • 2 weeks ago
                      </div>
                    </div>
                  </div>
                  <p style={{ fontSize: 14, color: '#ccc', lineHeight: 1.6 }}>
                    "{professional.specialty} services were exceptional. Highly professional, responsive, and knowledgeable. I felt confident and supported throughout my case."
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
        {activeTab === 'booking' && (
          <div>
            <h2
              style={{
                fontSize: 24,
                fontWeight: 700,
                marginBottom: 32,
                fontFamily: 'Playfair Display, Georgia, serif',
                letterSpacing: '-0.5px',
              }}
            >
              Book a Consultation
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
                  REASON FOR CONSULTATION
                </label>
                <textarea
                  value={bookingReason}
                  onChange={(e) => setBookingReason(e.target.value)}
                  placeholder="Briefly describe your legal or financial need..."
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
                Request Consultation
              </button>
              <p style={{ fontSize: 12, color: '#888', marginTop: 16, textAlign: 'center' }}>
                You will receive confirmation within 24 hours
              </p>
            </div>
          </div>
        )}
      </div>
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
                  fontFamily: 'Playfair Display, Georgia, serif',
                  letterSpacing: '-0.5px',
                }}
              >
                Ready to Book?
              </h3>
              <p style={{ fontSize: 14, color: '#ccc', marginBottom: 24, lineHeight: 1.6 }}>
                Secure your consultation with {professional.name} today. Consultation fee: R{professional.consultationFee}
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
                Book Consultation
              </button>
            </div>
            <div>
              <h3
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  marginBottom: 16,
                  fontFamily: 'Playfair Display, Georgia, serif',
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
                  href={`tel:${professional.phone}`}
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
                  href={`mailto:${professional.email}`}
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

export default LegalFinanceProfessionalDetail;
