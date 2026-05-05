import React from 'react';

const Gold = '#E3B92C';

export const FoodIcon: React.FC<{className?:string}> = ({className}) => (
  <svg viewBox="0 0 48 48" width="36" height="36" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="6" width="36" height="36" rx="8" fill="#0b0b0b" />
    <path d="M18 14c0 4 2 6 2 10" stroke={Gold} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M22 14c0 4-2 6-2 10" stroke={Gold} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
    <path d="M15 34c1-4 4-6 9-6s8 2 9 6" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.06" />
  </svg>
);

export const TourismIcon: React.FC<{className?:string}> = ({className}) => (
  <svg viewBox="0 0 48 48" width="36" height="36" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="6" width="36" height="36" rx="8" fill="#0b0b0b" />
    <path d="M12 32c3-6 8-10 12-10s9 4 12 10" stroke={Gold} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="34" cy="14" r="3" fill={Gold} />
  </svg>
);

export const LuxuryIcon: React.FC<{className?:string}> = ({className}) => (
  <svg viewBox="0 0 48 48" width="36" height="36" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="6" width="36" height="36" rx="8" fill="#070707" />
    <path d="M24 10l6 8-6 6-6-6 6-8z" fill={Gold} opacity="0.98" />
    <circle cx="24" cy="30" r="3" fill="#fff" opacity="0.06" />
  </svg>
);

