import React, { useState, useMemo } from 'react';
import { Search, MapPin, Star, Check, Phone, AlertCircle, ChevronRight } from 'lucide-react';

interface Professional {
  id: string;
  name: string;
  type: string;
  specialization: string;
  rating: number;
  reviews: number;
  location: string;
  verified: boolean;
  image: string;
  phone?: string;
}

const LegalFinancePage = ({ navigate }: { navigate: (view: string) => void }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedService, setSelectedService] = useState('All Services');
  const [selectedLocation, setSelectedLocation] = useState('All Areas');
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  // All Mpumalanga Areas
  const mpumalanagaAreas = [
    'All Areas', 'Acornhoek', 'Amersfoort', 'Amsterdam', 'Apara', 'Badplaas', 'Balfour', 'Barberton',
    'Bethal', 'Breyten', 'Bushbuckridge', 'Carolina', 'Chrissiesmeer', 'Delmas', 'Dullstroom',
    'Ermelo', 'Groblersdal', 'Hazyview', 'Hendrina', 'Iyanda', 'Jane Furse', 'Kanyamazane', 'Katlehong',
    'Kinross', 'Komati', 'Kumalo', 'Kwambonambi', 'Mbombela', 'Middelburg', 'Mkhuhlu', 'Molteno',
    'Mozambique Border', 'Mpumalanga Highlands', 'Msauli', 'Musina', 'Mzingi', 'Nelspruit', 'Nkandla',
    'Nokaneng', 'Nooitgedacht', 'Nthorwane', 'Ohrigstad', 'Olifants', 'Phalaborwa', 'Pilgrim\'s Rest',
    'Pietersburg', 'Polokwane', 'Potgietersrust', 'Ramatsetswana', 'Reivilo', 'Roedtan', 'Rossouw',
    'Sabie', 'Samancor', 'Schoemanskloof', 'Siyabuswa', 'Standerton', 'Steelpoort', 'Tembisa',
    'Thabazimbi', 'Thohoyandou', 'Tonga', 'Tonkabele', 'Trichardt', 'Uvongo', 'Verulam', 'Verwoerdburg',
    'Vryheid', 'Wakkerstroom', 'Warmbaths', 'Waterval', 'Weilos', 'White River', 'Wildebeesvlei',
    'Wintersgracht', 'Wolmaransstad', 'Yeoville'
  ];

  // Service types
  const serviceTypes = [
    'All Services',
    'Corporate Lawyers', 'Criminal Lawyers', 'Family Lawyers', 'Property Lawyers', 'Immigration Lawyers', 'Labour Lawyers',
    'Accountants', 'Tax Consultants', 'Auditors', 'Financial Advisors', 'Wealth Managers', 'Insurance Brokers',
    'Business Consultants', 'Company Registration', 'Compliance Services'
  ];

  // Mock professionals
  const professionals: Professional[] = [
    {
      id: 'lf_1',
      name: 'Mokoena & Partners',
      type: 'Corporate Law Firm',
      specialization: 'Corporate Law',
      rating: 4.9,
      reviews: 127,
      location: 'Mbombela',
      verified: true,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
      phone: '+27 (13) 755-1234',
    },
    {
      id: 'lf_2',
      name: 'Thulani & Associates',
      type: 'Criminal Defense',
      specialization: 'Criminal Law',
      rating: 4.8,
      reviews: 95,
      location: 'Nelspruit',
      verified: true,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
      phone: '+27 (13) 755-2345',
    },
    {
      id: 'lf_3',
      name: 'De Jager Accounting',
      type: 'Accounting Firm',
      specialization: 'Tax & Audit',
      rating: 4.9,
      reviews: 156,
      location: 'Hazyview',
      verified: true,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
      phone: '+27 (13) 755-3456',
    },
    {
      id: 'lf_4',
      name: 'Wealth Management Solutions',
      type: 'Financial Advisory',
      specialization: 'Investment Planning',
      rating: 4.8,
      reviews: 102,
      location: 'White River',
      verified: true,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
      phone: '+27 (13) 755-4567',
    },
    {
      id: 'lf_5',
      name: 'Property Law Specialists',
      type: 'Property Law',
      specialization: 'Real Estate',
      rating: 4.7,
      reviews: 78,
      location: 'Sabie',
      verified: true,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
      phone: '+27 (13) 755-5678',
    },
    {
      id: 'lf_6',
      name: 'Business Solutions Inc',
      type: 'Business Consulting',
      specialization: 'Corporate Strategy',
      rating: 4.9,
      reviews: 134,
      location: 'Mbombela',
      verified: true,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
      phone: '+27 (13) 755-6789',
    }
  ];

  // Filter professionals
  const filteredProfessionals = useMemo(() => {
    return professionals.filter(prof => {
      const matchesSearch = prof.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           prof.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           prof.specialization.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesService = selectedService === 'All Services' || 
                            prof.type.toLowerCase().includes(selectedService.toLowerCase()) ||
                            prof.specialization.toLowerCase().includes(selectedService.toLowerCase());
      const matchesLocation = selectedLocation === 'All Areas' || prof.location === selectedLocation;
      const matchesVerified = !verifiedOnly || prof.verified;
      
      return matchesSearch && matchesService && matchesLocation && matchesVerified;
    });
  }, [searchTerm, selectedService, selectedLocation, verifiedOnly]);

  return (
    <div style={{ background: '#000', color: '#fff' }} className="min-h-screen">
      {/* ===== HERO SECTION ===== */}
      <section style={{ 
        background: 'linear-gradient(135deg, #000 0%, #1a1a1a 100%)',
        paddingTop: 80,
        paddingBottom: 80,
        borderBottom: '1px solid rgba(201, 162, 77, 0.2)'
      }}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 style={{
              fontSize: 'clamp(36px, 6vw, 64px)',
              fontWeight: 300,
              color: '#fff',
              marginBottom: 16,
              fontFamily: '"Georgia", serif',
              letterSpacing: '-0.5px',
              lineHeight: 1.2
            }}>
              Legal & Financial Excellence
            </h1>
            
            <div style={{
              height: 1,
              background: '#C9A24D',
              width: 60,
              margin: '20px auto 24px',
              opacity: 0.8
            }}></div>

            <p style={{
              fontSize: '18px',
              color: '#ccc',
              marginBottom: 40,
              fontWeight: 300,
              letterSpacing: '0.3px'
            }}>
              Access verified legal professionals and financial experts across all of Mpumalanga
            </p>

            {/* Search Bar */}
            <div style={{ position: 'relative', marginBottom: 20 }}>
              <Search style={{
                position: 'absolute',
                left: 20,
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#C9A24D',
                width: 20,
                height: 20
              }} />
              <input
                type="text"
                placeholder="Search lawyers, accountants, consultants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  paddingLeft: 60,
                  paddingRight: 20,
                  paddingTop: 16,
                  paddingBottom: 16,
                  background: 'rgba(201, 162, 77, 0.05)',
                  border: '1px solid rgba(201, 162, 77, 0.3)',
                  borderRadius: 8,
                  color: '#fff',
                  fontSize: 16,
                  outline: 'none',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#C9A24D';
                  e.currentTarget.style.background = 'rgba(201, 162, 77, 0.1)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(201, 162, 77, 0.3)';
                  e.currentTarget.style.background = 'rgba(201, 162, 77, 0.05)';
                }}
              />
            </div>

            {/* Quick Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-3">
              {['Lawyers', 'Accountants', 'Financial Advisors', 'Consultants', 'Tax'].map((btn) => (
                <button
                  key={btn}
                  onClick={() => setSelectedService(btn)}
                  style={{
                    padding: '10px 20px',
                    background: selectedService === btn ? '#C9A24D' : 'transparent',
                    border: selectedService === btn ? 'none' : '1.5px solid #C9A24D',
                    color: selectedService === btn ? '#000' : '#C9A24D',
                    borderRadius: 24,
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    letterSpacing: '0.3px'
                  }}
                  onMouseEnter={(e) => {
                    if (selectedService !== btn) {
                      e.currentTarget.style.background = 'rgba(201, 162, 77, 0.1)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedService !== btn) {
                      e.currentTarget.style.background = 'transparent';
                    }
                  }}
                >
                  {btn}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>



      {/* ===== FILTER & BROWSE SECTION ===== */}
      <section style={{ paddingTop: 100, paddingBottom: 100, background: '#000' }}>
        <div className="container mx-auto px-4">
          {/* Header */}
          <div style={{ marginBottom: 60, textAlign: 'center' }}>
            <h2 style={{
              fontSize: 'clamp(32px, 6vw, 48px)',
              fontWeight: 500,
              color: '#fff',
              marginBottom: 12,
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              letterSpacing: '-0.5px',
              lineHeight: 1.2
            }}>
              Find Your Professional
            </h2>
            <p style={{
              fontSize: 16,
              color: '#aaa',
              fontWeight: 400,
              letterSpacing: '0.2px',
              lineHeight: 1.6
            }}>
              Browse verified legal and financial experts across Mpumalanga
            </p>
          </div>

          {/* Filter Panel - Modern Dark */}
          <div style={{
            background: '#1a1a1a',
            borderRadius: 12,
            padding: '32px 28px',
            marginBottom: 48,
            border: '1px solid #333'
          }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Area Filter */}
              <div>
                <label style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: '#fff',
                  marginBottom: 10,
                  display: 'block',
                  letterSpacing: '0.3px',
                  textTransform: 'uppercase'
                }}>
                  Location
                </label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    background: '#222',
                    border: '1px solid #444',
                    borderRadius: 8,
                    color: '#fff',
                    fontSize: 14,
                    cursor: 'pointer',
                    outline: 'none',
                    transition: 'all 0.2s ease',
                    fontFamily: 'inherit'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#fff';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(255,255,255,0.1)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#444';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {mpumalanagaAreas.map((area) => (
                    <option key={area} value={area} style={{ background: '#1a1a1a', color: '#fff' }}>
                      {area}
                    </option>
                  ))}
                </select>
              </div>

              {/* Service Filter */}
              <div>
                <label style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: '#fff',
                  marginBottom: 10,
                  display: 'block',
                  letterSpacing: '0.3px',
                  textTransform: 'uppercase'
                }}>
                  Service Type
                </label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    background: '#222',
                    border: '1px solid #444',
                    borderRadius: 8,
                    color: '#fff',
                    fontSize: 14,
                    cursor: 'pointer',
                    outline: 'none',
                    transition: 'all 0.2s ease',
                    fontFamily: 'inherit'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#fff';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(255,255,255,0.1)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#444';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {serviceTypes.map((service) => (
                    <option key={service} value={service} style={{ background: '#1a1a1a', color: '#fff' }}>
                      {service}
                    </option>
                  ))}
                </select>
              </div>

              {/* Verified Filter */}
              <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  cursor: 'pointer',
                  userSelect: 'none'
                }}>
                  <input
                    type="checkbox"
                    checked={verifiedOnly}
                    onChange={(e) => setVerifiedOnly(e.target.checked)}
                    style={{
                      width: 18,
                      height: 18,
                      cursor: 'pointer',
                      accentColor: '#fff'
                    }}
                  />
                  <span style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: '#fff',
                    letterSpacing: '0.2px',
                    textTransform: 'uppercase'
                  }}>
                    Verified Only
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Professional Grid - 4 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredProfessionals.length > 0 ? (
              filteredProfessionals.map((prof) => (
                <div
                  key={prof.id}
                  style={{
                    background: '#1a1a1a',
                    border: '1px solid #333',
                    borderRadius: 10,
                    overflow: 'hidden',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(255,255,255,0.15)';
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.borderColor = '#555';
                    const img = e.currentTarget.querySelector('img') as HTMLImageElement;
                    if (img) img.style.transform = 'scale(1.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.4)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = '#333';
                    const img = e.currentTarget.querySelector('img') as HTMLImageElement;
                    if (img) img.style.transform = 'scale(1)';
                  }}
                >
                  {/* Image Container */}
                  <div style={{
                    height: 180,
                    overflow: 'hidden',
                    position: 'relative',
                    backgroundColor: '#222'
                  }}>
                    <img 
                      src={prof.image} 
                      alt={prof.name} 
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                      }} 
                    />
                    
                    {/* Verified Badge - Modern */}
                    {prof.verified && (
                      <div style={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        background: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(8px)',
                        color: '#000',
                        padding: '5px 10px',
                        borderRadius: 18,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                        zIndex: 10,
                        fontSize: '11px',
                        fontWeight: 600,
                        letterSpacing: '0.2px'
                      }}>
                        ✓ Verified
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div style={{ padding: 16 }}>
                    {/* Title & Type */}
                    <h3 style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: '#fff',
                      margin: '0 0 4px 0',
                      fontFamily: 'inherit',
                      letterSpacing: '-0.2px',
                      lineHeight: 1.3
                    }}>
                      {prof.name}
                    </h3>
                    <p style={{
                      fontSize: 11,
                      color: '#aaa',
                      fontWeight: 500,
                      margin: '0 0 10px 0',
                      letterSpacing: '0.1px'
                    }}>
                      {prof.type}
                    </p>

                    {/* Divider */}
                    <div style={{
                      height: 1,
                      background: '#333',
                      margin: '10px 0 10px 0'
                    }}></div>

                    {/* Info Grid */}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: 14,
                      fontSize: 11
                    }}>
                      {/* Location */}
                      <div>
                        <p style={{
                          fontSize: 9,
                          color: '#666',
                          fontWeight: 600,
                          margin: '0 0 2px 0',
                          letterSpacing: '0.2px',
                          textTransform: 'uppercase'
                        }}>
                          Location
                        </p>
                        <p style={{
                          fontSize: 11,
                          color: '#ddd',
                          fontWeight: 500,
                          margin: 0
                        }}>
                          {prof.location}
                        </p>
                      </div>

                      {/* Rating */}
                      <div style={{ textAlign: 'right' }}>
                        <p style={{
                          fontSize: 9,
                          color: '#666',
                          fontWeight: 600,
                          margin: '0 0 2px 0',
                          letterSpacing: '0.2px',
                          textTransform: 'uppercase'
                        }}>
                          Rating
                        </p>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 3,
                          justifyContent: 'flex-end'
                        }}>
                          <span style={{
                            fontSize: 11,
                            fontWeight: 600,
                            color: '#fff'
                          }}>
                            {prof.rating}
                          </span>
                          <span style={{ fontSize: 11 }}>⭐</span>
                        </div>
                      </div>
                    </div>

                    {/* Button */}
                    <button
                      onClick={() => {
                        localStorage.setItem('selectedProfessionalId', prof.id);
                        navigate('legal-finance-detail');
                      }}
                      style={{
                        width: '100%',
                        background: '#fff',
                        color: '#000',
                        border: 'none',
                        padding: '9px 12px',
                        borderRadius: 7,
                        fontSize: 12,
                        fontWeight: 600,
                        letterSpacing: '0.2px',
                        transition: 'all 0.2s ease',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#ddd';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = '#fff';
                      }}
                    >
                      View Profile
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div style={{
                gridColumn: '1 / -1',
                textAlign: 'center',
                padding: 80,
                background: '#1a1a1a',
                border: '1px solid #333',
                borderRadius: 12
              }}>
                <AlertCircle size={48} style={{ color: '#555', margin: '0 auto 16px', opacity: 0.5 }} />
                <p style={{
                  fontSize: 16,
                  color: '#aaa',
                  margin: 0
                }}>
                  No professionals found matching your criteria
                </p>
              </div>
            )}
          </div>
        </div>
      </section>



      {/* ===== CTA SECTION ===== */}
      <section style={{
        paddingTop: 80,
        paddingBottom: 80,
        background: 'linear-gradient(135deg, rgba(201, 162, 77, 0.05) 0%, rgba(201, 162, 77, 0.02) 100%)',
        border: '1px solid rgba(201, 162, 77, 0.2)'
      }}>
        <div className="container mx-auto px-4">
          <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto' }}>
            <h2 style={{
              fontSize: 'clamp(28px, 5vw, 44px)',
              fontWeight: 300,
              color: '#fff',
              marginBottom: 20,
              fontFamily: '"Georgia", serif',
              letterSpacing: '-0.3px'
            }}>
              Are you a legal or financial professional?
            </h2>
            <p style={{
              fontSize: 16,
              color: '#ccc',
              marginBottom: 32,
              fontWeight: 300,
              lineHeight: 1.6
            }}>
              Join LowveldHub and reach more clients across all of Mpumalanga. Get a verified premium profile and grow your business.
            </p>
            <button
              onClick={() => {
                window.location.href = 'mailto:info.lowveldhub.co.za?subject=Legal or Financial Professional Registration&body=Hello LowveldHub Team,%0D%0A%0D%0AI am interested in joining LowveldHub as a verified legal or financial professional.%0D%0A%0D%0APlease provide me with more information about the verification process and available packages.%0D%0A%0D%0AThank you!';
              }}
              style={{
                background: '#C9A24D',
                color: '#000',
                border: 'none',
                padding: '16px 40px',
                borderRadius: 4,
                fontSize: 13,
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                letterSpacing: '0.5px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#dbb85a';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#C9A24D';
              }}
            >
              JOIN AS A PROFESSIONAL
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LegalFinancePage;
