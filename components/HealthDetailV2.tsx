import React, { useState, useEffect } from 'react';
import { Phone, Mail, Globe, MessageCircle, MapPin, Star, CheckCircle, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Business } from '../types';

interface MockDoctor {
  id: string;
  name: string;
  specialty: string;
  type: string;
  rating: number;
  reviews: number;
  location: string;
  verified: boolean;
  image: string;
  images: string[];
  phone?: string;
  email?: string;
  website?: string;
  description: string;
  yearsExperience: number;
  specializations: string[];
  testimonials: Array<{
    name: string;
    text: string;
    rating: number;
  }>;
}

interface HealthDetailProps {
  id: string;
  navigate: (view: string, category?: string, id?: string) => void;
}

const HealthDetailV2: React.FC<HealthDetailProps> = ({ id, navigate }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Mock doctors data
  const doctors: MockDoctor[] = [
    {
      id: 'hp_smith_1',
      name: 'Dr. John Smith',
      specialty: 'General Practitioner',
      type: 'Family Medicine',
      rating: 4.9,
      reviews: 124,
      location: 'Mbombela',
      verified: true,
      image: 'https://images.unsplash.com/photo-1612349317150-e323692df62a?w=800&h=600&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1612349317150-e323692df62a?w=1200&h=900&fit=crop',
        'https://images.unsplash.com/photo-1576091160550-112173f31c77?w=1200&h=900&fit=crop',
        'https://images.unsplash.com/photo-1576091160750-a9f30e7cfe04?w=1200&h=900&fit=crop',
      ],
      phone: '+27 (13) 755-1001',
      email: 'dr.smith@health.co.za',
      website: 'www.drsmith.co.za',
      description: 'General practitioner with 15+ years of experience in family medicine. Dedicated to providing comprehensive healthcare services for all ages.',
      yearsExperience: 15,
      specializations: [
        'Family Medicine',
        'Preventive Care',
        'Chronic Disease Management',
        'Minor Surgery',
        'Vaccinations',
      ],
      testimonials: [
        {
          name: 'Maria Khumalo',
          text: 'Dr. Smith is incredibly professional and caring. He takes time to explain everything and truly listens to his patients. Highly recommended!',
          rating: 5,
        },
        {
          name: 'James Koekemoer',
          text: 'Best family doctor I\'ve had. Always available and gives excellent advice. The whole family sees him now.',
          rating: 5,
        },
        {
          name: 'Sophie Ndlovu',
          text: 'Very thorough in his examinations. Makes you feel comfortable and well taken care of. Great experience every time.',
          rating: 5,
        },
      ],
    },
    {
      id: 'hp_johnson_2',
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      type: 'Heart & Vascular',
      rating: 4.8,
      reviews: 89,
      location: 'Nelspruit',
      verified: true,
      image: 'https://images.unsplash.com/photo-1644714505311-a3fb305d0d5f?w=800&h=600&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1644714505311-a3fb305d0d5f?w=1200&h=900&fit=crop',
        'https://images.unsplash.com/photo-1631217314033-5ec48d449667?w=1200&h=900&fit=crop',
        'https://images.unsplash.com/photo-1576091160550-112173f31c77?w=1200&h=900&fit=crop',
      ],
      phone: '+27 (13) 755-1002',
      email: 'dr.johnson@cardiac.co.za',
      website: 'www.johnsoncardiology.co.za',
      description: 'Specialist in cardiovascular diseases with expertise in preventive cardiology and advanced diagnostic procedures.',
      yearsExperience: 18,
      specializations: [
        'Cardiac Diagnosis',
        'Hypertension Management',
        'Heart Failure Treatment',
        'Coronary Artery Disease',
        'Interventional Cardiology',
      ],
      testimonials: [
        {
          name: 'Peter Van der Merwe',
          text: 'Dr. Johnson saved my life. Her diagnosis and treatment were spot-on. I trust her completely with my cardiac health.',
          rating: 5,
        },
        {
          name: 'Ruth Mthembu',
          text: 'Professional, knowledgeable, and compassionate. She explains complex cardiac issues in a way I can understand.',
          rating: 5,
        },
        {
          name: 'David Williams',
          text: 'Top-notch cardiologist. The latest equipment and proven treatment methods. Can\'t ask for better care.',
          rating: 5,
        },
      ],
    },
    {
      id: 'hp_chen_3',
      name: 'Dr. Michael Chen',
      specialty: 'Dermatologist',
      type: 'Skin Specialist',
      rating: 4.7,
      reviews: 67,
      location: 'Hazyview',
      verified: true,
      image: 'https://images.unsplash.com/photo-1612619142632-faf5ff2cb4b7?w=800&h=600&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1612619142632-faf5ff2cb4b7?w=1200&h=900&fit=crop',
        'https://images.unsplash.com/photo-1576091160979-112de284e3a7?w=1200&h=900&fit=crop',
        'https://images.unsplash.com/photo-1627873649417-ab7dc9c2e1bc?w=1200&h=900&fit=crop',
      ],
      phone: '+27 (13) 755-1003',
      email: 'dr.chen@derma.co.za',
      website: 'www.dermacare-mpumalanga.co.za',
      description: 'Expert dermatologist specializing in general dermatology and advanced cosmetic procedures using state-of-the-art technology.',
      yearsExperience: 12,
      specializations: [
        'Cosmetic Dermatology',
        'Laser Therapy',
        'Acne Treatment',
        'Skin Cancer Screening',
        'Chemical Peels',
      ],
      testimonials: [
        {
          name: 'Thandi Mkhize',
          text: 'Dr. Chen is amazing! My skin has never looked better. Professional and results are outstanding.',
          rating: 5,
        },
        {
          name: 'Lerato Sekhosana',
          text: 'Highly skilled dermatologist. The laser treatment was painless and effective. Very satisfied with results.',
          rating: 5,
        },
        {
          name: 'Nomusa Zuma',
          text: 'Best dermatologist in the region. Thorough consultations and personalized treatment plans. Highly recommend!',
          rating: 5,
        },
      ],
    },
    {
      id: 'hp_williams_4',
      name: 'Dr. Emily Williams',
      specialty: 'Pediatrician',
      type: 'Child Healthcare',
      rating: 4.9,
      reviews: 156,
      location: 'White River',
      verified: true,
      image: 'https://images.unsplash.com/photo-1619883514856-fcf2315c3e90?w=800&h=600&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1619883514856-fcf2315c3e90?w=1200&h=900&fit=crop',
        'https://images.unsplash.com/photo-1576091160550-112173f31c77?w=1200&h=900&fit=crop',
        'https://images.unsplash.com/photo-1631217314033-5ec48d449667?w=1200&h=900&fit=crop',
      ],
      phone: '+27 (13) 755-1004',
      email: 'dr.williams@pediatrics.co.za',
      website: 'www.pediatriccare.co.za',
      description: 'Pediatrician with extensive experience in newborn care, childhood development, and adolescent health.',
      yearsExperience: 14,
      specializations: [
        'Neonatal Care',
        'Developmental Pediatrics',
        'Child Nutrition',
        'Vaccination Programs',
        'Adolescent Health',
      ],
      testimonials: [
        {
          name: 'Amelia Nkosi',
          text: 'Dr. Williams is wonderful with children. My kids love her and she\'s always so patient and caring.',
          rating: 5,
        },
        {
          name: 'Daniel Jansen',
          text: 'Excellent pediatrician. Very knowledgeable and great at explaining child health matters to parents.',
          rating: 5,
        },
        {
          name: 'Naledi Mokoena',
          text: 'Trust Dr. Williams completely with my children\'s health. She goes above and beyond every time.',
          rating: 5,
        },
      ],
    },
    {
      id: 'hp_martinez_5',
      name: 'Dr. David Martinez',
      specialty: 'Orthopedic Surgeon',
      type: 'Bone & Joint Surgery',
      rating: 4.8,
      reviews: 102,
      location: 'Sabie',
      verified: true,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=900&fit=crop',
        'https://images.unsplash.com/photo-1576091160979-112de284e3a7?w=1200&h=900&fit=crop',
        'https://images.unsplash.com/photo-1631217314033-5ec48d449667?w=1200&h=900&fit=crop',
      ],
      phone: '+27 (13) 755-1005',
      email: 'dr.martinez@ortho.co.za',
      website: 'www.orthopedicsabie.co.za',
      description: 'Orthopedic surgeon specializing in sports injuries, joint replacements, and arthroscopic procedures.',
      yearsExperience: 16,
      specializations: [
        'Sports Medicine',
        'Joint Replacement',
        'Arthroscopic Surgery',
        'Fracture Management',
        'Shoulder Surgery',
      ],
      testimonials: [
        {
          name: 'Johannes Venter',
          text: 'Dr. Martinez fixed my knee injury. Professional, skilled, and my recovery was amazing. Highly skilled surgeon.',
          rating: 5,
        },
        {
          name: 'Sipho Dlamini',
          text: 'Best orthopedic surgeon I could ask for. Very experienced and successful treatment. Back to sports already!',
          rating: 5,
        },
        {
          name: 'Leah Cohen',
          text: 'Excellent care throughout my joint replacement surgery. Very satisfied with results and recovery.',
          rating: 5,
        },
      ],
    },
    {
      id: 'hp_anderson_6',
      name: 'Dr. Lisa Anderson',
      specialty: 'Gynecologist',
      type: 'Women\'s Health',
      rating: 4.9,
      reviews: 134,
      location: 'Mbombela',
      verified: true,
      image: 'https://images.unsplash.com/photo-1604480557596-6e4ee4b94a91?w=800&h=600&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1604480557596-6e4ee4b94a91?w=1200&h=900&fit=crop',
        'https://images.unsplash.com/photo-1576091160550-112173f31c77?w=1200&h=900&fit=crop',
        'https://images.unsplash.com/photo-1627873649417-ab7dc9c2e1bc?w=1200&h=900&fit=crop',
      ],
      phone: '+27 (13) 755-1006',
      email: 'dr.anderson@womenshealth.co.za',
      website: 'www.gynecology-mbombela.co.za',
      description: 'Women\'s health specialist with expertise in obstetrics, gynecology, and family planning services.',
      yearsExperience: 17,
      specializations: [
        'Obstetrics & Gynecology',
        'Prenatal Care',
        'Family Planning',
        'Reproductive Health',
        'Menopause Management',
      ],
      testimonials: [
        {
          name: 'Zanele Ntuli',
          text: 'Dr. Anderson is compassionate and knowledgeable. Made my pregnancy journey wonderful. Highly recommend!',
          rating: 5,
        },
        {
          name: 'Khumo Mosilane',
          text: 'Excellent gynecologist. Very caring and professional. Feel completely comfortable with her care.',
          rating: 5,
        },
        {
          name: 'Palesa Lebona',
          text: 'Dr. Anderson listens and provides excellent advice. Truly one of the best doctors I\'ve encountered.',
          rating: 5,
        },
      ],
    },
    {
      id: 'hp_brown_7',
      name: 'Dr. Richard Brown',
      specialty: 'Dentist',
      type: 'Dental Care',
      rating: 4.7,
      reviews: 98,
      location: 'White River',
      verified: true,
      image: 'https://images.unsplash.com/photo-1622902046580-2b47f3a2c3c9?w=800&h=600&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1622902046580-2b47f3a2c3c9?w=1200&h=900&fit=crop',
        'https://images.unsplash.com/photo-1576091160979-112de284e3a7?w=1200&h=900&fit=crop',
        'https://images.unsplash.com/photo-1631217314033-5ec48d449667?w=1200&h=900&fit=crop',
      ],
      phone: '+27 (13) 755-1007',
      email: 'dr.brown@dental.co.za',
      website: 'www.dentistwhiteriver.co.za',
      description: 'Comprehensive dental services including cosmetic, restorative, and preventive dentistry.',
      yearsExperience: 13,
      specializations: [
        'Cosmetic Dentistry',
        'Teeth Whitening',
        'Root Canals',
        'Implants',
        'Orthodontics',
      ],
      testimonials: [
        {
          name: 'Marcus Henderson',
          text: 'Dr. Brown transformed my smile! Painless procedures and beautiful results. Very professional.',
          rating: 5,
        },
        {
          name: 'Busiswa Nyawo',
          text: 'Excellent dental care. Dr. Brown is very gentle and skilled. Comfortable environment and great results.',
          rating: 5,
        },
        {
          name: 'Willem Steyn',
          text: 'Best dentist in town. Modern equipment, professional staff, and outstanding results. Highly recommend!',
          rating: 5,
        },
      ],
    },
    {
      id: 'hp_lee_8',
      name: 'Dr. Patricia Lee',
      specialty: 'Physiotherapist',
      type: 'Physical Therapy',
      rating: 4.8,
      reviews: 112,
      location: 'Nelspruit',
      verified: true,
      image: 'https://images.unsplash.com/photo-1576091160550-112173f31c77?w=800&h=600&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1576091160550-112173f31c77?w=1200&h=900&fit=crop',
        'https://images.unsplash.com/photo-1576091160979-112de284e3a7?w=1200&h=900&fit=crop',
        'https://images.unsplash.com/photo-1631217314033-5ec48d449667?w=1200&h=900&fit=crop',
      ],
      phone: '+27 (13) 755-1008',
      email: 'dr.lee@physio.co.za',
      website: 'www.physiotherapy-nelspruit.co.za',
      description: 'Physiotherapy specialist with expertise in sports injuries, rehabilitation, and pain management.',
      yearsExperience: 11,
      specializations: [
        'Sports Injury Rehab',
        'Post-Surgical Therapy',
        'Manual Therapy',
        'Sports Performance',
        'Back Pain Management',
      ],
      testimonials: [
        {
          name: 'Trevor Bosch',
          text: 'Dr. Lee is an outstanding physiotherapist. Got me back to playing rugby in record time. Highly skilled!',
          rating: 5,
        },
        {
          name: 'Oratile Motswana',
          text: 'Excellent results with my shoulder recovery. Very professional and motivating. Highly recommend!',
          rating: 5,
        },
        {
          name: 'Samantha Price',
          text: 'Best physio I\'ve worked with. Knowledgeable and supportive. My back pain is completely gone now!',
          rating: 5,
        },
      ],
    },
  ];

  const doctor = doctors.find((d) => d.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!doctor) {
    return (
      <div className="pt-24 pb-12 min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-serif text-white mb-4">Doctor not found</h2>
          <button
            onClick={() => navigate('health')}
            className="px-6 py-2 bg-yellow-400 text-black rounded-lg font-semibold hover:bg-yellow-300 transition-colors"
          >
            Back to Doctors
          </button>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % doctor.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + doctor.images.length) % doctor.images.length);
  };

  return (
    <div className="pt-24 pb-12 min-h-screen bg-black">
      {/* Back Button */}
      <div className="container mx-auto px-6 mb-8">
        <button
          onClick={() => navigate('health')}
          className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Doctors
        </button>
      </div>

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* MAIN CONTENT */}
          <div className="lg:col-span-2">
            {/* GALLERY */}
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden mb-8">
              <div className="relative h-96 bg-gradient-to-br from-blue-900 to-cyan-900">
                <img
                  src={doctor.images[currentImageIndex]}
                  alt={`${doctor.name} - Image ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />

                {/* Navigation Arrows */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Dot Indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {doctor.images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        idx === currentImageIndex ? 'bg-yellow-400' : 'bg-white/30'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* TABS */}
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
              {/* Tab Navigation */}
              <div className="flex border-b border-white/10">
                {['overview', 'services', 'reviews'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-4 px-6 font-semibold text-center transition-colors ${
                      activeTab === tab
                        ? 'text-yellow-400 border-b-2 border-yellow-400 bg-white/5'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="p-8">
                {/* OVERVIEW TAB */}
                {activeTab === 'overview' && (
                  <div>
                    <h3 className="text-xl font-serif font-bold text-white mb-4">About Dr. {doctor.name.split(' ')[1]}</h3>
                    <p className="text-gray-300 mb-6 leading-relaxed">{doctor.description}</p>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                        <p className="text-xs text-gray-400 mb-1">YEARS OF EXPERIENCE</p>
                        <p className="text-2xl font-bold text-yellow-400">{doctor.yearsExperience}+</p>
                      </div>
                      <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                        <p className="text-xs text-gray-400 mb-1">PATIENT REVIEWS</p>
                        <p className="text-2xl font-bold text-yellow-400">{doctor.reviews}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-white font-semibold mb-3">Location</h4>
                      <div className="flex items-center gap-2 text-gray-300">
                        <MapPin className="w-5 h-5 text-yellow-400" />
                        <span>{doctor.location}, Mpumalanga</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* SERVICES TAB */}
                {activeTab === 'services' && (
                  <div>
                    <h3 className="text-xl font-serif font-bold text-white mb-6">Specializations & Services</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {doctor.specializations.map((spec, idx) => (
                        <div key={idx} className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-lg p-4">
                          <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* REVIEWS TAB */}
                {activeTab === 'reviews' && (
                  <div>
                    <h3 className="text-xl font-serif font-bold text-white mb-6">Patient Testimonials</h3>
                    <div className="space-y-4">
                      {doctor.testimonials.map((testimonial, idx) => (
                        <div key={idx} className="bg-white/5 border border-white/10 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <p className="font-semibold text-white">{testimonial.name}</p>
                            <div className="flex gap-1">
                              {[...Array(testimonial.rating)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-400 text-sm">"{testimonial.text}"</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="lg:col-span-1 h-fit sticky top-24">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              {/* Doctor Name & Rating */}
              <h1 className="text-2xl font-serif font-bold text-white mb-2">Dr. {doctor.name.split(' ')[1]}</h1>
              <p className="text-sm text-gray-400 mb-4">{doctor.specialty}</p>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4 pb-4 border-b border-white/10">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="text-lg font-bold text-white">{doctor.rating?.toFixed(1) || '4.5'}</span>
                <span className="text-sm text-gray-400">({doctor.reviews} reviews)</span>
              </div>

              {/* Verified Badge */}
              {doctor.verified && (
                <div className="flex items-center gap-2 mb-4 pb-4 border-b border-white/10">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="font-semibold text-green-400">Verified Professional</span>
                </div>
              )}

              {/* Contact Information */}
              <div className="space-y-3 mb-6">
                {doctor.phone && (
                  <a
                    href={`tel:${doctor.phone}`}
                    className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-lg hover:border-yellow-400/50 hover:bg-white/10 transition-all"
                  >
                    <Phone className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                    <div className="text-sm">
                      <p className="text-xs text-gray-400">Phone</p>
                      <p className="text-white font-semibold">{doctor.phone}</p>
                    </div>
                  </a>
                )}

                {doctor.email && (
                  <a
                    href={`mailto:${doctor.email}`}
                    className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-lg hover:border-yellow-400/50 hover:bg-white/10 transition-all"
                  >
                    <Mail className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                    <div className="text-sm">
                      <p className="text-xs text-gray-400">Email</p>
                      <p className="text-white font-semibold break-all text-xs">{doctor.email}</p>
                    </div>
                  </a>
                )}

                {doctor.website && (
                  <a
                    href={`https://${doctor.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-lg hover:border-yellow-400/50 hover:bg-white/10 transition-all"
                  >
                    <Globe className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                    <div className="text-sm">
                      <p className="text-xs text-gray-400">Website</p>
                      <p className="text-white font-semibold">{doctor.website}</p>
                    </div>
                  </a>
                )}
              </div>

              {/* CTAs */}
              <button className="w-full py-3 bg-yellow-400 hover:bg-yellow-300 text-black font-bold rounded-lg transition-colors mb-3">
                Request Appointment
              </button>
              <button className="w-full py-3 border border-white/20 text-white hover:border-white/40 font-semibold rounded-lg transition-colors flex items-center justify-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthDetailV2;