export const BeautyIcon: React.FC<{className?:string}> = ({className}) => (
  <svg viewBox="0 0 48 48" width="36" height="36" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="6" width="36" height="36" rx="8" fill="#0b0b0b" />
    <path d="M24 12c4 6 8 6 8 12s-4 8-8 8-8-3-8-8 4-6 8-12z" stroke={Gold} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

export const HealthIcon: React.FC<{className?:string}> = ({className}) => (
  <svg viewBox="0 0 48 48" width="36" height="36" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="6" width="36" height="36" rx="8" fill="#080808" />
    <path d="M20 14h8v4h4v8h-4v4h-8v-4h-4v-8h4z" fill={Gold} />
  </svg>
);

export const RealEstateIcon: React.FC<{className?:string}> = ({className}) => (
  <svg viewBox="0 0 48 48" width="36" height="36" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="6" width="36" height="36" rx="8" fill="#0b0b0b" />
    <path d="M12 30v-8l12-8 12 8v8" stroke={Gold} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <rect x="18" y="22" width="6" height="6" fill={Gold} />
  </svg>
);

export const AutomotiveIcon: React.FC<{className?:string}> = ({className}) => (
  <svg viewBox="0 0 48 48" width="36" height="36" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="6" width="36" height="36" rx="8" fill="#0b0b0b" />
    <path d="M10 30h28l-2-8h-24l-2 8z" stroke={Gold} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <circle cx="16" cy="32" r="2.5" fill={Gold} />
    <circle cx="32" cy="32" r="2.5" fill={Gold} />
  </svg>
);

export const HomeTradesIcon: React.FC<{className?:string}> = ({className}) => (
  <svg viewBox="0 0 48 48" width="36" height="36" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="6" width="36" height="36" rx="8" fill="#0b0b0b" />
    <path d="M12 30l6-12 6 6 6-6 6 12" stroke={Gold} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

export const ShoppingIcon: React.FC<{className?:string}> = ({className}) => (
  <svg viewBox="0 0 48 48" width="36" height="36" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="6" width="36" height="36" rx="8" fill="#070707" />
    <path d="M16 18h16l-2 12h-12l-2-12z" stroke={Gold} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <path d="M20 14a4 4 0 018 0" stroke={Gold} strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

export const BusinessIcon: React.FC<{className?:string}> = ({className}) => (
  <svg viewBox="0 0 48 48" width="36" height="36" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="6" width="36" height="36" rx="8" fill="#0b0b0b" />
    <rect x="14" y="18" width="20" height="12" stroke={Gold} strokeWidth="2" fill="none" rx="2" />
    <path d="M18 22v8" stroke={Gold} strokeWidth="1.6" />
  </svg>
);

export const ITIcon: React.FC<{className?:string}> = ({className}) => (
  <svg viewBox="0 0 48 48" width="36" height="36" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="6" width="36" height="36" rx="8" fill="#070707" />
    <path d="M14 20h20M14 28h20" stroke={Gold} strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="20" cy="24" r="1.6" fill={Gold} />
  </svg>
);

export const FinancialIcon: React.FC<{className?:string}> = ({className}) => (
  <svg viewBox="0 0 48 48" width="36" height="36" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="6" width="36" height="36" rx="8" fill="#080808" />
    <path d="M24 14v20" stroke={Gold} strokeWidth="2.4" strokeLinecap="round" />
    <path d="M18 18h12M18 30h12" stroke={Gold} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const EducationIcon: React.FC<{className?:string}> = ({className}) => (
  <svg viewBox="0 0 48 48" width="36" height="36" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="6" width="36" height="36" rx="8" fill="#070707" />
    <path d="M12 28l12-8 12 8" stroke={Gold} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <path d="M24 20v12" stroke={Gold} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const TransportIcon: React.FC<{className?:string}> = ({className}) => (
  <svg viewBox="0 0 48 48" width="36" height="36" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="6" width="36" height="36" rx="8" fill="#070707" />
    <path d="M10 28h28v-6l-4-6H14l-4 6v6z" stroke={Gold} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <circle cx="16" cy="32" r="2" fill={Gold} />
    <circle cx="32" cy="32" r="2" fill={Gold} />
  </svg>
);

export const NightlifeIcon: React.FC<{className?:string}> = ({className}) => (
  <svg viewBox="0 0 48 48" width="36" height="36" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="6" width="36" height="36" rx="8" fill="#070707" />
    <path d="M14 30c2-6 8-10 10-10s8 4 10 10" stroke={Gold} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <circle cx="24" cy="14" r="3" fill={Gold} />
  </svg>
);

export const GovIcon: React.FC<{className?:string}> = ({className}) => (
  <svg viewBox="0 0 48 48" width="36" height="36" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="6" width="36" height="36" rx="8" fill="#070707" />
    <path d="M12 30h24v-6l-12-6-12 6v6z" stroke={Gold} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <rect x="20" y="24" width="8" height="6" fill={Gold} />
  </svg>
);

export const AgricultureIcon: React.FC<{className?:string}> = ({className}) => (
  <svg viewBox="0 0 48 48" width="36" height="36" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="6" width="36" height="36" rx="8" fill="#070707" />
    <path d="M12 30c4-8 12-8 20 0" stroke={Gold} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <circle cx="18" cy="24" r="2" fill={Gold} />
  </svg>
);

export const FamilyIcon: React.FC<{className?:string}> = ({className}) => (
  <svg viewBox="0 0 48 48" width="36" height="36" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="6" width="36" height="36" rx="8" fill="#070707" />
    <path d="M16 30c0-4 4-6 8-6s8 2 8 6" stroke={Gold} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <circle cx="18" cy="20" r="2.5" fill={Gold} />
    <circle cx="30" cy="20" r="2.5" fill={Gold} />
  </svg>
);

export const JobsIcon: React.FC<{className?:string}> = ({className}) => (
  <svg viewBox="0 0 48 48" width="36" height="36" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="6" width="36" height="36" rx="8" fill="#070707" />
    <path d="M14 20h20v12H14z" stroke={Gold} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <path d="M18 14v3a1 1 0 011 1h10a1 1 0 011-1v-3" stroke={Gold} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <line x1="20" y1="24" x2="20" y2="28" stroke={Gold} strokeWidth="1.8" strokeLinecap="round" />
    <line x1="28" y1="24" x2="28" y2="28" stroke={Gold} strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export const WineIcon: React.FC<{className?:string}> = ({className}) => (
  <svg viewBox="0 0 48 48" width="36" height="36" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="6" width="36" height="36" rx="8" fill="#070707" />
    <path d="M16 12h16v6c0 4-4 6-8 6s-8-2-8-6v-6z" stroke={Gold} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <path d="M20 24l-2 10c-0.5 2 0 4 2 4h8c2 0 2.5-2 2-4l-2-10" stroke={Gold} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <line x1="24" y1="12" x2="24" y2="6" stroke={Gold} strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export const RecruitmentIcon: React.FC<{className?:string}> = ({className}) => (
  <svg viewBox="0 0 48 48" width="36" height="36" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="6" width="36" height="36" rx="8" fill="#0b0b0b" />
    <circle cx="24" cy="15" r="4" fill={Gold} />
    <path d="M16 24h16v8c0 2-2 3-4 3h-8c-2 0-4-1-4-3v-8z" stroke={Gold} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <circle cx="15" cy="20" r="2.5" fill={Gold} opacity="0.7" />
    <circle cx="33" cy="20" r="2.5" fill={Gold} opacity="0.7" />
  </svg>
);

export const DomesticServicesIcon: React.FC<{className?:string}> = ({className}) => (
  <svg viewBox="0 0 48 48" width="36" height="36" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="6" width="36" height="36" rx="8" fill="#0b0b0b" />
    <path d="M24 12l10 6v16h-20v-16l10-6z" stroke={Gold} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <rect x="16" y="18" width="6" height="6" fill={Gold} opacity="0.7" />
    <rect x="26" y="18" width="6" height="6" fill={Gold} opacity="0.7" />
  </svg>
);

export const ConvenienceIcon: React.FC<{className?:string}> = ({className}) => (
  <svg viewBox="0 0 48 48" width="36" height="36" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="6" width="36" height="36" rx="8" fill="#0b0b0b" />
    <path d="M14 14h8v12h-8v-12z" fill={Gold} opacity="0.8" />
    <path d="M26 14h8v12h-8v-12z" fill={Gold} opacity="0.8" />
    <path d="M14 28h20v6h-20v-6z" stroke={Gold} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

export const WomenHealthIcon: React.FC<{className?:string}> = ({className}) => (
  <svg viewBox="0 0 48 48" width="36" height="36" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="6" width="36" height="36" rx="8" fill="#080808" />
    <circle cx="24" cy="16" r="4" fill={Gold} />
    <path d="M18 24h12v8c0 2-2 3-4 3h-4c-2 0-4-1-4-3v-8z" stroke={Gold} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <path d="M24 12v6m-3-3h6" stroke={Gold} strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

export const EventIcon: React.FC<{className?:string}> = ({className}) => (
  <svg viewBox="0 0 48 48" width="36" height="36" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="6" width="36" height="36" rx="8" fill="#070707" />
    <rect x="12" y="14" width="24" height="18" rx="2" stroke={Gold} strokeWidth="2.2" fill="none" />
    <path d="M16 18v-4M32 18v-4" stroke={Gold} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const SportsIcon: React.FC<{className?:string}> = ({className}) => (
  <svg viewBox="0 0 48 48" width="36" height="36" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="6" width="36" height="36" rx="8" fill="#070707" />
    <circle cx="24" cy="20" r="6" stroke={Gold} strokeWidth="2.2" fill="none" />
    <path d="M18 32h12c0-4-2-6-6-6s-6 2-6 6z" stroke={Gold} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

export const PetsIcon: React.FC<{className?:string}> = ({className}) => (
  <svg viewBox="0 0 48 48" width="36" height="36" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="6" width="36" height="36" rx="8" fill="#070707" />
    <circle cx="18" cy="18" r="2" fill={Gold} />
    <circle cx="30" cy="18" r="2" fill={Gold} />
    <path d="M14 28c2-4 4-4 10-4s8 0 10 4" stroke={Gold} strokeWidth="2.2" strokeLinecap="round" fill="none" />
  </svg>
);

export const SecurityIcon: React.FC<{className?:string}> = ({className}) => (
  <svg viewBox="0 0 48 48" width="36" height="36" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="6" width="36" height="36" rx="8" fill="#070707" />
    <path d="M24 12l10 4v8c0 8-10 10-10 10s-10-2-10-10v-8l10-4z" stroke={Gold} strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 24l3 3 6-6" stroke={Gold} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const EnergyIcon: React.FC<{className?:string}> = ({className}) => (
  <svg viewBox="0 0 48 48" width="36" height="36" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="6" width="36" height="36" rx="8" fill="#070707" />
    <path d="M24 12v12M18 20h12" stroke={Gold} strokeWidth="2.4" strokeLinecap="round" />
    <circle cx="24" cy="30" r="4" stroke={Gold} strokeWidth="2" fill="none" />
  </svg>
);

export const CreatorIcon: React.FC<{className?:string}> = ({className}) => (
  <svg viewBox="0 0 48 48" width="36" height="36" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="6" width="36" height="36" rx="8" fill="#070707" />
    <path d="M12 16h24v18H12z" stroke={Gold} strokeWidth="2.2" fill="none" />
    <path d="M20 22l4-4 4 4 4-4" stroke={Gold} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <circle cx="20" cy="20" r="1.5" fill={Gold} />
  </svg>
);

export const DomesticIcon: React.FC<{className?:string}> = ({className}) => (
  <svg viewBox="0 0 48 48" width="36" height="36" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="6" width="36" height="36" rx="8" fill="#0b0b0b" />
    <path d="M24 12l10 6v16h-20v-16l10-6z" stroke={Gold} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <rect x="16" y="18" width="6" height="6" fill={Gold} opacity="0.7" />
    <rect x="26" y="18" width="6" height="6" fill={Gold} opacity="0.7" />
  </svg>
);

export const ProfessionalIcon: React.FC<{className?:string}> = ({className}) => (
  <svg viewBox="0 0 48 48" width="36" height="36" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="6" width="36" height="36" rx="8" fill="#080808" />
    <path d="M24 14a4 4 0 11-8 0 4 4 0 018 0zm-2 8h-8v12h16v-12h-8z" fill={Gold} />
    <rect x="14" y="22" width="20" height="12" stroke={Gold} strokeWidth="2" fill="none" rx="1" />
  </svg>
);

export default {};
