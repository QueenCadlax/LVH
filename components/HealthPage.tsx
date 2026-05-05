import React, { useState, useMemo } from 'react';
import { Search, MapPin, Star, Check, Phone, AlertCircle, ChevronRight, Heart } from 'lucide-react';

interface Provider {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  location: string;
  verified: boolean;
  image: string;
  phone?: string;
  hours?: string;
}

const HealthPage = ({ navigate }: { navigate: (view: string) => void }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All Specialties');
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

  // All Medical Specialties
  const specialties = [
    'All Specialties', 'General Practitioner', 'Cardiologist', 'Dermatologist', 'Pediatrician',
    'Gynecologist', 'Orthopedic Surgeon', 'Neurologist', 'Dentist', 'Pharmacist', 'Physiotherapist',
    'Psychiatrist', 'Optometrist', 'Ophthalmologist', 'ENT Specialist', 'Surgeon', 'Anesthesiologist'
  ];

  // Mock data - Featured Providers (across Mpumalanga)
  const providers: Provider[] = [
    {
      id: 'p1',
      name: 'Dr. John Smith',
      specialty: 'General Practitioner',
      rating: 4.9,
      reviews: 124,
      location: 'Mbombela',
      verified: true,
      image: 'https://images.unsplash.com/photo-1612349317150-e323692df62a?auto=format&fit=crop&q=80&w=400',
      phone: '+27 13 000 1111',
      hours: 'Mon-Fri: 8am-5pm'
    },
    {
      id: 'p2',
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      rating: 4.8,
      reviews: 89,
      location: 'Nelspruit',
      verified: true,
      image: 'https://images.unsplash.com/photo-1644714505311-a3fb305d0d5f?auto=format&fit=crop&q=80&w=400',
      phone: '+27 13 000 2222',
      hours: 'Mon-Fri: 9am-4pm'
    },
    {
      id: 'p3',
      name: 'Dr. Michael Chen',
      specialty: 'Dermatologist',
      rating: 4.7,
      reviews: 67,
      location: 'Hazyview',
      verified: true,
      image: 'https://images.unsplash.com/photo-1612619142632-faf5ff2cb4b7?auto=format&fit=crop&q=80&w=400',
      phone: '+27 13 000 3333',
      hours: 'Tue-Sat: 10am-6pm'
    },
    {
      id: 'p4',
      name: 'Dr. Emily Williams',
      specialty: 'Pediatrician',
      rating: 4.9,
      reviews: 156,
      location: 'White River',
      verified: true,
      image: 'https://images.unsplash.com/photo-1619883514856-fcf2315c3e90?auto=format&fit=crop&q=80&w=400',
      phone: '+27 13 000 4444',
      hours: 'Mon-Fri: 8am-5pm'
    },
    {
      id: 'p5',
      name: 'Dr. David Martinez',
      specialty: 'Orthopedic Surgeon',
      rating: 4.8,
      reviews: 102,
      location: 'Sabie',
      verified: true,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=400',
      phone: '+27 13 000 5555',
      hours: 'Mon-Thu: 9am-4pm'
    },
    {
      id: 'p6',
      name: 'Dr. Lisa Anderson',
      specialty: 'Gynecologist',
      rating: 4.9,
      reviews: 134,
      location: 'Mbombela',
      verified: true,
      image: 'https://images.unsplash.com/photo-1604480557596-6e4ee4b94a91?auto=format&fit=crop&q=80&w=400',
      phone: '+27 13 000 6666',
      hours: 'Mon-Fri: 8:30am-4:30pm'
    }
  ];

  // Filter providers based on selected filters
  const filteredProviders = useMemo(() => {
    return providers.filter(provider => {
      const matchesSearch = provider.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           provider.specialty.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSpecialty = selectedSpecialty === 'All Specialties' || provider.specialty === selectedSpecialty;
      const matchesLocation = selectedLocation === 'All Areas' || provider.location === selectedLocation;
      const matchesVerified = !verifiedOnly || provider.verified;
      
      return matchesSearch && matchesSpecialty && matchesLocation && matchesVerified;
    });
  }, [searchTerm, selectedSpecialty, selectedLocation, verifiedOnly]);

  // Favorites state
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
  };

  return (
    <div style={{ 
      background: '#000', 
      color: '#fff',
      position: 'relative'
    }} className="min-h-screen">
      {/* ===== HERO SECTION ===== */}
      <section style={{ 
        background: 'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(26,26,26,0.8) 100%)',
        paddingTop: 80,
        paddingBottom: 30,
        borderBottom: '1px solid rgba(201, 162, 77, 0.2)'
      }}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Main Heading */}
            <h1 style={{
              fontSize: 'clamp(36px, 6vw, 64px)',
              fontWeight: 400,
              color: '#fff',
              marginBottom: 16,
              fontFamily: '"Playfair Display", "Georgia", serif',
              letterSpacing: '-1px',
              lineHeight: 1.2
            }}>
              Find Trusted Doctors Near You
            </h1>
            
            {/* Gold Accent Line */}
            <div style={{
              height: 1,
              background: '#C9A24D',
              width: 60,
              margin: '20px auto 24px',
              opacity: 0.8
            }}></div>

            {/* Subheading */}
            <p style={{
              fontSize: '18px',
              color: '#ccc',
              marginBottom: 40,
              fontWeight: 300,
              letterSpacing: '0.3px'
            }}>
              Verified medical professionals across Mpumalanga.
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
                placeholder="Search by specialist, specialty, or location..."
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
                  transition: 'all 0.3s ease',
                  boxShadow: '0 0 0 2px rgba(201, 162, 77, 0.15)'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#C9A24D';
                  e.currentTarget.style.background = 'rgba(201, 162, 77, 0.1)';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(201, 162, 77, 0.2)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(201, 162, 77, 0.3)';
                  e.currentTarget.style.background = 'rgba(201, 162, 77, 0.05)';
                  e.currentTarget.style.boxShadow = '0 0 0 2px rgba(201, 162, 77, 0.15)';
                }}
              />
            </div>

            {/* Quick Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-3">
              {['General Practitioner', 'Cardiologist', 'Dentist', 'Specialist', 'Emergency'].map((btn) => (
                <button
                  key={btn}
                  onClick={() => setSelectedSpecialty(btn)}
                  style={{
                    padding: '10px 20px',
                    background: selectedSpecialty === btn ? '#C9A24D' : 'transparent',
                    border: selectedSpecialty === btn ? 'none' : '1.5px solid #C9A24D',
                    color: selectedSpecialty === btn ? '#000' : '#C9A24D',
                    borderRadius: 24,
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    letterSpacing: '0.3px'
                  }}
                  onMouseEnter={(e) => {
                    if (selectedSpecialty !== btn) {
                      e.currentTarget.style.background = 'rgba(201, 162, 77, 0.1)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedSpecialty !== btn) {
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

      {/* ===== BROWSE ALL PROVIDERS ===== */}
      <section style={{ paddingTop: 80, paddingBottom: 80 }}>
        <div className="container mx-auto px-4">
          <div style={{ marginBottom: 48, borderLeft: '3px solid #C9A24D', paddingLeft: '20px' }}>
            <h2 style={{
              fontSize: 'clamp(28px, 5vw, 44px)',
              fontWeight: 400,
              color: '#fff',
              marginBottom: 8,
              fontFamily: '"Playfair Display", "Georgia", serif',
              letterSpacing: '-1px',
              lineHeight: 1.2,
              margin: 0
            }}>
              Browse Doctors
            </h2>
            <p style={{
              fontSize: 14,
              color: '#999',
              marginBottom: 0,
              marginTop: 8
            }}>
              All verified professionals across Mpumalanga.
            </p>
          </div>

          {/* Filter Panel */}
          <div style={{
            background: 'rgba(201, 162, 77, 0.03)',
            border: '2px solid #C9A24D',
            borderRadius: 4,
            padding: '20px 24px',
            marginBottom: 40
          }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Area Filter */}
              <div>
                <label style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: '#C9A24D',
                  marginBottom: 8,
                  display: 'block',
                  letterSpacing: '0.5px'
                }}>
                  Location
                </label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    background: 'rgba(201, 162, 77, 0.05)',
                    border: '1px solid rgba(201, 162, 77, 0.3)',
                    borderRadius: 4,
                    color: '#fff',
                    fontSize: 13,
                    cursor: 'pointer',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 0 0 2px rgba(201, 162, 77, 0.1)'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#C9A24D';
                    e.currentTarget.style.background = 'rgba(201, 162, 77, 0.1)';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(201, 162, 77, 0.15)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(201, 162, 77, 0.3)';
                    e.currentTarget.style.background = 'rgba(201, 162, 77, 0.05)';
                    e.currentTarget.style.boxShadow = '0 0 0 2px rgba(201, 162, 77, 0.1)';
                  }}
                >
                  {mpumalanagaAreas.map((area) => (
                    <option key={area} value={area} style={{ background: '#000', color: '#fff' }}>
                      {area}
                    </option>
                  ))}
                </select>
              </div>

              {/* Specialty Filter */}
              <div>
                <label style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: '#C9A24D',
                  marginBottom: 8,
                  display: 'block',
                  letterSpacing: '0.5px'
                }}>
                  Specialty
                </label>
                <select
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    background: 'rgba(201, 162, 77, 0.05)',
                    border: '1px solid rgba(201, 162, 77, 0.3)',
                    borderRadius: 4,
                    color: '#fff',
                    fontSize: 13,
                    cursor: 'pointer',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 0 0 2px rgba(201, 162, 77, 0.1)'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#C9A24D';
                    e.currentTarget.style.background = 'rgba(201, 162, 77, 0.1)';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(201, 162, 77, 0.15)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(201, 162, 77, 0.3)';
                    e.currentTarget.style.background = 'rgba(201, 162, 77, 0.05)';
                    e.currentTarget.style.boxShadow = '0 0 0 2px rgba(201, 162, 77, 0.1)';
                  }}
                >
                  {specialties.map((spec) => (
                    <option key={spec} value={spec} style={{ background: '#000', color: '#fff' }}>
                      {spec}
                    </option>
                  ))}
                </select>
              </div>

              {/* Verified Filter */}
              <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  cursor: 'pointer'
                }}>
                  <input
                    type="checkbox"
                    checked={verifiedOnly}
                    onChange={(e) => setVerifiedOnly(e.target.checked)}
                    style={{
                      width: 18,
                      height: 18,
                      cursor: 'pointer',
                      accentColor: '#C9A24D'
                    }}
                  />
                  <span style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: '#fff',
                    letterSpacing: '0.2px'
                  }}>
                    Verified Only
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Provider Listings - Grid Layout - Compact */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 16,
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {filteredProviders.length > 0 ? (
              filteredProviders.map((provider) => (
                <div 
                  key={provider.id}
                  style={{
                    position: 'relative',
                    borderRadius: 10,
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    background: '#1a1a1a',
                    border: '1px solid #333'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                    const img = e.currentTarget.querySelector('img') as HTMLImageElement;
                    if (img) img.style.transform = 'scale(1.03)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none';
                    const img = e.currentTarget.querySelector('img') as HTMLImageElement;
                    if (img) img.style.transform = 'scale(1)';
                  }}
                >
                  <div style={{
                    background: '#1a1a1a',
                    border: 'none',
                    borderRadius: 10,
                    overflow: 'hidden',
                    boxShadow: 'none',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    {/* Image - Compact */}
                    <div style={{
                      height: 160,
                      overflow: 'hidden',
                      position: 'relative',
                      borderRadius: '10px 10px 0 0',
                      backgroundColor: '#f5f5f5'
                    }}>
                      <img 
                        src={provider.image} 
                        alt={provider.name} 
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.3s ease'
                        }} 
                      />
                      {/* Verified Badge - Compact */}
                      {provider.verified && (
                        <div style={{
                          position: 'absolute',
                          top: 6,
                          right: 6,
                          background: '#000',
                          color: '#fff',
                          padding: '3px 8px',
                          borderRadius: '3px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 3,
                          zIndex: 10,
                          fontSize: '9px',
                          fontWeight: 700,
                          letterSpacing: '0.5px',
                          textTransform: 'uppercase'
                        }}>
                          ✓ VERIFIED
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div style={{ padding: 14, flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <h3 style={{
                        fontSize: 14,
                        fontWeight: 700,
                        color: '#C9A24D',
                        margin: '0 0 4px 0',
                        fontFamily: 'system-ui, -apple-system, sans-serif',
                        letterSpacing: '-0.2px',
                        lineHeight: 1.2
                      }}>
                        {provider.name}
                      </h3>
                      <p style={{
                        fontSize: 10,
                        color: '#aaa',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.3px',
                        margin: '0 0 5px 0',
                        lineHeight: 1.1
                      }}>
                        {provider.specialty}
                      </p>

                      {/* Location & Rating - Inline */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                        margin: '0 0 4px 0',
                        fontSize: 9,
                        color: '#999'
                      }}>
                        <span>📍 {provider.location}</span>
                        <span>•</span>
                        <span style={{ color: '#ffa500', fontWeight: 700 }}>{provider.rating}⭐</span>
                      </div>

                      {/* Button */}
                      <button
                        onClick={() => {
                          localStorage.setItem('selectedProviderId', provider.id);
                          navigate('health-detail');
                        }}
                        style={{
                          width: '100%',
                          background: '#C9A24D',
                          color: '#000',
                          border: 'none',
                          padding: '10px 14px',
                          borderRadius: 6,
                          fontSize: 11,
                          fontWeight: 700,
                          letterSpacing: '0.5px',
                          textTransform: 'uppercase',
                          transition: 'all 0.2s ease',
                          cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#dbb85a';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = '#C9A24D';
                        }}
                      >
                        Book
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div style={{
                gridColumn: '1 / -1',
                textAlign: 'center',
                padding: 60,
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(201, 162, 77, 0.2)',
                borderRadius: 8
              }}>
                <AlertCircle size={48} style={{ color: '#C9A24D', margin: '0 auto 16px', opacity: 0.5 }} />
                <p style={{
                  fontSize: 16,
                  color: '#999',
                  margin: 0
                }}>
                  No providers found matching your criteria
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION - PREMIUM ===== */}
      <section style={{
        paddingTop: 80,
        paddingBottom: 80,
        background: 'linear-gradient(135deg, rgba(201, 162, 77, 0.1) 0%, rgba(201, 162, 77, 0.05) 100%)',
        border: '1px solid rgba(201, 162, 77, 0.25)',
        borderTop: '2px solid rgba(201, 162, 77, 0.4)',
        borderLeft: '3px solid #C9A24D'
      }}>
        <div className="container mx-auto px-4">
          <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 0 20px' }}>
            <h2 style={{
              fontSize: 'clamp(32px, 6vw, 52px)',
              fontWeight: 400,
              color: '#fff',
              marginBottom: 16,
              fontFamily: '"Playfair Display", "Georgia", serif',
              letterSpacing: '-1px',
              lineHeight: 1.3
            }}>
              Grow Your Practice
            </h2>
            <p style={{
              fontSize: 16,
              color: '#ccc',
              marginBottom: 40,
              fontWeight: 300,
              lineHeight: 1.7,
              letterSpacing: '0.3px'
            }}>
              Join LowveldHub and connect with more patients.
            </p>
            <button
              onClick={() => {
                window.location.href = 'mailto:info.lowveldhub.co.za?subject=Medical Professional Verification Request&body=Hello LowveldHub Team,%0D%0A%0D%0AI am interested in joining LowveldHub as a verified medical professional.%0D%0A%0D%0APlease provide me with more information about the verification process and available packages.%0D%0A%0D%0AThank you!';
              }}
              style={{
                background: 'linear-gradient(135deg, #C9A24D 0%, #dbb85a 100%)',
                color: '#000',
                border: 'none',
                padding: '16px 48px',
                borderRadius: 4,
                fontSize: 13,
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                boxShadow: '0 8px 24px rgba(201, 162, 77, 0.3)'
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
              Apply for Verification
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HealthPage;
